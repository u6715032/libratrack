import mongoose, { Schema, models, model } from "mongoose";

export type BookStatus = "available" | "borrowed";

const BookSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    publishedYear: { type: Number, required: true },
    status: { type: String, enum: ["available", "borrowed"], default: "available" },
  },
  { timestamps: true }
);

export default models.Book || model("Book", BookSchema);
