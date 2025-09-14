"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="mt-auto flex flex-col bottom-0 w-full px-4 md:px-8 lg:px-16 xl:px-32 py-10 md:py-12 space-y-8 justify-center items-center">
      <Separator className="my-4 bg-[#232b34]" />
      <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full gap-6 md:gap-0">
        <div className="flex flex-col items-center md:items-start md:space-y-2">
          <Image
            src="/GDG_Baroda_Logo.png"
            alt="DevFest Logo"
            priority={true}
            width={220}
            height={60}
            className="h-8 sm:h-10 md:h-10 lg:h-10 w-auto"
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 220px"
          />
          <span className=" opacity-75 text-center md:text-left">
            © 2025 GDG Baroda{" "}
          </span>
        </div>
        <div className="flex flex-col items-center md:items-start space-y-4">
          <span className=" opacity-75">Follow Us</span>
          <div className="flex items-center space-x-6">
            <a
              href="https://twitter.com/gdgbaroda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GDG Baroda on X"
            >
              <Image
                src="/icons/x.svg"
                alt="X"
                width={24}
                height={24}
                className="hover:opacity-80 transition-opacity contrast-75"
              />
            </a>
            <a
              href="https://in.linkedin.com/company/gdgbaroda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GDG Baroda on LinkedIn"
            >
              <Image
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="hover:opacity-80 transition-opacity contrast-75"
              />
            </a>
            <a
              href="https://www.instagram.com/gdgbaroda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GDG Baroda on Instagram"
            >
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
                className="hover:opacity-80 transition-opacity contrast-75"
              />
            </a>
            <a
              href="https://www.facebook.com/GDGBaroda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GDG Baroda on Facebook"
            >
              <Image
                src="/icons/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
                className="hover:opacity-80 transition-opacity contrast-75"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCdAjNjPWNIXNaxu4mGJc3uw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GDG Baroda on YouTube"
            >
              <Image
                src="/icons/youtube.svg"
                alt="YouTube"
                width={28}
                height={28}
                className="hover:opacity-80 transition-opacity contrast-75"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
