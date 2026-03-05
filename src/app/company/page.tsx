import { Header, Footer } from "@/components/sections";

export const metadata = {
  title: "회사 소개 | 카영",
  description: "카영은 다이렉트 자동차보험 시장의 디지털 혁신을 이끄는 CRM 플랫폼입니다.",
};

export default function CompanyPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-background">
        <div className="container-main">
          <p className="text-small text-muted-foreground mb-4">About</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mb-8">
            카영을 소개합니다
          </h1>
          <p className="text-body text-muted-foreground max-w-2xl">
            카영은 다이렉트 자동차보험 시장의 디지털 혁신을 이끄는 CRM 플랫폼입니다.
            보험사와 에이전트를 연결하고, 복잡한 업무를 자동화하여
            모두가 본업에 집중할 수 있는 환경을 만들어갑니다.
          </p>
        </div>
      </section>

      {/* 미션 */}
      <section className="py-20 lg:py-32 bg-background border-t border-border">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-small text-muted-foreground mb-4">Mission</p>
              <h2 className="text-3xl md:text-4xl font-medium text-foreground">
                우리의 미션
              </h2>
            </div>
            <div>
              <p className="text-body text-muted-foreground leading-relaxed">
                보험 업계의 비효율을 기술로 해결합니다.
                에이전트 관리, 수수료 정산, 고객 갱신까지 —
                흩어져 있던 업무를 하나의 플랫폼으로 통합하여
                보험 비즈니스의 성장을 가속합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="py-20 lg:py-32 bg-secondary/30 border-t border-border">
        <div className="container-main">
          <p className="text-small text-muted-foreground mb-4">Values</p>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-12">
            핵심 가치
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-3">효율</h3>
              <p className="text-muted-foreground leading-relaxed">
                반복적인 수작업을 자동화하고, 데이터 기반의 의사결정으로
                업무 효율을 극대화합니다.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-foreground mb-3">신뢰</h3>
              <p className="text-muted-foreground leading-relaxed">
                정확한 정산과 투명한 데이터로
                보험사와 에이전트 간의 신뢰를 구축합니다.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-foreground mb-3">성장</h3>
              <p className="text-muted-foreground leading-relaxed">
                파트너의 성장이 곧 우리의 성장입니다.
                함께 성장할 수 있는 생태계를 만들어갑니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
