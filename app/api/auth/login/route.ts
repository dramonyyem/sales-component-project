import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
  const body = await request.json();

  // Example validation (replace with DB check)
  if (body.email !== "admin@test.com" || body.password !== "123456") {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const token = jwt.sign({ email: body.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({ success: true });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
