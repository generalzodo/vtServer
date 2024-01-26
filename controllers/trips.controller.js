import Trip from '../models/trips.model.js';
import Booking from '../models/booking.model.js';
import Route from '../models/route.model.js';
/**
 * Create a new Trip item.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
// Create a new Trip
export const fetchTrips = async (req, res) => {
  try {
    const result = await Trip.find({}).populate({ path: 'route' }).populate({ path: 'driver' }).sort({ createdAt: 1 });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchTripsManifest = async (req, res) => {
  try {
    const result = await Booking.find({
      $or: [
        { trip: req.params.id },      // Find users who are 18 or older
        { returnTrip: req.params.id }]
    })
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findTrips = async (req, res) => {
  try {
    const result = await Trip.find({}).populate({ path: 'route' }).populate({ path: 'driver' });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchSingleTrip = async (req, res) => {
  try {
    const result = await Trip.findOne({ _id: req.params.id }).populate({ path: 'route' }).populate({ path: 'driver' });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTrip = async (req, res) => {
  try {

    let route = await Route.findById(req.body.route).populate({ path: 'bus' });

    const newTrip = new Trip({

      title: req.body.title,
      route: req.body.route,
      driver: req.body.driver,
      availableSeats: route.bus.seats,
      tripDate: req.body.tripDate,

    });

    const result = await newTrip.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTrip = async (req, res) => {
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
    const result = await Trip.updateOne({ _id: req.params.id }, { ...req.body });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const result = await Trip.deleteOne({ _id: req.params.id })
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteMultiTrip = async (req, res) => {
  try {
    console.log(req.body.ids);
    const result = await Trip.deleteMany({ _id: { $in: req.body.ids } })
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
