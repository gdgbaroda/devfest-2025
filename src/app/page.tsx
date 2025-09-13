import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Description from "@/components/Description";
import Gallery from "@/components/Gallery";
import Speakers from "@/components/Speaker";
import Sponsors from "@/components/Sponsor";
import Footer from "@/components/Footer";
import Partners from "@/components/Partner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-open-sans bg-transparent text-[#232b34]">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Description />
        <Gallery title="Past devfests" description="" />
        <Speakers />
        <Sponsors />
        <Partners />
      </main>
      <Footer />
    </div>
  );
}
