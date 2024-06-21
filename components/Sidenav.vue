<template>
  <div class="h-screen w-[300px] bg-gray-800 shadow-lg rounded-r-lg">
      <div class="bg-gray-700 h-[50px] rounded-r-lg">
          <div class="h-full flex text-xl font-bold text-center justify-center text-white">Profile</div>
      </div>

      <div class="flex flex-col justify-between h-[calc(100vh-3rem)] bg-gray-900">
        <div class="menu-man text-left px-2 whitespace-nowrap">
          <div class="profile flex justify-center items-center text-center p-5">
            <div class="text-center text-white">
              <h5 class="text-xl font-medium leading-tight mb-2">
                <!-- {{ currentUser }} -->
              </h5>
              <NuxtLink to="">Link 1</NuxtLink>
            </div>
          </div>

        </div>
      </div>
  </div>
</template>

<script setup>
  const currentUser = ref($store)
</script>