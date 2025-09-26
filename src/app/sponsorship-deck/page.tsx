"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sponsorship/HeroSection";
import AudienceSection from "@/components/sponsorship/AudienceSection";
import SponsorshipTiers from "@/components/sponsorship/SponsorshipTiers";
import ContactSection from "@/components/sponsorship/ContactSection";

export default function SponsorshipDeckPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#232b34]">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <AudienceSection />
        <SponsorshipTiers />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
