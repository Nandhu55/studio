
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformGoogleDriveLink(url: string, forDownload = false): string {
  if (!url || typeof url !== 'string') {
    return '#';
  }
  
  const googleDriveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(googleDriveRegex);
  
  if (match && match[1]) {
    const fileId = match[1];
    if (forDownload) {
      // This link forces a download prompt.
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    // This link is for embedding and is the most reliable for viewing.
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  // Return the original URL if it's not a standard Google Drive file link
  return url;
}
