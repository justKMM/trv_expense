<template>
  <div class="w-full h-full flex">
    <Sidenav :currentUser="currentUser" :visibleSidenav="visibleSidenav"/>
    <div class="w-full h-full">
      <Topnav :currentUser="currentUser" :visibleSidenav="visibleSidenav"/>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const currentUser = "Khai Minh Mai";
  const visibleSidenav = false;
</script>

<style>

</style>