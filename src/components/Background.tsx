"use client";

import React from "react";
import { AuroraBackground } from "./ui/aurora-background";

export default function Background() {
  return (
    <AuroraBackground className="fixed inset-0 -z-10 pointer-events-none ">
      <div className="w-full h-full" />
    </AuroraBackground>
  );
}
