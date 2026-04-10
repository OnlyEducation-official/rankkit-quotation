"use client";

import { useEffect, useState } from "react";
import { COMPANY_PRESETS } from "../lib/company-presets";
import { QuotationData } from "../types/quotation";
import { printQuotation } from "./components/print-quotation";
import QuotationForm from "./components/quotation-form";
import QuotationPreview from "./components/quotation-preview";

const STORAGE_KEY = "quotation_draft";

function createInitialQuotation(): QuotationData {
  const defaultCompany = COMPANY_PRESETS["rankkit-media"];

  const today = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(today.getDate() + 7);

  return {
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
    quotationDate: today.toISOString().split("T")[0],
    validTill: expiryDate.toISOString().split("T")[0],

    items: [
      {
        id: "initial-item",
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
}

export default function HomePage() {
  const [quotation, setQuotation] = useState<QuotationData>(createInitialQuotation);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved) as Partial<QuotationData>;

      setQuotation((prev) => ({
        ...prev,
        ...parsed,
        items:
          parsed.items && parsed.items.length > 0 ? parsed.items : prev.items,
      }));
    } catch (error) {
      console.error("Failed to load quotation draft:", error);
    }
  }, []); 

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quotation));
    } catch (error) {
      console.error("Failed to save quotation draft:", error);
    }
  }, [quotation]);

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