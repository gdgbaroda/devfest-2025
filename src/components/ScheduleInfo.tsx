"use client";

import { useState } from "react";
import scheduleData from "@/data/schedule";
import type { ScheduleDay } from "@/data/schedule";
import { Separator } from "./ui/separator";

export default function ScheduleInfo() {
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const getLevelBadgeColor = (level?: string) => {
    switch (level) {
      case "Started":
        return "bg-green-100 text-green-700 border-green-200";
      case "Progressing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Expert":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col h-full w-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 my-10 md:my-16 gap-6 md:gap-10 items-center text-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center flex flex-col space-y-4 sm:space-y-6 items-center justify-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Event Schedule
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            GDG DevFest Baroda 2025
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          {scheduleData.map((day: ScheduleDay, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`
                px-4 sm:px-6 py-3 rounded-2xl sm:rounded-full font-medium transition-all duration-200
                w-full sm:w-auto sm:min-w-[200px] min-h-[60px] sm:min-h-0
                ${
                  selectedDay === index
                    ? "bg-[#4285F4] text-white shadow-lg scale-100 sm:scale-105"
                    : "bg-white border-2 border-gray-300 text-gray-700 hover:border-[#4285F4] hover:text-[#4285F4]"
                }
              `}
            >
              <div className="text-base sm:text-lg font-bold">{day.day}</div>
              <div className="text-xs sm:text-sm opacity-90">{day.date}</div>
            </button>
          ))}
        </div>

        {/* Schedule Content */}
        <div className="relative space-y-6 sm:space-y-8">
          {/* Main frame */}
          <div className="relative bg-transparent overflow-hidden rounded-2xl sm:rounded-3xl border-2">
            {scheduleData[selectedDay].sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="group relative">
                {/* Section Items */}
                <div>
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <div
                        className={`flex flex-col px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 gap-y-2 sm:gap-y-3 ${
                          item.isBreak ? "bg-gray-50" : ""
                        } ${
                          item.title === "Keynote Address" ? "bg-blue-50" : ""
                        }`}
                      >
                        {/* Time */}
                        <div className="text-[#4285F4] text-xs sm:text-sm md:text-base font-semibold">
                          {item.time}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          {/* Title and Level Badge */}
                          <div className="flex flex-col sm:flex-row sm:items-start gap-2 mb-2">
                            <h3 className="text-gray-900 text-base sm:text-lg md:text-xl font-bold text-left break-words">
                              {item.title}
                            </h3>
                            {item.level && (
                              <span
                                className={`
                                  inline-block self-start sm:self-auto px-2 sm:px-3 py-0.5 sm:py-1
                                  text-[10px] sm:text-xs font-medium rounded-full border whitespace-nowrap
                                  ${getLevelBadgeColor(item.level)}
                                `}
                              >
                                {item.level}
                              </span>
                            )}
                          </div>

                          {/* Speaker */}
                          {item.speaker && (
                            <div className="text-left mb-2">
                              <p className="text-gray-800 text-sm sm:text-base font-medium">
                                {item.speaker}
                              </p>
                              {item.speakerTitle && (
                                <p className="text-gray-600 text-xs sm:text-sm">
                                  {item.speakerTitle}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Description */}
                          {item.description && !item.isBreak && (
                            <p className="text-gray-600 text-xs sm:text-sm md:text-base text-left mt-2 sm:mt-3 leading-relaxed break-words">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Separator */}
                      {!(
                        sectionIndex === scheduleData[selectedDay].sections.length - 1 &&
                        itemIndex === section.items.length - 1
                      ) && (
                        <div className="px-3 sm:px-4 md:px-6">
                          <Separator
                            className="bg-neutral-200"
                            orientation="horizontal"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}