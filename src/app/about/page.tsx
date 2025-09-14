"use client";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Schedule() {
  return (
    <div className="min-h-screen flex flex-col  text-[#232b34]">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="mt-36">
          <AboutSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
