<template>
  <div class="w-full">
    <nav class="flex w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200">
      <div
        @click="toggleSidebar"
        class="p-3 hover:bg-gray-100 cursor-pointer transition duration-200 rounded-md"
      >
        <Icon name="fa:bars" size="24px"></Icon>
      </div>
      <div class="flex justify-between items-center w-[16rem] h-full mr-3">
        <p class="">Hello, {{ currentUser }}</p>
        <NuxtLink class="button-cancel" to="/">Log out</NuxtLink>
      </div>
    </nav>
  </div>
</template>
<script lang="ts" setup>
import { sidebarVisibilityChanger } from '~/composables/states';

const currentUser = getCurrentUser();
const sidebarVisibility = sidebarVisibilityChanger();

const toggleSidebar = () => {
  sidebarVisibility.value = !sidebarVisibility.value;
};
</script>
<style>
</style>