import GalleryFrame from "./GalleryFrame";

export default function Gallery({ title, description }: { title: string, description: string }) {
    return (
        <div className="flex flex-col h-full w-full px-4 md:px-8 lg:px-16 xl:px-32 my-10 md:my-16 gap-4 md:gap-10">
            <h1 className="font-operetta-12 text-3xl lg:text-4xl font-bold">{title}</h1>
            <h2 className={`font-open-sans text-lg md:text-xl text-gray-700 ${description ? "" : "hidden"}`}>
                {description}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                <GalleryFrame img={"/gallery/1.jpg"} />
                <GalleryFrame img={"/gallery/2.jpg"} />
                <GalleryFrame img={"/gallery/6.jpg"} />
                <GalleryFrame img={"/gallery/5.jpg"} />
                <GalleryFrame img={"/gallery/4.jpg"} />
                <GalleryFrame img={"/gallery/3.jpg"} />
            </div>
        </div>
    );
}