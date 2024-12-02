import type { PdfOptions } from "~/types/pdf_types";
import type { TravelExpenseForm } from "~/types/travel_expense_form";
import { jsPDF } from 'jspdf';

let jsPDFModule: any;
// Dynamically import on client-side only
if (process.client) {
  jsPDFModule = import('jspdf');
}

export class PdfService {
  private doc: jsPDF | null = null;
  private readonly defaultOptions: PdfOptions = {
    filename: 'travel-expense-form',
    dateFormat: { year: 'numeric', month: 'long', day: 'numeric' }
  };

  constructor() {}

  private async initializePdf(): Promise<void> {
    if (!this.doc) {
      const { jsPDF } = await import('jspdf');
      this.doc = new jsPDF();
    }
  }

  public async generatePdf(data: TravelExpenseForm): Promise<boolean> {
    if (!process.client) return false;

    try {
      await this.initializePdf();
      if (!this.doc) return false;

      this.generateContent(data);
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return false;
    }
  }

  public getDataUrl(): string | null {
    return this.doc?.output('dataurlstring') ?? null;
  }

  public download(options?: PdfOptions): void {
    const opts = { ...this.defaultOptions, ...options };
    this.doc?.save(`${opts.filename}-${Date.now()}.pdf`);
  }

  private formatDate(date: Date | null): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', this.defaultOptions.dateFormat);
  }

  private formatCurrency(amount: number | null): string {
    if (amount === null) return 'N/A';
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
  }

  private addTableHeader(headers: string[], startY: number): number {
    if (!this.doc) return startY;

    const pageWidth = this.doc.internal.pageSize.width;
    const margin = 20;
    const columnWidth = (pageWidth - 2 * margin) / headers.length;

    this.doc.setFillColor(244, 244, 244);
    this.doc.rect(margin, startY - 5, pageWidth - 2 * margin, 10, 'F');
    
    this.doc.setFont("helvetica", "bold");
    headers.forEach((header, index) => {
      this.doc?.text(header, margin + (columnWidth * index), startY);
    });
    this.doc.setFont("helvetica", "normal");

    return startY + 10;
  }

  private generateContent(data: TravelExpenseForm): void {
    if (!this.doc) return;

    // Document properties
    this.doc.setProperties({
      title: 'Travel Expense Form',
      author: 'HRCG GmbH',
      creator: 'HRCG Form Creator'
    });

    // Header
    this.doc.setFontSize(24);
    this.doc.setTextColor(44, 62, 80);
    this.doc.text('Travel Expense Form', 20, 20);

    // Date
    this.doc.setFontSize(10);
    this.doc.setTextColor(127, 140, 141);
    this.doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);

    // Separator
    this.doc.setDrawColor(189, 195, 199);
    this.doc.setLineWidth(0.5);
    this.doc.line(20, 45, 190, 45);

    // Personal Information
    let yPosition = 60;
    this.doc.setFontSize(14);
    this.doc.setTextColor(52, 73, 94);
    this.doc.setFont("helvetica", "bold");
    this.doc.text('Personal Information', 20, yPosition);
    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(12);

    yPosition += 15;
    const personalInfo = [
      { label: 'Name', value: `${data.personal_information.firstname} ${data.personal_information.lastname}` },
      { label: 'Email', value: data.personal_information.email },
      { label: 'Phone', value: `${data.personal_information.phone.code} ${data.personal_information.phone.number}` },
      { label: 'Address', value: data.personal_information.address },
      { label: 'IBAN', value: data.personal_information.iban }
    ];

    personalInfo.forEach(item => {
      this.doc?.text(`${item.label}:`, 30, yPosition);
      this.doc?.text(item.value || 'N/A', 90, yPosition);
      yPosition += 10;
    });

    // Transport Costs Table
    yPosition += 15;
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(14);
    this.doc.text('Transport Costs', 20, yPosition);
    this.doc.setFontSize(12);
    
    yPosition += 10;
    const transportHeaders = ['Type', 'Date', 'Cost'];
    yPosition = this.addTableHeader(transportHeaders, yPosition);

    let transportTotal = 0;
    data.form_values.transportCosts.forEach(transport => {
      if (yPosition > this.doc!.internal.pageSize.height - 40) {
        this.doc?.addPage();
        yPosition = 20;
      }

      this.doc?.text(transport.type || 'N/A', 20, yPosition);
      this.doc?.text(this.formatDate(transport.date), 85, yPosition);
      this.doc?.text(this.formatCurrency(transport.cost), 150, yPosition);
      
      if (transport.cost) transportTotal += transport.cost;
      yPosition += 10;
    });

    this.doc?.text('Total Transport Costs:', 85, yPosition);
    this.doc?.text(this.formatCurrency(transportTotal), 150, yPosition);

    // Accommodation Costs Table
    yPosition += 20;
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(14);
    this.doc.text('Accommodation Costs', 20, yPosition);
    this.doc.setFontSize(12);

    yPosition += 10;
    const accommodationHeaders = ['Check-in', 'Check-out', 'Cost'];
    yPosition = this.addTableHeader(accommodationHeaders, yPosition);

    let accommodationTotal = 0;
    data.form_values.accommodationCosts.forEach(accommodation => {
      if (yPosition > this.doc!.internal.pageSize.height - 40) {
        this.doc?.addPage();
        yPosition = 20;
      }

      this.doc?.text(this.formatDate(accommodation.checkIn), 20, yPosition);
      this.doc?.text(this.formatDate(accommodation.checkOut), 85, yPosition);
      this.doc?.text(this.formatCurrency(accommodation.cost), 150, yPosition);
      
      if (accommodation.cost) accommodationTotal += accommodation.cost;
      yPosition += 10;
    });

    this.doc?.text('Total Accommodation Costs:', 85, yPosition);
    this.doc?.text(this.formatCurrency(accommodationTotal), 150, yPosition);

    // Extra Costs Table
    yPosition += 20;
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(14);
    this.doc.text('Extra Costs', 20, yPosition);
    this.doc.setFontSize(12);

    yPosition += 10;
    const extraHeaders = ['Description', 'Amount'];
    yPosition = this.addTableHeader(extraHeaders, yPosition);

    let extraTotal = 0;
    data.form_values.extraCosts.forEach(extra => {
      if (yPosition > this.doc!.internal.pageSize.height - 40) {
        this.doc?.addPage();
        yPosition = 20;
      }

      this.doc?.text(extra.description, 20, yPosition);
      this.doc?.text(this.formatCurrency(extra.amount), 150, yPosition);
      
      extraTotal += extra.amount;
      yPosition += 10;
    });

    this.doc?.text('Total Extra Costs:', 85, yPosition);
    this.doc?.text(this.formatCurrency(extraTotal), 150, yPosition);

    // Total Costs Summary
    yPosition += 20;
    this.doc.setFillColor(244, 244, 244);
    this.doc.rect(20, yPosition - 5, 170, 20, 'F');
    
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(14);
    this.doc.text('Total Travel Expenses:', 20, yPosition + 5);
    this.doc.text(this.formatCurrency(transportTotal + accommodationTotal + extraTotal), 150, yPosition + 5);

    // Footer
    const pageHeight = this.doc.internal.pageSize.height;
    this.doc.setFontSize(8);
    this.doc.setTextColor(127, 140, 141);
    this.doc.text('Generated by HRCG Form Creator', 20, pageHeight - 20);
    this.doc.text(`Page ${this.doc.getCurrentPageInfo().pageNumber}`, 180, pageHeight - 20);
  }
}