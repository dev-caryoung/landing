"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header, Footer } from "@/components/sections";
import {
  CompanyCard,
  CompanyGroup,
  PartnershipData,
  groupByCompany,
} from "@/components/partnership-card";

/**
 * 제휴 보험사 전체 목록 페이지 (admin 로그인 페이지와 동일 그리드 레이아웃)
 */
export default function PartnershipsPage() {
  const [data, setData] = useState<PartnershipData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partnerships")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const companies: CompanyGroup[] = data ? groupByCompany(data) : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8F9FB] via-white to-[#EEF2FF] flex flex-col">
      <Header />

      <div className="flex-1 container-main mt-44 mb-44">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mt-32 mb-12"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#2563eb] font-bold">Insurance Partners</p>
          <h1 className="text-[36px] lg:text-[52px] font-bold tracking-tight leading-[1.05] mt-4 text-foreground">
            제휴 보험사
            <br />
            <span className="text-[#2563eb]">전체 목록</span>
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground mt-5 leading-relaxed">
            카영 딜러가 직접 연결된 보험사 TM·CM 정보를 한눈에 확인하세요.
          </p>
        </motion.div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : companies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr mb-32">
            {companies.map((company, i) => (
              <CompanyCard key={company.name} company={company} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground text-sm">
            제휴 정보를 불러올 수 없습니다.
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
