const router = require("express").Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
  loginUser,
  getallusers,
  logout,
  currentUser,
} = require("../controllers/auth.controllers");

router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/currentadmin").get(requireSignin, isAdmin, currentUser);
router.route("/users").get(requireSignin, isAdmin, getallusers);

module.exports = router;
