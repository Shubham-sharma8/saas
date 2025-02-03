"use server";

import { OCRResult } from "@/types/mathpix";

// Add input validation
function isValidImageUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function processImage(imageUrl: string): Promise<OCRResult> {
  // Validate environment variables at runtime
  if (!process.env.MATHPIX_APP_ID || !process.env.MATHPIX_APP_KEY) {
    return {
      success: false,
      error: "Missing Mathpix credentials",
    };
  }

  // Validate input
  if (!imageUrl || !isValidImageUrl(imageUrl)) {
    return {
      success: false,
      error: "Invalid image URL provided",
    };
  }

  try {
    const response = await fetch("https://api.mathpix.com/v3/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        app_id: process.env.MATHPIX_APP_ID,
        app_key: process.env.MATHPIX_APP_KEY,
      },
      body: JSON.stringify({
        src: imageUrl,
        formats: ["text", "data", "html", "latex_styled", "mathml"],
        data_options: {
          include_asciimath: true,
          include_latex: true,
          include_mathml: true,
          include_svg: true,
          include_table_html: true,
          include_tsv: true,
        },
        formats_options: {
          html: {
            include_table_html: true,
          },
          latex_styled: { transforms: ["rm_spaces"] },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error processing image:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
