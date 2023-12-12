import Location from '../models/location.model.js';
/**
 * Create a new Location item.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
// Create a new Location
export const fetchLocations = async (req, res) => {
  try {
    const result =  await Location.find({}).sort({createdAt:-1});;
    res.status(201).json({success:true, data: result});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchSingleLocation = async (req, res) => {
  try {
    const result =  await Location.findOne({ _id: req.params.id });
    res.status(201).json({success:true, data: result});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLocation = async (req, res) => {
  console.log(req.body)
  try {
    const newLocation = new Location({
      title: req.body.title,
      address: req.body.address,
      state: req.body.state,
     
    });

    const result = await newLocation.save();
    res.status(201).json({success:true, data: result});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLocation = async (req, res) => {

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
    const result = await Location.updateOne({ _id: req.params.id }, { ...req.body });
    res.status(201).json({success:true, data: result});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLocation = async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await Location.deleteOne({ _id: req.params.id })
    res.status(201).json({success:true, data: result});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
