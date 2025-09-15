"use client";
import { useState } from "react";

export default function Gallery({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const videos = [
    "https://www.youtube.com/embed/CfdT0RodRlM?si=LAI4PxoXduAKmzfK",
    "https://www.youtube.com/embed/wsnh0GGxlp8?si=D2jTgn4Q8R0CiWoO",
    "https://www.youtube.com/embed/2YKPrMRYTdQ?si=-z-1Mud05pXAZonS",
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
      <div className="relative">
        <div
          className={
            "mx-auto w-full max-w-6xl transition-[max-height] duration-300 overflow-hidden " +
            (expanded ? "max-h-[4000px]" : "max-h-[420px]")
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
            {videos.map((src, idx) => (
              <div key={idx} className="w-full">
                <div className="relative w-full pt-[56.25%] rounded-3xl overflow-hidden">
                  <iframe
                    src={src}
                    title={`YouTube video ${idx + 1}`}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
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
            {expanded ? "Show less" : "Show all"}
          </button>
        </div>
      </div>
    </div>
  );
}
