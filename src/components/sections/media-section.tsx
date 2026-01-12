"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const columns = [
  {
    title: "에이전트 중심 설계",
    description:
      "3,000명 이상의 에이전트를 효율적으로 관리하고, 각 에이전트의 실적과 정산을 실시간으로 추적합니다.",
  },
  {
    title: "데이터 기반 의사결정",
    description:
      "축적된 데이터를 기반으로 인사이트를 제공하여 더 나은 영업 전략을 수립할 수 있도록 지원합니다.",
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
            <p className="reveal-item text-small text-muted-foreground mb-6">Our approach</p>
            <h2 className="reveal-item text-3xl md:text-4xl font-medium text-foreground mb-8">
              보험 영업의 복잡성을 단순하게
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
