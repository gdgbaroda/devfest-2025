"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Schedule", href: "/schedule" },
    { name: "Speakers", href: "/speakers" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Partners", href: "/partners" },
    { name: "Frame", href: "/frame", hasDot: true },
    { name: "About", href: "/about" },
  ];

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div
      className={`fixed top-6 inset-x-4 sm:inset-x-6 md:inset-x-10 lg:inset-x-24 xl:inset-x-32 z-10 select-none flex h-20 bg-transparent rounded-full ${
        isMounted && hasScrolled ? "backdrop-blur-3xl shadow-md" : "shadow-none"
      }`}
    >
      <div className="flex w-full justify-between items-center p-2 md:p-8 px-4 md:px-14 lg:px-32">
        {/* Logo */}
        <div
          className="cursor-pointer text-center select-none font-bold"
          onClick={() => handleNavigation("/")}
        >
          <Image
            src="/GDG_Baroda_Logo.png"
            alt="DevFest Logo"
            priority={true}
            width={224}
            height={60}
            className="h-8 sm:h-9 md:h-10 lg:h-12 w-auto"
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 220px"
          />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Menu className="h-6 w-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] backdrop-blur-3xl border-none"
            >
              <SheetHeader>
                <SheetTitle className="text-gray-700"></SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-10 text-center ">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    className={`relative cursor-pointer px-4 py-2 text-lg rounded-md transition-all duration-300 flex items-center justify-center ${
                      isActive(item.href)
                        ? "font-bold bg-white/30 shadow-md text-gray-900"
                        : "text-gray-700 hover:bg-white/10 hover:text-gray-900"
                    }`}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <span>{item.name}</span>
                    {item.hasDot ? (
                      <span className="shiny-dot" aria-hidden="true" />
                    ) : null}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-4 lg:gap-8 text-gray-700 text-lg lg:text-xl text-center">
          {navigation.map((item) => (
            <div
              key={item.name}
              className={`relative cursor-pointer transition-colors flex items-center
                            ${
                              isActive(item.href)
                                ? "font-bold text-gray-900 border-b-2 border-gray-900"
                                : "hover:text-gray-900"
                            }`}
              onClick={() => handleNavigation(item.href)}
            >
              <span>{item.name}</span>
              {item.hasDot ? (
                <span className="shiny-dot" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
}

const styles = `
  .shiny-dot {
    position: absolute;
    top: -0.2rem;
    right: -0.35rem;
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 9999px;
    background: #2563eb;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.6);
    animation: dot-pulse 1.8s ease-in-out infinite;
    pointer-events: none;
  }

  .shiny-dot::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 1px solid rgba(37, 99, 235, 0.6);
    animation: dot-ripple 1.8s ease-in-out infinite;
  }

  @keyframes dot-pulse {
    0%, 100% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @keyframes dot-ripple {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    70% {
      transform: scale(1.8);
      opacity: 0;
    }
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;
