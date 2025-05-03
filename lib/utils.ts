import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const isConnectionString = () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable")
    }
    return process.env.MONGODB_URI
}
