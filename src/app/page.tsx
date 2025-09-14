"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Description from "@/components/Description";
import Speakers from "@/components/Speaker";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

// Critical components - loaded immediately (above the fold)
// These are already imported normally for maximum priority

// Non-critical components - lazy loaded with better performance
const Gallery = dynamic(() => import("@/components/Gallery"), {
  ssr: false, // Disable SSR for client-only components
  loading: () => <LoadingSpinner message="Loading gallery..." />,
});

const Sponsors = dynamic(() => import("@/components/Sponsor"), {
  ssr: false,
  loading: () => <LoadingSpinner message="Loading sponsors..." />,
});

const Partners = dynamic(() => import("@/components/Partner"), {
  ssr: false,
  loading: () => <LoadingSpinner message="Loading partners..." />,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#232b34]">
      {/* Critical above-the-fold content - highest priority */}
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Description />

        {/* Speakers - important but not critical */}
        <Speakers />

        {/* Non-critical content with lazy loading - load after critical content */}
        <div className="lazy-load-section">
          <Suspense fallback={<LoadingSpinner message="Loading gallery..." />}>
            <Gallery title="Past devfests" description="" />
          </Suspense>
        </div>

        <div className="lazy-load-section">
          <Suspense fallback={<LoadingSpinner message="Loading sponsors..." />}>
            <Sponsors />
          </Suspense>
        </div>

        <div className="lazy-load-section">
          <Suspense fallback={<LoadingSpinner message="Loading partners..." />}>
            <Partners />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
