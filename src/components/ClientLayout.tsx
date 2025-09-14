"use client";

import dynamic from "next/dynamic";

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
  return (
    <>
      <SmoothScroll />
      <Background />
      <div className="flex-1 flex flex-col">{children}</div>
    </>
  );
}
