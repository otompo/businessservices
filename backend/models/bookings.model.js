const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    fullName: {
      trim: true,
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email number"],
    },

    contactNum: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    selectedOption: {
      type: String,
      enum: ["Cleaning", "Health"],
    },

    address: {
      trim: true,
      type: String,
    },
    message: {
      trim: true,
      type: String,
    },

    bookingDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
