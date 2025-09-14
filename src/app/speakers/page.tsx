"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SpeakersList from "@/components/Speaker";

export default function Speakers() {
  return (
    <div className="min-h-screen flex flex-col  text-[#232b34]">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="mt-32">
          <SpeakersList />
        </div>
      </div>
      <Footer />
    </div>
  );
}
