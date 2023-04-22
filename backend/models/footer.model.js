const mongoose = require("mongoose");
const { Schema } = mongoose;

const footerSchema = new Schema(
  {
    address: {
      trim: true,
      type: String,
    },

    email: {
      trim: true,
      type: String,
    },

    contact_number: {
      trim: true,
      type: String,
    },

    facebook_link: {
      trim: true,
      type: String,
    },

    footer: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Footer", footerSchema);
