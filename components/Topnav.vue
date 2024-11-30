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
        <p class="">Hello, {{ user?.First_Name }} {{ user?.Last_Name }}</p>
        <button class="button-cancel" @click="handleLogout">Log out</button>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { sidebarVisibilityChanger } from '~/composables/states';

const sidebarVisibility = sidebarVisibilityChanger();
const router = useRouter();
const { user, clearUser } = useUser();

const handleLogout = async () => {
  try {
    // Clear the user data
    clearUser();
    // Remove the authentication tokens from local storage
    localStorage.removeItem('zoho_tokens');
    // Redirect to the login page
    await router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
    // Handle logout error
  }
};

const toggleSidebar = () => {
  sidebarVisibility.value = !sidebarVisibility.value;
};
</script>

<style>
</style>