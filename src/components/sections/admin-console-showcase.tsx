"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, MotionValue } from "framer-motion";
import { TrendingUp, FileText, Users, GitBranch, ShieldCheck, ArrowUpRight } from "lucide-react";

/**
 * 어드민 콘솔 쇼케이스 — 딜러앱 섹션과 동일한 스크롤 패턴.
 * 폰 목업 대신 랩톱/브라우저 목업에 담아 웹 기반 관리자 콘솔을 소개.
 */

const SCENES = [
  {
    eyebrow: "DASHBOARD",
    title: "전체 현황을\n실시간으로",
    desc: "매출, 계약, 정산까지 핵심 KPI를 한 화면에서 파악합니다. 카영 어드민의 첫 화면.",
    icon: TrendingUp,
  },
  {
    eyebrow: "CONTRACTS",
    title: "계약 일괄 관리\n검색·필터·엑셀",
    desc: "지점·기간·상태별 필터와 전문 검색으로 수천 건의 계약을 즉시 조회하고 엑셀로 내보냅니다.",
    icon: FileText,
  },
  {
    eyebrow: "SETTLEMENT",
    title: "정산 자동화로\n오류 없이",
    desc: "수수료 계산부터 지급 확정까지 자동화된 파이프라인이 정산 실수를 원천 차단합니다.",
    icon: ShieldCheck,
  },
  {
    eyebrow: "REFERRAL TREE",
    title: "레퍼럴 트리\n시각화",
    desc: "딜러 소개 구조와 각 노드의 실적·수수료를 트리 뷰로 한눈에 추적합니다.",
    icon: GitBranch,
  },
  {
    eyebrow: "ACCESS CONTROL",
    title: "역할 기반 권한\n감사 로그",
    desc: "매니저·슈퍼바이저·어드민 역할별 접근 제어와 모든 변경 이력을 기록합니다.",
    icon: Users,
  },
];

const SCENE_COUNT = SCENES.length;

