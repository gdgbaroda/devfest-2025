import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sponsors from "@/components/Sponsor";

export default function Schedule() {
  return (
    <div className="font-open-sans text-[#232b34]">
      <Navbar />
      <div className="mt-32">
        <Sponsors />
      </div>
      <Footer />
    </div>
  );
}
