"use client";

import { FrameEditor } from "./components/FrameEditor";

export default function FramePage() {
  return (
    <main className="flex-1 px-4 mt-28 md:mt-32">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="max-w-3xl space-y-3 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-600/80">
            Frame Studio
          </p>
          <h1 className="text-2xl font-semibold text-slate-900 md:text-4xl">
            Craft your DevFest 2025 frame in minutes
          </h1>
        </header>

        <FrameEditor />
      </div>
    </main>
  );
}
