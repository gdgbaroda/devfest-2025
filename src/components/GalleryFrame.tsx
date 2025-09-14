import Image from "next/image";

export default function GalleryFrame({
  img,
  className = "",
}: {
  img: string;
  className?: string;
}) {
  return (
    <div className={`group relative ${className}`}>
      {/* Main frame */}
      <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)] saturate-110">
        {/* Image layer with subtle scale on hover */}
        <div className="absolute inset-0">
          <Image
            src={img}
            alt="Gallery Image"
            fill
            loading="lazy"
            quality={60}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:rotate-[0.25deg]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Hover overlay gradient + subtle shine */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="pointer-events-none absolute -inset-1 bg-[radial-gradient(120px_60px_at_70%_0%,rgba(255,255,255,0.35),transparent)] opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
      </div>
    </div>
  );
}
