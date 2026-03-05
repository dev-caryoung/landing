import { Header, Footer } from "@/components/sections";

export const metadata = {
  title: "개인정보처리방침 | 카영",
  description: "카영 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-background">
        <div className="container-main max-w-3xl">
          <p className="text-small text-muted-foreground mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-12">
            개인정보처리방침
          </h1>

          <div className="space-y-10 text-foreground/80 leading-relaxed">
            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">1. 개인정보의 수집 및 이용 목적</h2>
              <p className="mb-3">회사는 다음의 목적을 위해 개인정보를 수집 및 이용합니다.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>서비스 제공 및 운영</li>
                <li>회원 관리 및 본인 확인</li>
                <li>문의 응대 및 고객 지원</li>
                <li>서비스 개선 및 신규 서비스 개발</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">2. 수집하는 개인정보 항목</h2>
              <p className="mb-3">회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>필수항목: 이름, 이메일, 연락처</li>
                <li>선택항목: 소속 회사, 직책</li>
                <li>자동수집항목: 접속 IP, 브라우저 정보, 접속 일시</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">3. 개인정보의 보유 및 이용기간</h2>
              <p>
                회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                단, 관련 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">4. 개인정보의 제3자 제공</h2>
              <p>
                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                다만, 이용자의 동의가 있거나 법률의 규정에 의한 경우는 예외로 합니다.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">5. 개인정보의 파기</h2>
              <p>
                회사는 개인정보의 수집 및 이용 목적이 달성되면 지체 없이 해당 개인정보를 파기합니다.
                전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며,
                종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">6. 이용자의 권리</h2>
              <p>
                이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제, 처리 정지를 요구할 수 있습니다.
                개인정보와 관련한 문의는 아래 연락처로 문의해 주시기 바랍니다.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground mb-4">7. 개인정보 보호책임자</h2>
              <ul className="list-none space-y-2">
                <li>회사명: 카영</li>
                <li>이메일: contact@caryoung.kr</li>
              </ul>
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
