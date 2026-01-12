import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "카영 | 다이렉트 자동차보험의 새로운 기준",
  description:
    "카영은 다이렉트 자동차보험 CRM 플랫폼입니다. 에이전트 관리, 실적 추적, 자동 정산까지 한 번에 해결하세요.",
  keywords: [
    "다이렉트 자동차보험",
    "보험 CRM",
    "에이전트 관리",
    "보험 정산",
    "카영",
  ],
  authors: [{ name: "카영" }],
  openGraph: {
    title: "카영 | 다이렉트 자동차보험의 새로운 기준",
    description:
      "카영은 다이렉트 자동차보험 CRM 플랫폼입니다. 에이전트 관리, 실적 추적, 자동 정산까지 한 번에 해결하세요.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          <div className="noise-overlay" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
