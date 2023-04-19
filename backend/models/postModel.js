import mongoose from 'mongoose';
import Category from './categoryModel';
import User from './userModel';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
      index: true,
      lowercase: true,
    },

    description: {
      type: {},
      trim: true,
      required: true,
      min: 200,
      max: 2000000,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: Date,
    },
    featuredImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    categories: [{ type: ObjectId, ref: Category, required: true }],
    views: { type: Number, default: 0 },
    postedBy: {
      type: ObjectId,
      ref: User,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
