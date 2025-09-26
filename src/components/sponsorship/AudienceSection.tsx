"use client";

const audienceInsights = [
  {
    label: "Attendees",
    value: "1200+",
    description: "Product engineers, cloud architects, mobile & AI builders",
  },
  {
    label: "Companies Represented",
    value: "130",
    description: "Start-ups, scale-ups, and enterprise innovation teams",
  },
  {
    label: "Community Reach",
    value: "45K+",
    description: "GDG Baroda subscribers across email, social, and meetup",
  },
  {
    label: "Engagement",
    value: "92%",
    description: "Attendees rate DevFest content as directly actionable",
  },
];

const audienceSegments = [
  {
    title: "Developers & Engineers",
    body: "Full-stack web, Android, Flutter, and AI/ML practitioners exploring new tooling, libraries, and career pathways.",
  },
  {
    title: "Product & Design Leaders",
    body: "Decision makers evaluating platforms, partnerships, and go-to-market opportunities for their product roadmaps.",
  },
  {
    title: "Student Innovators",
    body: "High-energy campus ambassadors, hackathon winners, and early adopters eager to build with community mentors.",
  },
];

const attendeeMix = [
  { label: "Senior Engineers", value: 38, color: "#0ea5e9" },
  { label: "Engineering Leadership", value: 22, color: "#38bdf8" },
  { label: "Product & Design", value: 18, color: "#22d3ee" },
  { label: "Students & New Grads", value: 22, color: "#a855f7" },
];

const engagementByTrack = [
  {
    label: "Web & Cloud",
    value: 86,
    cadence: "Avg. session rating",
    gradient: "from-sky-500 via-sky-400 to-cyan-300",
  },
  {
    label: "AI & ML",
    value: 79,
    cadence: "Avg. session rating",
    gradient: "from-indigo-500 via-purple-400 to-fuchsia-300",
  },
  {
    label: "Mobile",
    value: 74,
    cadence: "Avg. session rating",
    gradient: "from-emerald-500 via-teal-400 to-cyan-300",
  },
  {
    label: "Product Strategy",
    value: 68,
    cadence: "Avg. session rating",
    gradient: "from-amber-500 via-orange-400 to-rose-300",
  },
];

export default function AudienceSection() {
  const totalAttendeeMix = attendeeMix.reduce(
    (total, segment) => total + segment.value,
    0
  );
  let pieAccumulator = 0;
  const pieGradient = attendeeMix
    .map((segment) => {
      const start = pieAccumulator;
      pieAccumulator += (segment.value / totalAttendeeMix) * 100;
      return `${segment.color} ${start}% ${pieAccumulator}%`;
    })
    .join(", ");

  const maxEngagement = Math.max(
    ...engagementByTrack.map((track) => track.value)
  );

  return (
    <section
      id="audience"
      className="mx-auto mt-24 w-full px-4 md:px-8 lg:px-16 xl:px-32"
    >
      <div className="rounded-[36px] border border-slate-200 bg-white/95 p-10 md:p-14 shadow-xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-md font-semibold uppercase tracking-[0.35em] text-slate-500">
            Our Audience
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
            A developer-first crowd ready to evaluate your products
          </h2>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
            DevFest attendees come to learn, build, and collaborate. We attract
            a balanced mix of senior professionals, founders, and high-potential
            students who influence technology choices in their organisations.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-semibold text-slate-900 text-center">
            Key Metrics
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audienceInsights.map((insight) => (
              <div
                key={insight.label}
                className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-slate-100/80 p-6 shadow-sm text-center"
              >
                <p className="text-md font-medium uppercase tracking-[0.3em] text-slate-500">
                  {insight.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {insight.value}
                </p>
                <p className="mt-3 text-md text-slate-600 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Attendee Composition */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
            <div
              className="absolute -top-16 -left-10 h-40 w-40 rounded-full bg-sky-200/50 blur-3xl"
              aria-hidden
            />
            <div className="mb-6">
              <p className="text-md font-semibold uppercase tracking-[0.35em] text-slate-500">
                Attendee Makeup
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                Who joins DevFest Baroda?
              </h3>
              <p className="mt-3 text-md text-slate-600 leading-relaxed">
                Composition derived from 2024 check-ins. The mix informs partner
                programming and matchmaking before the event.
              </p>
            </div>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
              <div
                className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full border-[12px] border-white shadow-[0_25px_60px_rgba(15,76,129,0.12)]"
                role="img"
                aria-label="Pie chart showing attendee composition"
                style={{
                  backgroundImage: `conic-gradient(${pieGradient})`,
                }}
              >
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white text-center">
                  <span className="text-md font-semibold uppercase tracking-[0.35em] text-slate-500">
                    NPS
                  </span>
                  <span className="mt-1 text-2xl font-semibold text-slate-900">
                    4.6
                  </span>
                  <span className="text-[0.65rem] text-slate-500">
                    out of 5
                  </span>
                </div>
              </div>
              <ul className="flex-1 space-y-4 text-md">
                {attendeeMix.map((segment) => (
                  <li key={segment.label} className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: segment.color }}
                      aria-hidden
                    />
                    <div className="flex flex-1 items-center justify-between gap-4">
                      <p className="font-semibold text-slate-700">
                        {segment.label}
                      </p>
                      <p className="text-slate-500">{segment.value}%</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Track Engagement */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-xl">
            <div
              className="absolute -right-14 -top-16 h-52 w-52 rounded-full bg-cyan-500/30 blur-3xl"
              aria-hidden
            />
            <div className="relative p-8">
              <p className="text-md font-semibold uppercase tracking-[0.35em] text-white/70">
                Track Engagement
              </p>
              <h3 className="mt-3 text-2xl font-semibold">
                Where partners spark the most conversations
              </h3>
              <p className="mt-3 text-md text-white/70 leading-relaxed">
                Session ratings and booth check-ins indicate where builders
                spend time. Align your activation with the track that matches
                your product narrative.
              </p>
              <div className="mt-8 space-y-5">
                {engagementByTrack.map((track) => (
                  <div key={track.label}>
                    <div className="flex items-center justify-between text-md font-semibold">
                      <span>{track.label}</span>
                      <span>{track.value}%</span>
                    </div>
                    <div className="mt-2 h-3 w-full rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${track.gradient}`}
                        style={{
                          width: `${(track.value / maxEngagement) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="mt-2 text-[0.7rem] uppercase tracking-[0.25em] text-white/60">
                      {track.cadence}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
