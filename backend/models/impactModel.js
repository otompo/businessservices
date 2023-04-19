import mongoose from "mongoose";

const impactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    totalNum: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Impact || mongoose.model("Impact", impactSchema);
