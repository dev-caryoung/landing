"use client";

import {
  Header,
  Hero,
  HGroup,
  UspCards,
  Marquee,
  SplitCTA,
  MediaSection,
  NewsGrid,
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
      <NewsGrid />
      <Footer />
    </main>
  );
}
