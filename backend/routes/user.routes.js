const router = require("express").Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
  getallusers,
  currentUser,
  createUser,
  getSingleUser,
  updateProfile,
} = require("../controllers/auth.controllers");

router
  .route("/users")
  .get(requireSignin, isAdmin, getallusers)
  .post(requireSignin, isAdmin, createUser);
router.route("/currentadmin").get(requireSignin, isAdmin, currentUser);
router.route("/currentuser/:userId").get(requireSignin, getSingleUser);
router.route("/profileupdate").put(requireSignin, updateProfile);

module.exports = router;
