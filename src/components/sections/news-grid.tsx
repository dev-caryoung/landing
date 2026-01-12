"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop",
    category: "뉴스",
    title: "카영, 시리즈 A 투자 유치 완료",
    date: "2024.01.15",
    href: "/news/1",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop",
    category: "제품",
    title: "새로운 대시보드 기능 업데이트",
    date: "2024.01.10",
    href: "/news/2",
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop",
    category: "팀",
    title: "카영 팀이 일하는 방식",
    date: "2024.01.05",
    href: "/news/3",
  },
];

export function NewsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      const headerElements = headerRef.current?.querySelectorAll(".reveal-item");
      if (headerElements) {
        gsap.fromTo(
          headerElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Grid cards animation
      const cards = gridRef.current?.querySelectorAll(".news-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
    <section ref={sectionRef} className="py-20 lg:py-32 bg-background">
      <div className="container-main">
        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-12">
          <div>
            <p className="reveal-item text-small text-muted-foreground mb-4">Newsroom</p>
            <h2 className="reveal-item text-3xl md:text-4xl font-medium text-foreground">
              최신 소식
            </h2>
          </div>
          <Link
            href="/news"
            className="reveal-item hidden md:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>전체 보기</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link key={index} href={post.href} className="news-card group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-small text-muted-foreground mb-2">{post.category}</p>
              <h3 className="text-lg font-medium text-foreground group-hover:text-accent transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground">{post.date}</p>
            </Link>
          ))}
        </div>

        {/* Mobile link */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>전체 보기</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
