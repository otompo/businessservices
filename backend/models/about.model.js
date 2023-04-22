const mongoose = require("mongoose");
const { Schema } = mongoose;

const aboutSchema = new Schema(
  {
    about: {
      type: String,
      unique: true,
      lowercase: true,
    },
    about_title: {
      type: String,
    },
    about_content: {},
    mission_title: {
      type: String,
    },
    mission_content: {},
    vision_title: {
      type: String,
    },
    vision_content: {},
  },

  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
