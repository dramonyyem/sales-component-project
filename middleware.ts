import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  //   if (!token) {
  //     return new NextResponse(null, { status: 404 });
  //   }

  //   try {
  //     jwt.verify(token, JWT_SECRET);
  //     return NextResponse.next();
  //   } catch (error) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  return NextResponse.next();
}

// 

