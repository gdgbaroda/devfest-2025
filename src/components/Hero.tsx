import HeroButton from "@/components/Buttons/HeroButton";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center px-4 md:px-8 lg:px-16">
      <div className="relative w-full max-w-[450px] lg:max-w-[600px] xl:max-w-[700px] aspect-video">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <Image
            src="/DF25-Logo-Lockup.svg"
            alt="DevFest 2025 Logo"
            fill
            priority={true}
            className="object-contain select-none pointer-events-none"
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 450px, (max-width: 1280px) 600px, 700px"
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center text-lg md:text-2xl lg:text-3xl font-medium text-gray-800 mt-2 md:mt-4">
        <span>4-5 October 2025</span>
        <span className="hidden md:inline mx-2 md:mx-3">|</span>
        <a
          href="https://maps.app.goo.gl/ehfmWujjjPK2qLbGA"
          target="_blank"
          className="hover:underline hover:text-blue-500 transition-all duration-300"
        >
          Sayaji Hotel Vadodara
        </a>
      </div>
      <div className="flex flex-row gap-4 sm:gap-8 mt-6 md:mt-8">
        <HeroButton
          title="Get Tickets"
          link="https://in.explara.com/e/gdg-baroda--devfest-2025"
        />
        <HeroButton title="Schedule" link="/schedule" />
      </div>
    </div>
  );
}
