const router = require("express").Router();
const { getNumbers } = require("../controllers/numbers.controllers");
const { requireSignin, isAdmin } = require("../middlewares/auth");

router.route("/numbers").get(requireSignin, isAdmin, getNumbers);

module.exports = router;
