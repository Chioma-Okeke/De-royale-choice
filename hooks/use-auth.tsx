import { AuthService } from '@/app/services/auth-service'
import { getUserQueryOpts } from '@/lib/query-options'
import { useRouter } from '@bprogress/next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { data: user, isError, isPending } = useQuery(getUserQueryOpts)
  const router = useRouter()

  const {
    mutate,
    isPending: isLoggingOut,
    isError: isLogoutError,
    error: logoutError,
  } = useMutation({
    mutationFn: () => new AuthService().logout(),
    onSuccess: () => {
      queryClient.removeQueries(getUserQueryOpts)
      toast.success("Logged out successfully", {
        description: "You have successfully logged out of the system.",
      });
      router.push("/auth/login")
    },
    onError: () => {
      toast.error("Logout Unsuccessful.", {
        description: "Error when logging out. Please try again."
      })
    }
  })

  return {
    user,
    isPending,
    isError,
    logoutUser: mutate,
    isLoggingOut,
    isLogoutError,
    logoutError,
  }
}
