// app/internal/page.tsx (or /internal/index.tsx)

import Link from "next/link";

export default function InternalLanding() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50">
        <h1 className="text-4xl font-bold text-brand-blue mb-2">Laundry Internal System Portal</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          This internal portal is used by staff to manage customer orders, laundry items, and receipts.
        </p>
        <Link
          href="/auth/login"
          className="px-6 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/70 transition-color ease-in-out duration-300"
        >
          Login to Continue
        </Link>
      </main>
    );
  }
  