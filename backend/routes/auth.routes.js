const router = require("express").Router();
const { isAuth, authorizeRoles } = require("../middlewares/auth");
const { loginUser, getallusers } = require("../controllers/auth.controllers");

router.route("/login").post(loginUser);
router.route("/users").get(isAuth, authorizeRoles("admin"), getallusers);

module.exports = router;
