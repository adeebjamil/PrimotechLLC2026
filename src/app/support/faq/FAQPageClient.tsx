'use client';

import { useState } from "react";
import Hero from "@/app/components/Support/FAQ/Hero";
import FAQListing from "@/app/components/Support/FAQ/FAQListing";
import CTASection from "@/app/components/Support/FAQ/CTASection";

export default function FAQPageClient() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main>
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FAQListing searchQuery={searchQuery} />
      <CTASection />
    </main>
  );
}
