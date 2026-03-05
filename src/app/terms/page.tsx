import { Header, Footer } from "@/components/sections";

export const metadata = {
  title: "이용약관 | 카영",
  description: "카영 서비스 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-background">
        <div className="container-main max-w-3xl">
          <p className="text-small text-muted-foreground mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-12">
            이용약관
          </h1>

          <div className="space-y-10 text-foreground/80 leading-relaxed">
            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">제1조 (목적)</h2>
              <p>
                이 약관은 카영(이하 &quot;회사&quot;)이 제공하는 서비스의 이용과 관련하여
                회사와 이용자 간의 권리, 의무 및 책임사항 등을 규정하는 것을 목적으로 합니다.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">제2조 (정의)</h2>
              <p className="mb-3">이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>&quot;서비스&quot;란 회사가 제공하는 다이렉트 자동차보험 CRM 플랫폼 및 관련 부가서비스를 말합니다.</li>
                <li>&quot;이용자&quot;란 이 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
                <li>&quot;에이전트&quot;란 회사의 플랫폼을 통해 보험 영업 활동을 수행하는 자를 말합니다.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">제3조 (약관의 효력)</h2>
              <p>
                이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.
                회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있으며,
                변경된 약관은 공지 후 효력을 발생합니다.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">제4조 (서비스의 제공)</h2>
              <p className="mb-3">회사는 다음의 서비스를 제공합니다.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>에이전트 관리 서비스</li>
                <li>자동 정산 서비스</li>
                <li>갱신 알림 서비스</li>
                <li>기타 회사가 정하는 서비스</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">제5조 (이용자의 의무)</h2>
              <p>
                이용자는 서비스 이용 시 관련 법령, 이 약관의 규정, 이용안내 및 서비스와 관련하여
                공지한 주의사항을 준수하여야 하며, 기타 회사 업무에 방해되는 행위를 하여서는 안 됩니다.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">제6조 (면책)</h2>
              <p>
                회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적인 사유로 인해
                서비스를 제공할 수 없는 경우 서비스 제공에 관한 책임이 면제됩니다.
              </p>
            </div>

            <p className="text-sm text-muted-foreground pt-8 border-t border-border">
              시행일: 2026년 1월 1일
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
