import PartnerFrame from "@/components/PartnerFrame";

export default function Partner() {
  return (
    <div className="flex flex-col h-full w-full px-4 md:px-8 lg:px-16 xl:px-32 my-10 md:my-16 gap-6 md:gap-10 items-center text-center">
      <h1 className=" text-3xl lg:text-4xl font-bold">Community Partners</h1>
      <p className=" text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl">
        Our community partners play a vital role in supporting and enhancing our
        event. We are thankful for their collaboration and commitment.
      </p>
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center"> */}
      <div className="flex justify-center w-full">
        {/* <PartnerFrame name={"JetBrains"} logo={"/logo/jetbrains.svg"} /> */}
        <PartnerFrame name={"Appmattic"} logo={"/logo/Appmattic.svg"} />
        <PartnerFrame name={"Atliq"} logo={"/logo/Atliq.svg"} />
        <PartnerFrame name={"Atyantik"} logo={"/logo/Atyantik.svg"} />
        <PartnerFrame name={"AV Devs"} logo={"/logo/AVDevs.svg"} />
        <PartnerFrame name={"FFDG Vadodara"} logo={"/logo/FFDGVadodara.svg"} />
        <PartnerFrame name={"Novumlogic"} logo={"/logo/Novumlogic.svg"} />
        <PartnerFrame name={"OneFrame"} logo={"/logo/OneFrame.svg"} />
        <PartnerFrame name={"Pardy Panda"} logo={"/logo/pardy-panda.svg"} />
        <PartnerFrame name={"Pavans"} logo={"/logo/Pavans.svg"} />
        <PartnerFrame name={"SunflowerLabs"} logo={"/logo/SunflowerLabs.svg"} />
        <PartnerFrame name={"Anormaly"} logo={"/logo/Anormaly.svg"} />
      </div>
    </div>
  );
}
