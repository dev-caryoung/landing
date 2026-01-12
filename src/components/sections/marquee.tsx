"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const marqueeText = "에이전트 관리  •  계약 관리  •  자동 정산  •  데이터 분석  •  갱신 관리  •  실시간 대시보드  •  ";

export function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(innerRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={marqueeRef} className="py-6 bg-secondary/50 border-y border-border overflow-hidden">
      <div ref={innerRef} className="flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-sm md:text-base font-medium tracking-wide text-muted-foreground/60 px-2"
          >
            {marqueeText}
          </span>
        ))}
      </div>
    </section>
  );
}
