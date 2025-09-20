"use client";
import { useRouter } from "next/navigation";

export default function HeroButton({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (link.match(/^https?:\/\//)) {
      window.open(link, "_blank");
    } else {
      router.push(link);
    }
  };

  return (
    <button className="group relative" onClick={handleClick}>
      {/* Main button */}
      <div
        className="relative h-10 md:h-12 lg:h-14 px-6 md:px-8 lg:px-14 
                          border-2 rounded-full border-[#232b34] bg-transparent
                          flex items-center justify-center 
                          transition-colors ease-in-out duration-200 
                          group-hover:bg-blue-400"
      >
        <span className="text-base md:text-xl lg:text-2xl font-semibold">
          {title}
        </span>
      </div>
    </button>
  );
}
