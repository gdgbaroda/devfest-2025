import Image from "next/image";

export default function GalleryFrame({ img }: { img: string }) {
    return (
        <div className="group relative p-4 flex justify-center">
            {/* Shadow/Background frame */}
            <div className="absolute w-[250px] md:w-[280px] lg:w-[300px] aspect-[4/3]
                          border-2 border-[#232b34] bg-[#1b2631] translate-y-2 translate-x-2">
            </div>

            {/* Main frame */}
            <div className="relative w-[250px] md:w-[280px] lg:w-[300px] aspect-[4/3]
                          border-2 border-[#232b34] bg-[#eed7ca] 
                          transition-transform duration-200 
                          group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <Image
                    src={img}
                    alt="Gallery Image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 300px, 
                    (max-width: 1024px) 360px, 
                    420px"
                />
            </div>
        </div>
    );
}