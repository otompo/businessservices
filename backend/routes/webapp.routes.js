const router = require("express").Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");

const {
  createHero,
  getHero,
  createFooter,
  getFooter,
  createAbout,
  getAbout,
} = require("../controllers/website.controllers");

router.route("/hero/:hero").get(getHero);
router.route("/about/:about").get(getAbout);
router.route("/footer/:footer").get(getFooter);
router.route("/hero").post(requireSignin, isAdmin, createHero);

router.route("/footer").post(requireSignin, isAdmin, createFooter);
router.route("/about").post(requireSignin, isAdmin, createAbout);

module.exports = router;
