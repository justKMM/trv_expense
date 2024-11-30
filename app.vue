<script setup lang="ts">
  const router = useRouter();

  const nav = [
    {label: 'Dashboard', to: '/'},
    {label: 'About', to: '/about'},
    {label: 'Forms', to: '/forms'},
    {label: 'Travel Expense Form', to: '/forms/travel_expense'}
  ]
</script>

<template>
  <div>
    <NuxtLayout dir="routing/pages" :nav="nav" current-route>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
