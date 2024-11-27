import Image from "next/image";
import HeroButton from "@/components/HeroButton";

export default function Hero() {
    return (
        <div className="flex flex-col min-h-screen w-full justify-center items-center px-0 md:px-8 lg:px-16 ">
            <div className="relative w-full max-w-[450px] lg:max-w-[600px] xl:max-w-[700px] aspect-video mt-4 md:mt-8 ">
                <Image
                    src="/title.svg"
                    alt="DevFest Logo"
                    fill
                    priority={true}
                    className="object-contain select-none pointer-events-none"
                    sizes="(max-width: 768px) 300px, (max-width: 1024px) 450px, (max-width: 1280px) 600px, 700px"
                />
            </div>
            <div className="flex flex-row gap-4 sm:gap-8 mt-8 md:mt-12">
                <HeroButton title="Get Tickets" link="https://in.explara.com/e/gdg-baroda-devfest-2024" />
                <HeroButton title="Schedule" link="/schedule" />
            </div>
        </div>
    );
}