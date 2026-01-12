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
        <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "에이전트 관리",
    description: "3,000명 이상의 에이전트 정보를 한 곳에서 관리하고, 실적과 수수료를 실시간으로 추적합니다.",
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M16 28l6-8 6 5 6-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "자동 정산",
    description: "복잡한 수수료 계산을 자동화하고, 매월 정확한 정산 내역을 에이전트에게 제공합니다.",
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
        <path d="M24 14v10l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "갱신 알림",
    description: "만기 도래 고객을 자동으로 추적하고, 적시에 갱신 안내를 발송하여 재계약률을 높입니다.",
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
