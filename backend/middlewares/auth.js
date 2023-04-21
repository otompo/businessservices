const { promisify } = require("util");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.isAuth = catchAsync(async (req, res, next) => {
  // Get token and check if it exit
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //   console.log(token);
  if (!token) {
    return next(new AppError("Please login first to have access", 401));
  }
  // Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // Check if user still exists
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return next(
      new AppError("Please token for this user member does not exit", 401)
    );
  }
  // check if user changed password after the jwt was issued
  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError("You changed password! Please login again", 401));
  }
  req.user = currentUser;
  next();
});

// Admin Roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resources`)
      );
    }
    next();
  };
};
