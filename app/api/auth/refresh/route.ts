import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string; // optional separate secret for refresh tokens

export async function POST(request: any) {
  try {
    // Get refresh token from cookie
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as any;

    const accessToken = jwt.sign(
      { email: decoded.email },
      JWT_SECRET,
      { expiresIn: "1d" }, // short-lived token
    );

    // Optionally create new refresh token
    const newRefreshToken = jwt.sign(
      { email: (decoded as any).email },
      REFRESH_SECRET,
      { expiresIn: "7d" }, // long-lived refresh token
    );

    // Set cookies
    const response = NextResponse.json({ token: accessToken });

    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });

    response.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 },
    );
  }
}
