// composables/usePdf.ts
import { ref } from 'vue'
import { PdfService } from '~/services/pdfService'
import type { CustomForm } from '~/types/custom_form'
import type { PdfOptions } from '~/types/pdf_types'

export function usePdf() {
  const pdfService = new PdfService()
  const pdfUrl = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const generatePdf = async (data: CustomForm) => {
    try {
      loading.value = true;
      error.value = null;
      
      const success = await pdfService.generatePdf(data);
      if (!success) {
        throw new Error('Failed to generate PDF');
      }
      
      const url = pdfService.getDataUrl();
      if (!url) {
        throw new Error('Failed to get PDF URL');
      }
      
      pdfUrl.value = url.startsWith('data:') ? url : `data:application/pdf;base64,${url}`;
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error generating PDF';
      console.error(err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const downloadPdf = async (options?: PdfOptions) => {
    try {
      loading.value = true
      error.value = null
      
      pdfService.download(options)
      return true
    } catch (err) {
      error.value = 'Error downloading PDF'
      console.error(err)
      return false
    } finally {
      loading.value = false
    }
  };

  return {
    pdfUrl,
    loading,
    error,
    generatePdf,
    downloadPdf
  };
}