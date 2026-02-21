import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import BorrowRecord from "../../../models/BorrowRecord";
import Book from "../../../models/Book";

export async function GET() {
  await dbConnect();
  const records = await BorrowRecord.find()
    .sort({ createdAt: -1 })
    .populate("bookId")
    .populate("memberId");

  return NextResponse.json(records);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const { memberId, bookId, dueDate } = body;

  // 1) Check book exists & available
  const book = await Book.findById(bookId);
  if (!book) return NextResponse.json({ message: "Book not found" }, { status: 404 });
  if (book.status === "borrowed") {
    return NextResponse.json({ message: "Book is already borrowed" }, { status: 400 });
  }

  // 2) Create record
  const record = await BorrowRecord.create({
    memberId,
    bookId,
    dueDate,
    status: "borrowed",
    returnDate: null,
  });

  // 3) Update book status
  book.status = "borrowed";
  await book.save();

  return NextResponse.json(record, { status: 201 });
}
