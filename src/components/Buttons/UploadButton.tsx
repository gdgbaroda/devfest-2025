import { RefObject } from "react";
import Image from "next/image";

export const UploadButton = ({
  fileInputRef,
}: {
  fileInputRef: RefObject<HTMLInputElement>;
}) => {
  return (
    <button
      type="button"
      className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="flex items-center justify-center gap-2">
        <Image src="/icons/upload.svg" alt="Upload" width={24} height={24} />
        <span>Upload</span>
      </div>
    </button>
  );
};
