import { ChangeEvent, RefObject } from "react";

import { AVAILABLE_FRAMES, MAX_ZOOM, MIN_ZOOM } from "../constants";
import { ShareButton } from "@/components/Buttons/ShareButton";
import { DownloadButton } from "@/components/Buttons/DownloadButton";
import { UploadButton } from "@/components/Buttons/UploadButton";
import { LinkedInShareButton } from "@/components/Buttons/LinkedInShareButton";

export type EditorControlsProps = {
  fileInputRef: RefObject<HTMLInputElement>;
  imageSrc: string | null;
  scale: number;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onZoomChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFit: () => void;
  onFill: () => void;
  onReset: () => void;
  updateScale: (value: number | ((previous: number) => number)) => void;
  currentFrameIndex: number;
  showShareOptions: boolean;
  onConfirm: () => void;
  isDownloading: boolean;
  onDownload: () => void;
  onShare: () => void;
  onLinkedInShare?: () => void;
  isUploadingToR2?: boolean;
};

export const EditorControls = ({
  fileInputRef,
  imageSrc,
  scale,
  onFileChange,
  onZoomChange,
  onFit,
  onFill,
  onReset,
  updateScale,
  currentFrameIndex,
  showShareOptions,
  onConfirm,
  isDownloading,
  onDownload,
  onShare,
  onLinkedInShare,
  isUploadingToR2 = false,
}: EditorControlsProps) => {
  const buttonClass =
    "flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-px hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50";

  const zoomButtonClass =
    "rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-px hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50";

  const handleZoomIn = () => {
    updateScale((prev) => prev * 1.1);
  };

  const handleZoomOut = () => {
    updateScale((prev) => prev * 0.9);
  };

  return (
    <aside className="flex flex-col gap-6 rounded-3xl border border-white/30 bg-white/75 p-6 shadow-lg backdrop-blur lg:sticky lg:top-16">
      <div className="hidden flex-col gap-2 lg:flex">
        <label
          htmlFor="photo-upload-desktop"
          className="text-sm font-medium text-slate-700"
        >
          Photo
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <UploadButton fileInputRef={fileInputRef} />
          <span className="text-sm text-slate-400">PNG, JPG, or SVG</span>
        </div>
        <input
          ref={fileInputRef}
          id="photo-upload-desktop"
          type="file"
          accept="image/png, image/jpeg, image/svg+xml, text/plain"
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-slate-700">Zoom</span>
          <span className="whitespace-nowrap text-xs font-semibold text-slate-500">
            {Math.round(scale * 100)}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={zoomButtonClass}
            onClick={handleZoomOut}
            disabled={!imageSrc || scale <= MIN_ZOOM || showShareOptions}
            title="Zoom out"
          >
            −
          </button>
          <input
            type="range"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step="0.01"
            value={scale}
            onChange={onZoomChange}
            disabled={!imageSrc || showShareOptions}
            className="flex-1 accent-blue-600"
          />
          <button
            type="button"
            className={zoomButtonClass}
            onClick={handleZoomIn}
            disabled={!imageSrc || scale >= MAX_ZOOM || showShareOptions}
            title="Zoom in"
          >
            +
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{Math.round(MIN_ZOOM * 100)}%</span>
          <span>{Math.round(MAX_ZOOM * 100)}%</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-slate-700">Frame</span>
          <span className="whitespace-nowrap text-xs font-semibold text-slate-500">
            {currentFrameIndex + 1} of {AVAILABLE_FRAMES.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          type="button"
          className={buttonClass}
          onClick={onFit}
          disabled={!imageSrc || showShareOptions}
        >
          Fit
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={onFill}
          disabled={!imageSrc || showShareOptions}
        >
          Fill
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={onReset}
          disabled={!imageSrc || showShareOptions}
        >
          Reset
        </button>
      </div>

      {imageSrc && !showShareOptions && (
        <div className="hidden flex-col gap-2 lg:flex">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDownloading}
            className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-2">
              <span>✨</span>
              <span>{isDownloading ? "Generating..." : "Generate"}</span>
            </div>
          </button>
          <p className="text-center text-xs text-slate-500">
            Your photo never leaves your device. No uploads; everything
            processes locally.
          </p>
        </div>
      )}

      {imageSrc && showShareOptions && (
        <div className="hidden flex-col gap-3 lg:flex">
          {onLinkedInShare && (
            <LinkedInShareButton
              onShare={onLinkedInShare}
              isUploading={isUploadingToR2}
            />
          )}
          <div className="flex flex-row gap-3">
            <ShareButton onShare={onShare} />
            <DownloadButton onDownload={onDownload} />
          </div>
        </div>
      )}
    </aside>
  );
};
