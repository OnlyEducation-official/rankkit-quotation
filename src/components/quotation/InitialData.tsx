"use client";

import { useEffect, useState } from "react";
import { QuotationData } from "../../types/quotation";
import { COMPANY_PRESETS, NUMBER_PRESET } from "../../app/lib/company-presets";
import { createQuotation, updateQuotationn } from "@/src/services/quotation/quotation.service";
import { printQuotation } from "./print-quotation";
import QuotationForm from "./quotation-form";
import QuotationPreview from "./quotation-preview";
import { useRouter } from "next/navigation";

const formatDate = (date: string) => {
  if (!date) return date;
  return new Date(date).toISOString().split("T")[0];
};

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
  const router = useRouter();


  const [quotation, setQuotation] = useState<QuotationData>(() =>
    mode === "edit" && initialData ? initialData : createInitialQuotation()
  );

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
    try {
      // 🔹 Step 1: Prepare payload based on mode
      let payload;

      if (mode === "edit") {
        const { terms, createdAt, updatedAt, id, ...rest } = quotation;

        payload = {
          ...rest,
          quotationDate: formatDate(rest.quotationDate),
          validTill: formatDate(rest.validTill),
          grandTotal,
        };
      } else {
        const { terms, ...rest } = quotation;

        payload = {
          ...rest,
          quotationDate: formatDate(rest.quotationDate),
          validTill: formatDate(rest.validTill),
          grandTotal,
        };
      }

      // 🔹 Step 2: Call API based on mode
      let response;

      if (mode === "edit" && quotation.id) {
        response = await updateQuotationn(quotation.id, payload);
      } else {
        response = await createQuotation(payload);
      }

      // 🔹 Step 3: Handle success
      if (response?.success) {
        // IMPORTANT → use response.data, not local state
        printQuotation(quotation, mode, grandTotal);

        localStorage.removeItem("quotation_draft");

        // reset only in create mode
        setQuotation(createInitialQuotation());

        router.push("/quotation/list");

      } else {
        console.error("API failed:", response?.message);
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
      <div className="grid grid-cols-1 gap-6">
        <QuotationForm
          quotation={quotation}
          setQuotation={setQuotation}
          onDownloadPdf={handleDownloadPdf}
          mode={mode}
        />
        {/* <QuotationPreview quotation={quotation} /> */}
      </div>
    </main>
  );
}