const mongoose = require("mongoose");
const { Schema } = mongoose;

const ourservicesSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {},
  },

  { timestamps: true }
);

module.exports = mongoose.model("Ourservices", ourservicesSchema);
