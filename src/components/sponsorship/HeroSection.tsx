"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative mt-24 md:mt-32 lg:mt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_58%)]" />
      <div className="mx-auto px-4 md:px-8 lg:px-16 xl:px-60">
        <div className="items-center gap-12 ">
          <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/95 p-10 shadow-xl backdrop-blur">
            <div
              className="absolute -bottom-20 -right-24 h-64 w-64 rounded-full bg-sky-100 blur-3xl"
              aria-hidden
            />

            <h1 className="mt-4 mb-6 text-3xl md:text-[2.8rem] font-semibold text-slate-900 leading-tight">
              Amplify innovation with GDG Baroda at DevFest 2025
            </h1>

            <div className="mb-8">
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Join Vadodara&apos;s most active Developer Community for a
                two-day celebration of innovation, learning, and community
                building.
              </p>
            </div>

            <div className="mb-8 flex flex-wrap gap-4 text-md font-semibold">
              <a
                href="mailto:gdgbaroda@gmail.com?subject=DevFest%202025%20Sponsorship%20Inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Start the conversation
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 text-slate-600 shadow-sm">
                <p className="text-md font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Event Duration
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">
                  2 immersive days
                </p>
                <p className="mt-2 text-md leading-relaxed">
                  Multi-track program with community corners and maker lounges
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 text-slate-600 shadow-sm">
                <p className="text-md font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Expert Speakers
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">
                  12+ speakers
                </p>
                <p className="mt-2 text-md leading-relaxed">
                  Google experts, unicorn builders, and community mentors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
