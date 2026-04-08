"use client";

import {
  Header,
  Hero,
  HGroup,
  UspCards,
  Marquee,
  SplitCTA,
  MediaSection,
  DealerAppShowcase,
  NewsGrid,
  ContactSection,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HGroup />
      <UspCards />
      <Marquee />
      <SplitCTA />
      <MediaSection />
      <DealerAppShowcase />
      <NewsGrid />
      <ContactSection />
      <Footer />
    </main>
  );
}
