import mongoose, { Schema, models, model } from "mongoose";

export type BorrowStatus = "borrowed" | "returned";

const BorrowRecordSchema = new Schema(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date, default: null },
    status: { type: String, enum: ["borrowed", "returned"], default: "borrowed" },
  },
  { timestamps: true }
);

export default models.BorrowRecord || model("BorrowRecord", BorrowRecordSchema);
