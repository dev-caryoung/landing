"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface InsuranceCompanyRef {
  id: string;
  code: string;
  name: string;
  short_name: string | null;
  logo_url: string | null;
}

export interface TmInfo {
  id: string;
  offline_partner_name: string | null;
  direct_partner_name: string | null;
  tm_number: string;
  applied_date: string | null;
  memo: string | null;
  insuranceCompany: InsuranceCompanyRef;
}

export interface CmInfo {
  id: string;
  partner_name: string | null;
  category: string;
  platform: string;
  url: string;
  applied_date: string | null;
  memo: string | null;
  insuranceCompany: InsuranceCompanyRef;
}

export interface PartnershipData {
  notices: { id: string; content: string }[];
  tms: TmInfo[];
  cms: CmInfo[];
}

export interface CompanyGroup {
  name: string;
  logoUrl: string | null;
  tms: TmInfo[];
  cms: CmInfo[];
}

// 카드 배경 (admin 로그인 페이지와 동일 팔레트)
export const CARD_BG = [
  "bg-[#eef4ff]",
  "bg-[#fef3f0]",
  "bg-[#f0faf4]",
  "bg-[#fef9ee]",
  "bg-[#f3f0fe]",
  "bg-[#eefbfb]",
  "bg-[#fff5ee]",
  "bg-[#f0f0fe]",
  "bg-[#f0faf7]",
];

export function groupByCompany(data: PartnershipData): CompanyGroup[] {
  const map: Record<string, CompanyGroup> = {};
  data.tms.forEach((tm) => {
    const k = tm.insuranceCompany.id;
    if (!map[k])
      map[k] = {
        name: tm.insuranceCompany.name,
        logoUrl: tm.insuranceCompany.logo_url,
        tms: [],
        cms: [],
      };
    map[k].tms.push(tm);
  });
  data.cms.forEach((cm) => {
    const k = cm.insuranceCompany.id;
    if (!map[k])
      map[k] = {
        name: cm.insuranceCompany.name,
        logoUrl: cm.insuranceCompany.logo_url,
        tms: [],
        cms: [],
      };
    map[k].cms.push(cm);
  });
  return Object.values(map);
}

interface CompanyCardProps {
  company: CompanyGroup;
  index: number;
  animate?: boolean;
  className?: string;
}

export function CompanyCard({ company, index, animate = true, className = "" }: CompanyCardProps) {
  const cardClass = `group relative rounded-2xl ${CARD_BG[index % CARD_BG.length]} p-5 hover:shadow-xl hover:shadow-gray-200/60 transition-shadow duration-300 overflow-hidden h-full flex flex-col ${className}`;

  const inner = (
    <>
      {company.logoUrl && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <Image
            src={company.logoUrl}
            alt=""
            fill
            className="object-contain opacity-[0.05] scale-110 translate-x-1/4 translate-y-1/6"
            unoptimized
          />
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[20px] font-extrabold text-gray-900 tracking-tight">{company.name}</span>
          {company.tms[0]?.applied_date && (
            <span className="text-[9px] text-gray-400 shrink-0">
              {new Date(company.tms[0].applied_date).toLocaleDateString("ko-KR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              기준
            </span>
          )}
        </div>

        {company.tms.map((tm, tmIdx) => (
          <div key={tm.id} className={tmIdx > 0 ? "mt-2.5 pt-2.5 border-t border-black/[0.06]" : ""}>
            {(tm.offline_partner_name || tm.direct_partner_name) && (
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[9px] font-semibold text-gray-400 tracking-wide uppercase">TM</span>
                <span className="text-[14px] font-extrabold text-gray-600">
                  {[tm.offline_partner_name, tm.direct_partner_name].filter(Boolean).join(" / ")}
                </span>
              </div>
            )}
            <a
              href={`tel:${tm.tm_number}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[22px] font-black text-gray-900 tracking-tight hover:text-[#2563eb] transition-colors leading-none block"
            >
              {tm.tm_number}
            </a>
          </div>
        ))}

        {company.cms.length > 0 && (
          <div className={company.tms.length > 0 ? "mt-3 pt-3 border-t border-black/[0.06]" : ""}>
            {company.cms[0]?.partner_name && (
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[9px] font-semibold text-gray-400 tracking-wide uppercase">CM</span>
                <span className="text-[14px] font-extrabold text-gray-600">{company.cms[0].partner_name}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5">
              {company.cms.map((cm) => (
                <a
                  key={cm.id}
                  href={cm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold text-gray-700 bg-white/80 shadow-sm border border-gray-200/60 hover:bg-white hover:shadow-md hover:border-gray-300 transition-all duration-200"
                >
                  {cm.category}
                  <span
                    className={`text-[9px] font-medium ${
                      cm.platform === "PC" ? "text-[#2563eb]" : "text-violet-500"
                    }`}
                  >
                    {cm.platform}
                  </span>
                  <ArrowUpRight className="h-2.5 w-2.5 text-gray-400" />
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );

  if (!animate) {
    return <div className={cardClass}>{inner}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className={cardClass}
    >
      {inner}
    </motion.div>
  );
}
