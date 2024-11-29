import Image from "next/image";

const organizers = [
    {
        name: "Akhil Tushar",
        image: "/team/organizers/akhil_tushar.jpg"
    },
    {
        name: "Dron Trivedi",
        image: "/team/organizers/dron_trivedi.png"
    },
    {
        name: "Hardik Mistry",
        image: "/team/organizers/hardikmistry.jpeg"
    },
    {
        name: "Hardip Patel",
        image: "/team/organizers/hardip_patel.png"
    },
    {
        name: "Kushal Dave",
        image: "/team/organizers/kushal_dave.png"
    },
    {
        name: "Prachi Durge",
        image: "/team/organizers/prachi.png"
    },
    {
        name: "Rahul Banker",
        image: "/team/organizers/rahul_banker.png"
    },

];

const volunteers = [
    {
        name: "Ashutosh Bhagat",
        image: "/team/volunteers/Ashutosh_Bhagat.png"
    },
    {
        name: "Ayush Makwana",
        image: "/team/volunteers/Ayush_Makwana.png"
    },
    {
        name: "Chirag Savsani",
        image: "/team/volunteers/Chirag_Savsani.png"
    },
    {
        name: "Devansh Rajan",
        image: "/team/volunteers/Devansh_Rajan.png"
    },
    {
        name: "Divya Chhabaria",
        image: "/team/volunteers/Divya_Chhabaria.png"
    },
    {
        name: "Naiteek Chokshi",
        image: "/team/volunteers/Naiteek_Chokshi.png"
    },
    {
        name: "Riddhika Cheruku",
        image: "/team/volunteers/Riddhika_Cheruku.png"
    },
    {
        name: "Rutunj Parikh",
        image: "/team/volunteers/Rutunj_Parikh.png"
    },
    {
        name: "Shivansh Darji",
        image: "/team/volunteers/Shivansh_Darji.png"
    },
    {
        name: "Yuvraj Ahuja",
        image: "/team/volunteers/Yuvraj_Ahuja.png"
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
                    <div className="relative border-2 border-[#232b34] bg-[#eed7ca]">
                        <Image
                            src="/banner.png"
                            alt="About"
                            width={1920}
                            height={1080}
                            className="w-full h-auto"
                            priority={true}
                            quality={100}
                        />
                    </div>
                </div>

                <div className="text-center mt-6 md:mt-8 max-w-4xl mx-auto">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-zinc-900">GDG Baroda: DevFest 2024</h1>
                    <div className="font-open-sans text-sm md:text-base lg:text-lg">
                        <p className="mb-3 md:mb-4">
                            DevFest Baroda is a technology conference celebrating innovation, creativity, and collaboration in the world of software development. Brought to you by <a className="underline" target="_blank" href="https://gdg.community.dev/gdg-baroda">Google Developers Group Baroda</a>, this annual event brings together developers, tech enthusiasts, and industry experts from across the region to explore cutting-edge technologies, share knowledge, and inspire the next generation of tech innovators.
                        </p>
                        <p className="mb-3 md:mb-4">
                            Our mission is to create a vibrant platform where passionate technologists can learn, network, and push the boundaries of what&apos;s possible in software development, cloud computing, mobile technologies, and emerging tech trends. With engaging workshops, insightful talks, and hands-on sessions, DevFest Baroda is more than just a conference—it&apos;s a celebration of technology and community.
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
                <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Volunteers</h2>
                <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center max-w-[1250px] mx-auto px-4 md:px-0">
                    {volunteers.map((member, index) => (
                        <div key={index} className="group flex flex-col items-center w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(25%-16px)] lg:w-[calc(20%-16px)]">
                            <div className="relative">
                                {/* Shadow/Background frame */}
                                <div className="absolute w-[120px] sm:w-[130px] md:w-[160px] lg:w-[180px] aspect-square 
                                              border-2 border-[#232b34] bg-[#1b2631] translate-x-1 translate-y-1">
                                </div>

                                {/* Main frame */}
                                <div className="relative w-[120px] sm:w-[130px] md:w-[160px] lg:w-[180px] aspect-square
                                              border-2 border-[#232b34] bg-[#eed7ca]
                                              transition-transform duration-100 
                                              group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                            quality={70}
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

            {/* Organizers */}
            <div className="mt-12 md:mt-24">
                <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Organizers</h2>
                <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center max-w-[1250px] mx-auto px-4 md:px-0">
                    {organizers.map((member, index) => (
                        <div key={index} className="group flex flex-col items-center w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(25%-16px)] lg:w-[calc(20%-16px)]">
                            <div className="relative">
                                {/* Shadow/Background frame */}
                                <div className="absolute w-[120px] sm:w-[130px] md:w-[160px] lg:w-[180px] aspect-square 
                                              border-2 border-[#232b34] bg-[#1b2631] translate-x-1 translate-y-1">
                                </div>

                                {/* Main frame */}
                                <div className="relative w-[120px] sm:w-[130px] md:w-[160px] lg:w-[180px] aspect-square
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