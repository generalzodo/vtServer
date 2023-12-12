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
    console.log(req.body)
    const searchDate = new Date(req.body.date);

    // Set the time to the start of the day (midnight)
    searchDate.setHours(0, 0, 0, 0);

    // Create a date range covering the entire day
    const startDate = new Date(searchDate);
    const endDate = new Date(searchDate);
    endDate.setHours(23, 59, 59, 999);
    let arr = []
    const result = await Route.find({ origin: req.body.from, destination: req.body.to }).populate({ path: 'bus' });
    for await (const item of result) {
      let trips = await Trip.find({ route: item._id, tripDate: {
        $gte: startDate,
        $lte: endDate
      }, status: 'pending' });
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
      destination: req.body.destination,
      recurrentDays: req.body.recurrentDays,
      totalTrips: req.body.totalTrips,
    });

    const result = await newRoute.save();
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRoute = async (req, res) => {

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
  try {
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
