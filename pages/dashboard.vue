<template>
  <div class="p-6">
    <div v-if="user" class="min-h-screen bg-gray-50">
      <!-- Title -->
      <div class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-gray-900 text-center">Dashboard</h1>
        </div>
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
});
const { user } = useUser();

</script>