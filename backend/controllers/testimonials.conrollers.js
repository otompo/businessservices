const Testimonials = require("../models/testimonials.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const cloudinary = require("cloudinary");
const slugify = require("slugify");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.createTestimonial = catchAsync(async (req, res, next) => {
  const { name, image, message } = req.body;

  // const result = await cloudinary.v2.uploader.upload(image, {
  //   folder: "gracebusiness",
  // });
  const testimonial = await new Testimonials({
    slug: slugify(name),
    name,
    message,
    // image: {
    //   public_id: result.public_id,
    //   url: result.url,
    // },
  }).save();
  res.status(200).send(testimonial);
});

exports.updateTestimonial = catchAsync(async (req, res, next) => {
  const { slug } = req.query;
  const { name, image, message } = req.body;

  const prevData = await Testimonials.findById(req.params.id);

  // await cloudinary.v2.uploader.destroy(prevData.image.public_id);
  // const result = await cloudinary.v2.uploader.upload(image, {
  //   folder: "gracebusiness",
  // });
  if (image) {
    const update = await Testimonials.findOneAndUpdate(
      { slug },
      {
        slug: slugify(name),
        name,
        message,
        // image: {
        //   public_id: result.public_id,
        //   url: result.url,
        // },
      },
      {
        new: true,
      }
    );
    res.status(200).send(update);
  } else {
    const update = await Testimonials.findByIdAndUpdate(
      prevData._id,
      {
        slug: slugify(name),
        name,
        message,
      },
      {
        new: true,
      }
    );
    res.status(200).send(update);
  }
});

exports.getTestimonials = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonials.find({}).sort({ createdAt: -1 });
  res.status(200).send(testimonial);
});

exports.deleteTestimonial = catchAsync(async (req, res, next) => {
  await Testimonials.findByIdAndDelete(req.params.id);
  // await cloudinary.v2.uploader.destroy(data.image.public_id);
  res.json({ ok: true });
});
