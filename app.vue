<script setup lang="ts">
  const router = useRouter();

  const nav = [
    {label: 'Home', to: '/'},
    {label: 'About', to: '/about'},
    {label: 'Forms', to: '/forms'}
  ]
</script>

<template>
  <div>
    <NuxtLayout dir="routing/pages" :nav="nav" current-route>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
