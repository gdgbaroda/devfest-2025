export default function Description() {
  return (
    <div className="flex flex-col w-full justify-top items-center gap-8 md:gap-16 px-4 md:px-8 lg:px-16 md:py-16">
      {/* Tagline */}
      <div className="font-open-sans italic text-2xl md:text-4xl text-center font-extrabold">
        Not Just Another Tech Conference
      </div>

      {/* Stats */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 text-2xl md:text-3xl">
        <div className="flex justify-center items-center gap-2">
          <span className="font-open-sans font-bold">8+</span>
          <span className="font-open-sans">Speakers</span>
        </div>
        <div className="flex justify-center gap-2">
          <span className="font-open-sans font-bold">10+</span>
          <span className="font-open-sans">Sessions</span>
        </div>
        <div className="flex justify-center gap-2">
          <span className="font-open-sans font-bold">500+</span>
          <span className="font-open-sans">Attendees</span>
        </div>
      </div>

      {/* Description */}
      <div className="max-w-4xl text-center px-4 md:px-8 lg:px-16 text-lg md:text-xl font-open-sans text-gray-700">
        Join DevFest Baroda 2025, Gujarat&apos;s premier tech conference! Dive
        into cutting-edge talks and workshops led by Google Developer Experts.
        Experience the latest in Android, Flutter, Cloud, AI/ML, and Web
        Technologies while networking with Baroda&apos;s tech community.
      </div>
    </div>
  );
}
