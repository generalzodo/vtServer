import SubRoute from '../models/subroute.model.js';
import Bus from '../models/bus.model.js';
import Trip from '../models/trips.model.js';

/**
 * Create a new SubRoute item.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
// Create a new SubRoute
export const fetchSubRoutes = async (req, res) => {
  try {
    const result = await SubRoute.find({}).populate({ path: 'route' }).sort({createdAt:-1});
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const findSubRoutes = async (req, res) => {

  try {
   
    let arr = []
    const result = await SubRoute.find({ origin: req.body.from, stops: { $in: req.body.to } }).populate({ path: 'bus' });
    for await (const item of result) {
      console.log(req.body.date);
      let trips = await Trip.find({ subroute: item._id, tripDate: req.body.date, status: 'pending' });
      item.trips = trips;
      arr.push({ trips: trips, subroute: item })
    }
    console.log(arr);
    res.status(201).json({ success: true, data: arr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchSingleSubRoute = async (req, res) => {
  try {
    const result = await SubRoute.findOne({ _id: req.params.id });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

export const createSubRoute = async (req, res) => {

  try {

    const newSubRoute = new SubRoute({
      title: req.body.title,
      origin: req.body.origin,
      price: req.body.price,
      times: req.body.times,
      premiumPrice: req.body.premiumPrice,
      discountedPrice: req.body.discountedPrice,
      destination: req.body.destination,
      route: req.body.route,
    });

    const result = await newSubRoute.save();
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSubRoute = async (req, res) => {
  try {

  let isError = { error: false, message: "" };
  for (const key in req.body) {
    let isBoolean = typeof req.body[key] === "boolean";
    if (!isBoolean) {
      if (!req.body[key]) {
        console.log(`${key} is empty`);
        isError = {
          error: true,
          message: `${key} cannot be empty. Add a value or remove it from the request body`,
        };
      }
    }
  }
  if (isError.error) {
    // res.status(400).json(isError);
    throw new Error('Something went wrong, pls try again later')

  }
    const result = await SubRoute.updateOne({ _id: req.params.id }, { ...req.body });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSubRoute = async (req, res) => {
  try {
    const result = await SubRoute.deleteOne({ _id: req.params.id })
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
