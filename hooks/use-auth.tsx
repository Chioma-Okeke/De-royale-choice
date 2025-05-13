import { AuthService } from '@/app/services/auth-service'
import { getUserQueryOpts } from '@/lib/query-options'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { data: user, isError, isPending } = useQuery(getUserQueryOpts)

  const {
    mutate,
    isPending: isLoggingOut,
    isError: isLogoutError,
    error: logoutError,
  } = useMutation({
    mutationFn: () => new AuthService().logout(),
    onSuccess: () => queryClient.removeQueries(getUserQueryOpts),
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
