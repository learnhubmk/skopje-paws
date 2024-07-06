import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      {
        success: false,
        message: "Secret key not provided",
      },
      { status: 400 }
    );
  }

  try {
    const postData = await request.json();
    const gRecaptchaToken = postData.gRecaptchaToken;

    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", gRecaptchaToken);

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await res.json();

    if (data?.success && data?.score > 0.5) {
      return NextResponse.json({
        success: true,
        score: data.score,
      });
    } else {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  } catch (error) {
    console.error("Error validating reCAPTCHA", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
