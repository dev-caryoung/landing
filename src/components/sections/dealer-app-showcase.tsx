"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight, ChevronRight, Copy, FileText, Share2, Sparkles, TrendingUp, Users, CalendarClock, Check, Circle } from "lucide-react";

/**
 * 딜러앱 쇼케이스 — client/src/app/page.tsx 와 1:1 동일한 마크업을
 * 폰 프레임 안에 렌더링하고, 스크롤에 맞춰 폰 내부가 자연스럽게 스크롤되며
 * 좌측 텍스트가 단계별로 전환됨.
 */

const SCENES = [
  {
    eyebrow: "DASHBOARD",
    title: "내 수익을\n한눈에",
    desc: "이번 달 정산 예정과 누적 수익을 카드 한 장에 모았습니다. 카영 딜러의 첫 화면.",
  },
  {
    eyebrow: "AFFILIATE",
    title: "한 번 소개로\n평생 수수료",
    desc: "추천한 딜러의 실적이 그대로 내 수수료. 0.5% ~ 합의된 요율로 매월 자동 정산.",
  },
  {
    eyebrow: "REFERRALS",
    title: "내 사람들의\n실적까지 추적",
    desc: "소속·이름·계약건수·실적 보험료·수수료까지 실시간 대시보드 한 화면에서.",
  },
  {
    eyebrow: "CONTRACTS",
    title: "내 계약도\n같은 앱에서",
    desc: "최근 2개월 계약 내역과 정산 상태까지 같은 앱 안에서 한 번에 관리합니다.",
  },
];

const SCENE_COUNT = SCENES.length;

