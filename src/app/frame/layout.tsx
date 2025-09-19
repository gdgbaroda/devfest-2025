import type { ReactNode } from "react";

export const metadata = {
  title: "Frame Studio | DevFest 2025",
  description:
    "Upload your photo into the official DevFest 2025 frame with zoom, pan, fit, and fill controls.",
};

export default function FrameLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
