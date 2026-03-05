import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/sections";

const posts: Record<string, {
  image: string;
  category: string;
  title: string;
  date: string;
  content: string;
}> = {
  "1": {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop",
    category: "제품",
    title: "에이전트 계약 관리 및 수익 조회 기능 출시",
    date: "2026.03.01",
    content: `카영 플랫폼에 에이전트 계약 관리 및 수익 조회 기능이 새롭게 추가되었습니다.

이번 업데이트를 통해 에이전트별 계약 현황을 한눈에 파악하고, 실시간 수익 데이터를 손쉽게 조회할 수 있게 되었습니다. 기존에 수작업으로 관리하던 계약 정보를 체계적으로 관리할 수 있으며, 수익 추이를 시각화된 대시보드로 확인할 수 있습니다.

주요 기능:
• 에이전트별 계약 현황 대시보드
• 실시간 수익 데이터 조회 및 분석
• 계약 만료 알림 및 갱신 관리
• 월별·분기별 실적 리포트 자동 생성

카영은 앞으로도 보험 업무의 효율성을 높이는 기능을 지속적으로 개발해 나가겠습니다.`,
  },
  "2": {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop",
    category: "제품",
    title: "GA 정산 관리 및 에이전트 플랜 시스템 오픈",
    date: "2026.02.15",
    content: `GA(General Agency) 단위의 정산 관리와 에이전트별 맞춤 플랜을 설정할 수 있는 시스템이 새롭게 오픈되었습니다.

복잡한 수수료 체계를 자동으로 계산하고, GA별로 다른 정산 기준을 유연하게 적용할 수 있습니다. 에이전트 플랜 시스템을 통해 각 에이전트의 등급과 성과에 따른 차등 수수료율을 손쉽게 관리할 수 있습니다.

주요 기능:
• GA별 정산 기준 설정 및 자동 계산
• 에이전트 등급별 플랜 관리
• 정산 내역 자동 발송
• 정산 이력 조회 및 감사 로그

이번 업데이트로 정산 업무에 소요되는 시간을 대폭 절감할 수 있을 것으로 기대합니다.`,
  },
  "3": {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop",
    category: "제품",
    title: "추천 프로그램 및 파트너십 관리 기능 런칭",
    date: "2026.01.20",
    content: `에이전트 추천 프로그램과 파트너십을 효율적으로 관리할 수 있는 새로운 기능을 런칭합니다.

기존 에이전트가 새로운 에이전트를 추천하면 보상을 제공하는 추천 프로그램을 간편하게 운영할 수 있으며, 다양한 파트너사와의 협업을 체계적으로 관리할 수 있습니다.

주요 기능:
• 에이전트 추천 프로그램 생성 및 관리
• 추천 보상 자동 지급
• 파트너십 계약 관리
• 추천 실적 트래킹 대시보드

카영은 건강한 에이전트 생태계를 구축하기 위해 지속적으로 노력하겠습니다.`,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((id) => ({ id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const post = posts[id];
    if (!post) return { title: "뉴스 | 카영" };
    return {
      title: `${post.title} | 카영`,
      description: post.content.slice(0, 120),
    };
  });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = posts[id];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Header />

      <article className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-background">
        <div className="container-main max-w-3xl">
          {/* 뒤로 가기 */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>뉴스룸으로 돌아가기</span>
          </Link>

          {/* 헤더 */}
          <p className="text-small text-muted-foreground mb-4">{post.category}</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-muted-foreground mb-10">{post.date}</p>

          {/* 이미지 */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 본문 */}
          <div className="prose-custom">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-foreground/80 leading-relaxed mb-6">
                {paragraph.split("\n").map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < paragraph.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
