'use client'

import { ShieldAlert } from "lucide-react"; // Optional: shadcn icon
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "@bprogress/next";

export default function NotAuthorized() {
    const {user, logoutUser} = useAuth()
    const router = useRouter()

    const navigateUser = () => {
        if (user) {
            logoutUser()
        } else {
            router.push("/internal")
        }
    }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <ShieldAlert className="w-16 h-16 text-red-500" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {user?.role === "admin" ? "You do not have permission to view this page." : "You need to be logged in to access this page"}
        </p>
        <Button
          onClick={navigateUser}
          className="mt-4 px-4 py-2 text-sm font-medium bg-brand-navy text-white rounded-lg hover:bg-brand-navy/70 transition-color ease-in-out duration-300"
        >
          Go back home
        </Button>
      </div>
    </main>
  );
}
