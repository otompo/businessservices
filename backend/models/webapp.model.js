import mongoose from "mongoose";
const { Schema } = mongoose;

const webAppSchema = new Schema(
  {
    webapp: {
      type: String,
      unique: true,
      lowercase: true,
    },
    title: {
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

export default mongoose.models && mongoose.models.WebApp
  ? mongoose.models.WebApp
  : mongoose.model("WebApp", webAppSchema);
