import User from "../models/userModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { getSession } from "next-auth/react";

export const isAuthenticatedUser = catchAsync(async (req, res, next) => {
  const session = await getSession({ req });
  // console.log(session);
  if (!session) {
    return next(new AppError("Login first to access this resources", 401));
  }
  req.user = session.user;
  next();
});

export const isAdmin = (req, res, next) => {
  // console.log(req.user);
  User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found....",
      });
    }

    if (!req.user.role.includes("Admin")) {
      return next(new AppError("Admin resource. Access denied", 403));
    }
    next();
  });
};

export const isAuthor = catchAsync(async (req, res, next) => {
  // console.log(req.user);
  await User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found....",
      });
    }

    if (!req.user.role.includes("Author")) {
      return next(new AppError("Author resource. Access denied", 403));
    }
    next();
  });
});

// Admin Middleware
export const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user._id).exec();
  if (!user.role.includes("Admin")) {
    return res.status(400).json({
      error: "Admin resource. Access denied",
    });
  }
  next();
};

// AuthUserMiddleware
export const authMiddleware = async (req, res, next) => {
  try {
    const username = req.params.username;
    let user = await User.findOne({ username }).exec();
    if (!user) return res.status(400).send("User not found");
    // req.profile = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(200).send(error.message);
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`,
          403
        )
      );
    }

    next();
  };
};
