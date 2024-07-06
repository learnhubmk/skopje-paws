import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return response.status(400).json({
      success: false,
      message: "Secret key not provided",
    });
  }

  try {
    const postData = request.body;
    const gRecaptchaToken = postData.gRecaptchaToken;

    console.log("Received reCAPTCHA token:", gRecaptchaToken);

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

    console.log("reCAPTCHA verification response status:", res.status);

    const data = await res.json();

    console.log("reCAPTCHA verification data:", data);

    if (data?.success && data?.score > 0.5) {
      console.log("Success with score:", data.score);
      return response.status(200).json({
        success: true,
        score: data.score,
      });
    } else {
      return response.status(400).json({ success: false });
    }
  } catch (error) {
    console.error("Error validating reCAPTCHA", error);
    return response
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
