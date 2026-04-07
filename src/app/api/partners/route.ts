import { NextResponse } from "next/server";

export const revalidate = 3600; // 1시간 캐시

export async function GET() {
  try {
    const adminUrl = process.env.ADMIN_API_URL;
    if (!adminUrl) {
      return NextResponse.json({ success: false, error: "ADMIN_API_URL not configured" }, { status: 500 });
    }

    const res = await fetch(
      `${adminUrl}/api/insurance-companies?isActive=true&includeRelations=true`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Admin API error: ${res.status}`);
    }

    const json = await res.json();

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error("Invalid response from admin API");
    }

    // 랜딩에 필요한 최소 정보만 반환 (민감 정보 제외)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const partners = json.data.map((company: any) => {
      // 직접 관계 보험종류
      const directTypes = Array.isArray(company.insuranceTypes)
        ? company.insuranceTypes.map((t: any) => t.name as string)
        : [];
      // 다대다 관계 보험종류
      const m2mTypes = Array.isArray(company.insuranceCompanyInsuranceTypes)
        ? company.insuranceCompanyInsuranceTypes.map((rel: any) => rel.insuranceType?.name as string).filter(Boolean)
        : [];
      const products = [...new Set([...directTypes, ...m2mTypes])];

      return {
        name: company.name,
        shortName: company.short_name || company.name,
        products,
      };
    });

    return NextResponse.json({ success: true, data: partners });
  } catch (error) {
    console.error("Partners API error:", error);
    return NextResponse.json({ success: false, error: "보험사 목록 조회 실패" }, { status: 500 });
  }
}
