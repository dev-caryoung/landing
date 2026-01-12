"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scrollItems = [
  {
    id: 1,
    text: "3,000명 이상의 에이전트와 함께 성장하는 다이렉트 자동차보험 영업 플랫폼입니다.",
  },
  {
    id: 2,
    text: "계약 체결부터 수수료 정산까지, 모든 과정을 자동화하여 에이전트가 영업에만 집중할 수 있도록 지원합니다.",
  },
  {
    id: 3,
    text: "실시간 실적 대시보드와 갱신 알림으로 놓치는 고객 없이 지속적인 수익을 창출합니다.",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !mainRef.current || !scrollerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero main content animation
      const headingLines = mainRef.current?.querySelectorAll(".line");
      if (headingLines) {
        gsap.set(headingLines, { y: "100%" });
        gsap.to(headingLines, {
          y: "0%",
          duration: 1.2,
          stagger: 0.15,
          delay: 0.5,
          ease: "power4.out",
        });
      }

      const subtitle = mainRef.current?.querySelector(".hero-subtitle");
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: "power3.out" }
        );
      }

      const button = mainRef.current?.querySelector(".hero-button");
      if (button) {
        gsap.fromTo(
          button,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 1.5, ease: "power3.out" }
        );
      }

      // Pin the scroller section
      ScrollTrigger.create({
        trigger: scrollerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          const newIndex = Math.min(
            Math.floor(progress * scrollItems.length),
            scrollItems.length - 1
          );
          setActiveIndex(newIndex);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate characters when active index changes
  useEffect(() => {
    scrollItems.forEach((_, index) => {
      const chars = document.querySelectorAll(`.scroll-item-${index} .char`);
      if (index === activeIndex) {
        gsap.to(chars, {
          opacity: 1,
          duration: 0.03,
          stagger: 0.01,
          ease: "none",
        });
      } else {
        gsap.to(chars, {
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }, [activeIndex]);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block" style={{ opacity: 0.3 }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section ref={sectionRef} className="relative">
      {/* Hero Main */}
      <div ref={mainRef} className="relative min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/video-poster.jpg"
          >
            <source src="https://integratedbiosciences.com/wp-content/uploads/2025/10/integrated-loop-optimized.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/60" />
        </div>

        {/* Content */}
        <div className="relative container-main py-32 lg:py-40">
          <div className="max-w-5xl">
            <h1 className="heading-xl text-foreground">
              <div className="overflow-hidden">
                <div className="line">다이렉트 자동차보험</div>
              </div>
              <div className="overflow-hidden">
                <div className="line">영업의 미래를</div>
              </div>
              <div className="overflow-hidden">
                <div className="line">설계합니다.</div>
              </div>
            </h1>

            <p className="hero-subtitle mt-8 text-body text-muted-foreground max-w-xl" style={{ opacity: 0 }}>
              에이전트 관리, 계약 추적, 자동 정산까지. 다이렉트 자동차보험 영업에 필요한 모든 것을 하나의 플랫폼에서.
            </p>

            <div className="hero-button mt-10" style={{ opacity: 0 }}>
              <Link
                href="#platform"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:scale-[1.02] transition-transform"
              >
                <span>플랫폼 알아보기</span>
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
      </div>

      {/* Scroll Section - Pinned */}
      <div ref={scrollerRef} className="min-h-screen flex items-center bg-background">
        <div className="container-main w-full">
          {/* Label */}
          <div className="mb-12">
            <span className="text-small text-muted-foreground">What we do</span>
          </div>

          <div className="flex gap-8 md:gap-16">
            {/* Progress indicator */}
            <aside className="hidden md:flex flex-col items-center gap-3 pt-2">
              <span className="text-sm font-medium tabular-nums text-foreground">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div className="relative w-px h-32 bg-border overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full bg-foreground origin-top transition-transform duration-100"
                  style={{
                    height: "100%",
                    transform: `scaleY(${scrollProgress})`
                  }}
                />
              </div>
              <span className="text-sm text-muted-foreground tabular-nums">
                {String(scrollItems.length).padStart(2, "0")}
              </span>
            </aside>

            {/* Content */}
            <div className="flex-1 max-w-4xl">
              {scrollItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`scroll-item-${index} transition-all duration-500 ${
                    index === activeIndex
                      ? "opacity-100"
                      : "opacity-0 absolute pointer-events-none"
                  }`}
                  style={{ display: index === activeIndex ? "block" : "none" }}
                >
                  <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight">
                    {splitText(item.text)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile progress */}
          <div className="md:hidden mt-10 flex items-center gap-2">
            {scrollItems.map((_, index) => (
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
