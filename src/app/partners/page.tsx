import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Partner from "@/components/Partner";

export default function Partners() {
  return (
    <div className="min-h-screen flex flex-col  text-[#232b34]">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="mt-32">
          <Partner />
        </div>
      </div>
      <Footer />
    </div>
  );
}
