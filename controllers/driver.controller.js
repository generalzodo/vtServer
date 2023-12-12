import Driver from '../models/drivers.model.js';
/**
 * Create a new Driver item.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
// Create a new Driver
export const fetchDrivers = async (req, res) => {
  try {
    const result =   await Driver.find({}).sort({createdAt:-1});;
    res.status(201).json({success:true, data: result});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchSingleDriver = async (req, res) => {
  try {
    const result =   Driver.findOne({ _id: req.params.id });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDriver = async (req, res) => {
  try {
    const newDriver = new Driver({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      status: req.body.status,
      state: req.body.state,
      createdAt: req.body.createdAt,
    });

    const result = await newDriver.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDriver = async (req, res) => {

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
    const result = await Driver.updateOne({ _id: req.params.id }, { ...req.body });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    const result = await Driver.deleteOne({ _id: req.params.id })
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
