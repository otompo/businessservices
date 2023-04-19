const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
import Category from "./categoryModel";
const ourworksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      index: true,
      lowercase: true,
    },
    categories: [{ type: ObjectId, ref: Category, required: true }],
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Ourworks || mongoose.model("Ourworks", ourworksSchema);
