import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Schedule() {
    return <div className="font-operetta-12 text-[#232b34]">
        <Background />
        <Navbar />
        <div className="mt-24">
            <AboutSection />
        </div>
        <Footer />
    </div>;
}