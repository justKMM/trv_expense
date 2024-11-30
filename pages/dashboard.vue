<template>
  <div class="p-6">
    <div v-if="user" class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
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