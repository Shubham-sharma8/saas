import 'server-only'
export const dynamic = 'force-dynamic'; // Prevents static optimization

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const secretKey = process.env.CAPTCHA_SECRET_KEY;
  const postData = await request.json();
  const { gRecaptchaToken } = postData;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not set");
    return NextResponse.json({ success: false, error: "reCAPTCHA secret key is missing" }, { status: 500 });
  }

  try {
    const res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: secretKey,
          response: gRecaptchaToken,
        },
      }
    );

    if (res.data.success && res.data.score > 0.5) {
      console.log("reCAPTCHA score:", res.data.score);
      return NextResponse.json({
        success: true,
        score: res.data.score,
      });
    } else {
      console.log("reCAPTCHA verification failed:", res.data);
      return NextResponse.json({ success: false, error: "reCAPTCHA verification failed" });
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return NextResponse.json({ success: false, error: "Error verifying reCAPTCHA" }, { status: 500 });
  }
}
