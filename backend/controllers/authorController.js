import User from '../models/userModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

export const currentAuthor = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user._id).select('-password');
  // console.log("CURRENT INSTRUCTOR => ", user);
  if (!user.role.includes('Author')) {
    return next(new AppError('You are not an Author', 403));
  } else {
    res.json({ ok: true });
  }
});

export const becomeAnAuthor = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).exec();
  if (!user) {
    return next(new AppError('Unauthorized', 404));
  }
  const UpdatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $addToSet: { role: 'Author' },
    },
    { new: true },
  );
  res.send({ user: UpdatedUser });
  // console.log(roleUpdated);
});
