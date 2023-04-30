const router = require("express").Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
  newBooking,
  getBookings,
} = require("../controllers/bookings.controllers");

router
  .route("/bookings")
  .post(newBooking)
  .get(requireSignin, isAdmin, getBookings);

module.exports = router;
