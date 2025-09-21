const SHARE_TEXT =
  "I'm attending DevFest 2025! 🚀 Join me for an amazing day of learning and networking. #DevFest2025 #GDGBaroda";

export const getShareText = () => SHARE_TEXT;

interface UploadResponse {
  success: boolean;
  url: string;
  filename: string;
}

export const uploadFrameToR2 = async (imageBlob: Blob): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('image', imageBlob, 'devfest-frame.jpg');

    const response = await fetch('/api/upload-frame', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json() as UploadResponse;
    return result.url;
  } catch (error) {
    console.error('Error uploading frame to R2:', error);
    return null;
  }
};

export const shareToLinkedIn = (imageUrl: string) => {
  const encodedImageUrl = encodeURIComponent(imageUrl);

  // LinkedIn sharing URL format - LinkedIn will fetch the image from the URL
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedImageUrl}`;

  // Open LinkedIn in a new tab
  window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
};
