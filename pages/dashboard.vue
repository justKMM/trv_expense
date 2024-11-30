<template>
  <div class="p-6">
    <div v-if="user" class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
      
      <div class="space-y-4">
        <div class="bg-gray-50 p-4 rounded">
          <h2 class="text-lg font-semibold mb-2">User Profile</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-gray-600">Name:</p>
              <p class="font-medium">{{ user.Display_Name }}</p>
            </div>
            <div>
              <p class="text-gray-600">Email:</p>
              <p class="font-medium">{{ user.Email }}</p>
            </div>
            <div>
              <p class="text-gray-600">ZUID:</p>
              <p class="font-medium">{{ user.ZUID }}</p>
            </div>
          </div>
        </div>

        <button 
          @click="handleLogout" 
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
    
    <div v-else class="text-center">
      <p>Loading user data...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})

const router = useRouter()
const { user, clearUser } = useUser()

// Redirect if not authenticated
onMounted(() => {
  if (!localStorage.getItem('zoho_tokens')) {
    router.push('/')
  }
})

const handleLogout = () => {
  localStorage.removeItem('zoho_tokens')
  clearUser()
  router.push('/')
}
</script>