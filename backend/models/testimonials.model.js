const mongoose = require("mongoose");
const { Schema } = mongoose;

const testimonialsSchema = new Schema(
  {
    name: {
      trim: true,
      type: String,
    },
    message: {},
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Testimonials", testimonialsSchema);
