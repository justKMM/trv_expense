import type { ZohoUser } from '~/types/zoho'

export const useUser = () => {
  const user = useState<ZohoUser | null>('user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  const setUser = (userData: ZohoUser) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
  }

  const fetchUserProfile = async () => {
    try {
      const response = await $fetch<ZohoUser>('/api/user/profile')
      setUser(response)
      return response
    } catch (error) {
      console.error('Error fetching user profile:', error)
      throw error
    }
  }

  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
    fetchUserProfile
  }
}