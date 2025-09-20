import Image from "next/image";
export const ShareButton = ({ onShare }: { onShare: () => void }) => {
  return (
    <button
      type="button"
      onClick={onShare}
      className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      <div className="flex items-center justify-center gap-2">
        <Image src="/icons/share.svg" alt="Share" width={24} height={24} />
        <span>Share</span>
      </div>
    </button>
  );
};
