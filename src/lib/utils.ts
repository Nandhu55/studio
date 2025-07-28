
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformGoogleDriveLink(url: string): string {
  if (!url || typeof url !== 'string') {
    return '#';
  }
  
  const googleDriveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(googleDriveRegex);
  
  if (match && match[1]) {
    const fileId = match[1];
    // This link forces a download, which is more reliable than any previewer.
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  
  // Return the original URL if it's not a standard Google Drive file link
  return url;
}
