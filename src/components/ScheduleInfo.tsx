import scheduleData from "@/data/schedule";
import type { ScheduleSection } from "@/data/schedule";
import { Separator } from "./ui/separator";
import Callout from "./Callout";

export default function ScheduleInfo() {
  return (
    <div className="flex flex-col w-full px-4 md:px-8 lg:px-16 xl:px-32 pt-32">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center flex flex-col space-y-10 items-center justify-center mb-12 md:mb-16">
          <h1 className="font-open-sans text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Event Schedule
          </h1>
          <Callout title="Stay tuned for the event schedule!" />
          {/* <p className="font-open-sans text-gray-600 text-lg md:text-xl">
            December 1, 2024
          </p> */}
        </div>

        {/* Schedule Content */}
        {/* <div className="relative space-y-8"> */}
        {/* Main frame */}
        {/* <div className="relative bg-transparent overflow-hidden rounded-3xl border-2"> */}
        {/* {scheduleData.map( */}
        {/* (section: ScheduleSection, sectionIndex: number) => ( */}
        {/* <div key={sectionIndex} className="group relative"> */}
        {/* Section Items */}
        {/* <div className="font-open-sans"> */}
        {/* {section.items.map((item, itemIndex) => ( */}
        {/* <div key={itemIndex}> */}
        {/* <div */}
        {/* className={`flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between px-6  */}
        {/* min-h-[80px] py-3 gap-y-1 ${ */}
        {/* section.title === "Break" ? "bg-gray-100" : "" */}
        {/* }`} */}
        {/* > */}
        {/* <div className="mb-2 sm:mb-0 flex-1"> */}
        {/* <h3 className="text-gray-900 text-lg font-medium line-clamp-2"> */}
        {/* {item.title} */}
        {/* </h3> */}
        {/* {item.speaker && ( */}
        {/* <p className="text-gray-500 text-md mt-1 line-clamp-1"> */}
        {/* {item.speaker} */}
        {/* </p> */}
        {/* )} */}
        {/* </div> */}
        {/* <div className="text-zinc-500 text-md sm:text-base font-medium shrink-0 sm:ml-4"> */}
        {/* {item.time} */}
        {/* </div> */}
        {/* </div> */}
        {/* {sectionIndex !== scheduleData.length - 1 && ( */}
        {/* <div className="px-6"> */}
        {/* <Separator */}
        {/* className="bg-neutral-300" */}
        {/* orientation="horizontal" */}
        {/* /> */}
        {/* </div> */}
        {/* )} */}
        {/* </div> */}
        {/* ))} */}
        {/* </div> */}
        {/* </div> */}
        {/* ) */}
        {/* )} */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
