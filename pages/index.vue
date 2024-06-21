<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0 min-width-80 bg-gradient-to-br from-sky-500 to-indigo-500">
            <div class="mt-5 xl:mt-0 flex justify-center justify-between text-center p-8">
                <img src="../assets/imgs/HRCG22_weiss-300x269.png" alt="HRCG" class="mb-5 logo"/>
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
                    <NuxtLink class="button" to="dashboard"><Icon name="logos:zoho"></Icon> Login with Zoho</NuxtLink>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    definePageMeta ({
        layout: false
    });
</script>

<style>

</style>
  

 