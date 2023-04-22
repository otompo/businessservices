const router = require("express").Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
  createService,
  getServices,
  deleteService,
  updateService,
  getSingleService,
} = require("../controllers/ourservices.controllers");

router
  .route("/ourservices")
  .post(requireSignin, isAdmin, createService)
  .get(getServices);

router
  .route("/ourservices/:id")
  .delete(requireSignin, isAdmin, deleteService)
  .put(requireSignin, isAdmin, updateService)
  .get(requireSignin, isAdmin, getSingleService);

module.exports = router;
