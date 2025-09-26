"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import type { SponsorshipTier } from "@/data/sponsorshipDeck";
import { sponsorshipTiers } from "@/data/sponsorshipDeck";

const TRANSITION_DURATION = 250;

type SponsorshipModalProps = {
  tier: SponsorshipTier;
  isOpen: boolean;
  onClose: () => void;
  backgroundBlurClass: string;
  accentGradientClass: string;
};

function SponsorshipTierModal({
  tier,
  isOpen,
  onClose,
  backgroundBlurClass,
  accentGradientClass,
}: SponsorshipModalProps) {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return;
    }

    if (!shouldRender) return;

    setIsVisible(false);
    const timeout = setTimeout(() => {
      setShouldRender(false);
    }, TRANSITION_DURATION);

    return () => clearTimeout(timeout);
  }, [isOpen, mounted, shouldRender]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const titleId = `${tier.id}-modal-title`;
  const descriptionId = `${tier.id}-modal-description`;

  if (!mounted || !shouldRender) {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 sm:px-6"
    >
      <div
        className={`absolute inset-0 bg-zinc-900/60 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`relative z-10 w-full max-w-3xl transform overflow-hidden rounded-[28px] bg-white shadow-2xl transition-all duration-300 ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        <div className="absolute right-4 top-4 z-20">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="relative z-10 max-h-[80vh] overflow-y-auto overflow-x-hidden px-6 py-10 sm:px-10">
          <div
            className={`pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full ${backgroundBlurClass} blur-3xl`}
            aria-hidden
          />

          <header className="relative z-10">
            <h3
              id={titleId}
              className="text-xl font-semibold text-slate-900 sm:text-2xl"
            >
              {tier.modalTitle}
            </h3>
            <p
              id={descriptionId}
              className="mt-4 text-base leading-relaxed text-slate-600"
            >
              {tier.modalDescription}
            </p>
            <div
              className={`mt-4 inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-r ${accentGradientClass} px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-600 shadow-md`}
            >
              {tier.investment}
            </div>
          </header>

          <div className="relative z-10 mt-8 space-y-6 text-slate-600">
            {tier.inclusions.map((section) => (
              <section
                key={section.label}
                className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm"
              >
                <h4 className="mb-4 text-lg font-semibold text-slate-900">
                  {section.label}
                </h4>
                <ul className="list-disc space-y-3 pl-6 text-base leading-relaxed">
                  {section.items.map((item) => (
                    <li key={item} className="text-slate-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function SponsorshipTiers() {
  const [activeTier, setActiveTier] = useState<string | null>(null);
  const getTierGradient = (tierId: string) => {
    switch (tierId) {
      case "silver":
        return "from-gray-400 via-slate-300 to-gray-200";
      case "gold":
        return "from-yellow-400 via-amber-300 to-yellow-200";
      case "platinum":
        return "from-slate-600 via-gray-400 to-slate-300";
      default:
        return "from-blue-500 via-cyan-400 to-emerald-300";
    }
  };

  const getTierAccentColor = (tierId: string) => {
    switch (tierId) {
      case "silver":
        return "from-blue-500/10 via-indigo-400/15 to-blue-300/10";
      case "gold":
        return "from-yellow-500/10 via-amber-400/15 to-yellow-300/10";
      case "platinum":
        return "from-violet-500/10 via-gray-400/15 to-violet-300/10";
      default:
        return "from-blue-500/10 via-cyan-400/15 to-emerald-300/10";
    }
  };

  const getTierBackgroundBlur = (tierId: string) => {
    switch (tierId) {
      case "silver":
        return "bg-blue-200/50";
      case "gold":
        return "bg-yellow-200/50";
      case "platinum":
        return "bg-violet-300/50";
      default:
        return "bg-sky-200/50";
    }
  };

  return (
    <section className="mx-auto mt-24 w-full max-w-7xl px-6 md:px-10 lg:px-16">
      <div className="flex flex-col gap-6 text-center">
        <p className="text-md font-semibold uppercase tracking-[0.35em] text-slate-500">
          Sponsorship Opportunities
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
          Three curated partnership paths to meet your goals
        </h2>
        <p className="mx-auto max-w-4xl text-lg text-slate-600">
          Choose the engagement that aligns with your brand objectives. Each
          package is co-created with the GDG Baroda core team to deliver
          measurable developer impact.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {sponsorshipTiers.map((tier) => (
          <div
            key={tier.id}
            className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div
              className={`absolute -top-24 -right-20 h-64 w-64 rounded-full ${getTierBackgroundBlur(
                tier.id
              )} blur-3xl transition-opacity group-hover:opacity-80`}
              aria-hidden
            />

            <div className="flex flex-1 flex-col p-10">
              <div
                className={`inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r ${getTierAccentColor(
                  tier.id
                )} px-4 py-1 text-md font-semibold uppercase tracking-wide shadow-lg shadow-slate-200 text-slate-600`}
              >
                {tier.investment}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                {tier.name}
              </h3>

              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                {tier.subtitle}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3 text-md text-slate-600">
                {tier.summaryPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span
                      className={`mt-1 block h-2.5 w-2.5 rounded-full bg-gradient-to-br ${getTierGradient(
                        tier.id
                      )}`}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/60 px-10 py-6 text-md text-slate-500">
              <span>Explore full inclusions</span>
              <button
                type="button"
                onClick={() => setActiveTier(tier.id)}
                className="rounded-full bg-slate-900 px-5 py-2 text-md font-semibold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white group-hover:bg-slate-800"
              >
                More
              </button>
              <SponsorshipTierModal
                tier={tier}
                isOpen={activeTier === tier.id}
                onClose={() => setActiveTier(null)}
                backgroundBlurClass={getTierBackgroundBlur(tier.id)}
                accentGradientClass={getTierAccentColor(tier.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
