"use client";

import { useEffect, useState } from "react";
import { QuotationData } from "../../types/quotation";
import { COMPANY_PRESETS, NUMBER_PRESET } from "../../app/lib/company-presets";
import { createQuotation } from "@/src/services/quotation/quotation.service";
import { printQuotation } from "./print-quotation";
import QuotationForm from "./quotation-form";
import QuotationPreview from "./quotation-preview";

export type QuotationFormProps = {
  mode: "create" | "edit";
  initialData?: QuotationData | null;
};

const STORAGE_KEY = "quotation_draft";

function createInitialQuotation(): QuotationData {
  const defaultCompany = COMPANY_PRESETS["rankkit-media"];
  const salesPersonPreset = NUMBER_PRESET["rhea"]


  const today = new Date();
  const expiryDate = new Date(today);
  expiryDate.setDate(today.getDate() + 7);

  return {
    companyType: "rankkit-media",
    salesPersonName: "rhea",
    companyName: defaultCompany.companyName,
    companyAddress: defaultCompany.companyAddress,
    companyPhone: salesPersonPreset.companyPhone,
    companyEmail: defaultCompany.companyEmail,

    clientName: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",

    quotationNumber: "",
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
    customTerms: [],
  };
}

export default function QuotationPageClient({
  mode,
  initialData,
}: QuotationFormProps) {
  const [mounted, setMounted] = useState(false);

  const [quotation, setQuotation] = useState<QuotationData>(() =>
    mode === "edit" && initialData ? initialData : createInitialQuotation()
  );

  console.log("quotation:", quotation)

  useEffect(() => {
    try {
      if (mode === "edit") {
        setMounted(true);
        return;
      }

      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as Partial<QuotationData>;

        setQuotation((prev) => ({
          ...prev,
          ...parsed,
          items:
            Array.isArray(parsed.items) && parsed.items.length > 0
              ? parsed.items.map((item, index) => ({
                ...item,
                id: item.id || `restored-item-${index}`,
              }))
              : prev.items,
          customTerms: Array.isArray(parsed.customTerms)
            ? parsed.customTerms
            : [],
        }));
      }
    } catch (error) {
      console.error("Failed to load quotation draft:", error);
    } finally {
      setMounted(true);
    }
  }, [mode]);

  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quotation));
    } catch (error) {
      console.error("Failed to save quotation draft:", error);
    }
  }, [quotation, mounted]);

  const handleDownloadPdf = async (grandTotal: number) => {

    const {
      terms,        // optional if you want to remap
      ...rest
    } = quotation;

    const updatedQuotation = {
      ...rest,
      grandTotal,
    };

    try {
      const payload = updatedQuotation

      const response = await createQuotation(payload);
      console.log(response)

      if (response.success && response.message === "Quotation created successfully") {

        printQuotation(quotation);
        localStorage.removeItem("quotation_draft");
        setQuotation(createInitialQuotation());

      }

    } catch (error) {
      console.error("Failed to save quotation:", error);
    }

  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="container mx-auto p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <QuotationForm
          quotation={quotation}
          setQuotation={setQuotation}
          onDownloadPdf={handleDownloadPdf}
          mode={mode}
        />
        <QuotationPreview quotation={quotation} />
      </div>
    </main>
  );
}