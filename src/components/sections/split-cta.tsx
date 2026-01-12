"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SplitCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll(".reveal-item");
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="reveal-item">
            <p className="text-small text-muted-foreground mb-2">시작하기</p>
            <h2 className="text-2xl md:text-3xl font-medium text-foreground">
              지금 바로 문의하세요
            </h2>
          </div>
          <div className="reveal-item">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:scale-[1.02] transition-transform"
            >
              <span>문의하기</span>
              <span className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 rounded-full">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
