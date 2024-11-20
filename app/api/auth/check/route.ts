import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), {
      algorithms: ["HS256"],
    });
    return NextResponse.json({ isLoggedIn: true });
  } catch {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }
}
