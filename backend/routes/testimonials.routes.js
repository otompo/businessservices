const router = require("express").Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
  updateTestimonial,
} = require("../controllers/testimonials.conrollers");

router
  .route("/testimonials")
  .post(requireSignin, isAdmin, createTestimonial)
  .get(getTestimonials);

router
  .route("/testimonials/:id")
  .delete(requireSignin, isAdmin, deleteTestimonial)
  .put(requireSignin, isAdmin, updateTestimonial);

module.exports = router;
