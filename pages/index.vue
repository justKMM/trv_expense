<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <div class="grid justify-content-center p-2 lg:p-0 min-width-80 bg-gradient-to-br from-sky-500 to-indigo-500">
        <div class="mt-5 xl:mt-0 flex justify-between text-center p-8">
          <img src="../assets/imgs/HRCG22_weiss-300x269.png" alt="HRCG" class="mb-5 logo" />
        </div>
  
        <div class="h-full w-full">
          <div class="text-center mb-5 text-white">
            <div class="text-900 text-8xl font-bold mb-3">
              Welcome,
            </div>
  
            <span class="text-600 font-medium text-3xl">
              Sign in to continue
            </span>
          </div>
        </div>
      </div>
      <div class="relative flex items-center justify-center bg-blue-300 min-h-screen w-full">
        <div class="static grid grid-cols-1">
          <div class="static bg-white p-3 rounded-lg shadow-lg max-w-80">
            <button @click="redirectToZoho" class="button flex items-center justify-center">
              <Icon name="logos:zoho" class="mr-2"></Icon> Login with Zoho
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from '#app';

definePageMeta({
  layout: false
});

const config = useRuntimeConfig();
const clientId = config.public.clientId;
const redirectUri = config.public.redirectUri;

const redirectToZoho = () => {
  const scope = 'AaaServer.profile.Read';
  const responseType = 'code';
  const prompt = 'consent';
  const accessType = 'offline';

  const authUrl = `https://accounts.zoho.com/oauth/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&prompt=${prompt}&access_type=${accessType}`;
  
  window.location.href = authUrl;
};
</script>

  