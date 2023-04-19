import mongoose from 'mongoose';
const { Schema } = mongoose;

const aboutSchema = new Schema(
  {
    about: {
      type: String,
      unique: true,
      lowercase: true,
    },
    titleOne: {
      type: String,
    },
    titleTwo: {
      type: String,
    },
    contentOne: {},
    contentTwo: {},
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

export default mongoose.models && mongoose.models.About
  ? mongoose.models.About
  : mongoose.model('About', aboutSchema);
