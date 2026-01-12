"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
        <path d="M24 14v10l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "실시간 데이터",
    description: "모든 계약과 정산 데이터를 실시간으로 추적하고 분석합니다.",
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "자동화 시스템",
    description: "수수료 계산부터 정산까지 모든 프로세스를 자동화합니다.",
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2 6-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "AI 인사이트",
    description: "데이터 기반 예측과 분석으로 영업 전략을 최적화합니다.",
  },
];

export function UspCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cardElements = cardsRef.current?.querySelectorAll(".usp-card");
      if (cardElements) {
        gsap.fromTo(
          cardElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background border-t border-border">
      <div className="container-main">
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <div key={index} className="usp-card group">
              <div className="text-foreground mb-6 group-hover:text-accent transition-colors duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
