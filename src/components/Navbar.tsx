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

  const getMobileNavClasses = (path: string) =>
    `relative flex items-center justify-center gap-2 rounded-md px-5 py-2 text-base sm:text-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900/20 ${
      isActive(path)
        ? "bg-white/30 text-gray-900 shadow-md"
        : "text-gray-700 hover:bg-white/10 hover:text-gray-900"
    }`;

  const getDesktopNavClasses = (path: string) =>
    `relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm md:text-base xl:text-lg font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900/20 ${
      isActive(path)
        ? "bg-white/30 text-gray-900 shadow-md"
        : "text-gray-700 hover:text-gray-900"
    }`;

  return (
    <div
      className={`fixed top-6 inset-x-4 sm:inset-x-6 md:inset-x-10 lg:inset-x-24 xl:inset-x-32 z-10 select-none flex h-20 bg-transparent rounded-full ${
        isMounted && hasScrolled ? "backdrop-blur-3xl shadow-md" : "shadow-none"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-4 px-4 py-2 sm:px-6 sm:py-3 md:px-10 md:py-4 lg:px-16">
        {/* Logo */}
        <div
          className="cursor-pointer text-center select-none font-bold"
          onClick={() => handleNavigation("/")}
        >
          <div className="relative h-9 w-32 sm:h-10 sm:w-40 md:h-12 md:w-48 lg:h-14 lg:w-56">
            <Image
              src="/GDG_Baroda_Logo.png"
              alt="DevFest Logo"
              priority
              fill
              className="object-contain"
              sizes="(max-width: 640px) 8rem, (max-width: 1024px) 12rem, 14rem"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
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
                  <button
                    key={item.name}
                    type="button"
                    className={`w-full ${getMobileNavClasses(item.href)}`}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <span>{item.name}</span>
                    {item.hasDot ? (
                      <span className="shiny-dot" aria-hidden="true" />
                    ) : null}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex flex-1 items-center justify-end overflow-x-auto md:overflow-visible">
          <ul className="flex min-w-max flex-nowrap items-center justify-end gap-2 lg:gap-3 xl:gap-4 pr-1 text-gray-700">
            {navigation.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  className={getDesktopNavClasses(item.href)}
                  onClick={() => handleNavigation(item.href)}
                >
                  <span>{item.name}</span>
                  {item.hasDot ? (
                    <span className="shiny-dot" aria-hidden="true" />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </nav>
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
