import mongoose from "mongoose";
const { Schema } = mongoose;

const heroSchema = new Schema(
  {
    hero: {
      type: String,
      unique: true,
      lowercase: true,
    },
    title: {
      type: String,
    },
    slogan: {
      type: String,
    },
    email: {
      type: String,
    },
    content: {},
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

export default mongoose.models && mongoose.models.Hero
  ? mongoose.models.Hero
  : mongoose.model("Hero", heroSchema);
