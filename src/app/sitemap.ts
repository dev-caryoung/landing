import type { MetadataRoute } from "next";

// 운영 도메인 (robots / canonical / OG 와 동일하게 유지)
const baseUrl = "https://www.caryoung.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // 정적 페이지
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/company`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/partnerships`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  // 뉴스 상세 페이지 (정적 ID)
  const newsIds = ["1", "2", "3"];
  const newsRoutes: MetadataRoute.Sitemap = newsIds.map((id) => ({
    url: `${baseUrl}/news/${id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...newsRoutes];
}
