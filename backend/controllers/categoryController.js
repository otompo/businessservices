import Category from '../models/categoryModel';
import Post from '../models/postModel';
import slugify from 'slugify';
import catchAsync from '../utils/catchAsync';
import User from '../models/userModel';

export const createCategory = catchAsync(async (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();
  const alreadyExist = await Category.findOne({ slug });
  if (alreadyExist) {
    return res.status(400).send({ message: 'Category name already exist' });
  }
  const categoryCategory = await new Category({
    name,
    slug: slugify(name),
  }).save();
  // console.log("saved category", category);
  return res.status(200).send(categoryCategory);
});

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    console.log(err);
  }
};

export const removeCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.query.id);

    if (!category) {
      return next(new AppError('Category not found', 401));
    }
    await category.remove();
  } catch (err) {
    console.log(err);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const found = await Category.findById(req.query.id);
    if (!found) {
      return res.status(404).send({ message: 'Category does not exist' });
    }
    const data = await Category.findByIdAndUpdate(
      { _id: found._id },
      { name: req.body.name, slug: slugify(req.body.name) },
      { new: true },
    );
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const getPostsByCategory = async (req, res) => {
  try {
    const { slug } = req.query;

    const category = await Category.findOne({ slug });

    const posts = await Post.find({ categories: category._id })
      .populate('featuredImage postedBy')
      .limit(20);

    res.json({ posts, category });
  } catch (err) {
    console.log(err);
  }
};

export const getPostsByAuthor = async (req, res) => {
  try {
    const { username } = req.query;

    const user = await User.findOne({ username });

    const posts = await Post.find({ postedBy: user._id })
      .populate('featuredImage postedBy')
      .limit(20);

    res.json({ posts, user });
  } catch (err) {
    console.log(err);
  }
};
