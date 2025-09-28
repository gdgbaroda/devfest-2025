import Image from "next/image";

const organizers = [
  {
    name: "Dron Trivedi",
    image: "/team/organizers/dron_trivedi.jpg",
  },
  {
    name: "Hardik Mistry",
    image: "/team/organizers/hardikmistry.jpeg",
  },
  {
    name: "Hardip Patel",
    image: "/team/organizers/hardip_patel.jpg",
  },
  {
    name: "Jigish Dalal",
    image: "/team/organizers/jigish.jpeg",
  },
  {
    name: "Kushal Dave",
    image: "/team/organizers/kushal_dave.jpg",
  },
  {
    name: "Rahul Banker",
    image: "/team/organizers/rahul_banker.jpg",
  },
];

const volunteers = [
  {
    name: "Ashutosh Bhagat",
    image: "/team/volunteers/Ashutosh_Bhagat.jpg",
  },
  {
    name: "Ayush Makwana",
    image: "/team/volunteers/Ayush_Makwana.jpg",
  },
  {
    name: "Chirag Savsani",
    image: "/team/volunteers/Chirag_Savsani.jpg",
  },
  {
    name: "Devansh Rajan",
    image: "/team/volunteers/Devansh_Rajan.jpg",
  },
  {
    name: "Divya Machhi",
    image: "/team/volunteers/Divya-Machhi.jpeg",
  },
  {
    name: "Harsh Mehta",
    image: "/team/volunteers/Harsh_Mehta.jpg",
  },
  {
    name: "Naiteek Chokshi",
    image: "/team/volunteers/Naiteek_Chokshi.jpg",
  },
  {
    name: "Rutunj Parikh",
    image: "/team/volunteers/rutunj.jpg",
  },
  {
    name: "Shivansh Darji",
    image: "/team/volunteers/Shivansh_Darji.jpg",
  },
  {
    name: "Swapnil Trivedi",
    image: "/team/volunteers/Swapnil_Trivedi.jpg",
  },
  {
    name: "Yuvraj Ahuja",
    image: "/team/volunteers/Yuvraj_Ahuja.jpg",
  },
];

export default function AboutSection() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-[#232b34]">
      <div className="w-full px-6 md:px-8 lg:px-16 xl:px-32 p-4">
        <div className="group relative max-w-4xl mx-auto">
          {/* Main frame */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)] saturate-110">
            <Image
              src="/GroupPhoto1.jpg"
              alt="About"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority={true}
              quality={70}
            />
          </div>
        </div>

        <div className="text-center mt-6 md:mt-8 max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-zinc-900">
            GDG Baroda
          </h1>
          <div className=" text-sm md:text-base lg:text-lg">
            <p className="mb-3 md:mb-4">
              DevFest Baroda is a technology conference celebrating innovation,
              creativity, and collaboration in the world of software
              development. Brought to you by{" "}
              <a
                className="underline"
                target="_blank"
                href="https://gdg.community.dev/gdg-baroda"
              >
                Google Developers Group Baroda
              </a>
              , this annual event brings together developers, tech enthusiasts,
              and industry experts from across the region to explore
              cutting-edge technologies, share knowledge, and inspire the next
              generation of tech innovators.
            </p>
            <p className="mb-3 md:mb-4">
              Our mission is to create a vibrant platform where passionate
              technologists can learn, network, and push the boundaries of
              what&apos;s possible in software development, cloud computing,
              mobile technologies, and emerging tech trends. With engaging
              workshops, insightful talks, and hands-on sessions, DevFest Baroda
              is more than just a conference—it&apos;s a celebration of
              technology and community.
            </p>
            <ul className="list-disc list-inside space-y-1 md:space-y-2">
              <div>Discover the latest technological innovations</div>
              <div>Learn from industry experts and thought leaders</div>
              <div>Network with like-minded professionals</div>
              <div>Get inspired by groundbreaking ideas and projects</div>
            </ul>
          </div>
        </div>
      </div>

      {/* Volunteers */}
      <div className="mt-12 md:mt-20">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center">
          Volunteers
        </h2>
        <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center max-w-[1250px] mx-auto px-4 md:px-0">
          {volunteers.map((member, index) => (
            <div
              key={index}
              className="group flex flex-col items-center w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(25%-16px)] lg:w-[calc(20%-16px)]"
            >
              <div className="relative">
                {/* Main frame */}
                <div className="relative w-[120px] sm:w-[130px] md:w-[160px] lg:w-[180px] aspect-square overflow-hidden rounded-3xl shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)] saturate-110">
                  <div className="relative w-full h-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      quality={70}
                      sizes="(max-width: 768px) 130px,(max-width: 1024px) 160px,180px"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2 md:mt-4 text-center">
                <h3 className=" text-base md:text-lg lg:text-xl font-bold whitespace-pre-line">
                  {member.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Organizers */}
      <div className="mt-12 md:mt-24">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center">
          Organizers
        </h2>
        <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center max-w-[1250px] mx-auto px-4 md:px-0">
          {organizers.map((member, index) => (
            <div
              key={index}
              className="group flex flex-col items-center w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(25%-16px)] lg:w-[calc(20%-16px)]"
            >
              <div className="relative">
                {/* Main frame */}
                <div className="relative w-[120px] sm:w-[130px] md:w-[160px] lg:w-[180px] aspect-square overflow-hidden rounded-3xl shadow-[0_18px_35px_-10px_rgba(0,0,0,0.35)] saturate-110">
                  <div className="relative w-full h-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 130px,
                                                   (max-width: 1024px) 160px,
                                                   180px"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2 md:mt-4 text-center">
                <h3 className=" text-base md:text-lg lg:text-xl font-bold whitespace-pre-line">
                  {member.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
