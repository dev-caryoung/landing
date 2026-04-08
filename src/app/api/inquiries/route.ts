import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_ADMIN_URL = "https://admin-psi-amber-83.vercel.app";

/**
 * 어드민 /api/inquiries/public 으로 프록시 (문의 접수)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body ?? {};

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      typeof message !== "string" || !message.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "이름, 이메일, 문의 내용은 필수입니다." },
        { status: 400 }
      );
    }

    const adminUrl = process.env.ADMIN_API_URL || DEFAULT_ADMIN_URL;

    const res = await fetch(`${adminUrl}/api/inquiries/public`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: typeof phone === "string" && phone.trim() ? phone.trim() : undefined,
        message: message.trim(),
      }),
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
      throw new Error(json?.error || `Admin API error: ${res.status}`);
    }

    return NextResponse.json({ success: true, data: json.data });
  } catch (error) {
    console.error("Inquiries API error:", error);
    return NextResponse.json(
      { success: false, error: "문의 접수 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
