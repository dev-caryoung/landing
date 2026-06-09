import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// 운영 도메인 (robots / sitemap 과 동일하게 유지)
const siteUrl = "https://www.caryoung.co.kr";
const siteName = "카영";
const siteDescription =
  "카영은 다이렉트 자동차보험 CRM 플랫폼입니다. 에이전트 관리, 실적 추적, 자동 정산까지 한 번에 해결하세요.";

// 검색엔진 소유확인 코드 (Vercel 환경변수에 등록 후 자동 반영)
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const naverVerification = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "카영 | 다이렉트 자동차보험의 새로운 기준",
    template: "%s | 카영",
  },
  description: siteDescription,
  keywords: [
    "카영",
    "카영 보험",
    "주식회사 카영",
    "다이렉트 자동차보험",
    "보험 CRM",
    "에이전트 관리",
    "보험 정산",
  ],
  authors: [{ name: "주식회사 카영" }],
  creator: "주식회사 카영",
  publisher: "주식회사 카영",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(naverVerification
      ? { other: { "naver-site-verification": naverVerification } }
      : {}),
  },
  openGraph: {
    title: "카영 | 다이렉트 자동차보험의 새로운 기준",
    description: siteDescription,
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: "카영 | 다이렉트 자동차보험의 새로운 기준",
    description: siteDescription,
  },
};

// 구조화 데이터(JSON-LD) — 검색엔진에 회사/사이트 정보를 명시적으로 전달
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "주식회사 카영",
  alternateName: "카영",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  description: siteDescription,
  email: "info@caryoung.co.kr",
  telephone: "+82-10-2131-6204",
  founder: { "@type": "Person", name: "송용혁" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "삼성로 417, 상가동 204-11호",
    addressLocality: "강남구",
    addressRegion: "서울특별시",
    addressCountry: "KR",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  alternateName: "카영 다이렉트 자동차보험",
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SmoothScrollProvider>
          <div className="noise-overlay" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
