import mongoose, { Schema, models, model } from "mongoose";

const MemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    membershipDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Member || model("Member", MemberSchema);
