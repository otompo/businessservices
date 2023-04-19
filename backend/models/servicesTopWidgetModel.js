const mongoose = require('mongoose');

const servicesTopWidgetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {},
    servicestopwidget: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.ServicesTopWidget ||
  mongoose.model('ServicesTopWidget', servicesTopWidgetSchema);
