import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showErrorToast(message: string) {
  toast.error("An Error Occurred", {
    description: message,
    duration: 10000, // Show for 10 seconds
    closeButton: true,
  });
}
