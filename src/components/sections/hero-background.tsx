"use client";

import { useEffect, useRef } from "react";

/**
 * Hero 배경 — 그라데이션 메쉬 + 떠다니는 블러 블롭 + 캔버스 파티클/라인
 * 카영 블루 테마 (#2563eb)
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];
    const PARTICLE_COUNT = 70;
    const LINK_DIST = 140;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: 1 + Math.random() * 1.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 파티클 이동 + 렌더
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // 연결선
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.18;
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 점
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(37, 99, 235, 0.55)";
        ctx.shadowColor = "rgba(37, 99, 235, 0.5)";
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 베이스 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FB] via-white to-[#EEF2FF]" />

      {/* 다층 라디얼 글로우 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(96,165,250,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(59,130,246,0.08),transparent_60%)]" />

      {/* 떠다니는 블롭 */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* 도트 패턴 */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 그리드 라인 */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #2563eb 1px, transparent 1px), linear-gradient(to bottom, #2563eb 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      {/* 캔버스 파티클 */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* 하단 페이드 */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <style jsx>{`
        .blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
          opacity: 0.45;
          will-change: transform;
        }
        .blob-1 {
          top: -10%;
          left: -5%;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.5), transparent 70%);
          animation: float-1 18s ease-in-out infinite;
        }
        .blob-2 {
          top: 20%;
          right: -8%;
          width: 460px;
          height: 460px;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.4), transparent 70%);
          animation: float-2 22s ease-in-out infinite;
        }
        .blob-3 {
          bottom: -10%;
          left: 30%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.35), transparent 70%);
          animation: float-3 26s ease-in-out infinite;
        }
        @keyframes float-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(60px, 40px) scale(1.08);
          }
        }
        @keyframes float-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-50px, 60px) scale(1.1);
          }
        }
        @keyframes float-3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, -50px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
