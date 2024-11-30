<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg space-y-8">
    <Card class="shadow-md">
      <template #title>
        <h2 class="text-lg font-bold text-gray-800">Travel Expense Form</h2>
      </template>
      <template #content>
        <form @submit.prevent="submitForm" novalidate>
          <!-- Personal Information Section -->
          <Panel header="Personal Information" class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
                <InputText
                  id="name"
                  v-model="userInfo.name"
                  disabled
                  class="w-full mt-1 text-gray-700 bg-gray-100"
                  aria-disabled="true"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                <InputText
                  id="email"
                  v-model="userInfo.email"
                  disabled
                  class="w-full mt-1 text-gray-700 bg-gray-100"
                  aria-disabled="true"
                />
              </div>

              <!-- IBAN -->
              <div class="col-span-2">
                <label for="iban" class="block text-sm font-medium text-gray-600">IBAN</label>
                <InputText
                  id="iban"
                  v-model="form.iban"
                  class="w-full mt-1"
                  :class="{ 'p-invalid': errors.iban }"
                  @input="validateIBAN"
                  aria-describedby="iban-help"
                />
                <small id="iban-help" v-if="errors.iban" class="p-error">{{ errors.iban }}</small>
              </div>

              <!-- Address -->
              <div class="col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-600">Postal Address</label>
                <Textarea
                  id="address"
                  v-model="form.address"
                  rows="3"
                  class="w-full mt-1"
                  :class="{ 'p-invalid': errors.address }"
                  aria-describedby="address-help"
                />
                <small id="address-help" v-if="errors.address" class="p-error">{{ errors.address }}</small>
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-600">Phone Number</label>
                <InputMask
                  id="phone"
                  v-model="form.phone"
                  mask="(999) 999-9999"
                  class="w-full mt-1"
                  :class="{ 'p-invalid': errors.phone }"
                  aria-describedby="phone-help"
                />
                <small id="phone-help" v-if="errors.phone" class="p-error">{{ errors.phone }}</small>
              </div>
            </div>
          </Panel>

          <!-- Expense Details Section -->
          <Panel header="Expense Details" class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Travel Cost -->
              <div>
                <label for="travelCost" class="block text-sm font-medium text-gray-600">Travel Cost</label>
                <span class="p-input-icon-left w-full">
                  <i class="pi pi-euro text-gray-600"></i>
                  <InputNumber
                    id="travelCost"
                    v-model="form.travelCost"
                    mode="decimal"
                    :minFractionDigits="2"
                    :maxFractionDigits="2"
                    class="w-full mt-1"
                    :class="{ 'p-invalid': errors.travelCost }"
                    aria-describedby="travelCost-help"
                  />
                </span>
                <small id="travelCost-help" v-if="errors.travelCost" class="p-error">{{ errors.travelCost }}</small>
              </div>

              <!-- Hotel Cost -->
              <div>
                <label for="hotelCost" class="block text-sm font-medium text-gray-600">Hotel Cost</label>
                <span class="p-input-icon-left w-full">
                  <i class="pi pi-euro text-gray-600"></i>
                  <InputNumber
                    id="hotelCost"
                    v-model="form.hotelCost"
                    mode="decimal"
                    :minFractionDigits="2"
                    :maxFractionDigits="2"
                    class="w-full mt-1"
                    :class="{ 'p-invalid': errors.hotelCost }"
                    aria-describedby="hotelCost-help"
                  />
                </span>
                <small id="hotelCost-help" v-if="errors.hotelCost" class="p-error">{{ errors.hotelCost }}</small>
              </div>
            </div>

            <!-- Extra Costs -->
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-600">Extra Costs</label>
              <div v-for="(cost, index) in form.extraCosts" :key="index" class="flex items-center space-x-4 mt-4">
                <InputText
                  v-model="cost.description"
                  placeholder="Description"
                  class="flex-grow"
                />
                <InputNumber
                  v-model="cost.amount"
                  mode="decimal"
                  :minFractionDigits="2"
                  :maxFractionDigits="2"
                  class="w-32"
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  @click="removeExtraCost(index)"
                  type="button"
                />
              </div>
              <Button
                label="Add Extra Cost"
                icon="pi pi-plus"
                text
                @click="addExtraCost"
                type="button"
                class="mt-2"
              />
            </div>

            <!-- Total -->
            <div class="bg-gray-100 p-4 border border-gray-300 rounded-lg mt-6">
              <div class="flex justify-between text-lg font-medium">
                <span>Total Expenses:</span>
                <span>€{{ calculateTotal.toFixed(2) }}</span>
              </div>
            </div>
          </Panel>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <Button
              type="submit"
              label="Submit Expense Report"
              icon="pi pi-check"
              :disabled="!isFormValid"
              class="px-6 py-2"
            />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

definePageMeta({
  middleware: ['auth']
});

// Mock user info - replace with actual user data
const userInfo = ref({
  name: 'John Doe',
  email: 'john.doe@example.com'
});

// Form state
const form = ref({
  iban: '',
  address: '',
  phone: '',
  travelCost: 0,
  hotelCost: 0,
  extraCosts: [] as { description: string; amount: number }[]
});

// Error state
const errors = ref({
  iban: '',
  address: '',
  phone: '',
  travelCost: '',
  hotelCost: ''
});

// Computed total
const calculateTotal = computed(() => {
  const extraTotal = form.value.extraCosts.reduce((sum, cost) => sum + (Number(cost.amount) || 0), 0);
  return (Number(form.value.travelCost) || 0) + 
         (Number(form.value.hotelCost) || 0) + 
         extraTotal;
});

// Form validation
const isFormValid = computed(() => {
  return !Object.values(errors.value).some(error => error) &&
         form.value.iban &&
         form.value.address &&
         form.value.phone;
});

// IBAN validation
const validateIBAN = () => {
  const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}$/;
  if (!ibanRegex.test(form.value.iban)) {
    errors.value.iban = 'Please enter a valid IBAN';
  } else {
    errors.value.iban = '';
  }
};

// Extra costs management
const addExtraCost = () => {
  form.value.extraCosts.push({ description: '', amount: 0 });
};

const removeExtraCost = (index: number) => {
  form.value.extraCosts.splice(index, 1);
};

// Form submission
const submitForm = async () => {
  try {
    // Add your form submission logic here
    console.log('Form submitted:', form.value);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
</script>