import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: ["John", "Jane"],
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    data: body,
  });
}
