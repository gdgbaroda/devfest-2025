import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScheduleInfo from "@/components/ScheduleInfo";

export default function Schedule() {
    return <div className="font-operetta-12 text-[#232b34]">
        <Background />
        <Navbar />
        <ScheduleInfo />
        <Footer />
    </div>;
}