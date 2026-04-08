"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  CompanyCard,
  CompanyGroup,
  PartnershipData,
  groupByCompany,
} from "@/components/partnership-card";

const CARD_WIDTH = 340;
const CARD_GAP = 12;

/**
 * Our Platform — 제휴사 카드 sticky 가로 스크롤
 * 페이지 스크롤하는 동안 카드 row가 가로로 이동, 첫 카드부터 마지막 카드까지 보여진 후 다음 섹션으로
 */
export function MediaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [companies, setCompanies] = useState<CompanyGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partnerships")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setCompanies(groupByCompany(json.data as PartnershipData));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // sticky 영역 안에서 0 → 1 으로 진행하는 가로 스크롤
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 카드 전체 너비 - 화면 너비 만큼 좌측으로 이동
  // 화면 너비 가정: 1280px (max-w container), 좌우 32px padding
  const totalCardsWidth = companies.length * (CARD_WIDTH + CARD_GAP);
  const x = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    [0, -(totalCardsWidth - 1100)]
  );

  // sticky 영역 높이: 카드 수에 비례 (카드 1개당 ~80vh 이동)
  const sectionHeight = `${Math.max(150, companies.length * 70)}vh`;

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-[#FAFBFC] to-white"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center gap-16 overflow-hidden">
        {/* Header */}
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#2563eb] font-bold">
              Our Platform
            </p>
            <h2 className="text-[28px] lg:text-[44px] font-bold tracking-tight leading-[1.05] mt-3 text-foreground">
              다이렉트 자동차보험 <span className="text-[#2563eb]">9개 보험사</span>와 함께합니다
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground mt-3 leading-relaxed max-w-2xl">
              현장에서 바로 사용 가능한 TM 콜백, CM 다이렉트 가입까지. 카영 딜러는 9개 주요 보험사와 직접 연결되어 있습니다.
            </p>
          </motion.div>
        </div>

        {/* Horizontal scrolling cards */}
        <div className="relative">
          {loading ? (
            <div className="container-main flex gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[220px] w-[340px] shrink-0 rounded-2xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : companies.length > 0 ? (
            <motion.div
              style={{ x }}
              className="flex gap-3 items-stretch pl-[max(2rem,calc((100vw-1400px)/2+2rem))] pr-8"
            >
              {companies.map((company, i) => (
                <Link
                  key={company.name}
                  href="/partnerships"
                  className="block w-[340px] shrink-0"
                >
                  <CompanyCard company={company} index={i} animate={false} className="cursor-pointer" />
                </Link>
              ))}
            </motion.div>
          ) : null}
        </div>

        {/* CTA */}
        <div className="container-main flex justify-center">
          <Link
            href="/partnerships"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold hover:scale-[1.02] transition-transform"
          >
            제휴 보험사 전체보기
            <span className="flex items-center justify-center w-7 h-7 bg-background/15 rounded-full group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
