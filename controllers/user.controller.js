import User from '../models/users.model.js';
import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken'
import mail from './../mail.js';

/**
 * Create a new User item.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
// Create a new User
export const fetchUsers = async (req, res) => {
  try {
    const result =   await User.find({}).sort({createdAt:-1});;
    res.status(201).json({success:true, data: result});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchSingleUser = async (req, res) => {
  try {
    const result =   User.findOne({ _id: req.params.id });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      dob: req.body.dob,
      email: req.body.email,
      address: req.body.address,
      state: req.body.state,
      password: hash,
      uuid: generateUserId()

    });

    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var token = '';
    for (var i = 16; i > 0; --i) {
        token += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    newUser.reset = token;
    newUser.resetExpires = Date.now() + 7200000;
    const result = await newUser.save();

    let link = process.env.BASIC_URL + 'verify/' + token

    await mail.new(newUser.email, link);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  const user = await User.findById(req.params.id);

  const valid = await bcrypt.compare(req.body.opassword, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  
  const result = await User.updateOne({ _id: req.params.id }, {password: hash });
   
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    })
    console.log(user);
    
    if (!user) {
      throw new Error('No such user found')
    }
    if (user.status == 'Locked') {
      throw new Error('You have been locked out of this system. please contact the adminstrator')
    }
    if (user.status == 'Inactive') {
      throw new Error('Kindly verify your email used during sign up to gain access')
    }
    // 2
    console.log(user);
    
    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
    
    const token =  'fmefmekfmekfme'
    // jwt.sign({
    //   userId: user._id
    // }, APP_SECRET);
    
    // let activity = new Activity({
    //   // type: data.type,
    //   text: "Logged in",
    //   operation: "Login",
    //   device: args.device,
    //   userId: user._id,
    // })
    // await activity.save();
    
    // 3
    
    res.status(201).json({
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {

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
    const result = await User.updateOne({ _id: req.params.id }, { ...req.body });
    const user = await User.findById(req.params.id);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id })
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function generateUserId() {
  const timestamp = new Date().getTime(); // Get current timestamp
  const randomPart = Math.floor(Math.random() * 10); // Add a random number for extra uniqueness

  // Combine timestamp and random number
  const bookingId = `${timestamp}${randomPart}`;

  return bookingId;
}