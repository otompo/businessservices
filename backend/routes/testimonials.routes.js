const router = require("express").Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
  updateTestimonial,
  getSingleTestimonials,
} = require("../controllers/testimonials.conrollers");

router
  .route("/testimonials")
  .post(requireSignin, isAdmin, createTestimonial)
  .get(getTestimonials);

router
  .route("/testimonials/:id")
  .get(requireSignin, isAdmin, getSingleTestimonials)
  .delete(requireSignin, isAdmin, deleteTestimonial)
  .put(requireSignin, isAdmin, updateTestimonial);

module.exports = router;
