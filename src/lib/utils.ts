
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
    // Always use the export=download link. The browser can choose to display it or download it.
    // This is the most reliable way to get the raw PDF data for react-pdf.
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  
  // Return the original URL if it's not a standard Google Drive file link
  return url;
}
