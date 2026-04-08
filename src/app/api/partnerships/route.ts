import { NextResponse } from "next/server";

export const revalidate = 1800; // 30분 캐시

/**
 * 어드민 /api/partnerships/public 을 프록시
 */
export async function GET() {
  try {
    const adminUrl = process.env.ADMIN_API_URL;
    if (!adminUrl) {
      return NextResponse.json(
        { success: false, error: "ADMIN_API_URL not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(`${adminUrl}/api/partnerships/public`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      throw new Error(`Admin API error: ${res.status}`);
    }

    const json = await res.json();
    if (!json.success) {
      throw new Error("Invalid response from admin API");
    }

    return NextResponse.json({ success: true, data: json.data });
  } catch (error) {
    console.error("Partnerships API error:", error);
    return NextResponse.json(
      { success: false, error: "제휴 정보 조회 실패" },
      { status: 500 }
    );
  }
}
