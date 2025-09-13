import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Partner from "@/components/Partner";

export default function Partners() {
  return (
    <div className="font-open-sans text-[#232b34]">
      <Navbar />
      <div className="mt-32">
        <Partner />
      </div>
      <Footer />
    </div>
  );
}
