const mongoose = require('mongoose');

const impactTopWidgetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {},
    impacttopwidget: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.ImpactTopWidget ||
  mongoose.model('ImpactTopWidget', impactTopWidgetSchema);
