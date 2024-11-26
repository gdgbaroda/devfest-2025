import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Speakers from "@/components/Speaker";

export default function Schedule() {
    return <div className="font-operetta-12 text-[#232b34]">
        <Background />
        <Navbar />
        <div className="mt-32">
            <Speakers />
        </div>
        <Footer />
    </div>;
}