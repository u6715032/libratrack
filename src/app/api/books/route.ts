import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Book from "../../../models/Book";



export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const book = await Book.create(body);
  return NextResponse.json(book, { status: 201 });
}

export async function GET() {
  await dbConnect();
  const books = await Book.find().sort({ createdAt: -1 });
  return NextResponse.json(books);
}
