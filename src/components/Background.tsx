'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Background() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="fixed inset-0 -z-10 w-full overflow-hidden select-none">
            {/* Placeholder color while image loads */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ffe2cd] to-[#fffcc2] transition-opacity duration-500  ease-linear"
                style={{ opacity: isLoaded ? 0 : 1 }}
            />

            {/* Optimized background image */}
            <Image
                src="/Background.png"
                alt="Background"
                fill
                priority={true}
                quality={50}
                loading="eager"
                onLoad={() => setIsLoaded(true)}
                className={`transition-opacity duration-500 object-cover blur-md contrast-125 saturate-150
                           ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                sizes="100vw"
            />
        </div>
    );
}