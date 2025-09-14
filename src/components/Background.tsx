"use client";

import React, { memo } from "react";
import { AuroraBackground } from "./ui/aurora-background";

const Background = memo(() => {
  return (
    <AuroraBackground className="fixed inset-0 -z-10 pointer-events-none">
      <div className="w-full h-full" />
    </AuroraBackground>
  );
});

Background.displayName = "Background";

export default Background;
