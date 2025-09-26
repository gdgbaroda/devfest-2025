"use client";

export default function ContactSection() {
  return (
    <section className="mx-auto mt-24 mb-28 w-full max-w-6xl px-6 md:px-10 lg:px-16">
      <div className="rounded-[28px] border border-slate-200 bg-white shadow-xl">
        <div className="grid gap-10 p-8 sm:p-10 md:p-14 md:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="flex flex-col gap-8">
            <header className="space-y-4">
              <p className="text-md font-semibold uppercase tracking-[0.35em] text-slate-500">
                Contact Us
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                Tell us how you&apos;d like to partner
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                Ready to partner with DevFest Baroda 2025? We&apos;re excited to
                discuss how we can create a mutually beneficial partnership.
                Reach out to us for more information or to secure your
                sponsorship.
              </p>
            </header>
          </div>

          <aside
            className="self-start rounded-3xl border-2 border-slate-300 bg-slate-50 p-6 shadow-lg shadow-slate-200/60"
            style={{ minWidth: 0, maxWidth: 340 }}
          >
            <div className="space-y-4">
              <p className="text-md font-semibold uppercase tracking-[0.35em] text-slate-500">
                Your Point of Contact
              </p>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-slate-900">
                  Rahul Banker
                </p>
                <p className="text-md text-slate-600">Manager, GDG Baroda</p>
                <a
                  href="mailto:gdgbaroda@gmail.com?subject=DevFest%202025%20Sponsorship%20Inquiry"
                  className="inline-flex items-center gap-2 text-md font-semibold text-slate-800 underline-offset-4 hover:underline"
                >
                  gdgbaroda@gmail.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
