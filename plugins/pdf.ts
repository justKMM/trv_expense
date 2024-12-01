import { PdfService } from "~/services/pdfService"

export default defineNuxtPlugin(() => {
    const pdfService = new PdfService()
    
    return {
      provide: {
        pdf: pdfService
      }
    }
  })