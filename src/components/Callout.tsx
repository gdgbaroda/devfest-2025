export default function Callout({ title }: { title: string }) {
  return (
    <div className="w-auto flex items-center justify-start">
      <p className="p-4  text-lg md:text-xl lg:text-2xl border-2 rounded-3xl text-gray-700">
        {title}
      </p>
    </div>
  );
}
