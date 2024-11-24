import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sponsors from "@/components/Sponsor";

export default function Schedule() {
    return <div className="font-operetta-12 text-[#232b34]">
        <Background />
        <Navbar />
        <div className="my-32">
            <Sponsors />
        </div>
        <Footer />
    </div>;
}