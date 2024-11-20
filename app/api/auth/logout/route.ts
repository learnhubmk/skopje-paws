import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Signed out successfully" },
    {
      headers: {
        "Set-Cookie": "token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax;",
      },
    }
  );
}
