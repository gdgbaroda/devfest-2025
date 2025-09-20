import { AVAILABLE_FRAMES } from "../constants";
import { Point } from "../types";

type CreateFrameCompositeParams = {
  frameElement: HTMLDivElement;
  imageSrc: string;
  position: Point;
  scale: number;
  frameIndex: number;
};

export const createFrameComposite = async ({
  frameElement,
  imageSrc,
  position,
  scale,
  frameIndex,
}: CreateFrameCompositeParams): Promise<Blob | null> => {
  if (frameIndex < 0 || frameIndex >= AVAILABLE_FRAMES.length) {
    return null;
  }

  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    const canvasScale = 4;
    const frameRect = frameElement.getBoundingClientRect();
    canvas.width = frameRect.width * canvasScale;
    canvas.height = frameRect.height * canvasScale;

    ctx.scale(canvasScale, canvasScale);

    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, frameRect.width, frameRect.height);

    const userImg = new Image();
    userImg.crossOrigin = "anonymous";

    await new Promise<void>((resolve, reject) => {
      userImg.onload = () => {
        try {
          const centerX = frameRect.width / 2;
          const centerY = frameRect.height / 2;

          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.translate(position.x, position.y);
          ctx.scale(scale, scale);

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

    const frameImg = new Image();
    frameImg.crossOrigin = "anonymous";

    await new Promise<void>((resolve, reject) => {
      frameImg.onload = () => {
        try {
          ctx.drawImage(frameImg, 0, 0, frameRect.width, frameRect.height);
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      frameImg.onerror = () => reject(new Error("Failed to load frame image"));
      frameImg.src = AVAILABLE_FRAMES[frameIndex];
    });

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/jpeg",
        0.95
      );
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
