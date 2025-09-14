"use client";

import React, { memo, useEffect, useState } from "react";
import { AuroraBackground } from "./ui/aurora-background";

const Background = memo(() => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 -z-10 pointer-events-none bg-zinc-50">
        <div className="w-full h-full" />
      </div>
    );
  }

  return (
    <AuroraBackground className="fixed inset-0 -z-10 pointer-events-none">
      <div className="w-full h-full" />
    </AuroraBackground>
  );
});

Background.displayName = "Background";

export default Background;
