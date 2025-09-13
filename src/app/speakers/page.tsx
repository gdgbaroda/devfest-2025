import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Speakers from "@/components/Speaker";

export default function Schedule() {
  return (
    <div className="min-h-screen flex flex-col font-open-sans text-[#232b34]">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="mt-32">
          <Speakers />
        </div>
      </div>
      <Footer />
    </div>
  );
}