export function DealerAppShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 0 ~ SCENE_COUNT-1 사이로 매핑
  const sceneProgress = useTransform(scrollYProgress, [0, 1], [0, SCENE_COUNT - 0.001]);

  // 폰 안 컨텐츠를 스크롤 (위로 올라감)
  // 컨텐츠 전체 높이는 ~1900px, 폰 화면은 ~620px → 약 1300px 정도 위로 올림
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -1280]);

  return (
    <section
      ref={ref}
      className="relative bg-white"
      style={{ height: `${SCENE_COUNT * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FB] via-white to-[#EEF2FF]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.10),transparent_55%)]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.08),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative h-full max-w-[1280px] mx-auto px-8 lg:px-16 grid lg:grid-cols-2 gap-8 items-center">
          {/* 좌측 — 헤드라인 */}
          <div className="relative h-full flex items-center">
            <div className="relative w-full max-w-[480px]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#2563eb] font-bold">
                Caryoung Dealer App
              </p>
              <div className="relative mt-6 min-h-[300px]">
                {SCENES.map((s, i) => (
                  <SceneText key={i} index={i} scene={s} sceneProgress={sceneProgress} />
                ))}
              </div>

              <div className="mt-10 flex items-center gap-2">
                {SCENES.map((_, i) => (
                  <Indicator key={i} index={i} sceneProgress={sceneProgress} />
                ))}
              </div>
            </div>
          </div>

          {/* 우측 — 폰 프레임 */}
          <div className="hidden lg:flex items-center justify-center">
            <PhoneFrame contentY={contentY} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────── */

function SceneText({
  index,
  scene,
  sceneProgress,
}: {
  index: number;
  scene: (typeof SCENES)[number];
  sceneProgress: MotionValue<number>;
}) {
  const opacity = useTransform(sceneProgress, [index - 0.5, index, index + 0.5], [0, 1, 0]);
  const y = useTransform(sceneProgress, [index - 0.5, index, index + 0.5], [30, 0, -30]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity, y }}>
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#2563eb] font-bold">
        {scene.eyebrow}
      </p>
      <h3 className="text-[44px] lg:text-[52px] font-bold tracking-tight leading-[1.05] mt-4 text-slate-900 whitespace-pre-line">
        {scene.title}
      </h3>
      <p className="text-[15px] text-slate-500 mt-5 leading-relaxed max-w-[440px]">
        {scene.desc}
      </p>
    </motion.div>
  );
}

function Indicator({ index, sceneProgress }: { index: number; sceneProgress: MotionValue<number> }) {
  const width = useTransform(sceneProgress, [index - 0.5, index, index + 0.5], [8, 36, 8]);
  const opacity = useTransform(sceneProgress, [index - 0.5, index, index + 0.5], [0.25, 1, 0.25]);
  return <motion.div className="h-1.5 rounded-full bg-[#2563eb]" style={{ width, opacity }} />;
}

/* ────────────── Phone Frame ────────────── */

function PhoneFrame({ contentY }: { contentY: MotionValue<number> }) {
  return (
    <div className="relative w-[340px] h-[680px] rounded-[44px] bg-slate-900 p-3 shadow-2xl shadow-[#2563eb]/20">
      {/* 노치 */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-2xl z-20" />
      {/* 화면 */}
      <div className="relative w-full h-full rounded-[34px] bg-background overflow-hidden">
        <motion.div style={{ y: contentY }}>
          <DealerHomeMockup />
        </motion.div>
      </div>
    </div>
  );
}

/* ────────────── Mock 데이터 ────────────── */

const MOCK = {
  profile: {
    name: "카영 딜러",
    phone: "010-0000-0000",
    daysWithCaryoung: 127,
    joinedAt: "2025.12.01",
    referrer: { name: "김카영" },
  },
  earnings: { thisMonth: 580000, pending: 420000, total: 3620000 },
  stats: { totalContracts: 42, thisMonthContracts: 7, activeContracts: 28 },
  referralAffiliate: {
    cumulativeCommission: 1565500,
    yesterdayCommission: 12500,
    funnel: { invited: 4, active: 4, earning: 4 },
    activity: [
      { id: "a1", refereeName: "박**", refereeCompany: "카영 강남지점", time: "1시간 전", amount: 12500 },
      { id: "a2", refereeName: "이**", refereeCompany: "카영 서초지점", time: "1일 전", amount: 8000 },
    ],
  },
  referralStats: { totalReferrals: 4, activeReferrals: 4, estimatedCommission: 247500 },
  referralList: [
    { id: "p1", name: "박**", company: "카영 강남지점", contractCount: 12, basePremium: 24000000, commission: 120000 },
    { id: "p2", name: "이**", company: "카영 서초지점", contractCount: 8, basePremium: 16000000, commission: 80000 },
    { id: "p3", name: "최**", company: "카영 강북지점", contractCount: 5, basePremium: 9500000, commission: 47500 },
    { id: "p4", name: "김**", company: "카영 송파지점", contractCount: 3, basePremium: 5800000, commission: 29000 },
  ],
  recentContracts: [
    { id: "s1", customer_name: "홍길동", vehicle_no: "12가1234", insurance_company: "현대해상", total_premium: 1200000, contract_date: "2026.04.07", status: "신규" },
    { id: "s2", customer_name: "김철수", vehicle_no: "34나5678", insurance_company: "DB손보", total_premium: 980000, contract_date: "2026.04.04", status: "갱신" },
    { id: "s3", customer_name: "이영희", vehicle_no: "56다9012", insurance_company: "삼성화재", total_premium: 1450000, contract_date: "2026.03.31", status: "신규" },
    { id: "s4", customer_name: "박민수", vehicle_no: "78라3456", insurance_company: "KB손보", total_premium: 880000, contract_date: "2026.03.28", status: "갱신" },
  ],
  myReferralCode: "P8E3G8KX",
};

const fmt = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

/* ────────────── Dealer Home Mockup (1:1 replica of client/src/app/page.tsx) ────────────── */

function DealerHomeMockup() {
  const cumulative = MOCK.referralAffiliate.cumulativeCommission;
  const yesterday = MOCK.referralAffiliate.yesterdayCommission;
  const thisMonthEst = MOCK.referralStats.estimatedCommission;
  const funnel = MOCK.referralAffiliate.funnel;
  const list = MOCK.referralList;

  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Header */}
      <div className="px-5 pt-8 pb-5 border-b border-border/60">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground/70 font-medium">Dealer</p>
            <h1 className="text-[22px] font-bold mt-1 tracking-tight">{MOCK.profile.name}</h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
              <span className="tabular-nums">{MOCK.profile.phone}</span>
              <span className="text-border">·</span>
              <span>등록자 {MOCK.profile.referrer.name}</span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">함께한 일수</p>
            <p className="text-2xl font-bold leading-none mt-1 tabular-nums">{MOCK.profile.daysWithCaryoung}</p>
            <p className="text-[10px] text-muted-foreground mt-1 tabular-nums">{MOCK.profile.joinedAt}</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="px-5 space-y-4 pt-5 pb-10">
        {/* Earnings */}
        <div className="relative px-5 py-6 rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-card overflow-hidden">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">이번 달 수익</p>
              <span className="text-[10px] text-muted-foreground/70 tabular-nums">KRW</span>
            </div>
            <p className="text-[34px] font-bold mt-2 tracking-tight tabular-nums leading-none text-primary">
              {fmt(MOCK.earnings.thisMonth)}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-border">
              <div>
                <p className="text-muted-foreground text-[10px] uppercase tracking-wider">정산 대기</p>
                <p className="font-semibold mt-1 tabular-nums">{fmt(MOCK.earnings.pending)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px] uppercase tracking-wider">누적</p>
                <p className="font-semibold mt-1 tabular-nums">{fmt(MOCK.earnings.total)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Hero */}
        <div className="relative px-5 py-6 rounded-2xl border overflow-hidden bg-gradient-to-br from-primary/5 via-card to-card">
          <div className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[9px] font-bold tracking-wider">
                  AFFILIATE
                </span>
                <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">누적 수수료</p>
              </div>
              <span className="text-[10px] text-muted-foreground/70 tabular-nums">KRW</span>
            </div>
            <p className="text-[34px] font-bold mt-3 tracking-tight tabular-nums leading-none text-primary">
              {fmt(cumulative)}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-border">
              <div>
                <p className="text-muted-foreground text-[10px] uppercase tracking-wider">이번달</p>
                <p className="font-semibold mt-1 tabular-nums">{fmt(thisMonthEst)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px] uppercase tracking-wider">어제</p>
                <p className="font-semibold mt-1 tabular-nums flex items-center gap-1">
                  {fmt(yesterday)}
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Funnel */}
        <div className="px-5 py-4 rounded-2xl border bg-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium">Funnel</p>
          </div>
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="px-2">
              <p className="text-[10px] text-muted-foreground">소개</p>
              <p className="text-2xl font-bold mt-0.5 tabular-nums leading-none">{funnel.invited}</p>
            </div>
            <div className="px-3">
              <p className="text-[10px] text-muted-foreground">활동</p>
              <p className="text-2xl font-bold mt-0.5 tabular-nums leading-none">{funnel.active}</p>
            </div>
            <div className="px-3">
              <p className="text-[10px] text-muted-foreground">수익발생</p>
              <p className="text-2xl font-bold mt-0.5 tabular-nums leading-none">{funnel.earning}</p>
            </div>
          </div>
        </div>

        {/* Share */}
        <div className="px-5 py-4 rounded-2xl border bg-card">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium">Referral Code</p>
              <p className="font-mono font-bold text-lg tracking-tight mt-0.5 truncate">{MOCK.myReferralCode}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button className="h-9 px-3 text-xs rounded-md border border-border font-medium inline-flex items-center">
                <Copy className="h-3.5 w-3.5 mr-1" />
                복사
              </button>
              <button className="h-9 px-3 text-xs rounded-md bg-foreground text-background font-bold inline-flex items-center">
                <Share2 className="h-3.5 w-3.5 mr-1" />
                공유
              </button>
            </div>
          </div>
        </div>

        {/* Referral list */}
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium">My Referrals</p>
              <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">{list.length}명 · 실적순</p>
            </div>
            <span className="text-[10px] tabular-nums text-muted-foreground">~ 2026.05.07</span>
          </div>
          <div className="grid grid-cols-12 gap-2 text-[10px] uppercase tracking-wider text-muted-foreground/70 px-5 py-2 border-b font-medium">
            <span className="col-span-4">소속</span>
            <span className="col-span-3">성명</span>
            <span className="col-span-1 text-right">건</span>
            <span className="col-span-2 text-right">보험료</span>
            <span className="col-span-2 text-right">수수료</span>
          </div>
          {list.map((r) => (
            <div key={r.id} className="grid grid-cols-12 gap-2 text-xs px-5 py-3 border-b last:border-b-0 items-center">
              <span className="col-span-4 truncate text-muted-foreground">{r.company}</span>
              <span className="col-span-3 truncate font-medium">{r.name}</span>
              <span className="col-span-1 text-right tabular-nums">{r.contractCount}</span>
              <span className="col-span-2 text-right tabular-nums text-muted-foreground">{fmt(r.basePremium)}</span>
              <span className="col-span-2 text-right tabular-nums font-semibold">{fmt(r.commission)}</span>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="px-5 py-4 rounded-2xl border bg-card">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium mb-3">Recent Activity</p>
          <div className="space-y-2.5">
            {MOCK.referralAffiliate.activity.map((a) => (
              <div key={a.id} className="flex items-center gap-3 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs">
                    <span className="font-medium">{a.refereeName}</span>
                    <span className="text-muted-foreground"> · {a.refereeCompany}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground tabular-nums">{a.time}</p>
                </div>
                <span className="text-xs font-bold tabular-nums shrink-0">+{fmt(a.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-5 py-4 rounded-2xl border bg-card">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="px-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">이번달</p>
              <p className="text-2xl font-bold mt-0.5 tabular-nums leading-none">{MOCK.stats.thisMonthContracts}</p>
            </div>
            <div className="px-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">유효</p>
              <p className="text-2xl font-bold mt-0.5 tabular-nums leading-none">{MOCK.stats.activeContracts}</p>
            </div>
            <div className="px-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">전체</p>
              <p className="text-2xl font-bold mt-0.5 tabular-nums leading-none">{MOCK.stats.totalContracts}</p>
            </div>
          </div>
        </div>

        {/* Recent Contracts */}
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-medium">My Contracts</p>
              <p className="text-xs text-muted-foreground mt-0.5">최근 2개월</p>
            </div>
            <span className="flex items-center text-xs text-muted-foreground">
              전체
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
          {MOCK.recentContracts.map((c) => (
            <div key={c.id} className="px-5 py-3.5 border-b last:border-b-0">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[14px] truncate">{c.customer_name}</p>
                    <span className="shrink-0 text-[9px] uppercase tracking-wider text-muted-foreground border border-border rounded px-1.5 py-0.5">
                      {c.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1">
                    <span className="tabular-nums">{c.vehicle_no}</span>
                    <span>·</span>
                    <span>{c.insurance_company}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-[14px] tabular-nums">{fmt(c.total_premium)}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 tabular-nums">{c.contract_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: FileText, label: "계약" },
            { icon: TrendingUp, label: "수익" },
            { icon: Users, label: "추천" },
          ].map((a) => (
            <div key={a.label} className="flex flex-col items-center gap-2 rounded-xl border border-border py-4">
              <a.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.8} />
              <span className="text-[11px] font-medium">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Unused icons cleanup placeholder
void Sparkles;
void CalendarClock;
void Check;
void Circle;
