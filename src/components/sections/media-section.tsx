"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const columns = [
  {
    title: "현장 영업을 위한 설계",
    description:
      "에이전트가 현장에서 바로 계약을 등록하고, 실적을 확인할 수 있도록 모바일 최적화된 인터페이스를 제공합니다.",
  },
  {
    title: "GA와 에이전트 모두를 위한",
    description:
      "GA는 소속 에이전트의 전체 실적을 한눈에, 에이전트는 본인의 계약과 수수료를 실시간으로 확인합니다.",
  },
];

interface Partner {
  name: string;
  shortName: string;
  products: string[];
}

// API 실패 시 폴백 데이터
const fallbackPartners: Partner[] = [
  { name: "현대해상", shortName: "현대해상", products: ["자동차"] },
  { name: "한화손해보험", shortName: "한화손해보험", products: ["자동차"] },
  { name: "하나손해보험", shortName: "하나손해보험", products: ["자동차"] },
  { name: "삼성화재", shortName: "삼성화재", products: ["자동차"] },
  { name: "DB손해보험", shortName: "DB손해보험", products: ["자동차"] },
  { name: "KB손해보험", shortName: "KB손해보험", products: ["자동차"] },
  { name: "흥국화재", shortName: "흥국화재", products: ["자동차"] },
  { name: "AXA손해보험", shortName: "AXA손해보험", products: ["자동차"] },
  { name: "메리츠화재", shortName: "메리츠화재", products: ["자동차"] },
];

export function MediaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [partners, setPartners] = useState<Partner[]>(fallbackPartners);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 관리자 API에서 보험사 목록 조회
  useEffect(() => {
    fetch("/api/partners")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPartners(json.data);
        }
      })
      .catch(() => {
        // 폴백 데이터 유지
      });
  }, []);

  // 섹션 pin + 스크롤 기반 카드 전환
  useEffect(() => {
    if (!pinRef.current || partners.length === 0) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: `+=${partners.length * 150}%`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          const newIndex = Math.min(
            Math.floor(progress * partners.length),
            partners.length - 1
          );
          setActiveIndex(newIndex);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [partners]);

  return (
    <section ref={sectionRef}>
      <div ref={pinRef} className="min-h-screen flex items-center bg-secondary/30">
        <div className="container-main w-full">
          {/* Label */}
          <div className="mb-12">
            <span className="text-small text-muted-foreground">Our Platform</span>
          </div>

          <div className="flex gap-8 md:gap-16">
            {/* Progress indicator */}
            <aside className="hidden md:flex flex-col items-center gap-3 pt-2">
              <span className="text-sm font-medium tabular-nums text-foreground">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div className="relative w-px h-32 bg-border overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full bg-foreground origin-top"
                  style={{
                    height: "100%",
                    transform: `scaleY(${scrollProgress})`,
                    transition: "transform 0.1s",
                  }}
                />
              </div>
              <span className="text-sm text-muted-foreground tabular-nums">
                {String(partners.length).padStart(2, "0")}
              </span>
            </aside>

            {/* Content area */}
            <div className="flex-1">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Partner card */}
                <div className="relative h-[240px] md:h-[280px]">
                  {partners.map((partner, i) => (
                    <div
                      key={partner.name}
                      className="absolute inset-0 rounded-2xl border border-border/60 bg-card p-8 flex flex-col justify-between shadow-[0_4px_40px_-12px_rgba(0,0,0,0.1)]"
                      style={{
                        opacity: i === activeIndex ? 1 : 0,
                        transform: `translateY(${i === activeIndex ? 0 : i > activeIndex ? 20 : -20}px)`,
                        transition: "opacity 0.4s ease, transform 0.4s ease",
                        pointerEvents: i === activeIndex ? "auto" : "none",
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-[11px] text-muted-foreground bg-secondary/80 px-2.5 py-1 rounded-full">
                            {String(i + 1).padStart(2, "0")} / {String(partners.length).padStart(2, "0")}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="inline-block text-[10px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                              다이렉트
                            </span>
                            <span className="inline-block text-[10px] font-medium text-accent/60 bg-accent/5 px-2 py-0.5 rounded-full">
                              자동차보험
                            </span>
                          </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-medium text-foreground">
                          {partner.name}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">제휴 파트너</span>
                        <div className="flex gap-1">
                          {partners.map((_, dotIdx) => (
                            <div
                              key={dotIdx}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor: dotIdx === i ? "var(--accent)" : "var(--border)",
                                transition: "background-color 0.3s",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Text content */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-8">
                    다이렉트 자동차보험 영업의 새로운 기준
                  </h2>
                  <div className="space-y-8">
                    {columns.map((column, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-medium text-foreground mb-2">{column.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{column.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile progress */}
          <div className="md:hidden mt-10 flex items-center gap-2">
            {partners.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  index <= activeIndex ? "bg-foreground" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
