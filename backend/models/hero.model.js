const mongoose = require("mongoose");
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
    jobscompleted_title: {
      type: String,
    },
    jobscompleted_number: {
      type: Number,
    },
    happyclients_title: {
      type: String,
    },
    happyclients_number: {
      type: Number,
    },
    logo: {
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

module.exports = mongoose.model("Hero", heroSchema);
