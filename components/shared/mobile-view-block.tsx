// components/MobileViewBlock.tsx

'use client'

import { Monitor } from "lucide-react"

export default function MobileViewBlock() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-6 text-center lg:hidden">
      <Monitor className="mb-6 h-12 w-12 text-gray-400" />
      <h1 className="text-xl font-semibold text-gray-800">Desktop Only</h1>
      <p className="mt-2 text-sm text-gray-600">
        This application is optimized for desktop screens. <br />
        Please access it on a larger device for the best experience.
      </p>
    </div>
  )
}
