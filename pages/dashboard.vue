<template>
  <div class="w-full h-full">
    Test
    <p>Hello {{ currentUser }}</p>
  </div>
</template>

<script lang="ts" setup>
  const currentUser = getCurrentUser();
</script>

<style>

</style>