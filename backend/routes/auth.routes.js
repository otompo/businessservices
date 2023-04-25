const router = require("express").Router();
const { loginUser, logout } = require("../controllers/auth.controllers");

router.route("/auth/login").post(loginUser);
router.route("/auth/logout").get(logout);

module.exports = router;
