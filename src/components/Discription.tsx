export default function Discription() {
    return (
        <div className="flex flex-col w-full justify-top items-center gap-8 md:gap-16 px-4 md:px-8 lg:px-16 md:py-16">
            {/* Tagline */}
            <div className="font-operetta-12 italic text-2xl md:text-4xl text-center font-extrabold">
                Not Just Another Tech Conference
            </div>

            {/* Stats */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 text-2xl md:text-3xl">
                <div className="flex justify-center items-center gap-2">
                    <span className="font-operetta-12 font-bold">12+</span>
                    <span className="font-operetta-12">Speakers</span>
                </div>
                <div className="flex justify-center gap-2">
                    <span className="font-operetta-12 font-bold">8+</span>
                    <span className="font-operetta-12">Sessions</span>
                </div>
                <div className="flex justify-center gap-2">
                    <span className="font-operetta-12 font-bold">500+</span>
                    <span className="font-operetta-12">Attendees</span>
                </div>
            </div>

            {/* Description */}
            <div className="max-w-4xl text-center px-4 md:px-8 lg:px-16 text-lg md:text-xl font-open-sans text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, odit ut consequatur earum soluta natus deserunt odio vitae asperiores quisquam quidem, ipsum, facilis aut!
            </div>
        </div>
    );
}