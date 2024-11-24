import Image from "next/image";

export default function PartnerFrame({ name, logo }: { name: string, logo: string }) {
    return (
        <div className="group relative">
            <div className="absolute w-[130px] md:w-[160px] lg:w-[180px] aspect-square 
                          border-2 border-[#232b34] bg-[#1b2631] translate-x-1 translate-y-1">
            </div>

            <div className="relative w-[130px] md:w-[160px] lg:w-[180px] aspect-square
                          border-2 border-[#232b34] bg-[#eed7ca]
                          transition-transform duration-100 
                          group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <div className="relative w-full h-full p-3 md:p-6">
                    <Image
                        src={logo}
                        alt={name}
                        fill
                        className="object-contain bg-white p-3"
                        sizes="(max-width: 768px) 130px,
                               (max-width: 1024px) 160px,
                               180px"
                    />
                </div>
            </div>
        </div>
    );
}