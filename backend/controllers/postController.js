import Post from "../models/postModel";
import User from "../models/userModel";
import Category from "../models/categoryModel";
import slugify from "slugify";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
// const _ = require('lodash');
import cloudinary from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const createPost = async (req, res) => {
  try {
    const { title, featuredImage, categories } = req.body;

    if (!title || !featuredImage || !categories) {
      return next(new AppError("All fields are require", 401));
    }
    // check if title is taken
    const imageResult = await cloudinary.v2.uploader.upload(featuredImage, {
      folder: "codesmart",
    });

    const alreadyExist = await Post.findOne({
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

    // save post
    setTimeout(async () => {
      try {
        const post = await new Post({
          ...req.body,
          featuredImage: {
            public_id: imageResult.public_id,
            url: imageResult.url,
          },
          slug: slugify(title),
          categories: ids,
          postedBy: req.user._id,
        }).save();

        // push the post _id to user's posts []
        await User.findByIdAndUpdate(req.user._id, {
          $addToSet: { posts: post._id },
        });

        return res.json(post);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

export const getPostsForAdmin = async (req, res) => {
  try {
    const all = await Post.find({})
      .populate("featuredImage")
      .populate("postedBy", "name username")
      .populate("categories", "name slug")
      .sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    console.log(err);
  }
};

export const postCount = async (req, res) => {
  try {
    const count = await Post.countDocuments({ published: true });
    res.json(count);
  } catch (err) {
    console.log(err);
  }
};

export const getPublicPosts = async (req, res) => {
  try {
    const perPage = process.env.PERPAGE;
    const page = req.query.page || 1;

    const all = await Post.find({ published: true })
      .skip((page - 1) * perPage)
      .populate("featuredImage")
      .populate("postedBy", "name username")
      .populate("categories", "name slug")
      .sort({ publishedDate: -1 })
      .limit(perPage);
    res.json(all);
  } catch (err) {
    console.log(err);
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { slug } = req.query;
    const post = await Post.findOne({ slug })
      .populate("postedBy", "name username")
      .populate("categories", "name slug")
      .populate("featuredImage", "url");

    res.json({ post });
  } catch (err) {
    console.log(err);
  }
};

export const removePost = async (req, res) => {
  try {
    const post = await Post.findById(req.query.postId);

    await cloudinary.v2.uploader.destroy(post.featuredImage.public_id);

    await post.remove();
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const editPost = async (req, res) => {
  try {
    const { postId } = req.query;
    const { title, description, featuredImage, categories } = req.body;
    // console.log(featuredImage);
    // return;

    const imageResult = await cloudinary.v2.uploader.upload(featuredImage, {
      folder: "codesmart",
    });
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

    setTimeout(async () => {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          slug: slugify(title),
          description,
          categories: ids,
          featuredImage: {
            public_id: imageResult.public_id,
            url: imageResult.url,
          },
        },
        { new: true }
      )
        .populate("postedBy", "name")
        .populate("categories", "name slug")
        .populate("featuredImage", "url");

      res.json(post);
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

export const getPostsByAuthor = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "name")
      .populate("categories", "name slug")
      .populate("featuredImage", "url")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const publishPost = catchAsync(async (req, res, next) => {
  const { postId } = req.query;
  const updated = await Post.findByIdAndUpdate(
    postId,
    { published: true, publishedDate: new Date() },
    { new: true }
  );
  res.send({ ok: true });
});

export const unpublishPost = catchAsync(async (req, res, next) => {
  const { postId } = req.query;
  const updated = await Post.findByIdAndUpdate(
    postId,
    { published: false },
    { new: true }
  );
  res.send({ ok: true });
});

export const viewPostCount = async (req, res) => {
  try {
    const post = await Post.findById(req.query.postId);

    if (!post) return res.status(404).send("Post not found");

    const updatepost = await Post.findByIdAndUpdate(
      post._id,
      { $inc: { views: 1 } },
      { new: true }
    );

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
