import { TravelExpensePdfService } from "~/services/pdfService"

export default defineNuxtPlugin(() => {
    const pdfService = new TravelExpensePdfService()
    
    return {
      provide: {
        pdf: pdfService
      }
    }
  })