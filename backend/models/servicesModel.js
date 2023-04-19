const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    content: {},
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Services || mongoose.model('Services', servicesSchema);
