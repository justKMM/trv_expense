<template>
  <div class="w-full bg-gray-200">
    <div class="flex justify-between items-center h-[50px]">
      <div class="p-3 hover:bg-gray-100 cursor-pointer transition duration-200 rounded-md">
        <Icon name="fa:bars" size="24px"></Icon>
      </div>
      <div class="flex justify-between items-center w-[16rem] h-full mr-3">
        <p class="">Hello, {{user}}</p>
        <NuxtLink class="button-cancel" to="/">Log out</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  
  const user = "Khai Minh Mai";


</script>

<style>
</style>