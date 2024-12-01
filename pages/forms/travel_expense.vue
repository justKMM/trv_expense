<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg space-y-8">
    <Card class="shadow-md">
      <template #title>
        <h2 class="text-xl font-bold text-gray-800 mb-4">Travel Expense Form</h2>
      </template>
      <template #content>
        <form v-if="!isPreview" @submit.prevent="handleSubmitForm" novalidate class="space-y-8">
          <!-- Personal Information Section -->
          <Panel header="Personal Information">
            <template #header>
              <h3 class="text-lg font-semibold text-gray-700">Personal Information</h3>
            </template>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <!-- First Name -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                <InputGroup>
                  <InputText
                    id="firstName"
                    v-model="userInfo.firstname"
                    disabled
                    class="w-full bg-gray-100"
                    aria-disabled="true"
                  />
                </InputGroup>
              </div>

              <!-- Last Name -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                <InputGroup>
                  <InputText
                    id="lastName"
                    v-model="userInfo.lastname"
                    disabled
                    class="w-full bg-gray-100"
                    aria-disabled="true"
                  />
                </InputGroup>
              </div>

              <!-- Email -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <InputGroup>
                  <InputText
                    id="email"
                    v-model="userInfo.email"
                    disabled
                    class="w-full bg-gray-100"
                    aria-disabled="true"
                  />
                </InputGroup>
              </div>

              <!-- Phone with Country Code -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
                <div class="flex gap-2">
                  <Dropdown
                    v-model="form.personal_information.phone.code"
                    :options="phoneCountries"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Code"
                    class="w-30"
                    :class="{ 'p-invalid': errors.phoneCountry }"
                  />
                  <InputGroup class="flex-1">
                    <InputText
                      id="phone"
                      v-keyfilter.num
                      v-model="form.personal_information.phone.number"
                      class="w-full"
                      :class="{ 'p-invalid': errors.phone }"
                      aria-describedby="phone-help"
                      placeholder="Phone number"
                    />
                  </InputGroup>
                </div>
                <small id="phone-help" v-if="errors.phone" class="p-error block mt-1">{{ errors.phone }}</small>
              </div>

              <!-- IBAN -->
              <div class="col-span-2 space-y-1">
                <label class="block text-sm font-medium text-gray-600 mb-2">IBAN</label>
                <InputGroup>
                  <InputText
                    id="iban"
                    v-model="form.personal_information.iban"
                    class="w-full"
                    :class="{ 'p-invalid': errors.iban }"
                    @input="validateIBAN"
                    aria-describedby="iban-help"
                  />
                </InputGroup>
                <small id="iban-help" v-if="errors.iban" class="p-error block mt-1">{{ errors.iban }}</small>
              </div>

              <!-- Address -->
              <div class="col-span-2 space-y-1">
                <label class="block text-sm font-medium text-gray-600 mb-2">Postal Address</label>
                <InputGroup>
                  <InputText
                    id="address"
                    v-model="form.personal_information.address"
                    class="w-full"
                    :class="{ 'p-invalid': errors.address }"
                    aria-describedby="address-help"
                  />
                </InputGroup>
                <small id="address-help" v-if="errors.address" class="p-error block mt-1">{{ errors.address }}</small>
              </div>
            </div>
          </Panel>

          <!-- Transport Details Section -->
          <Panel>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-700">Transport Details</h3>
            </template>
            <div class="space-y-6 pt-4">
              <!-- Transport Type and Costs -->
              <div v-for="(transport, index) in form.form_values.transportCosts" :key="index" class="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-600">Transport Type</label>
                  <div class="flex gap-6 mt-2">
                    <div v-for="type in transportTypes" :key="type.value" class="flex items-center">
                      <RadioButton
                        :id="`${type.value}-${index}`"
                        v-model="transport.type"
                        :value="type.value"
                        :name="`transport-type-${index}`"
                      />
                      <label :for="`${type.value}-${index}`" class="ml-2 text-gray-700">{{ type.label }}</label>
                    </div>
                  </div>
                </div>

                <div class="flex gap-4">
                  <!-- Date Selection -->
                  <div class="w-48 space-y-1">
                    <label class="block text-sm font-medium text-gray-600 mb-2">Date</label>
                    <Calendar
                      v-model="transport.date"
                      class="w-full"
                      dateFormat="dd/mm/yy"
                      showIcon
                      fluid
                      iconDisplay="input"
                      placeholder="dd/mm/yyyy"
                    />
                  </div>

                  <!-- Transport Cost -->
                  <div class="flex-1 space-y-1">
                    <label class="block text-sm font-medium text-gray-600 mb-2">Cost</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <span class="pi pi-euro"></span>
                      </InputGroupAddon>
                      <InputNumber
                        v-model="transport.cost"
                        mode="decimal"
                        :minFractionDigits="2"
                        :maxFractionDigits="2"
                        placeholder="Enter cost"
                        class="w-full"
                      />
                    </InputGroup>
                  </div>

                  <!-- Remove Button -->
                  <div class="flex items-end">
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      text
                      @click="removeTransportCost(index)"
                      type="button"
                    />
                  </div>
                </div>
              </div>

              <!-- Add Transport Button -->
              <Button
                label="Add Transport"
                icon="pi pi-plus"
                text
                @click="addTransportCost"
                type="button"
                class="mt-2"
              />
            </div>
          </Panel>

          <!-- Accommodation Details Section -->
          <Panel>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-700">Accommodation Details</h3>
            </template>
            <div class="space-y-4 pt-4">
              <div v-for="(accommodation, index) in form.form_values.accommodationCosts" :key="index" class="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Check-in Date -->
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-600 mb-2">Check-in Date</label>
                    <Calendar
                      v-model="accommodation.checkIn"
                      class="w-full"
                      dateFormat="dd/mm/yy"
                      showIcon
                      fluid
                      iconDisplay="input"
                      placeholder="dd/mm/yyyy"
                    />
                  </div>

                  <!-- Check-out Date -->
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-600 mb-2">Check-out Date</label>
                    <Calendar
                      v-model="accommodation.checkOut"
                      class="w-full"
                      dateFormat="dd/mm/yy"
                      showIcon
                      fluid
                      iconDisplay="input"
                      placeholder="dd/mm/yyyy"
                      :class="{ 'p-invalid': errors.accommodationCosts[index] }"
                    />
                    <small 
                      v-if="errors.accommodationCosts[index]" 
                      class="p-error block mt-1"
                    >{{ errors.accommodationCosts[index] }}</small>
                  </div>
                </div>

                <div class="flex gap-4">
                  <!-- Hotel Cost -->
                  <div class="flex-1 space-y-1">
                    <label class="block text-sm font-medium text-gray-600 mb-2">Hotel Cost</label>
                    <InputGroup>
                      <InputGroupAddon>
                        <span class="pi pi-euro"></span>
                      </InputGroupAddon>
                      <InputNumber
                        v-model="accommodation.cost"
                        mode="decimal"
                        :minFractionDigits="2"
                        :maxFractionDigits="2"
                        placeholder="Enter cost"
                        class="w-full"
                      />
                    </InputGroup>
                  </div>

                  <!-- Remove Button -->
                  <div class="flex items-end">
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      text
                      @click="removeAccommodationCost(index)"
                      type="button"
                    />
                  </div>
                </div>
              </div>

              <!-- Add Accommodation Button -->
              <Button
                label="Add Accommodation"
                icon="pi pi-plus"
                text
                @click="addAccommodationCost"
                type="button"
                class="mt-2"
              />
            </div>
          </Panel>

          <!-- Extra Costs Section -->
          <Panel>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-700">Extra Costs</h3>
            </template>
            <div class="space-y-4 pt-4">
              <div v-for="(cost, index) in form.form_values.extraCosts" :key="index" class="flex gap-4">
                <InputGroup class="flex-grow">
                  <InputText
                    v-model="cost.description"
                    placeholder="Description"
                    class="w-full"
                  />
                </InputGroup>
                <InputGroup class="w-48">
                  <InputGroupAddon>
                    <span class="pi pi-euro"></span>
                  </InputGroupAddon>
                  <InputNumber
                    v-model="cost.amount"
                    mode="decimal"
                    :minFractionDigits="2"
                    :maxFractionDigits="2"
                    placeholder="Amount"
                    class="w-full"
                  />
                </InputGroup>
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
          </Panel>

          <!-- Total -->
          <div class="bg-gray-100 p-4 border border-gray-300 rounded-lg">
            <div class="flex justify-between text-lg font-medium">
              <span>Total Expenses:</span>
              <span>€{{ calculateTotal.toFixed(2) }}</span>
            </div>
          </div>

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

        <div v-else-if="pdfUrl" class="pdf-preview">
          <!-- Add your PDF preview here -->
          <iframe :src="pdfUrl" class="w-full h-screen"></iframe>
        </div>
      </template>
    </Card>
  </div>
  
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
});

