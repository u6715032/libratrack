import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Book from "../../../../models/Book";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;

  await dbConnect();
  const book = await Book.findById(id);

  if (!book) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(book);
}

export async function PUT(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;

  await dbConnect();
  const body = await req.json();

  const updated = await Book.findByIdAndUpdate(id, body, { new: true });
  if (!updated) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;

  await dbConnect();
  const deleted = await Book.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
