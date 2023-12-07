import Bus from '../models/bus.model.js';
/**
 * Create a new Bus item.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
// Create a new Bus
export const fetchBuses = async (req, res) => {
  try {
    const result =   await Bus.find({});
    res.status(201).json({success:true, data: result});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchSingleBus = async (req, res) => {
  try {
    const result =   Bus.findOne({ _id: req.params.id });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBus = async (req, res) => {
  try {
    const newBus = new Bus({
      title: req.body.title,
      photo: req.body.photo,
      type: req.body.type,
      seats: req.body.seats,
      status: req.body.status,
    });

    const result = await newBus.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBus = async (req, res) => {

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
    const result = await Bus.updateOne({ _id: req.params.id }, { ...req.body });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBus = async (req, res) => {
  try {
    const result =  await Bus.deleteOne({ _id: req.params.id })
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
