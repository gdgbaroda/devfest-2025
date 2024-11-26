import sponsorsData from "@/data/sponsors";
import Image from "next/image";

export default function Sponsors() {
    return (
        <div className="flex flex-col h-full w-full px-4 md:px-8 lg:px-16 xl:px-32 my-10 md:my-16 gap-6 md:gap-10">
            <h1 className="font-operetta-12 text-3xl lg:text-4xl font-bold">
                Sponsors
            </h1>
            <p className="font-open-sans text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl">
                We are grateful to our sponsors for their generous support, helping us bring this event to life.
            </p>

            <div className="space-y-12 md:space-y-16">
                {Object.entries(sponsorsData).map(([tier, sponsors]) => (
                    <div key={tier} className="space-y-4">
                        <h2 className="font-operetta-12 text-2xl lg:text-3xl font-semibold capitalize">
                            {tier}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 place-items-center">
                            {sponsors.map((sponsor, index) => (
                                <div key={index} className="group relative">
                                    {/* Shadow/Background frame */}
                                    <div className="absolute w-[150px] sm:w-[180px] md:w-[220px] lg:w-[250px] aspect-square 
                                                  border-2 border-[#232b34] bg-[#1b2631] translate-x-1 translate-y-1">
                                    </div>

                                    {/* Main frame */}
                                    <div className="relative w-[150px] sm:w-[180px] md:w-[220px] lg:w-[250px] aspect-square
                                                  border-2 border-[#232b34] bg-[#eed7ca]
                                                  transition-transform duration-100 
                                                  group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                                        <div className="relative w-full h-full p-4 sm:p-6 md:p-8">
                                            <Image
                                                src={sponsor.logo}
                                                alt={sponsor.name}
                                                fill
                                                className="object-contain bg-white p-4"
                                                sizes="(max-width: 640px) 150px,
                                                       (max-width: 768px) 180px,
                                                       (max-width: 1024px) 220px,
                                                       250px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}