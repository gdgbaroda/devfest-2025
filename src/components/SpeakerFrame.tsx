import Image from "next/image";

interface SpeakerFrameProps {
    img: string;
    name: string;
    role?: string;
    company?: string;
}

export default function SpeakerFrame({ img, name, role, company }: SpeakerFrameProps) {
    return (
        <div className="group flex flex-col items-center p-0 select-none pointer-events-none">
            {/* Image container */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-4 flex items-center justify-center">
                <Image
                    src={img}
                    alt={`${name}'s profile`}
                    fill
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                    className="object-contain object-center"
                    style={{
                        objectPosition: 'center'
                    }}
                    priority
                />
            </div>

            {/* Text content */}
            <div className="relative flex flex-col items-center space-y-1">
                <h3 className="font-operetta-12 text-lg md:text-xl lg:text-2xl font-bold whitespace-pre-line">
                    {name}
                </h3>
                {role && (
                    <p className="font-open-sans text-sm md:text-base text-gray-800 whitespace-pre-line">
                        {role}
                    </p>
                )}
                {company && (
                    <p className="font-open-sans text-sm md:text-base text-zinc-500">
                        {company}
                    </p>
                )}
            </div>
        </div>
    );
}