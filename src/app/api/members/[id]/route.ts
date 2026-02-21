import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Member from "../../../../models/Member";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  await dbConnect();

  const member = await Member.findById(id);
  if (!member) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(member);
}

export async function PUT(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  await dbConnect();

  const body = await req.json();
  const updated = await Member.findByIdAndUpdate(id, body, { new: true });
  if (!updated) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  await dbConnect();

  const deleted = await Member.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
