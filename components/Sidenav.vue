<template>
  <div
    v-if="sidebarVisibility"
    class="h-screen w-[300px] bg-gray-800 shadow-lg rounded-r-lg transition-transform duration-300 ease-in-out"
    :class="{ 'translate-x-0': sidebarVisibility, '-translate-x-full': !sidebarVisibility }"
  >
    <div class="bg-gray-700 h-[50px] rounded-r-lg">
      <div class="h-full flex text-xl font-bold text-center justify-center text-white">
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      </div>
    </div>
    <div class="flex flex-col justify-between h-[calc(100vh-3rem)] bg-gray-900">
      <div class="menu-man text-left px-2 whitespace-nowrap">
        <div class="profile flex flex-col justify-center items-center text-center p-5">
          <div class="text-center text-white flex flex-col gap-3">
            <NuxtLink
              to="/forms/travel_expense"
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Travel Expense Form
            </NuxtLink>
            <NuxtLink
              to=""
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Account
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              About
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { sidebarVisibilityChanger } from '~/composables/states';

const sidebarVisibility = sidebarVisibilityChanger();
</script>