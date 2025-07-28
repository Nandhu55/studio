
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformGoogleDriveLink(url: string, forDownload: boolean = false): string {
  if (!url || typeof url !== 'string') {
    return '#';
  }
  
  const googleDriveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(googleDriveRegex);
  
  if (match && match[1]) {
    const fileId = match[1];
    if (forDownload) {
      // This link forces a download.
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    // This is the standard, reliable link for viewing in a new tab.
    return `https://drive.google.com/file/d/${fileId}/view`;
  }
  
  // Return the original URL if it's not a standard Google Drive file link
  return url;
}

