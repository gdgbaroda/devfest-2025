'use client';
import { useRouter } from 'next/navigation';

export default function HeroButton({ title, link }: { title: string, link: string }) {
    const router = useRouter();

    const handleClick = () => {
        if (link.match(/^https?:\/\//)) {
            window.open(link, '_blank'); 
        } else {
            router.push(link); 
        }
    };

    return (
        <button className="group relative" onClick={handleClick}>
            {/* Shadow/Background button */}
            <div className="absolute h-8 md:h-10 lg:h-12 px-6 md:px-8 lg:px-14 
                          border-2 border-[#232b34] translate-y-1 translate-x-1 
                          bg-[#1b2631]">
                <span className="text-base md:text-lg lg:text-xl font-semibold">
                    {title}
                </span>
            </div>

            {/* Main button */}
            <div className="relative h-8 md:h-10 lg:h-12 px-6 md:px-8 lg:px-14 
                          border-2 border-[#232b34] bg-[#eed7ca]
                          flex items-center justify-center 
                          transition-transform duration-200 
                          group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <span className="text-base md:text-lg lg:text-xl font-semibold">
                    {title}
                </span>
            </div>
        </button>
    );
}