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

export function formatDateToDDMMYYYY(dateString: string) {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
