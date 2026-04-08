"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "Dealer", href: "/#dealer" },
    { label: "Admin", href: "/#admin" },
    { label: "Partners", href: "/partnerships" },
  ];

  // Initial header animation
  useEffect(() => {
    if (!headerInnerRef.current) return;

    gsap.fromTo(
      headerInnerRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  // Menu animation
  useEffect(() => {
    if (!menuRef.current) return;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.fromTo(
        menuRef.current.querySelectorAll(".menu-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) {
            gsap.set(menuRef.current, { visibility: "hidden" });
          }
        },
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6">
        <div
          ref={headerInnerRef}
          className="container-main"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-50 flex items-center">
              <span className="text-sm md:text-base font-bold uppercase tracking-[0.22em] text-[#2563eb]">
                Caryoung
              </span>
            </Link>

            {/* Desktop Navigation - Pill Container */}
            <div className="hidden md:flex items-center gap-2">
              {/* Nav Links Container */}
              <nav className="flex items-center gap-1 px-2 py-2 bg-foreground/5 backdrop-blur-md rounded-full border border-foreground/10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* CTA Button */}
              <Link
                href="#contact"
                className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-full text-xs font-medium uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                <span>Contact</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 md:hidden w-10 h-10 flex items-center justify-center"
              aria-label="메뉴 토글"
            >
              <div className="w-6 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-[2px] bg-foreground transition-all duration-300 origin-center ${
                    isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`w-full h-[2px] bg-foreground transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-[2px] bg-foreground transition-all duration-300 origin-center ${
                    isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-background md:hidden"
        style={{ opacity: 0, visibility: "hidden" }}
        data-lenis-prevent
      >
        <div className="h-full flex flex-col justify-center px-8">
          <nav className="space-y-6">
            {navItems.map((item) => (
              <div key={item.href} className="menu-item overflow-hidden">
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-4xl font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <div className="menu-item overflow-hidden pt-6">
              <Link
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center gap-2 text-4xl font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                문의하기
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </nav>

          <div className="menu-item mt-16 pt-8 border-t border-border">
            <a
              href="mailto:contact@caryoung.kr"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              contact@caryoung.kr
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
