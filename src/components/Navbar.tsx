'use client';
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

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Schedule', href: '/schedule' },
        { name: 'Speakers', href: '/speakers' },
        { name: 'Sponsors', href: '/sponsors' },
        { name: 'Partners', href: '/partners' },
        { name: 'About', href: '/about' },
    ];

    const handleNavigation = (path: string) => {
        setIsOpen(false);
        router.push(path);
    };

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === path;
        }
        return pathname.startsWith(path);
    };

    return (
        <div className={`fixed font-open-sans z-10 top-0 select-none flex h-20 pt-2 md:pt-4 w-full px-4 md:px-14 lg:px-32 bg-transparent justify-between items-center ${hasScrolled ? 'backdrop-blur-3xl' : ''}`}>
            {/* Logo */}
            <div className="cursor-pointer text-center select-none" onClick={() => handleNavigation("/")}>
                <Image src="/logo.svg" alt="DevFest Logo" width={200} height={200} className="h-34 w-34 lg:h-56 lg:w-56" />
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Menu className="h-6 w-6 cursor-pointer" />
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-[300px] sm:w-[400px] bg-[#fff1e4] border-none"
                    >
                        <SheetHeader>
                            <SheetTitle className="text-gray-700"></SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 mt-10 text-center font-open-sans">
                            {navigation.map((item) => (
                                <div
                                    key={item.name}
                                    className={`cursor-pointer px-4 py-2 text-lg rounded-md transition-all duration-300 ${isActive(item.href)
                                        ? 'font-bold bg-white/30 shadow-md text-gray-900'
                                        : 'text-gray-700 hover:bg-white/10 hover:text-gray-900'
                                        }`}
                                    onClick={() => handleNavigation(item.href)}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-4 lg:gap-8 text-gray-700 text-base lg:text-lg text-center">
                {navigation.map((item) => (
                    <div
                        key={item.name}
                        className={`cursor-pointer transition-colors
                            ${isActive(item.href)
                                ? 'font-bold text-gray-900 border-b-2 border-gray-900'
                                : 'hover:text-gray-900'
                            }`}
                        onClick={() => handleNavigation(item.href)}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}