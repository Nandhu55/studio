
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformGoogleDriveLink(url: string, forViewing: boolean = false): string {
  if (!url || typeof url !== 'string') {
    return '#';
  }
  
  const googleDriveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(googleDriveRegex);
  
  if (match && match[1]) {
    const fileId = match[1];
    if (forViewing) {
      // This is a more reliable embed/view link.
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    // This link forces a download.
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  
  // Return the original URL if it's not a standard Google Drive file link
  return url;
}
