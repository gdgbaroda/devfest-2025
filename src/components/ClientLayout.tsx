"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const deferBackground = pathname?.startsWith("/frame");

  return (
    <>
      <SmoothScroll />
      <Background deferUntilIdle={Boolean(deferBackground)} />
      <div className="flex-1 flex flex-col">{children}</div>
    </>
  );
}
