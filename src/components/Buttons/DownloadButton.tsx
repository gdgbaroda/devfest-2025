import Image from "next/image";
export const DownloadButton = ({ onDownload }: { onDownload: () => void }) => {
  return (
    <button
      type="button"
      onClick={onDownload}
      className="w-full rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
    >
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/icons/download.svg"
          alt="Download"
          width={24}
          height={24}
        />
        <span>Download</span>
      </div>
    </button>
  );
};
