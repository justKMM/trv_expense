<template>
  <div class="w-full h-full flex">
    <Sidenav/>
    <div class="w-full h-full">
      <Topnav/>
      <div class="m-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { sidebarVisibilityChanger } from '~/composables/states';

  const currentUser = "Khai Minh Mai";
  const sidebarVisibility = sidebarVisibilityChanger();
</script>

<style>

</style>