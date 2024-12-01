<template>
  <div class="w-full min-h-screen">
    <Sidenav/>
    <div 
      class="min-h-screen transition-all duration-300 ease-in-out"
      :class="{ 'ml-[300px]': sidebarVisibility, 'ml-0': !sidebarVisibility }"
    >
      <Topnav/>
      <div class="m-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { sidebarVisibilityChanger } from '~/composables/states';
const sidebarVisibility = sidebarVisibilityChanger();
</script>