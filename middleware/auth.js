import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ error: true, message: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    if (req.user === null) {
      res.status(404).json({ error: true, message: "User does not exist" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ error: true, message: "Request is not authorized" });
  }
};

export const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
