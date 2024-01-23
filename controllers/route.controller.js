import Route from '../models/route.model.js';
import Bus from '../models/bus.model.js';
import Trip from '../models/trips.model.js';

/**
 * Create a new Route item.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
// Create a new Route
export const fetchRoutes = async (req, res) => {
  try {
    const result = await Route.find({}).populate({ path: 'bus' }).sort({createdAt:-1});
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const findRoutes = async (req, res) => {

  try {
   
    let arr = []
    const result = await Route.find({ stops: { $in: req.body.from }, stops: { $in: req.body.to } }).populate({ path: 'bus' });
    for await (const item of result) {
      console.log(req.body.date);
      let trips = await Trip.find({ route: item._id, tripDate: req.body.date, status: 'pending' });
      item.trips = trips;
      arr.push({ trips: trips, route: item })
    }
    console.log(arr);
    res.status(201).json({ success: true, data: arr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchSingleRoute = async (req, res) => {
  try {
    const result = await Route.findOne({ _id: req.params.id });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createRoute = async (req, res) => {

  try {

    const newRoute = new Route({
      title: req.body.title,
      origin: req.body.origin,
      bus: req.body.bus,
      price: req.body.price,
      times: req.body.times,
      premiumPrice: req.body.premiumPrice,
      discountedPrice: req.body.discountedPrice,
      destination: req.body.destination,
      recurrentDays: req.body.recurrentDays,
      totalTrips: req.body.totalTrips,
      stops: req.body.stops,
    });

    const result = await newRoute.save();
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRoute = async (req, res) => {
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
    const result = await Route.updateOne({ _id: req.params.id }, { ...req.body });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRoute = async (req, res) => {
  try {
    const result = await Route.deleteOne({ _id: req.params.id })
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
