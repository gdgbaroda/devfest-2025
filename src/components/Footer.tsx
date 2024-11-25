import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function Footer() {
    return (
        <div className="flex flex-col bottom-0 w-full h-64 px-4 md:px-8 lg:px-16 xl:px-32 space-y-10 justify-center items-center">
            <Separator className="my-4 bg-[#232b34]" />
            <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full gap-6 md:gap-0">
                <div className="flex flex-col items-center md:items-start md:space-y-2">
                    <Image src="/logo.svg" alt="DevFest Logo" width={200} height={200} className="h-12 w-34 lg:h-12 lg:w-56" />
                    <span className="font-open-sans opacity-75 text-center md:text-left">© 2024 GDG Baroda </span>
                </div>
                <div className="flex items-center space-x-6">
                    <a href="https://twitter.com/gdgbaroda" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/x.svg" alt="X" width={24} height={24} className="hover:opacity-80 transition-opacity contrast-75" />
                    </a>
                    <a href="https://in.linkedin.com/company/gdgbaroda" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="hover:opacity-80 transition-opacity contrast-75" />
                    </a>
                    <a href="https://www.instagram.com/gdgbaroda" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} className="hover:opacity-80 transition-opacity contrast-75" />
                    </a>
                    <a href="https://www.facebook.com/GDGBaroda" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} className="hover:opacity-80 transition-opacity contrast-75" />
                    </a>
                    <a href="https://www.youtube.com/channel/UCdAjNjPWNIXNaxu4mGJc3uw" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/youtube.svg" alt="YouTube" width={28} height={28} className="hover:opacity-80 transition-opacity contrast-75" />
                    </a>
                </div>
            </div>
        </div>
    );
}