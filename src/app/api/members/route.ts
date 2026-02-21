import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Member from "../../../models/Member";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const member = await Member.create(body);
  return NextResponse.json(member, { status: 201 });
}

export async function GET() {
  await dbConnect();
  const members = await Member.find().sort({ createdAt: -1 });
  return NextResponse.json(members);
}
