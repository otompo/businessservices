import Ourworks from "../models/ourworksModel";
import Category from "../models/categoryModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import cloudinary from "cloudinary";
import slugify from "slugify";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// create new work
export const createOurWork = async (req, res) => {
  try {
    const { title, url, image, description, categories } = req.body;

    if (!title || !image || !description || !url || !categories) {
      return next(new AppError("All fields are require", 401));
    }
    // check if title is taken
    const imageResult = await cloudinary.v2.uploader.upload(image, {
      folder: "codesmart",
    });

    const alreadyExist = await Ourworks.findOne({
      slug: slugify(title.toLowerCase()),
    });

    if (alreadyExist) return res.json({ error: "Title is taken" });
    // get category ids based on category name
    let ids = [];
    for (let i = 0; i < categories.length; i++) {
      Category.findOne({
        name: categories[i],
      }).exec((err, data) => {
        if (err) return console.log(err);
        ids.push(data._id);
      });
    }
    // save Ourworks
    setTimeout(async () => {
      try {
        const ourworks = await new Ourworks({
          url,
          description,
          title,
          categories: ids,
          image: {
            public_id: imageResult.public_id,
            url: imageResult.url,
          },
          slug: slugify(title),
        }).save();

        return res.json(ourworks);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

// get all works
export const getAllWorks = catchAsync(async (req, res) => {
  const data = await Ourworks.find()
    .sort({ createdAt: -1 })
    .populate("categories", "name slug");
  res.status(200).send(data);
});

export const getSingleWork = async (req, res) => {
  try {
    const { slug } = req.query;
    const work = await Ourworks.findOne({ slug }).populate(
      "categories",
      "name slug"
    );

    res.json(work);
  } catch (err) {
    console.log(err);
  }
};
// delete work

export const removeWork = async (req, res) => {
  try {
    const data = await Ourworks.findById(req.query.workId);

    await cloudinary.v2.uploader.destroy(data.image.public_id);

    await data.remove();
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const editOurWork = async (req, res) => {
  try {
    const { workId } = req.query;
    const { title, url, image, description, categories } = req.body;

    const imageResult = await cloudinary.v2.uploader.upload(image, {
      folder: "codesmart",
    });
    let ids = [];
    for (let i = 0; i < categories.length; i++) {
      Category.findOne({
        name: categories[i],
      }).exec((err, data) => {
        if (err) return console.log(err);
        ids.push(data._id);
      });
    }
    setTimeout(async () => {
      const ourworks = await Ourworks.findByIdAndUpdate(
        workId,
        {
          title,
          description,
          url,
          categories: ids,
          slug: slugify(title),
          image: {
            public_id: imageResult.public_id,
            url: imageResult.url,
          },
        },
        { new: true }
      ).populate("image", "url");

      res.json(ourworks);
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};
