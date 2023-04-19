import mongoose from 'mongoose';
const { Schema } = mongoose;

const footerSchema = new Schema(
  {
    addressTitle: {
      trim: true,
      type: String,
    },

    location: {
      trim: true,
      type: String,
    },

    email: {
      trim: true,
      type: String,
    },
    contactNum: {
      trim: true,
      type: String,
    },

    socialTitle: {
      trim: true,
      type: String,
    },

    facebookIcon: {
      trim: true,
      type: String,
    },

    facebookLink: {
      trim: true,
      type: String,
    },

    twitterIcon: {
      trim: true,
      type: String,
    },

    twitterLink: {
      trim: true,
      type: String,
    },

    instagramIcon: {
      trim: true,
      type: String,
    },

    instagramLink: {
      trim: true,
      type: String,
    },
    linkedinIcon: {
      trim: true,
      type: String,
    },
    linkedinLink: {
      trim: true,
      type: String,
    },

    footer: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },

  { timestamps: true },
);

export default mongoose.models && mongoose.models.Footer
  ? mongoose.models.Footer
  : mongoose.model('Footer', footerSchema);
