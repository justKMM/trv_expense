<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Title -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-gray-900 text-center">About us</h1>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <!-- Company Info -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6">Our Company</h2>
          <div class="space-y-4">
            <p class="text-gray-600">
              HOEHNER RESEARCH & CONSULTING GROUP GmbH is a leading consulting and research firm 
              headquartered in Bonn, Germany. We specialize in providing comprehensive research 
              and consulting services through our various divisions:
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Joint Forces for Solar</li>
              <li>IBESA</li>
              <li>EUPD Research</li>
              <li>EUPD | CHA</li>
            </ul>
          </div>

          <!-- Contact Information -->
          <div class="mt-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
            <div class="space-y-2 text-gray-600">
              <p>Adenauerallee 134</p>
              <p>D-53113 Bonn</p>
              <p>Phone: +49(0)228 504 35-??</p>
              <p>Email: it@hrcg.eu</p>
              <p>Website: www.hrcg.eu</p>
            </div>
          </div>
        </div>

        <!-- Team Section -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6">IT Team</h2>
          <div class="space-y-6">
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-lg font-medium text-gray-900">Yorick Tran</h3>
              <p class="text-gray-600">Chief Technology Officer (CTO)</p>
            </div>
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-lg font-medium text-gray-900">Khai Minh Mai</h3>
              <p class="text-gray-600">Working Student IT Operations & Technologies</p>
            </div>
            <div class="border-b border-gray-200 pb-4">
              <h3 class="text-lg font-medium text-gray-900">Hamza Islam</h3>
              <p class="text-gray-600">Working Student IT Operations & Technologies</p>
            </div>
          </div>

          <!-- Social Media -->
          <div class="mt-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h3>
            <a 
              href="https://www.linkedin.com/company/hrcg" 
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Follow us on LinkedIn
            </a>
          </div>
        </div>
      </div>

      <!-- Legal Notice -->
      <div class="mt-12 bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Legal Information</h2>
        <div class="text-sm text-gray-600 space-y-4">
          <p>
            Hoehner Research & Consulting Group GmbH<br />
            Managing Director: Markus A.W. Hoehner<br />
            Registered Office: Bonn<br />
            Commercial Register: AG Bonn HRB 9226
          </p>
          <p class="text-xs">
            The content of this page is confidential and intended solely for the addressed recipient. 
            Any form of disclosure, reproduction, distribution, or action taken based on this content 
            by unauthorized persons is prohibited and may be unlawful.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
});
</script>

<style scoped>
/* Any additional custom styles can be added here */
</style>