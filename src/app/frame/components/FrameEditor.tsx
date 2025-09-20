import {
  ChangeEvent,
  PointerEvent,
  SyntheticEvent,
  WheelEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { AVAILABLE_FRAMES, MAX_ZOOM, MIN_ZOOM } from "../constants";
import { FitMode, ImageSize, Point } from "../types";
import { clamp } from "../utils/clamp";
import { createFrameComposite } from "../utils/canvas";
import { getShareText } from "../utils/share";
import { EditorCanvas } from "./EditorCanvas";
import { EditorControls } from "./EditorControls";

type PointerState = {
  dragging: boolean;
  pointerId: number | null;
  last: Point;
};

export const FrameEditor = () => {
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
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [generatedImageBlob, setGeneratedImageBlob] = useState<Blob | null>(
    null
  );

  const pointerState = useRef<PointerState>({
    dragging: false,
    pointerId: null,
    last: { x: 0, y: 0 },
  });

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

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  const handleImageLoad = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
  }, []);

  const handleZoomChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (showShareOptions) return;
      setLastAutoScale(null);
      updateScale(parseFloat(event.target.value));
    },
    [showShareOptions, updateScale]
  );

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (!imageSrc || showShareOptions) return;
      event.preventDefault();
      setLastAutoScale(null);
      const zoomFactor = event.deltaY > 0 ? 0.92 : 1.08;
      updateScale((prev) => prev * zoomFactor);
    },
    [imageSrc, showShareOptions, updateScale]
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!imageSrc || showShareOptions) return;
      event.preventDefault();

      pointerState.current = {
        dragging: true,
        pointerId: event.pointerId,
        last: { x: event.clientX, y: event.clientY },
      };

      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    [imageSrc, showShareOptions]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (
        !pointerState.current.dragging ||
        pointerState.current.pointerId !== event.pointerId ||
        showShareOptions
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
    [showShareOptions]
  );

  const endPointerInteraction = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (pointerState.current.pointerId !== event.pointerId) return;
    pointerState.current = {
      dragging: false,
      pointerId: null,
      last: { x: 0, y: 0 },
    };
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  }, []);

  const handleFitClick = useCallback(() => {
    if (!imageSrc || showShareOptions) return;
    applyScale("fit");
  }, [imageSrc, showShareOptions, applyScale]);

  const handleFillClick = useCallback(() => {
    if (!imageSrc || showShareOptions) return;
    applyScale("fill");
  }, [imageSrc, showShareOptions, applyScale]);

  const handleResetClick = useCallback(() => {
    if (!imageSrc || showShareOptions) return;
    setPosition({ x: 0, y: 0 });
    applyScale("fit");
  }, [imageSrc, showShareOptions, applyScale]);

  const handleClearImage = useCallback(() => {
    setImageSrc(null);
    setImageName("");
    setImageSize(null);
    setPosition({ x: 0, y: 0 });
    setScale(1);
    setLastAutoScale(null);
    setShowShareOptions(false);
    setGeneratedImageBlob(null);
  }, []);

  const handleNextFrame = useCallback(async () => {
    if (isFrameLoading) return;

    setIsFrameLoading(true);

    try {
      const nextIndex = (currentFrameIndex + 1) % AVAILABLE_FRAMES.length;

      await new Promise((resolve) => setTimeout(resolve, 300));

      setCurrentFrameIndex(nextIndex);
    } finally {
      setIsFrameLoading(false);
    }
  }, [currentFrameIndex, isFrameLoading]);

  const generateImageBlob = useCallback(async (): Promise<Blob | null> => {
    if (!imageSrc || !frameRef.current) {
      return null;
    }

    return createFrameComposite({
      frameElement: frameRef.current,
      imageSrc,
      position,
      scale,
      frameIndex: currentFrameIndex,
    });
  }, [imageSrc, position, scale, currentFrameIndex]);

  const handleConfirmClick = useCallback(async () => {
    if (!imageSrc) {
      alert("Please upload an image first.");
      return;
    }

    setIsDownloading(true);

    try {
      const blob = await generateImageBlob();
      if (!blob) {
        alert("Failed to generate image. Please try again.");
        return;
      }

      setGeneratedImageBlob(blob);
      setShowShareOptions(true);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [imageSrc, generateImageBlob]);

  const downloadImage = useCallback(() => {
    if (!generatedImageBlob) {
      alert("Please generate the image first.");
      return;
    }

    const url = URL.createObjectURL(generatedImageBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devfest-2025-frame-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [generatedImageBlob]);

  const shareGeneratedImage = useCallback(async () => {
    if (!generatedImageBlob) {
      alert("Please generate the image first.");
      return;
    }

    const shareTitle = "DevFest 2025 Frame";
    const text = getShareText();

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        const file = new File([generatedImageBlob], "devfest-frame.jpg", {
          type: "image/jpeg",
        });

        const dataWithFile: ShareData = {
          title: shareTitle,
          text,
          files: [file],
        };

        const canShareFiles =
          typeof navigator.canShare === "function" &&
          (() => {
            try {
              return navigator.canShare(dataWithFile);
            } catch {
              return false;
            }
          })();

        if (canShareFiles) {
          await navigator.share(dataWithFile);
          return;
        }

        await navigator.share({ title: shareTitle, text });
        return;
      }
    } catch (error) {
      if ((error as DOMException)?.name === "AbortError") {
        return;
      }
      console.warn("Native share failed, falling back to download", error);
    }

    downloadImage();
    alert("Sharing isn't supported here, so the image was downloaded instead.");
  }, [generatedImageBlob, downloadImage]);

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
        onConfirm={handleConfirmClick}
        isDownloading={isDownloading}
        onNextFrame={handleNextFrame}
        isFrameLoading={isFrameLoading}
        onClearImage={handleClearImage}
        showShareOptions={showShareOptions}
        onDownload={downloadImage}
        onShare={shareGeneratedImage}
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
        showShareOptions={showShareOptions}
        onConfirm={handleConfirmClick}
        isDownloading={isDownloading}
        onDownload={downloadImage}
        onShare={shareGeneratedImage}
      />
    </section>
  );
};
