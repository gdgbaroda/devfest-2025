import sponsorsData from "@/data/sponsors";
import Image from "next/image";
import Callout from "./Callout";

export default function Sponsors() {
  return (
    <div className="flex flex-col h-full w-full px-4 md:px-8 lg:px-16 xl:px-32 my-10 md:my-16 gap-6 md:gap-10 items-center text-center">
      <h1 className="font-open-sans text-3xl lg:text-4xl font-bold">
        Sponsors
      </h1>
      <Callout title="To be announced..." />
      {/* <p className="font-open-sans text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl">
        We are grateful to our sponsors for their generous support, helping us
        bring this event to life.
      </p> */}
      {/* <div className="space-y-12 md:space-y-16"> */}
      {/* {Object.entries(sponsorsData).map(([tier, sponsors]) => ( */}
      {/* <div key={tier} className="space-y-4"> */}
      {/* <h2 className="font-open-sans text-2xl lg:text-3xl font-semibold capitalize"> */}
      {/* {tier} */}
      {/* </h2> */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 place-items-center"> */}
      {/* {sponsors.map((sponsor, index) => ( */}
      {/* <div key={index} className="group relative"> */}
      {/* Main frame */}
      {/* <div className="relative w-[150px] sm:w-[180px] md:w-[220px] lg:w-[250px] aspect-square rounded-3xl overflow-hidden shadow-[0_8px_20px_-8px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out will-change-transform transform-gpu group-hover:-translate-y-1 group-hover:shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)] group-hover:saturate-110"> */}
      {/* <div className="relative w-full h-full p-4 sm:p-6 md:p-8"> */}
      {/* <Image */}
      {/* src={sponsor.logo} */}
      {/* alt={sponsor.name} */}
      {/* fill */}
      {/* className="object-contain bg-white p-4" */}
      {/* sizes="(max-width: 640px) 150px, */}
      {/* (max-width: 768px) 180px, */}
      {/* (max-width: 1024px) 220px, */}
      {/* 250px" */}
      {/* /> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* ))} */}
      {/* </div> */}
      {/* </div> */}
      {/* ))} */}
      {/* </div> */}
    </div>
  );
}
