// import ServicesTopWidget from "../models/servicesTopWidgetModel";
// import About from "../models/aboutModel";
// import User from "../models/userModel";
// import Category from "../models/categoryModel";
// import catchAsync from "../utils/catchAsync";
// import AppError from "../utils/appError";
// import Impact from "../models/impactModel";
// import Footer from "../models/footerModel";
// import MobileApp from "../models/mobileAppModel";
// import WebApp from "../models/webapp.model";
const Hero = require("../models/hero.model");
const catchAsync = require("../utils/catchAsync");
// import cloudinary from "cloudinary";
// import sendEmail from '../utils/sendEmail';
// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// var nodemailer = require("nodemailer");
// var sendgridtransport = require("nodemailer-sendgrid-transport");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// export const createFooter = async (req, res) => {
//   try {
//     const { footer } = req.body;
//     const found = await Footer.findOne({ footer });

//     if (found) {
//       // update
//       const updated = await Footer.findOneAndUpdate({ footer }, req.body, {
//         new: true,
//       });
//       return res.json(updated);
//     } else {
//       // create
//       const created = await new Footer(req.body).save();
//       return res.json(created);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getFooter = async (req, res) => {
//   try {
//     const { footer } = req.query;
//     const found = await Footer.findOne({ footer });
//     return res.json(found);
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.createHero = catchAsync(async (req, res) => {
  try {
    const { hero, image } = req.body;
    const imageResult = await cloudinary.v2.uploader.upload(image, {
      folder: "gracebusiness",
    });
    const found = await Hero.findOne({ hero });

    if (found) {
      await cloudinary.v2.uploader.destroy(found.image.public_id);
      // update
      const updated = await Hero.findOneAndUpdate(
        { hero },
        {
          ...req.body,
          image: {
            public_id: imageResult.public_id,
            url: imageResult.url,
          },
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
        image: {
          public_id: imageResult.public_id,
          url: imageResult.url,
        },
      }).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
  }
});

exports.getHero = catchAsync(async (req, res) => {
  try {
    const { hero } = req.query;
    const found = await Hero.findOne({ hero });
    return res.json(found);
  } catch (err) {
    console.log(err);
  }
});

// export const createAbout = async (req, res) => {
//   try {
//     const { about, image } = req.body;
//     const imageResult = await cloudinary.v2.uploader.upload(image, {
//       folder: "codesmart",
//     });
//     const found = await About.findOne({ about });

//     if (found) {
//       await cloudinary.v2.uploader.destroy(found.image.public_id);
//       // update
//       const updated = await About.findOneAndUpdate(
//         { about },
//         {
//           ...req.body,
//           image: {
//             public_id: imageResult.public_id,
//             url: imageResult.url,
//           },
//         },
//         {
//           new: true,
//         }
//       );
//       return res.json(updated);
//     } else {
//       // create
//       const created = await new About({
//         ...req.body,
//         image: {
//           public_id: imageResult.public_id,
//           url: imageResult.url,
//         },
//       }).save();
//       return res.json(created);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getAbout = async (req, res) => {
//   try {
//     const { about } = req.query;
//     const found = await About.findOne({ about });
//     return res.json(found);
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const createMobileApp = async (req, res) => {
//   try {
//     const { mobileapp, image } = req.body;
//     const imageResult = await cloudinary.v2.uploader.upload(image, {
//       folder: "codesmart",
//     });
//     const found = await MobileApp.findOne({ mobileapp });

//     if (found) {
//       await cloudinary.v2.uploader.destroy(found.image.public_id);
//       // update
//       const updated = await MobileApp.findOneAndUpdate(
//         { mobileapp },
//         {
//           ...req.body,
//           image: {
//             public_id: imageResult.public_id,
//             url: imageResult.url,
//           },
//         },
//         {
//           new: true,
//         }
//       );
//       return res.json(updated);
//     } else {
//       // create
//       const created = await new MobileApp({
//         ...req.body,
//         image: {
//           public_id: imageResult.public_id,
//           url: imageResult.url,
//         },
//       }).save();
//       return res.json(created);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getcreateMobileApp = async (req, res) => {
//   try {
//     const { mobileapp } = req.query;
//     const found = await MobileApp.findOne({ mobileapp });
//     return res.json(found);
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const createWebApp = async (req, res) => {
//   try {
//     const { webapp, image } = req.body;
//     const imageResult = await cloudinary.v2.uploader.upload(image, {
//       folder: "codesmart",
//     });
//     const found = await WebApp.findOne({ webapp });

//     if (found) {
//       await cloudinary.v2.uploader.destroy(found.image.public_id);
//       // update
//       const updated = await WebApp.findOneAndUpdate(
//         { webapp },
//         {
//           ...req.body,
//           image: {
//             public_id: imageResult.public_id,
//             url: imageResult.url,
//           },
//         },
//         {
//           new: true,
//         }
//       );
//       return res.json(updated);
//     } else {
//       // create
//       const created = await new WebApp({
//         ...req.body,
//         image: {
//           public_id: imageResult.public_id,
//           url: imageResult.url,
//         },
//       }).save();
//       return res.json(created);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getcreateWebApp = async (req, res) => {
//   try {
//     const { webapp } = req.query;
//     const found = await WebApp.findOne({ webapp });
//     return res.json(found);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const createImpact = catchAsync(async (req, res, next) => {
//   const { title, totalNum } = req.body;

//   if (!title || !totalNum) {
//     return next(new AppError("All fields are require", 401));
//   }
//   const impact = await new Impact({ title, totalNum }).save();
//   return res.send(impact);
// });

// export const removeImpact = async (req, res) => {
//   try {
//     const impact = await Impact.findById(req.query.id);

//     if (!impact) {
//       return next(new AppError("Impact not found", 401));
//     }
//     await impact.remove();
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const updateImpact = async (req, res) => {
//   try {
//     const found = await Impact.findById(req.query.id);
//     if (!found) {
//       return res.status(404).send({ message: "Impact does not exist" });
//     }
//     const data = await Impact.findByIdAndUpdate(
//       { _id: found._id },
//       { title: req.body.title, totalNum: req.body.totalNum },
//       { new: true }
//     );
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getImpact = catchAsync(async (req, res, next) => {
//   const impact = await Impact.find({}).sort({ createdAt: -1 });
//   return res.send(impact);
// });

// export const createServicesTopWidget = async (req, res) => {
//   try {
//     const { servicestopwidget } = req.body;

//     const found = await ServicesTopWidget.findOne({ servicestopwidget });

//     if (found) {
//       const updated = await ServicesTopWidget.findOneAndUpdate(
//         { servicestopwidget },
//         {
//           ...req.body,
//         },
//         {
//           new: true,
//         }
//       );
//       return res.json(updated);
//     } else {
//       // create
//       const created = await new ServicesTopWidget({
//         ...req.body,
//       }).save();
//       return res.json(created);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getServicesTopWidget = async (req, res) => {
//   try {
//     const { servicestopwidget } = req.query;
//     const found = await ServicesTopWidget.findOne({ servicestopwidget });
//     return res.json(found);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const createImpactTopWidget = async (req, res) => {
//   try {
//     const { impacttopwidget } = req.body;

//     const found = await ImpactTopWidget.findOne({ impacttopwidget });

//     if (found) {
//       const updated = await ImpactTopWidget.findOneAndUpdate(
//         { impacttopwidget },
//         {
//           ...req.body,
//         },
//         {
//           new: true,
//         }
//       );
//       return res.json(updated);
//     } else {
//       // create
//       const created = await new ImpactTopWidget({
//         ...req.body,
//       }).save();
//       return res.json(created);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getImpactTopWidget = async (req, res) => {
//   try {
//     const { impacttopwidget } = req.query;
//     const found = await ImpactTopWidget.findOne({ impacttopwidget });
//     return res.json(found);
//   } catch (err) {
//     console.log(err);
//   }
// };

// // export const createContact = catchAsync(async (req, res, next) => {
// //   const { name, email, content, subject } = req.body;

// //   if (!name || !email || !content || !subject) {
// //     res.status(400);
// //     return next(new AppError('All fields are require', 401));
// //   }
// //   const send_to = email;
// //   const sent_from = process.env.NEXT_PUBLIC_EMAIL_USER;
// //   const reply_to = email;
// //   const message = `
// //   <h3>Contact form message</h3>
// //   <p ><h4 style="color:#7c03a0"><u>Sender Name</u></h4></p>
// //   <p >${name}</p>

// //    <p ><h4 style="color:#7c03a0"><u>Sender Message</u></h4></p>
// //   <p>${content}</p>
// //     `;

// //   await sendEmail(email, subject, message, send_to, sent_from, reply_to);
// //   res.status(200).json({ success: true, message: 'Email Sent' });
// // });

// export const getNumbers = async (req, res) => {
//   try {
//     const posts = await Post.countDocuments();
//     const authorPosts = await Post.countDocuments({ postedBy: req.user._id });
//     const staff = await User.countDocuments({ $ne: "subscriber" });
//     const inactivestaff = await User.countDocuments({ active: false });
//     const categories = await Category.countDocuments();

//     return res.json({
//       posts,
//       staff,
//       categories,
//       inactivestaff,
//       authorPosts,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
