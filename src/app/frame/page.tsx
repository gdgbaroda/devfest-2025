"use client";

import {
  ChangeEvent,
  PointerEvent,
  RefObject,
  SyntheticEvent,
  WheelEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const MIN_ZOOM = 0;
const MAX_ZOOM = 5;

// Available frames - frame0 to frame4
const AVAILABLE_FRAMES = [
  "/frames/frame0.svg",
  "/frames/frame1.svg",
  "/frames/frame2.svg",
  "/frames/frame3.svg",
  "/frames/frame4.svg",
];

type FitMode = "fit" | "fill";

type Point = {
  x: number;
  y: number;
};

type ImageSize = {
  width: number;
  height: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function FramePage() {
  return (
    <main className="flex-1 px-4 py-10 md:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="max-w-3xl space-y-3 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-600/80">
            Frame Studio
          </p>
          <h1 className="text-2xl font-semibold text-slate-900 md:text-4xl">
            Craft your DevFest 2025 frame in minutes
          </h1>
        </header>

        <FrameEditor />
      </div>
    </main>
  );
}

function FrameEditor() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [lastAutoScale, setLastAutoScale] = useState<FitMode | null>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFrameLoading, setIsFrameLoading] = useState(false);

  const pointerState = useRef<{
    dragging: boolean;
    pointerId: number | null;
    last: Point;
  }>({ dragging: false, pointerId: null, last: { x: 0, y: 0 } });

  const updateScale = useCallback(
    (value: number | ((previous: number) => number)) => {
      if (typeof value === "function") {
        setScale((prev) => clamp(value(prev), MIN_ZOOM, MAX_ZOOM));
      } else {
        setScale(clamp(value, MIN_ZOOM, MAX_ZOOM));
      }
    },
    []
  );

  const applyScale = useCallback(
    (mode: FitMode) => {
      if (!frameRef.current || !imageSize) return;
      const bounds = frameRef.current.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const widthRatio = bounds.width / imageSize.width;
      const heightRatio = bounds.height / imageSize.height;
      const nextScale =
        mode === "fit"
          ? Math.min(widthRatio, heightRatio)
          : Math.max(widthRatio, heightRatio);

      updateScale(nextScale);
      setPosition({ x: 0, y: 0 });
      setLastAutoScale(mode);
    },
    [imageSize, updateScale]
  );

  useEffect(() => {
    if (!imageSize || !imageSrc) return;
    applyScale("fit");
  }, [imageSize, imageSrc, applyScale]);

  useEffect(() => {
    if (!frameRef.current || !imageSize || !lastAutoScale) return;
    const observer = new ResizeObserver(() => {
      applyScale(lastAutoScale);
    });

    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [imageSize, lastAutoScale, applyScale]);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setImageSrc(result);
          setImageName(file.name);
          setImageSize(null);
          setPosition({ x: 0, y: 0 });
          setLastAutoScale(null);
        }
      };

      reader.readAsDataURL(file);
      event.target.value = "";
    },
    []
  );

  const handleImageLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    },
    []
  );

  const handleZoomChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLastAutoScale(null);
      updateScale(parseFloat(event.target.value));
    },
    [updateScale]
  );

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (!imageSrc) return;
      event.preventDefault();
      setLastAutoScale(null);
      const zoomFactor = event.deltaY > 0 ? 0.92 : 1.08;
      updateScale((prev) => prev * zoomFactor);
    },
    [imageSrc, updateScale]
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!imageSrc) return;
      event.preventDefault();

      pointerState.current = {
        dragging: true,
        pointerId: event.pointerId,
        last: { x: event.clientX, y: event.clientY },
      };

      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    [imageSrc]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (
        !pointerState.current.dragging ||
        pointerState.current.pointerId !== event.pointerId
      )
        return;
      event.preventDefault();

      const deltaX = event.clientX - pointerState.current.last.x;
      const deltaY = event.clientY - pointerState.current.last.y;
      if (!deltaX && !deltaY) return;

      setPosition((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      pointerState.current.last = { x: event.clientX, y: event.clientY };
      setLastAutoScale(null);
    },
    []
  );

  const endPointerInteraction = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (pointerState.current.pointerId !== event.pointerId) return;
      pointerState.current = {
        dragging: false,
        pointerId: null,
        last: { x: 0, y: 0 },
      };
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    },
    []
  );

  const handleFitClick = useCallback(() => {
    if (!imageSrc) return;
    applyScale("fit");
  }, [imageSrc, applyScale]);

  const handleFillClick = useCallback(() => {
    if (!imageSrc) return;
    applyScale("fill");
  }, [imageSrc, applyScale]);

  const handleResetClick = useCallback(() => {
    if (!imageSrc) return;
    setPosition({ x: 0, y: 0 });
    applyScale("fit");
  }, [imageSrc, applyScale]);

  const handleNextFrame = useCallback(async () => {
    if (isFrameLoading) return; // Prevent multiple clicks during loading

    setIsFrameLoading(true);

    try {
      const nextIndex = (currentFrameIndex + 1) % AVAILABLE_FRAMES.length;

      // Add a small delay to show the loading animation
      await new Promise((resolve) => setTimeout(resolve, 300));

      setCurrentFrameIndex(nextIndex);
    } finally {
      setIsFrameLoading(false);
    }
  }, [currentFrameIndex, isFrameLoading]);

  const downloadImage = useCallback(async () => {
    if (!imageSrc || !frameRef.current) {
      alert("Please upload an image first.");
      return;
    }

    if (currentFrameIndex < 0 || currentFrameIndex >= AVAILABLE_FRAMES.length) {
      alert("Please select a frame before downloading.");
      return;
    }

    setIsDownloading(true);

    try {
      // Create a high-resolution canvas directly
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Set high resolution (4x for better quality)
      const canvasScale = 4;
      const frameRect = frameRef.current.getBoundingClientRect();
      canvas.width = frameRect.width * canvasScale;
      canvas.height = frameRect.height * canvasScale;

      // Scale the context for high DPI
      ctx.scale(canvasScale, canvasScale);

      // Set background
      ctx.fillStyle = "#f1f5f9";
      ctx.fillRect(0, 0, frameRect.width, frameRect.height);

      // Load and draw the user image
      const userImg = new Image();
      userImg.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        userImg.onload = () => {
          try {
            // Calculate the transform for the user image
            const centerX = frameRect.width / 2;
            const centerY = frameRect.height / 2;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.translate(position.x, position.y);
            ctx.scale(scale, scale);

            // Draw the user image
            ctx.drawImage(
              userImg,
              -userImg.naturalWidth / 2,
              -userImg.naturalHeight / 2,
              userImg.naturalWidth,
              userImg.naturalHeight
            );

            ctx.restore();
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        userImg.onerror = () => reject(new Error("Failed to load user image"));
        userImg.src = imageSrc;
      });

      // Load and draw the frame overlay
      const frameImg = new Image();
      frameImg.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        frameImg.onload = () => {
          try {
            // Draw the frame overlay on top
            ctx.drawImage(frameImg, 0, 0, frameRect.width, frameRect.height);
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        frameImg.onerror = () =>
          reject(new Error("Failed to load frame image"));
        frameImg.src = AVAILABLE_FRAMES[currentFrameIndex];
      });

      // Convert canvas to blob and download
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            alert("Failed to generate image. Please try again.");
            return;
          }

          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `devfest-2025-frame-${Date.now()}.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        },
        "image/jpeg",
        0.95 // Higher quality
      );
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [imageSrc, position, scale, currentFrameIndex]);

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
      <EditorCanvas
        frameRef={frameRef}
        imageSrc={imageSrc}
        scale={scale}
        position={position}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointerInteraction}
        onPointerLeave={endPointerInteraction}
        onPointerCancel={endPointerInteraction}
        onImageLoad={handleImageLoad}
        fileInputRef={fileInputRef}
        imageName={imageName}
        onFileChange={handleFileChange}
        currentFrameIndex={currentFrameIndex}
        onDownload={downloadImage}
        isDownloading={isDownloading}
        onNextFrame={handleNextFrame}
        isFrameLoading={isFrameLoading}
      />

      <EditorControls
        fileInputRef={fileInputRef}
        imageSrc={imageSrc}
        scale={scale}
        onFileChange={handleFileChange}
        onZoomChange={handleZoomChange}
        onFit={handleFitClick}
        onFill={handleFillClick}
        onReset={handleResetClick}
        updateScale={updateScale}
        currentFrameIndex={currentFrameIndex}
      />
    </section>
  );
}

type EditorCanvasProps = {
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
  onDownload: () => void;
  isDownloading: boolean;
  onNextFrame: () => void;
  isFrameLoading: boolean;
};

function EditorCanvas({
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
  onDownload,
  isDownloading,
  onNextFrame,
  isFrameLoading,
}: EditorCanvasProps) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-white/30 bg-white/75 p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col gap-4">
        {/* Mobile Upload Section - visible on mobile, hidden on desktop */}
        <div className="flex flex-col gap-2 lg:hidden">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload image
            </button>
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
            accept="image/*, text/plain"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Preview</h2>
          {imageSrc && (
            <button
              type="button"
              onClick={onDownload}
              disabled={isDownloading}
              className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDownloading ? "Downloading..." : "Download"}
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        {/* Next Frame Button - positioned near the preview */}
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

        <div
          ref={frameRef}
          className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100/80 shadow-inner"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
          onPointerCancel={onPointerCancel}
          style={{ touchAction: imageSrc ? "none" : "auto" }}
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
    </div>
  );
}

type EditorControlsProps = {
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
};

function EditorControls({
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
}: EditorControlsProps) {
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
      {/* Desktop Upload Section - hidden on mobile */}
      <div className="hidden flex-col gap-2 lg:flex">
        <label
          htmlFor="photo-upload-desktop"
          className="text-sm font-medium text-slate-700"
        >
          Photo
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload image
          </button>
          <span className="text-sm text-slate-400">PNG, JPG, or SVG</span>
        </div>
        <input
          ref={fileInputRef}
          id="photo-upload-desktop"
          type="file"
          accept="image/*, text/plain"
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

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={zoomButtonClass}
            onClick={handleZoomOut}
            disabled={!imageSrc || scale <= MIN_ZOOM}
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
            disabled={!imageSrc}
            className="flex-1 accent-blue-600"
          />
          <button
            type="button"
            className={zoomButtonClass}
            onClick={handleZoomIn}
            disabled={!imageSrc || scale >= MAX_ZOOM}
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
          disabled={!imageSrc}
        >
          Fit
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={onFill}
          disabled={!imageSrc}
        >
          Fill
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={onReset}
          disabled={!imageSrc}
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
