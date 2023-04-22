const Testimonials = require("../models/testimonials.model");
const User = require("../models/user.model");
const Bookings = require("../models/bookings.model");
const Services = require("../models/ourservices.model");

exports.getNumbers = async (req, res) => {
  try {
    const testimonials = await Testimonials.countDocuments();
    const users = await User.countDocuments({ role: "admin" });
    const bookings = await Bookings.countDocuments();
    const services = await Services.countDocuments();
    return res.json({ testimonials, users, bookings, services });
  } catch (err) {
    console.log(err);
  }
};
