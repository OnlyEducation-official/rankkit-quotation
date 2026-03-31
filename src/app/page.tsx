"use client";

import { useState } from "react";
import { COMPANY_PRESETS } from "./lib/company-presets";
import { QuotationData } from "./types/quotation";
import { printQuotation } from "./components/print-quotation";
import QuotationForm from "./components/quotation-form";
import QuotationPreview from "./components/quotation-preview";


const defaultCompany = COMPANY_PRESETS["rankkit-media"];

const initialQuotation: QuotationData = {
  companyType: "rankkit-media",

  companyName: defaultCompany.companyName,
  companyAddress: defaultCompany.companyAddress,
  companyPhone: defaultCompany.companyPhone,
  companyEmail: defaultCompany.companyEmail,

  clientName: "",
  clientAddress: "",
  clientPhone: "",
  clientEmail: "",

  quotationNumber: "QT-001",
  quotationDate: new Date().toISOString().split("T")[0],
  validTill: "",

  items: [
    {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      quantity: 1,
      rate: 0,
      taxPercent: 0,
    },
  ],

  discount: 0,
  notes: defaultCompany.notes,
  terms: defaultCompany.terms,
};

export default function HomePage() {
  const [quotation, setQuotation] = useState<QuotationData>(initialQuotation);

  const handleDownloadPdf = () => {
    printQuotation(quotation);
  };

  return (
    <main className="container mx-auto p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <QuotationForm
          quotation={quotation}
          setQuotation={setQuotation}
          onDownloadPdf={handleDownloadPdf}
        />
        <QuotationPreview quotation={quotation} />
      </div>
    </main>
  );
}