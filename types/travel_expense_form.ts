import type { CustomForm } from "./custom_form";

// Transport types
export const transportTypes = [
    { label: 'Plane', value: 'plane' },
    { label: 'Train', value: 'train' },
    { label: 'Car', value: 'car' },
  ];
  
// Define types
export type TransportType = 'plane' | 'train' | 'car';

interface TransportCost {
    type: TransportType | null;
    date: Date | null;
    cost: number | null;
}

interface AccommodationCost {
    checkIn: Date | null;
    checkOut: Date | null;
    cost: number | null;
}

interface ExtraCost {
    description: string;
    amount: number;
}

export interface TravelExpenseForm extends CustomForm {
    personal_information: {
        firstname: string | undefined,
        lastname: string | undefined,
        email: string | undefined,
        address: string,
        iban: string,
        phone: {
            code: string,
            number: string
        }
    },
    form_values: {
        transportCosts: TransportCost[],
        accommodationCosts: AccommodationCost[],
        extraCosts: ExtraCost[],
        totalCost: number
    }
  }