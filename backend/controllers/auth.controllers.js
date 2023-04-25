const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const slugify = require("slugify");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { hashPassword } = require("../helpers/auth");

// const signToken = (id, email) => {
//   return jwt.sign({ id, email }, process.env.JWT_SECRET, {
//     expiresIn: "5d",
//   });
// };

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

exports.logout = catchAsync(async (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  return res.json({ message: "Signout success" });
});

exports.currentUser = catchAsync(async (req, res) => {
  try {
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
});

exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.getallusers = catchAsync(async (req, res, next) => {
  const users = await User.find({})
    .select("-password +generatedPasword ")
    .sort({ createdAt: -1 });
  res.status(200).send(users);
});

exports.createUser = catchAsync(async (req, res) => {
  let { name, email, password, role } = req.body;

  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
  if (!email) {
    return res.json({
      error: "Email is required",
    });
  }

  // if user exist
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({ error: "Email is taken" });
  }
  // hash password
  let hashedPassword = await hashPassword(password);
  let username = slugify(name) + shortid(3);

  const user = await new User({
    username,
    name,
    email,
    password: hashedPassword,
    generatedPasword: password,
    role,
  }).save();

  return res.status(200).json(user);
});

exports.updateProfile = async (req, res, next) => {
  try {
    const { id, name, email, password, contactNum } = req.body;

    const userFromDb = await User.findById(id);

    // check if user is himself/herself
    if (userFromDb._id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .send({ error: "You are not allowed to update this user" });
    }

    // check if email is taken
    const existEmail = await User.findOne({ email });
    const existContact = await User.findOne({ contactNum });
    if (existEmail && existEmail._id.toString() !== userFromDb._id.toString()) {
      return res.json({ error: "Email is taken" });
    }
    if (
      existContact &&
      existContact._id.toString() !== userFromDb._id.toString()
    ) {
      return res.json({ error: "Contact number is taken" });
    }
    // check password length
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    let username = slugify(`${name}-`) + shortid.generate();
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updated = await User.findByIdAndUpdate(
      id,
      {
        name: name || userFromDb.name,
        contactNum: contactNum || userFromDb.contactNum,
        username: username || userFromDb.username,
        email: email || userFromDb.email,
        password: hashedPassword || userFromDb.password,
        // image: image || userFromDb.image,
        generatedPasword: " ",
      },
      { new: true }
    );
    updated.password = undefined;
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};
