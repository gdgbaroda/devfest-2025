import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Discription from "@/components/Discription";
import Gallery from "@/components/Gallery";
import Speakers from "@/components/Speaker";
import Sponsors from "@/components/Sponsor";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import Partners from "@/components/Partner";

export default function Home() {
  return (
    <div className="relative font-operetta-12 bg-transparent text-[#232b34]">
      <Background />
      <Navbar />
      <Hero />
      <Discription />
      <Gallery title="Past devfests" description="" />
      <Speakers />
      <Sponsors />
      <Partners />
      <Footer />
    </div>
  );
}
