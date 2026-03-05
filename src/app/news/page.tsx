import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/sections";

export const metadata = {
  title: "뉴스룸 | 카영",
  description: "카영의 최신 소식과 업데이트를 확인하세요.",
};

const posts = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop",
    category: "제품",
    title: "에이전트 계약 관리 및 수익 조회 기능 출시",
    date: "2026.03.01",
    summary: "에이전트별 계약 현황을 한눈에 파악하고, 실시간 수익 데이터를 조회할 수 있는 새로운 기능이 출시되었습니다.",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop",
    category: "제품",
    title: "GA 정산 관리 및 에이전트 플랜 시스템 오픈",
    date: "2026.02.15",
    summary: "GA 단위의 정산 관리와 에이전트별 맞춤 플랜을 설정할 수 있는 시스템이 새롭게 오픈되었습니다.",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop",
    category: "제품",
    title: "추천 프로그램 및 파트너십 관리 기능 런칭",
    date: "2026.01.20",
    summary: "에이전트 추천 프로그램과 파트너십을 효율적으로 관리할 수 있는 새로운 기능을 런칭합니다.",
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-background">
        <div className="container-main">
          <p className="text-small text-muted-foreground mb-4">Newsroom</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mb-16">
            최신 소식
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/news/${post.id}`} className="group">
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
