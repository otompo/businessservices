import User from '../models/userModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

// make user an admin
export const makeUserAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.query.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const roleUpdated = await User.findByIdAndUpdate(
    user._id,
    {
      $addToSet: { role: 'Admin' },
    },
    { new: true },
  );
  res.send({ ok: true });
  // console.log(roleUpdated);
});

// remove user as an admin
export const removeUserAsAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.query.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  const roleUpdated = await User.findByIdAndUpdate(
    user._id,
    {
      $pull: { role: 'Admin' },
    },
    { new: true },
  );
  res.send({ ok: true });
  // console.log(roleUpdated);
});

export const getUsersLimit = catchAsync(async (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 5;
  const users = await User.find({})
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(limit);
  res.send(users);
});

// get users
export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.send(users);
});

// delete user
export const removeUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.query.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const data = await User.findByIdAndRemove(user._id);
  res.json({ message: 'User Deleted' });
});
