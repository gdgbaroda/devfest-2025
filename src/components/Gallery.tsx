"use client";
import { useState } from "react";
import GalleryFrame from "./GalleryFrame";

export default function Gallery({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);
  // Source images (can add more here). Only first 6 are shown.
  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/6.jpg",
    "/gallery/5.jpg",
    "/gallery/4.jpg",
    "/gallery/3.jpg",
  ].slice(0, 6);

  // Bento-like span pattern for up to 6 items
  const spans = [
    "col-span-2 row-span-2 lg:col-span-3 lg:row-span-3",
    "col-span-2 row-span-1 lg:col-span-3 lg:row-span-2",
    "col-span-2 row-span-2 lg:col-span-2 lg:row-span-3",
    "col-span-2 row-span-1 lg:col-span-2 lg:row-span-2",
    "col-span-2 row-span-1 lg:col-span-2 lg:row-span-2",
    "col-span-2 row-span-2 lg:col-span-2 lg:row-span-3",
  ];

  return (
    <div className="flex flex-col h-full w-full px-4 md:px-8 lg:px-16 xl:px-32 my-10 md:my-16 gap-4 md:gap-10">
      <h1 className="font-open-sans text-3xl lg:text-4xl font-bold text-center">
        {title}
      </h1>
      <h2
        className={`font-open-sans text-lg md:text-xl text-gray-700 text-center ${
          description ? "" : "hidden"
        }`}
      >
        {description}
      </h2>
      {/* Responsive bento grid: 2/4/6 columns with row height units */}
      <div className="relative">
        <div
          className={`grid grid-flow-dense grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[110px] sm:auto-rows-[130px] md:auto-rows-[140px] lg:auto-rows-[150px] gap-4 md:gap-6 lg:gap-8 transition-[max-height] duration-500 ease-out overflow-hidden ${
            expanded
              ? "max-h-[2000px]"
              : "max-h-[520px] md:max-h-[600px] lg:max-h-[680px]"
          }`}
          aria-expanded={expanded}
        >
          {images.map((src, i) => (
            <GalleryFrame key={src} img={src} className={spans[i]} />
          ))}
        </div>

        {/* Bottom gradient/shadow overlay shown when collapsed */}
        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-200 to-transparent" />
        )}

        {/* Toggle button */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="relative z-[1] inline-flex items-center gap-2 rounded-full px-5 py-2 text-xl font-bold text-gray-800 bg-white/80 backdrop-blur border border-gray-300 shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5"
          >
            {expanded ? "View less" : "View more"}
          </button>
        </div>
      </div>
    </div>
  );
}
