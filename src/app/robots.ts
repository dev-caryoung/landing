import type { MetadataRoute } from "next";

// 운영 도메인 (sitemap / canonical / OG 와 동일하게 유지)
const baseUrl = "https://www.caryoung.co.kr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // API 라우트는 검색 색인에서 제외
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
