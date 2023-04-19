import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';

export const currentAdmin = catchAsync(async (req, res) => {
  let user = await User.findById(req.user._id).select('-password');
  // console.log("CURRENT INSTRUCTOR => ", user);
  if (!user.role.includes('Admin')) {
    return res.sendStatus(403);
  } else {
    res.json({ ok: true });
  }
});
