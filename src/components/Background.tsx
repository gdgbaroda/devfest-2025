"use client";

import React, { memo, useEffect, useState } from "react";
import { AuroraBackground } from "./ui/aurora-background";

type BackgroundProps = {
  deferUntilIdle?: boolean;
};

const Background = memo(({ deferUntilIdle = false }: BackgroundProps) => {
  const [shouldRenderAurora, setShouldRenderAurora] = useState(!deferUntilIdle);

  useEffect(() => {
    if (!deferUntilIdle) {
      setShouldRenderAurora(true);
      return;
    }

    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) setShouldRenderAurora(true);
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [deferUntilIdle]);

  if (!shouldRenderAurora) {
    return (
      <div className="fixed inset-0 -z-10 pointer-events-none bg-zinc-50">
        <div className="h-full w-full" />
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
