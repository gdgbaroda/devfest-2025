import HeroButton from "@/components/HeroButton";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center px-0 md:px-8 lg:px-16">
      <div className="relative w-full max-w-[450px] lg:max-w-[600px] xl:max-w-[700px] aspect-video mt-4 md:mt-8">
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
      <div className="flex flex-row gap-4 sm:gap-8 mt-8 md:mt-12">
        <HeroButton
          title="Get Tickets"
          link="https://in.explara.com/e/gdg-baroda--devfest-2025"
        />
        <HeroButton title="Schedule" link="/schedule" />
      </div>
    </div>
  );
}
