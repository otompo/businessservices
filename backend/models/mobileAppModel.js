import mongoose from 'mongoose';
const { Schema } = mongoose;

const mobileAppSchema = new Schema(
  {
    mobileapp: {
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

  { timestamps: true },
);

export default mongoose.models && mongoose.models.MobileApp
  ? mongoose.models.MobileApp
  : mongoose.model('MobileApp', mobileAppSchema);
