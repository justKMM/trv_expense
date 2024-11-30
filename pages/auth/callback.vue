<template>
  <div class="flex items-center justify-center min-h-screen">
    <div v-if="error" class="text-red-500">
      {{ error }}
    </div>
    <p v-else>Processing login...</p>
  </div>
</template>

<script lang="ts" setup>
import type { ZohoAuthResponse } from '~/types/zoho'

const route = useRoute()
const router = useRouter()
const { setUser } = useUser()
const error = ref('')

onMounted(async () => {
  try {
    if (route.query.code) {
      console.log('Received auth code, attempting to exchange...')
      
      const response = await $fetch<ZohoAuthResponse>('/api/auth/zoho', {
        method: 'POST',
        body: { code: route.query.code }
      })
      
      if (!response.tokens || !response.user) {
        throw new Error('Invalid response from server')
      }

      // Store user info
      setUser(response.user)
      
      // Store tokens securely
      localStorage.setItem('zoho_tokens', JSON.stringify(response.tokens))
      
      await router.push('/dashboard')
    } else {
      error.value = 'No authorization code received'
      setTimeout(() => router.push('/'), 3000)
    }
  } catch (err: any) {
    console.error('Login failed:', err)
    error.value = err.message || 'Authentication failed'
    setTimeout(() => router.push('/'), 3000)
  }
})
</script>