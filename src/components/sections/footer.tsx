"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "플랫폼", href: "#platform" },
  { label: "회사", href: "/company" },
  { label: "뉴스룸", href: "/news" },
];

const legalLinks = [
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = footerRef.current?.querySelectorAll(".footer-item");
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="py-16 lg:py-20 bg-zinc-950 text-zinc-100">
      <div className="container-main">
        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-16">
          {/* Logo & Contact */}
          <div className="footer-item">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-semibold tracking-tight">카영</span>
            </Link>
            <div className="space-y-2">
              <a
                href="mailto:contact@caryoung.kr"
                className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                contact@caryoung.kr
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="footer-item flex flex-wrap gap-8 md:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
            >
              문의하기
            </Link>
          </nav>
        </div>

        {/* Bottom */}
        <div className="footer-item pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} 카영. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
