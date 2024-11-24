import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Partner from "@/components/Partner";

export default function Partners() {
    return <div className="font-operetta-12 text-[#232b34]">
        <Background />
        <Navbar />
        <div className="my-32">
            <Partner />
        </div>
        <Footer />
    </div>;
}