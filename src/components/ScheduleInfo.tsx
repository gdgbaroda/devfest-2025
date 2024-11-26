import scheduleData from "@/data/schedule";
import type { ScheduleSection } from "@/data/schedule";
import { Separator } from "./ui/separator";

export default function ScheduleInfo() {
    return (
        <div className="flex flex-col w-full px-4 md:px-8 lg:px-16 xl:px-32 py-32">
            <div className="max-w-4xl mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="font-operetta-12 text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Event Schedule
                    </h1>
                    <p className="font-open-sans text-gray-600 text-lg md:text-xl">
                        December 1, 2024
                    </p>
                </div>


                {/* Schedule Content */}
                <div className="relative space-y-8">
                    {/* Shadow/Background frame */}
                    <div className="absolute inset-0 bg-[#1b2631] translate-x-1.5 translate-y-1.5" />
                    {/* Main frame */}
                    <div className="relative bg-[#fff1e4] overflow-hidden border-2 border-[#232b34]">

                        {scheduleData.map((section: ScheduleSection, sectionIndex: number) => (
                            <div key={sectionIndex} className="group relative">

                                {/* Section Header */}
                                {/* <div className="bg-[#eed7ca] text-black px-6 py-4">
                                    <h2 className="font-operetta-12 text-lg md:text-xl font-semibold">
                                        {section.title}
                                    </h2>
                                </div> */}

                                {/* Section Items */}
                                <div className="font-open-sans">
                                    {section.items.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between px-6 
                          min-h-[80px] py-3 gap-y-1">
                                                <div className="mb-2 sm:mb-0 flex-1">
                                                    <h3 className="text-gray-900 font-medium line-clamp-2">
                                                        {item.title}
                                                    </h3>
                                                    {item.speaker && (
                                                        <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                                                            {item.speaker}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-zinc-500 text-sm sm:text-base font-medium shrink-0 sm:ml-4">
                                                    {item.time}
                                                </div>
                                            </div>
                                            {sectionIndex !== scheduleData.length - 1 && (
                                                <div className="px-6">
                                                    <Separator
                                                        className="bg-neutral-300"
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