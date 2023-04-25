// import User from "../models/userModel";
// import Category from "../models/categoryModel";
const About = require("../models/about.model");
const Footer = require("../models/footer.model");
const Hero = require("../models/hero.model");
const catchAsync = require("../utils/catchAsync");
const cloudinary = require("cloudinary");
// import sendEmail from '../utils/sendEmail';
// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// var nodemailer = require("nodemailer");
// var sendgridtransport = require("nodemailer-sendgrid-transport");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.createFooter = catchAsync(async (req, res) => {
  try {
    const { footer } = req.body;
    const found = await Footer.findOne({ footer });

    if (found) {
      // update
      const updated = await Footer.findOneAndUpdate({ footer }, req.body, {
        new: true,
      });
      return res.json(updated);
    } else {
      // create
      const created = await new Footer(req.body).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
});

exports.getFooter = catchAsync(async (req, res) => {
  try {
    const { footer } = req.params;
    const found = await Footer.findOne({ footer });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
});

exports.createHero = catchAsync(async (req, res) => {
  try {
    const { hero } = req.body;
    // const logoResult = await cloudinary.v2.uploader.upload(logo, {
    //   folder: "gracebusiness",
    // });
    const found = await Hero.findOne({ hero });

    if (found) {
      // await cloudinary.v2.uploader.destroy(found.logo.public_id);
      // update
      const updated = await Hero.findOneAndUpdate(
        { hero },
        {
          ...req.body,
          // logo: {
          //   public_id: logoResult.public_id,
          //   url: logoResult.url,
          // },
        },
        {
          new: true,
        }
      );
      return res.json(updated);
    } else {
      // create
      const created = await new Hero({
        ...req.body,
        // logo: {
        //   public_id: logoResult.public_id,
        //   url: logoResult.url,
        // },
      }).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
});

exports.getHero = catchAsync(async (req, res) => {
  try {
    const { hero } = req.params;
    const found = await Hero.findOne({ hero });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
});

exports.createAbout = catchAsync(async (req, res) => {
  try {
    const { about } = req.body;
    const found = await About.findOne({ about });

    if (found) {
      // update
      const updated = await About.findOneAndUpdate(
        { about },
        {
          ...req.body,
        },
        {
          new: true,
        }
      );
      return res.json(updated);
    } else {
      // create
      const about = await new About({
        ...req.body,
      }).save();
      return res.status(200).json(about);
    }
  } catch (err) {
    console.log(err);
  }
});

exports.getAbout = catchAsync(async (req, res) => {
  const { about } = req.params;
  const found = await About.findOne({ about });
  return res.json(found);
});
