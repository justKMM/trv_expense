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

  const getUserData = () => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      return JSON.parse(userDataString) as ZohoUser;
    }
    return null;
  };

  const firstName = computed(() => {
    const userData = getUserData();
    return userData ? userData.First_Name : '';
  });

  const lastName = computed(() => {
    const userData = getUserData();
    return userData ? userData.Last_Name : '';
  });

  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
    fetchUserProfile,
    firstName,
    lastName
  }
}