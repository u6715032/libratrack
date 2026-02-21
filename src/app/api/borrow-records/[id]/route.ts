import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import BorrowRecord from "../../../../models/BorrowRecord";
import Book from "../../../../models/Book";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  await dbConnect();

  const record = await BorrowRecord.findById(id).populate("bookId").populate("memberId");
  if (!record) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(record);
}

// "Return" action = update record to returned + free the book
export async function PUT(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  await dbConnect();

  const record = await BorrowRecord.findById(id);
  if (!record) return NextResponse.json({ message: "Not found" }, { status: 404 });

  if (record.status === "returned") {
    return NextResponse.json({ message: "Already returned" }, { status: 400 });
  }

  record.status = "returned";
  record.returnDate = new Date();
  await record.save();

  // update book status back to available
  await Book.findByIdAndUpdate(record.bookId, { status: "available" });

  return NextResponse.json(record);
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  await dbConnect();

  const deleted = await BorrowRecord.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
