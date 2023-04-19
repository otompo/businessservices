import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },

    name: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
    },

    password: {
      type: String,
      trim: true,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be longer than 6 characters"],
      select: false,
    },

    role: {
      type: String,
      default: "author",
    },

    facebook: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
      unique: true,
    },
    linkedIn: {
      type: String,
      trim: true,
      unique: true,
    },
    posts: [{ type: ObjectId, ref: "Post" }],
    passwordResetCode: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
