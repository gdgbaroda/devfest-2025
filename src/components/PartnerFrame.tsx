import Image from "next/image";

export default function PartnerFrame({
  name,
  logo,
}: {
  name: string;
  logo: string;
}) {
  return (
    <div className="group relative">
      <div className="relative w-[130px] md:w-[160px] lg:w-[180px] aspect-square rounded-3xl overflow-hidden shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)] saturate-110">
        <div className="relative w-full h-full p-3 md:p-6">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain bg-white p-2 md:p-3"
            sizes="(max-width: 768px) 130px,
                               (max-width: 1024px) 160px,
                               180px"
          />
        </div>
      </div>
    </div>
  );
}
