"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setErrorMessage("이름, 이메일, 문의 내용은 필수입니다.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success) {
        throw new Error(json?.error || "문의 접수에 실패했습니다.");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Contact submit error:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "문의 접수에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 bg-secondary/30 border-t border-border">
      <div className="container-main">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* 좌측 안내 */}
          <div>
            <p className="reveal-item text-small text-muted-foreground mb-4">Contact</p>
            <h2 className="reveal-item text-3xl md:text-4xl font-medium text-foreground mb-6">
              문의하기
            </h2>
            <p className="reveal-item text-muted-foreground leading-relaxed mb-8">
              카영 플랫폼에 대해 궁금한 점이 있으시면 언제든 문의해 주세요.
              담당자가 확인 후 빠르게 답변드리겠습니다.
            </p>
            <div className="reveal-item">
              <a
                href="mailto:contact@caryoung.kr"
                className="text-foreground font-medium hover:text-accent transition-colors"
              >
                contact@caryoung.kr
              </a>
            </div>
          </div>

          {/* 우측 폼 */}
          <div className="reveal-item">
            {isSubmitted ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-2">문의가 접수되었습니다</h3>
                  <p className="text-muted-foreground">빠른 시일 내에 답변드리겠습니다.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="010-0000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    문의 내용
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                    placeholder="문의 내용을 입력해 주세요"
                  />
                </div>
                {errorMessage && (
                  <p className="text-sm text-red-500" role="alert">
                    {errorMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
                >
                  {isSubmitting ? "전송 중..." : "문의 보내기"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
