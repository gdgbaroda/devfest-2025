import Image from "next/image";
export const ClearButton = ({ onClear }: { onClear: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClear}
      className="rounded-full bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
      title="Clear image"
    >
      <div className="flex items-center justify-center gap-x-1 gap-y-2">
        <Image src="/icons/delete.svg" alt="Clear" width={20} height={24} />
        <span>Clear</span>
      </div>
    </button>
  );
};
