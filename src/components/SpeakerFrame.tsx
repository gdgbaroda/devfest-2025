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
    <div className="group flex flex-col items-center p-0 px-2 sm:px-0">
      {/* Image container */}
      <div className="relative w-40 sm:w-44 md:w-56 lg:w-64 aspect-square mb-4 overflow-hidden flex items-center justify-center rounded-3xl shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)] saturate-110">
        <Image
          src={img}
          alt={`${name}'s profile`}
          fill
          loading="lazy"
          quality={70}
          sizes="(max-width: 640px) 160px, (max-width: 768px) 176px, (max-width: 1024px) 224px, 256px"
          className="object-cover object-center"
          style={{
            objectPosition: "center",
          }}
        />
      </div>

      {/* Text content */}
      <div className="relative flex flex-col items-center space-y-1">
        <h3 className=" text-lg md:text-xl lg:text-2xl font-bold whitespace-pre-line">
          {name}
        </h3>
        {role && (
          <p className=" text-sm md:text-base text-gray-900 whitespace-pre-line">
            {role}
          </p>
        )}
        {company && (
          <p className=" text-sm md:text-base text-zinc-600">{company}</p>
        )}
      </div>
    </div>
  );
}
