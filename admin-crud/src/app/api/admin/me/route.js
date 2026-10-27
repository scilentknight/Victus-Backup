import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  let displayName = "Admin";

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
      const payloadBase64 = token.split('.')[1];
      if (payloadBase64) {
        const decoded = JSON.parse(atob(payloadBase64));
        displayName = decoded.username || decoded.name || decoded.email?.split('@')[0] || "Admin";
      }
    }
  } catch (err) {
    console.error("Failed to parse token payload in /api/admin/me:", err);
  }

  return NextResponse.json({ displayName });
}
