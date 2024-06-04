<template>
  <div class="w-full bg-gray-200">
    <div class="flex justify-between items-center h-[50px]">
      <div class="p-3 hover:bg-gray-100 cursor-pointer">
        <Icon name="fa:bars" size="24px"></Icon>
      </div>
      <div class="flex justify-between items-center w-[100px] h-full hover:bg-gray-100 cursor-pointer" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
        <p class="ml-3">User</p>
        <Icon name="mynaui:user-hexagon" class="mr-3"></Icon>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Avatar from 'primevue/avatar';
  import Menu from 'primevue/menu';

  import { ref } from "vue";

  const menu = ref();
  const items = ref([
      {
          label: 'Options',
          items: [
              {
                  label: 'Logout',
                  icon: 'pi pi-times',
                  shortcut: 'F5'
              },
          ]
      }
  ]);

  const toggle = (event: any) => {
      menu.value.toggle(event);
  };

</script>

<style>
</style>