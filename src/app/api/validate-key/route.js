import { NextResponse } from "next/server";
import { validateApiKey } from "../../../lib/validate-api-key.js";

export async function POST(request) {
  try {
    const body = await request.json();
    const apiKey = body?.apiKey;

    const result = await validateApiKey(apiKey);

    if (!result.valid) {
      const status =
        result.error === "Missing apiKey." ? 400
        : result.error?.includes("not configured") ? 503
        : 500;
      return NextResponse.json(
        { valid: false, error: result.error ?? "API key is invalid.", message: result.message },
        { status }
      );
    }

    return NextResponse.json({ valid: true, message: result.message });
  } catch (e) {
    return NextResponse.json(
      { valid: false, error: "Invalid request body.", message: "API key is invalid." },
      { status: 400 }
    );
  }
}
