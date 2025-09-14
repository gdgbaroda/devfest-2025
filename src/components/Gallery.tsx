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
  const images = [
    "/gallery/3.jpg",
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/11.jpg",
    "/gallery/7.jpg",
    "/gallery/10.jpg",
    "/gallery/6.jpg",
    "/gallery/8.jpg",
    "/gallery/5.jpg",
    "/gallery/4.jpg",
    "/gallery/13.jpg",
    "/gallery/12.jpg",
  ];

  const spans = [
    "col-span-2 row-span-2 lg:col-span-2 lg:row-span-3", // Large feature
    "col-span-2 row-span-1 lg:col-span-2 lg:row-span-2", // Medium horizontal
    "col-span-1 row-span-2 lg:col-span-2 lg:row-span-2", // Medium vertical
    "col-span-1 row-span-1 lg:col-span-2 lg:row-span-2", // Small square
    "col-span-2 row-span-2 lg:col-span-2 lg:row-span-3", // Large feature
    "col-span-2 row-span-1 lg:col-span-2 lg:row-span-2", // Medium horizontal
    "col-span-1 row-span-2 lg:col-span-2 lg:row-span-2", // Medium vertical
    "col-span-1 row-span-1 lg:col-span-2 lg:row-span-2", // Small square
    "col-span-2 row-span-2 lg:col-span-2 lg:row-span-3", // Large feature
    "col-span-2 row-span-1 lg:col-span-2 lg:row-span-2", // Medium horizontal
    "col-span-1 row-span-2 lg:col-span-2 lg:row-span-2", // Medium vertical
    "col-span-1 row-span-1 lg:col-span-2 lg:row-span-2", // Small square
  ];

  return (
    <div className="flex flex-col h-full w-full px-4 md:px-8 lg:px-16 xl:px-32 my-10 md:my-16 gap-4 md:gap-10">
      <h1 className="text-3xl lg:text-4xl font-bold text-center">{title}</h1>
      <h2
        className={`text-lg md:text-xl text-gray-700 text-center ${
          description ? "" : "hidden"
        }`}
      >
        {description}
      </h2>
      {/* Responsive masonry-style grid with dynamic sizing */}
      <div className="relative">
        <div
          className={`grid grid-flow-dense grid-cols-4 md:grid-cols-6 lg:grid-cols-8 auto-rows-[100px] sm:auto-rows-[120px] md:auto-rows-[130px] lg:auto-rows-[140px] gap-3 md:gap-4 lg:gap-6 transition-[max-height] duration-500 ease-out overflow-hidden ${
            expanded
              ? "max-h-[3600px]"
              : "max-h-[600px] md:max-h-[700px] lg:max-h-[800px]"
          }`}
          aria-expanded={expanded}
        >
          {images.map((src, i) => (
            <GalleryFrame
              key={src}
              img={src}
              className={`${spans[i]} hover:scale-[1.02] transition-transform duration-300`}
            />
          ))}
        </div>

        {/* Bottom gradient/shadow overlay shown when collapsed */}
        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-200 to-transparent" />
        )}

        {/* Toggle button */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="relative z-[1] inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xl font-bold text-gray-800 bg-white/80 backdrop-blur border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            {expanded ? "Show less" : "Show all images"}
          </button>
        </div>
      </div>
    </div>
  );
}
