const Ourservices = require("../models/ourservices.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createService = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;
  const ourservices = await new Ourservices({
    title,
    content,
  }).save();

  res.status(200).send(ourservices);
});

exports.getServices = catchAsync(async (req, res, next) => {
  const ourservices = await Ourservices.find({}).sort({ createdAt: -1 });

  res.status(200).send(ourservices);
});

// delete service
exports.deleteService = catchAsync(async (req, res, next) => {
  await Ourservices.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Service deleted succesfully",
  });
});

// single service details
exports.getSingleService = catchAsync(async (req, res, next) => {
  const service = await Ourservices.findById(req.params.id);
  if (!service) {
    return next(new AppError("Service is not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    service,
  });
});

exports.updateService = catchAsync(async (req, res, next) => {
  let exitservice = await Ourservices.findById(req.params.id);
  if (!exitservice) {
    return next(new AppError("Service is not found with this id", 404));
  }

  service = await Ourservices.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    service,
  });
});