import { ref, computed } from 'vue';
import { usePdf } from '~/composables/usePdf';
import type { TravelExpenseForm } from '~/types/travel_expense_form';
import { transportTypes } from '~/types/travel_expense_form';

const { user } = useUser();
const userInfo = ref({
  firstname: user.value?.First_Name,
  lastname: user.value?.Last_Name,
  email: user.value?.Email,
});

// Phone country codes
const phoneCountries = [
  { label: 'UK +44', value: '+44' },
  { label: 'DE +49', value: '+49' },
  { label: 'VN +84', value: '+84' },
  { label: 'CN +86', value: '+86' },
  { label: 'IN +91', value: '+91' },
  { label: 'PK +92', value: '+92' },
  { label: 'TW +886', value: '+886' },
  { label: 'AE +971', value: '+971' },
];

// Form state
const form = ref<TravelExpenseForm>({
  personal_information: {
    firstname: userInfo.value?.firstname,
    lastname: userInfo.value?.lastname,
    email: userInfo.value?.email,
    address: '',
    iban: '',
    phone: {
        code: '',
        number: ''
    }
  },
  form_values: {
    transportCosts: [{
      type: 'plane',
      date: null,
      cost: null
    }],
    accommodationCosts: [{
      checkIn: null,
      checkOut: null,
      cost: null
    }],
    extraCosts: [],
    totalCost: 0
  }
});

