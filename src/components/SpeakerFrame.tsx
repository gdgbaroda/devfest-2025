import Image from "next/image";

interface SpeakerFrameProps {
  img: string;
  name: string;
  role?: string;
  company?: string;
}

export default function SpeakerFrame({
  img,
  name,
  role,
  company,
}: SpeakerFrameProps) {
  return (
    <div className="group flex flex-col items-center p-0">
      {/* Image container */}
      <div className="relative w-48 aspect-square md:w-56 lg:w-64 mb-4 overflow-hidden flex items-center justify-center rounded-3xl shadow-[0_8px_20px_-8px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out will-change-transform transform-gpu group-hover:-translate-y-1 group-hover:shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)] group-hover:saturate-110">
        <Image
          src={img}
          alt={`${name}'s profile`}
          fill
          loading="lazy"
          quality={70}
          sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
          className="object-cover object-center"
          style={{
            objectPosition: "center",
          }}
        />
      </div>

      {/* Text content */}
      <div className="relative flex flex-col items-center space-y-1">
        <h3 className="font-open-sans text-lg md:text-xl lg:text-2xl font-bold whitespace-pre-line">
          {name}
        </h3>
        {role && (
          <p className="font-open-sans text-sm md:text-base text-gray-900 whitespace-pre-line">
            {role}
          </p>
        )}
        {company && (
          <p className="font-open-sans text-sm md:text-base text-zinc-600">
            {company}
          </p>
        )}
      </div>
    </div>
  );
}
