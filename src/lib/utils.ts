import { env } from "@/config/env"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getShortUrl(shortCode: string): string {
  const shortUrlBase = env('VITE_SHORT_URL_BASE')
  return `${shortUrlBase}/${shortCode}`
}
