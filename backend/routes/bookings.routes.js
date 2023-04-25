const router = require("express").Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
  newBooking,
  getBookings,
  // getbill,
} = require("../controllers/bookings.controllers");

router
  .route("/bookings")
  .post(newBooking)
  .get(requireSignin, isAdmin, getBookings);
// router.route("/getbill").post(getbill);

module.exports = router;
