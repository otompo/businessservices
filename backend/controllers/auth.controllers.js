const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
// import { hashPassword } from "../utils/authHelpers";
// import { nanoid } from "nanoid";
// import shortId from "shortid";
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

// login user
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new AppError("Email required", 500));
  }
  if (!password) {
    return next(new AppError("Password required", 500));
  }

  // check for user with match email
  const user = await User.findOne({ email, active: { $ne: false } }).select(
    "+password -generatedPasword "
  );

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(
      new AppError("User not found with such email or password", 401)
    );
  }

  // create signed jwt
  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  // return user and token to client, exclude hashed password
  user.password = undefined;
  // send token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    // secure: true, // only works on https
  });

  // global.currentUser = { token, user };

  res.json({ token, user });
});

exports.getallusers = catchAsync(async (req, res, next) => {
  const users = await User.find({}).select("-password +generatedPasword ");
  res.status(200).send(users);
});
