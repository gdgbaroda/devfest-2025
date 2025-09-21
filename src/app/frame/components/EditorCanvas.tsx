import {
  ChangeEvent,
  PointerEvent,
  RefObject,
  SyntheticEvent,
  WheelEvent,
} from "react";

import { AVAILABLE_FRAMES } from "../constants";
import { Point } from "../types";
import { ShareButton } from "@/components/Buttons/ShareButton";
import { DownloadButton } from "@/components/Buttons/DownloadButton";
import { UploadButton } from "@/components/Buttons/UploadButton";
import { ClearButton } from "@/components/Buttons/ClearButton";
import { LinkedInShareButton } from "@/components/Buttons/LinkedInShareButton";

export type EditorCanvasProps = {
  frameRef: RefObject<HTMLDivElement>;
  imageSrc: string | null;
  scale: number;
  position: Point;
  onWheel: (event: WheelEvent<HTMLDivElement>) => void;
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLDivElement>) => void;
  onImageLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  imageName: string;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  currentFrameIndex: number;
  onConfirm: () => void;
  isDownloading: boolean;
  onNextFrame: () => void;
  isFrameLoading: boolean;
  onClearImage: () => void;
  showShareOptions: boolean;
  onDownload: () => void;
  onShare: () => void;
  onLinkedInShare?: () => void;
  isUploadingToR2?: boolean;
};

export const EditorCanvas = ({
  frameRef,
  imageSrc,
  scale,
  position,
  onWheel,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  onImageLoad,
  fileInputRef,
  imageName,
  onFileChange,
  currentFrameIndex,
  onConfirm,
  isDownloading,
  onNextFrame,
  isFrameLoading,
  onClearImage,
  showShareOptions,
  onDownload,
  onShare,
  onLinkedInShare,
  isUploadingToR2 = false,
}: EditorCanvasProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-white/30 bg-white/75 p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 lg:hidden">
          <div className="flex flex-wrap items-center gap-3">
            <UploadButton fileInputRef={fileInputRef} />
            {imageName ? (
              <span
                className="max-w-full truncate text-sm text-slate-500"
                title={imageName}
              >
                {imageName}
              </span>
            ) : (
              <span className="text-sm text-slate-400">PNG, JPG, or SVG</span>
            )}
          </div>
          <input
            ref={fileInputRef}
            id="photo-upload-mobile"
            type="file"
            accept="image/png, image/jpeg, image/svg+xml, text/plain"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Preview</h2>
          <div className="flex items-center gap-2">
            {imageSrc && <ClearButton onClear={onClearImage} />}
          </div>
        </div>
      </div>

      <div className="relative">
        {!showShareOptions && (
          <button
            type="button"
            onClick={onNextFrame}
            disabled={isFrameLoading}
            className={`absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
              isFrameLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 hover:scale-110"
            }`}
            title={isFrameLoading ? "Loading..." : "Next Frame"}
          >
            <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isFrameLoading ? "animate-spin" : ""}
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
          </button>
        )}

        <div
          ref={frameRef}
          className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100/80 shadow-inner"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
          onPointerCancel={onPointerCancel}
          style={{
            touchAction: imageSrc && !showShareOptions ? "none" : "auto",
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Uploaded preview"
              onLoad={onImageLoad}
              className="absolute left-1/2 top-1/2 max-h-none max-w-none select-none"
              draggable={false}
              style={{
                transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center",
              }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-slate-500">
              <p className="text-sm font-medium">
                Upload a photo to get started
              </p>
            </div>
          )}

          <img
            src={AVAILABLE_FRAMES[currentFrameIndex]}
            alt="DevFest frame overlay"
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
            draggable={false}
          />
        </div>
      </div>

      {imageSrc && (
        <div className="mt-6 flex flex-col gap-3 lg:hidden">
          {!showShareOptions ? (
            <>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDownloading}
                className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDownloading ? "Generating..." : "✨              Generate"}
              </button>
              <p className="mt-2 text-center text-xs text-slate-500">
                Your photo never leaves your device. No uploads; everything processes locally.
              </p>
            </>
          ) : (
            <>
              {onLinkedInShare && (
                <LinkedInShareButton
                  onShare={onLinkedInShare}
                  isUploading={isUploadingToR2}
                />
              )}
              <ShareButton onShare={onShare} />
              <DownloadButton onDownload={onDownload} />
            </>
          )}
        </div>
      )}
    </div>
  );
};
