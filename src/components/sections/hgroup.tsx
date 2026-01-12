"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HGroup() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Split text into characters and animate on scroll
      const chars = textRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.set(chars, { opacity: 0.2 });
        gsap.to(chars, {
          opacity: 1,
          duration: 0.05,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section ref={sectionRef} className="py-32 lg:py-40 bg-background">
      <div className="container-main">
        <h2
          ref={textRef}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.2] tracking-tight max-w-5xl"
        >
          {splitText("흩어진 엑셀, 수기 정산, 놓치는 갱신. 카영이 모든 비효율을 해결합니다.")}
        </h2>
      </div>
    </section>
  );
}
