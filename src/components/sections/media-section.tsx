"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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

export function MediaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image parallax
      if (imageRef.current) {
        const img = imageRef.current.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }

      // Content reveal
      const elements = contentRef.current?.querySelectorAll(".reveal-item");
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
              trigger: contentRef.current,
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
    <section ref={sectionRef} className="py-20 lg:py-32 bg-secondary/30">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&auto=format&fit=crop"
              alt="Team collaboration"
              fill
              className="object-cover scale-110"
            />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <p className="reveal-item text-small text-muted-foreground mb-6">Our Platform</p>
            <h2 className="reveal-item text-3xl md:text-4xl font-medium text-foreground mb-8">
              다이렉트 자동차보험 영업의 새로운 기준
            </h2>
            <div className="space-y-8">
              {columns.map((column, index) => (
                <div key={index} className="reveal-item">
                  <h3 className="text-lg font-medium text-foreground mb-2">{column.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{column.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