export function AdminConsoleShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const sceneProgress = useTransform(scrollYProgress, [0, 1], [0, SCENE_COUNT - 0.001]);

  // 현재 씬 인덱스 (페이지 전환용)
  const [currentScene, setCurrentScene] = useState(0);
  useMotionValueEvent(sceneProgress, "change", (v) => {
    const next = Math.min(SCENE_COUNT - 1, Math.max(0, Math.floor(v + 0.5)));
    setCurrentScene((prev) => (prev === next ? prev : next));
  });

  return (
    <section
      id="admin"
      ref={ref}
      className="relative bg-white"
      style={{ height: `${SCENE_COUNT * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 배경 — 딜러 섹션과 동일한 팔레트, 방향만 반전 */}
        <div className="absolute inset-0 bg-gradient-to-bl from-[#F8F9FB] via-white to-[#EEF2FF]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.10),transparent_55%)]" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.08),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative h-full max-w-[1400px] mx-auto px-8 lg:px-16 grid lg:grid-cols-[minmax(0,1.5fr)_minmax(360px,1fr)] gap-12 items-center">
          {/* 좌측 — 랩톱 프레임 (딜러는 우측 폰, 여기서는 좌측 랩톱으로 배치 반전) */}
          <div className="hidden lg:flex items-center justify-center order-last lg:order-first">
            <LaptopFrame currentScene={currentScene} />
          </div>

          {/* 우측 — 헤드라인 */}
          <div className="relative h-full flex items-center order-first lg:order-last">
            <div className="relative w-full max-w-[480px] lg:ml-auto">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#2563eb] font-bold">
                Caryoung Admin Console
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

              <a
                href="https://admin-psi-amber-83.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:scale-[1.02] transition-transform"
              >
                어드민 둘러보기
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
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
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-900 font-bold">
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

/* ────────────── Laptop Frame ────────────── */

function LaptopFrame({ currentScene }: { currentScene: number }) {
  return (
    <div className="relative w-[680px] max-w-full">
      {/* 화면 부분 */}
      <div className="relative w-full rounded-t-xl bg-slate-800 p-2 pb-0 shadow-2xl shadow-[#2563eb]/20">
        {/* 브라우저 크롬 */}
        <div className="rounded-t-lg bg-slate-700 px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 mx-2 h-5 rounded bg-slate-600 flex items-center px-2">
            <span className="text-[9px] text-slate-400 truncate">admin.caryoung.co.kr</span>
          </div>
        </div>
        {/* 화면 */}
        <div className="relative w-full h-[460px] bg-[#f8f9fb] overflow-hidden">
          <AdminConsoleShell currentScene={currentScene} />
        </div>
      </div>
      {/* 힌지 */}
      <div className="w-full h-3 bg-gradient-to-b from-slate-700 to-slate-600 rounded-b-sm shadow-md" />
      {/* 받침대 */}
      <div className="mx-auto w-32 h-3 bg-slate-600 rounded-b-xl shadow" />
      {/* 베이스 */}
      <div className="mx-auto w-52 h-2 bg-slate-500 rounded-b-2xl" />
    </div>
  );
}

/* ────────────── Mock 데이터 ────────────── */

const fmt = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

const ADMIN_MOCK = {
  kpi: {
    totalRevenue: 284500000,
    revenueGrowth: 12.4,
    totalContracts: 1847,
    contractsThisMonth: 247,
    pendingSettlement: 38200000,
    activeAgents: 94,
  },
  recentContracts: [
    { id: "c1", branch: "카영 강남지점", dealer: "박**", customer: "이○○", premium: 1850000, status: "정산완료", date: "2026.04.07" },
    { id: "c2", branch: "카영 서초지점", dealer: "김**", customer: "최○○", premium: 1240000, status: "정산대기", date: "2026.04.06" },
    { id: "c3", branch: "카영 강북지점", dealer: "이**", customer: "박○○", premium: 2100000, status: "정산완료", date: "2026.04.05" },
    { id: "c4", branch: "카영 송파지점", dealer: "최**", customer: "정○○", premium: 980000, status: "검토중", date: "2026.04.04" },
    { id: "c5", branch: "카영 마포지점", dealer: "정**", customer: "한○○", premium: 1560000, status: "정산완료", date: "2026.04.03" },
  ],
  settlementQueue: [
    { id: "s1", dealer: "카영 강남지점 박**", amount: 9250000, contracts: 18, due: "2026.04.10" },
    { id: "s2", dealer: "카영 서초지점 김**", amount: 6200000, contracts: 12, due: "2026.04.10" },
    { id: "s3", dealer: "카영 강북지점 이**", amount: 4800000, contracts: 9, due: "2026.04.15" },
    { id: "s4", dealer: "카영 송파지점 최**", amount: 3100000, contracts: 6, due: "2026.04.15" },
  ],
  referralTree: [
    { id: "r1", name: "카영 총괄", level: 0, children: 5, revenue: 284500000, rate: "—" },
    { id: "r2", name: "카영 강남지점 관리자", level: 1, children: 18, revenue: 92400000, rate: "0.5%" },
    { id: "r3", name: "카영 서초지점 관리자", level: 1, children: 14, revenue: 76200000, rate: "0.5%" },
    { id: "r4", name: "카영 강북지점 박**", level: 2, children: 5, revenue: 24100000, rate: "0.3%" },
    { id: "r5", name: "카영 송파지점 이**", level: 2, children: 3, revenue: 18600000, rate: "0.3%" },
  ],
  auditLog: [
    { id: "a1", user: "admin@caryoung", action: "정산 승인", target: "2026.04 강남 일괄", time: "10분 전" },
    { id: "a2", user: "manager1@caryoung", action: "계약 수정", target: "C-20260407-092", time: "32분 전" },
    { id: "a3", user: "admin@caryoung", action: "권한 변경", target: "김** → 슈퍼바이저", time: "1시간 전" },
    { id: "a4", user: "manager2@caryoung", action: "엑셀 내보내기", target: "계약 목록 247건", time: "2시간 전" },
  ],
  monthlyChart: [
    { month: "11월", value: 68 },
    { month: "12월", value: 74 },
    { month: "1월", value: 62 },
    { month: "2월", value: 81 },
    { month: "3월", value: 89 },
    { month: "4월", value: 100 },
  ],
};

/* ────────────── Admin Console Shell + Pages ────────────── */

// 씬 인덱스 → (사이드바 활성 위치, 페이지 타이틀)
// 사이드바 아이콘 순서: [대시보드, 딜러관리, 계약관리, 구독관리, 정산관리, 레퍼럴트리, 서비스플랜, 제휴, 알림, 리포트, 사용자, 권한, 로그]
const SCENE_TO_NAV = [
  { activeIndex: 0, title: "대시보드" },     // 0 DASHBOARD
  { activeIndex: 2, title: "계약 관리" },    // 1 CONTRACTS
  { activeIndex: 4, title: "정산 관리" },    // 2 SETTLEMENT
  { activeIndex: 5, title: "레퍼럴 트리" },  // 3 REFERRAL
  { activeIndex: 11, title: "권한 관리" },   // 4 ACCESS
];

function AdminConsoleShell({ currentScene }: { currentScene: number }) {
  const nav = SCENE_TO_NAV[currentScene] ?? SCENE_TO_NAV[0];
  return (
    <div className="flex bg-[#f8fafc] min-h-full h-full">
      {/* 메인 콘텐츠 (사이드바 제거) */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* 탑바 */}
        <div className="h-10 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0">
          <p className="text-[11px] font-bold text-slate-900">{nav.title}</p>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-slate-400">2026.04.07</span>
            <div className="h-5 w-5 rounded-full bg-[#2563eb] flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">A</span>
            </div>
          </div>
        </div>

        {/* 페이지 본문 — 씬별 페이지 전환 */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-y-auto"
            >
              <AdminPage index={currentScene} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function AdminPage({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <DashboardPage />;
    case 1:
      return <ContractsPage />;
    case 2:
      return <SettlementPage />;
    case 3:
      return <ReferralPage />;
    case 4:
      return <AccessPage />;
    default:
      return <DashboardPage />;
  }
}

function DashboardPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "이달 매출", value: `${fmt(Math.round(ADMIN_MOCK.kpi.totalRevenue / 10000))}만`, sub: `↑ ${ADMIN_MOCK.kpi.revenueGrowth}%`, color: "text-emerald-600" },
          { label: "전체 계약", value: fmt(ADMIN_MOCK.kpi.totalContracts), sub: `+${ADMIN_MOCK.kpi.contractsThisMonth} 이달`, color: "text-[#2563eb]" },
          { label: "정산 대기", value: `${fmt(Math.round(ADMIN_MOCK.kpi.pendingSettlement / 10000))}만`, sub: "처리 필요", color: "text-amber-600" },
          { label: "활성 딜러", value: fmt(ADMIN_MOCK.kpi.activeAgents), sub: "전국 지점", color: "text-slate-700" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-lg p-3 border border-slate-200">
            <p className="text-[9px] text-slate-500 uppercase tracking-wider">{kpi.label}</p>
            <p className={`text-lg font-bold mt-1 tabular-nums ${kpi.color}`}>{kpi.value}</p>
            <p className="text-[9px] text-slate-400 mt-0.5 tabular-nums">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3 bg-white rounded-lg p-3 border border-slate-200">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-3">월별 계약 추이</p>
          <div className="flex items-end gap-1.5 h-24">
            {ADMIN_MOCK.monthlyChart.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm"
                  style={{
                    height: `${(d.value / 100) * 80}px`,
                    background: d.value === 100 ? "#2563eb" : "#bfdbfe",
                  }}
                />
                <span className="text-[7px] text-slate-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-lg p-3 border border-slate-200">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-2">정산 대기</p>
          <div className="space-y-1.5">
            {ADMIN_MOCK.settlementQueue.slice(0, 3).map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] text-slate-700 truncate">{s.dealer}</p>
                  <p className="text-[8px] text-slate-400">{s.contracts}건 · {s.due}</p>
                </div>
                <span className="text-[9px] font-bold tabular-nums text-amber-600 ml-2 shrink-0">
                  {fmt(Math.round(s.amount / 10000))}만
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContractsPage() {
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-3 py-2.5 border-b border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-700">계약 목록 ({ADMIN_MOCK.kpi.totalContracts}건)</p>
          <div className="flex items-center gap-1.5">
            <div className="h-6 px-2 rounded border border-slate-200 text-[8px] text-slate-500 flex items-center">지점 ▾</div>
            <div className="h-6 px-2 rounded border border-slate-200 text-[8px] text-slate-500 flex items-center">상태 ▾</div>
            <div className="h-6 px-2 rounded border border-slate-200 text-[8px] text-slate-500 flex items-center">기간 ▾</div>
            <div className="h-6 px-2 rounded bg-[#2563eb] text-[8px] text-white font-medium flex items-center">엑셀 내보내기</div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-1 text-[8px] uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100 font-medium bg-slate-50">
          <span className="col-span-3">지점</span>
          <span className="col-span-2">딜러</span>
          <span className="col-span-2">고객</span>
          <span className="col-span-2 text-right">보험료</span>
          <span className="col-span-2">상태</span>
          <span className="col-span-1 text-right">날짜</span>
        </div>
        {ADMIN_MOCK.recentContracts.map((c) => (
          <div key={c.id} className="grid grid-cols-12 gap-1 text-[9px] px-3 py-2.5 border-b border-slate-100 last:border-b-0 items-center">
            <span className="col-span-3 truncate text-slate-500">{c.branch}</span>
            <span className="col-span-2 truncate font-medium text-slate-700">{c.dealer}</span>
            <span className="col-span-2 truncate text-slate-500">{c.customer}</span>
            <span className="col-span-2 text-right tabular-nums font-semibold text-slate-800">{fmt(c.premium)}</span>
            <span className="col-span-2">
              <span
                className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-medium ${
                  c.status === "정산완료"
                    ? "bg-emerald-50 text-emerald-700"
                    : c.status === "정산대기"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {c.status}
              </span>
            </span>
            <span className="col-span-1 text-right text-[8px] text-slate-400 tabular-nums">{c.date.slice(5)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettlementPage() {
  const totalPending = ADMIN_MOCK.settlementQueue.reduce((sum, s) => sum + s.amount, 0);
  return (
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white rounded-lg p-3 border border-slate-200">
          <p className="text-[9px] text-slate-500 uppercase tracking-wider">정산 대기 총액</p>
          <p className="text-lg font-bold mt-1 tabular-nums text-amber-600">{fmt(Math.round(totalPending / 10000))}만</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-slate-200">
          <p className="text-[9px] text-slate-500 uppercase tracking-wider">대기 건수</p>
          <p className="text-lg font-bold mt-1 tabular-nums text-slate-700">{ADMIN_MOCK.settlementQueue.length}건</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-slate-200">
          <p className="text-[9px] text-slate-500 uppercase tracking-wider">이번 주 지급 예정</p>
          <p className="text-lg font-bold mt-1 tabular-nums text-emerald-600">2건</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-3 py-2.5 border-b border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-700">정산 대기 큐</p>
          <div className="h-6 px-2 rounded bg-[#2563eb] text-[8px] text-white font-medium flex items-center">일괄 승인</div>
        </div>
        <div className="grid grid-cols-12 gap-1 text-[8px] uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100 font-medium bg-slate-50">
          <span className="col-span-5">딜러</span>
          <span className="col-span-2 text-right">계약</span>
          <span className="col-span-3 text-right">금액</span>
          <span className="col-span-2 text-right">지급일</span>
        </div>
        {ADMIN_MOCK.settlementQueue.map((s) => (
          <div key={s.id} className="grid grid-cols-12 gap-1 text-[9px] px-3 py-2.5 border-b border-slate-100 last:border-b-0 items-center">
            <span className="col-span-5 truncate text-slate-700 font-medium">{s.dealer}</span>
            <span className="col-span-2 text-right tabular-nums text-slate-500">{s.contracts}건</span>
            <span className="col-span-3 text-right tabular-nums font-bold text-amber-600">
              {fmt(Math.round(s.amount / 10000))}만
            </span>
            <span className="col-span-2 text-right text-[8px] text-slate-400 tabular-nums">{s.due.slice(5)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReferralPage() {
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold text-slate-700">레퍼럴 트리</p>
          <p className="text-[9px] text-slate-400">노드 5개 · 총 매출 28,450만</p>
        </div>
        <div className="space-y-2">
          {ADMIN_MOCK.referralTree.map((node) => (
            <div
              key={node.id}
              className="flex items-center gap-2"
              style={{ paddingLeft: `${node.level * 20}px` }}
            >
              {node.level > 0 && (
                <div className="flex items-center gap-1 shrink-0">
                  <div className="w-3 h-px bg-slate-300" />
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                </div>
              )}
              <div className="flex-1 flex items-center justify-between bg-slate-50 rounded-md px-3 py-2 border border-slate-100">
                <div>
                  <p className="text-[10px] font-semibold text-slate-700">{node.name}</p>
                  <p className="text-[8px] text-slate-400">하위 {node.children}명 · 수수료율 {node.rate}</p>
                </div>
                <span className="text-[10px] font-bold tabular-nums text-[#2563eb]">
                  {fmt(Math.round(node.revenue / 10000))}만
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccessPage() {
  return (
    <div className="p-4 space-y-3">
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <p className="text-[10px] font-bold text-slate-700 mb-3">역할 기반 권한</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { role: "어드민", count: 3, perms: "전체 접근" },
            { role: "슈퍼바이저", count: 12, perms: "계약·정산" },
            { role: "매니저", count: 79, perms: "조회 전용" },
          ].map((r) => (
            <div key={r.role} className="bg-slate-50 rounded-md px-3 py-3 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-700">{r.role}</p>
              <p className="text-2xl font-bold text-[#2563eb] tabular-nums leading-none mt-1">{r.count}</p>
              <p className="text-[9px] text-slate-400 mt-1">{r.perms}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-3 py-2.5 border-b border-slate-100">
          <p className="text-[10px] font-bold text-slate-700">감사 로그</p>
        </div>
        <div className="divide-y divide-slate-100">
          {ADMIN_MOCK.auditLog.map((log) => (
            <div key={log.id} className="px-3 py-2.5 flex items-start gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#2563eb] mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-700">
                  <span className="font-medium">{log.user}</span>
                  <span className="text-slate-400"> · {log.action}</span>
                </p>
                <p className="text-[9px] text-slate-400 mt-0.5">{log.target} · {log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
