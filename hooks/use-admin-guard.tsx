// hooks/useAuth.ts
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./use-auth";

export function useAdminGuard() {
  const { user, isPending } = useAuth(); // loading = true while checking auth
  const router = useRouter();

  useEffect(() => {
    if (!isPending && (!user || user.role !== "admin")) {
      router.replace("/not-authorized");
    }
  }, [user, isPending, router]);
}
