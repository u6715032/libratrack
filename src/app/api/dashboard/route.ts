import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Book from "../../../models/Book";
import Member from "../../../models/Member";
import BorrowRecord from "../../../models/BorrowRecord";

export async function GET() {
  await dbConnect();

  const totalBooks = await Book.countDocuments();
  const availableBooks = await Book.countDocuments({ status: "available" });
  const borrowedBooks = await Book.countDocuments({ status: "borrowed" });

  const totalMembers = await Member.countDocuments();

  const activeBorrows = await BorrowRecord.countDocuments({ status: "borrowed" });
  const totalRecords = await BorrowRecord.countDocuments();

  return NextResponse.json({
    totalBooks,
    availableBooks,
    borrowedBooks,
    totalMembers,
    activeBorrows,
    totalRecords,
  });
}