// Error state
const errors = ref({
  iban: '',
  address: '',
  phoneCountry: '',
  phone: '',
  transportCosts: [] as string[],
  accommodationCosts: [] as string[]
});

// For PDF generation
const { 
  pdfUrl, 
  loading, 
  error, 
  generatePdf, 
  downloadPdf,  
} = usePdf()
const isPreview = ref(false);

// Computed total
const calculateTotal = computed(() => {
  const transportTotal = form.value.form_values.transportCosts.reduce((sum, cost) => 
    sum + (cost.cost || 0), 0);
  const accommodationTotal = form.value.form_values.accommodationCosts.reduce((sum, cost) => 
    sum + (cost.cost || 0), 0);
  const extraTotal = form.value.form_values.extraCosts.reduce((sum, cost) => 
    sum + (cost.amount || 0), 0);
    
  return transportTotal + accommodationTotal + extraTotal;
});

// Watch for date changes and validate
watch(() => form.value.form_values.accommodationCosts, (newCosts) => {
  newCosts.forEach((cost, index) => {
    if (!validateAccommodationDates(cost.checkIn, cost.checkOut)) {
      errors.value.accommodationCosts[index] = 'Check-out date must be after check-in date';
    } else {
      errors.value.accommodationCosts[index] = '';
    }
  });
}, { deep: true });

// Transport costs management
const addTransportCost = () => {
  form.value.form_values.transportCosts.push({
    type: 'plane',
    date: null,
    cost: null
  });
};

const removeTransportCost = (index: number) => {
  form.value.form_values.transportCosts.splice(index, 1);
};

// Accommodation costs management
const addAccommodationCost = () => {
  form.value.form_values.accommodationCosts.push({
    checkIn: null,
    checkOut: null,
    cost: null
  });
};

const removeAccommodationCost = (index: number) => {
  form.value.form_values.accommodationCosts.splice(index, 1);
};

// Extra costs management
const addExtraCost = () => {
  form.value.form_values.extraCosts.push({ description: '', amount: 0 });
};

const removeExtraCost = (index: number) => {
  form.value.form_values.extraCosts.splice(index, 1);
};

// Form validation
const isFormValid = computed(() => {
  const hasRequiredFields = 
    form.value.personal_information.iban &&
    form.value.personal_information.address &&
    form.value.personal_information.phone.code &&
    form.value.personal_information.phone.number;

  const hasNoErrors = !Object.values(errors.value).some(error => 
    Array.isArray(error) ? error.length > 0 : error
  );

  return hasRequiredFields;
});

// IBAN validation
const validateIBAN = () => {
  const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}$/;
  if (!ibanRegex.test(form.value.personal_information.iban)) {
    errors.value.iban = 'Please enter a valid IBAN';
  } else {
    errors.value.iban = '';
  }
};

// Add immediate validation on field change
watch(() => form.value.personal_information.iban, (newValue) => {
  if (newValue) validateIBAN();
});

// Date validation
const validateAccommodationDates = (checkIn: Date | null, checkOut: Date | null): boolean => {
  if (!checkIn || !checkOut) return false; // Disallow empty dates
  return new Date(checkOut) > new Date(checkIn);
};

// Form submission
const handleSubmitForm = async () => {
  try {
    loading.value = true;
    const success = await generatePdf(form.value);
    
    if (!success) {
      throw new Error('Failed to generate PDF');
    }
    
    // Only set preview mode if PDF generation was successful
    isPreview.value = true;
    console.log('Form submitted successfully');
  } catch (error) {
      console.error('Error submitting form:', error);
    // Show error to user
    // You might want to add a ref for error messages
    // errorMessage.value = error instanceof Error ? error.message : 'Failed to submit form';
  } finally {
    loading.value = false;
  }
};
</script>