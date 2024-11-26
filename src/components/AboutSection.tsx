import Image from "next/image";

const teamMembers = [
    {
        name: "Dron Trivedi",
        image: "/team/dron_trivedi.png"
    },
    {
        name: "Hardik Mistry",
        image: "/team/hardikmistry.jpeg"
    },
    {
        name: "Hardip Patel",
        image: "/team/hardip_patel.png"
    },
    {
        name: "Kushal Dave",
        image: "/team/kushal_dave.png"
    },
    {
        name: "Prachi Durge",
        image: "/team/prachi.png"
    },
    {
        name: "Rahul Banker",
        image: "/team/rahul_banker.png"
    },

];

export default function AboutSection() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center text-[#232b34]">
            <div className="w-full px-6 md:px-8 lg:px-16 xl:px-32 p-4">
                <div className="group relative max-w-4xl mx-auto">
                    {/* Shadow/Background frame */}
                    <div className="absolute inset-0
                                  border-2 border-[#232b34] bg-[#1b2631] translate-x-1 translate-y-1">
                    </div>

                    {/* Main frame */}
                    <div className="relative border-2 border-[#232b34] bg-[#eed7ca]
                                  transition-transform duration-100 
                                  group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                        <Image
                            src="/banner.png"
                            alt="About"
                            width={1200}
                            height={675}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>

                <div className="text-center mt-6 md:mt-8 max-w-4xl mx-auto">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">DevFest Baroda</h1>
                    <div className="font-open-sans text-sm md:text-base lg:text-lg">
                        <p className="mb-3 md:mb-4">
                            DevFest Baroda is a technology conference celebrating innovation, creativity, and collaboration in the world of software development. Brought to you by <a className="underline" target="_blank" href="https://gdg.community.dev/gdg-baroda">Google Developers Group Baroda</a> , this annual event brings together developers, tech enthusiasts, and industry experts from across the region to explore cutting-edge technologies, share knowledge, and inspire the next generation of tech innovators.
                        </p>
                        <p className="mb-3 md:mb-4">
                            Our mission is to create a vibrant platform where passionate technologists can learn, network, and push the boundaries of what's possible in software development, cloud computing, mobile technologies, and emerging tech trends. With engaging workshops, insightful talks, and hands-on sessions, DevFest Baroda is more than just a conference—it's a celebration of technology and community.
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
            <div className="mt-12 md:mt-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Organizers</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 justify-items-center">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="group flex flex-col items-center">
                            <div className="relative">
                                {/* Shadow/Background frame */}
                                <div className="absolute w-[130px] md:w-[160px] lg:w-[180px] aspect-square 
                                              border-2 border-[#232b34] bg-[#1b2631] translate-x-1 translate-y-1">
                                </div>

                                {/* Main frame */}
                                <div className="relative w-[130px] md:w-[160px] lg:w-[180px] aspect-square
                                              border-2 border-[#232b34] bg-[#eed7ca]
                                              transition-transform duration-100 
                                              group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
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
                                <h3 className="font-operetta-12 text-base md:text-lg lg:text-xl font-bold whitespace-pre-line">
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