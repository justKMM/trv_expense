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
              <!-- First Name -->
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-600">First Name</label>
                <InputText
                  id="firstName"
                  v-model="userInfo.firstName"
                  disabled
                  class="w-full mt-1 text-gray-700 bg-gray-100"
                  aria-disabled="true"
                />
              </div>

              <!-- Last Name -->
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-600">Last Name</label>
                <InputText
                  id="lastName"
                  v-model="userInfo.lastName"
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

              <!-- Phone with Country Code -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-600">Phone Number</label>
                <div class="flex gap-2">
                  <Dropdown
                    v-model="form.phoneCountry"
                    :options="phoneCountries"
                    optionLabel="label"
                    class="w-36"
                    placeholder="Code"
                    :class="{ 'p-invalid': errors.phoneCountry }"
                  />
                  <InputMask
                    id="phone"
                    v-model="form.phone"
                    class="flex-1"
                    mask="*** **** ****"
                    :class="{ 'p-invalid': errors.phone }"
                    aria-describedby="phone-help"
                  />
                </div>
                <small id="phone-help" v-if="errors.phone" class="p-error">{{ errors.phone }}</small>
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

              <!-- Address (single line) -->
              <div class="col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-600">Postal Address</label>
                <InputText
                  id="address"
                  v-model="form.address"
                  class="w-full mt-1"
                  :class="{ 'p-invalid': errors.address }"
                  aria-describedby="address-help"
                />
                <small id="address-help" v-if="errors.address" class="p-error">{{ errors.address }}</small>
              </div>
            </div>
          </Panel>

          <!-- Expense Details Section -->
          <Panel header="Expense Details" class="mb-6">
            <!-- Transport Type Selection -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-600 mb-2">Transport Type</label>
              <div class="flex gap-4">
                <div v-for="type in transportTypes" :key="type.value" class="flex items-center">
                  <RadioButton
                    :id="type.value"
                    v-model="form.transportType"
                    :value="type.value"
                    :name="type.value"
                  />
                  <label :for="type.value" class="ml-2">{{ type.label }}</label>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Dynamic Transport Cost Field -->
              <div>
                <label :for="transportCostField.id" class="block text-sm font-medium text-gray-600">
                  {{ transportCostField.label }}
                </label>
                <span class="p-input-icon-left w-full">
                  <i class="pi pi-euro text-gray-600"></i>
                  <InputNumber
                    :id="transportCostField.id"
                    v-model="form[transportCostField.model]"
                    mode="decimal"
                    :minFractionDigits="2"
                    :maxFractionDigits="2"
                    class="w-full mt-1"
                    :class="{ 'p-invalid': errors[transportCostField.model] }"
                    :aria-describedby="`${transportCostField.model}-help`"
                  />
                </span>
                <small 
                  :id="`${transportCostField.model}-help`" 
                  v-if="errors[transportCostField.model]" 
                  class="p-error"
                >{{ errors[transportCostField.model] }}</small>
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
                  class=""
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

const { user } = useUser();

// Mock user info - replace with actual user data
const userInfo = ref({
  firstName: user.value?.First_Name,
  lastName: user.value?.Last_Name,
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

// Transport types
const transportTypes = [
  { label: 'Plane', value: 'plane' },
  { label: 'Train', value: 'train' },
  { label: 'Car', value: 'car' },
];

// Define types
type TransportType = 'plane' | 'train' | 'car';
type TransportCostField = 'planeTicketCost' | 'trainTicketCost' | 'gasCost';

interface FormState {
  iban: string;
  address: string;
  phoneCountry: string | null;
  phone: string;
  transportType: TransportType;
  planeTicketCost: number;
  trainTicketCost: number;
  gasCost: number;
  hotelCost: number;
  extraCosts: Array<{ description: string; amount: number }>;
}

// Form state
const form = ref<FormState>({
  iban: '',
  address: '',
  phoneCountry: null,
  phone: '',
  transportType: 'plane',
  planeTicketCost: 0,
  trainTicketCost: 0,
  gasCost: 0,
  hotelCost: 0,
  extraCosts: []
});

// Error state
const errors = ref({
  iban: '',
  address: '',
  phoneCountry: '',
  phone: '',
  planeTicketCost: '',
  trainTicketCost: '',
  gasCost: '',
  hotelCost: ''
});

interface TransportFieldConfig {
  id: TransportCostField;
  label: string;
  model: TransportCostField;
}

// Dynamic transport cost field based on selected transport type
const transportCostField = computed<TransportFieldConfig>(() => {
  switch (form.value.transportType) {
    case 'plane':
      return { id: 'planeTicketCost', label: 'Plane Ticket Cost', model: 'planeTicketCost' };
    case 'train':
      return { id: 'trainTicketCost', label: 'Train Ticket Cost', model: 'trainTicketCost' };
    case 'car':
      return { id: 'gasCost', label: 'Gas Cost', model: 'gasCost' };
    default:
      return { id: 'planeTicketCost', label: 'Plane Ticket Cost', model: 'planeTicketCost' };
  }
});

// Computed total
const calculateTotal = computed(() => {
  const transportCost = form.value[transportCostField.value.model];
  const extraTotal = form.value.extraCosts.reduce((sum, cost) => sum + (Number(cost.amount) || 0), 0);
  return Number(transportCost) + 
         Number(form.value.hotelCost) + 
         extraTotal;
});

// Form validation
const isFormValid = computed(() => {
  return !Object.values(errors.value).some(error => error) &&
         form.value.iban &&
         form.value.address &&
         form.value.phoneCountry &&
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