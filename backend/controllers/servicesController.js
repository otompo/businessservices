import slugify from 'slugify';
import Services from '../models/servicesModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

export const createService = catchAsync(async (req, res, next) => {
  //   console.log(req.body);
  const { title, icon, content } = req.body;

  let slug = slugify(title).toLowerCase();

  const alreadyExist = await Services.findOne({ slug });
  if (alreadyExist) {
    return next(new AppError('already exist', 400));
  }

  let data = await new Services({ title, slug, icon, content }).save();

  res.status(200).send(data);
});

export const getServices = catchAsync(async (req, res, next) => {
  const data = await Services.find({}).sort({ createdAt: -1 });
  res.status(200).send(data);
});

export const updateServices = async (req, res) => {
  try {
    const found = await Services.findById(req.query.id);
    if (!found) {
      return res.status(404).send({ message: 'Service does not exist' });
    }
    const data = await Services.findByIdAndUpdate(
      { _id: found._id },
      {
        title: req.body.title,
        icon: req.body.icon,
        content: req.body.content,
        slug: slugify(req.body.title),
      },
      { new: true },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteServices = catchAsync(async (req, res, next) => {
  const data = await Services.findById(req.query.id);

  if (!data) {
    return next(new AppError('Not found', 400));
  }

  await data.remove();

  res.status(200).json({
    success: true,
  });
});
