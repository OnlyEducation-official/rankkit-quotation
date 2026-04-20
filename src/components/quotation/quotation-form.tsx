"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QuotationData, QuotationItem } from "../../types/quotation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPANY_PRESETS, NUMBER_PRESET } from "../../app/lib/company-presets";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import TiptapEditor from "./tiptap-editor";
import DownloadPdfAlert from "./DownloadPdfAlert";

type QuotationFormProps = {
  quotation: QuotationData;
  setQuotation: React.Dispatch<React.SetStateAction<QuotationData>>;
  onDownloadPdf: (grandTotal: number) => void | Promise<void>;
  mode: string;
};

const createEmptyItem = (): QuotationItem => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  rate: 0,
  taxPercent: 0,
  title: ''
});

const createInitialQuotation = (): QuotationData => {
  const preset = COMPANY_PRESETS["rankkit-media"];
  const salesPersonPreset = NUMBER_PRESET["rhea"]

  const today = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(today.getDate() + 7);

  return {
    companyType: "rankkit-media",
    salesPersonName: "rhea",
    companyName: preset.companyName,
    companyAddress: preset.companyAddress,
    companyPhone: salesPersonPreset.companyPhone,
    companyEmail: preset.companyEmail,

    clientName: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",

    quotationNumber: "",
    quotationDate: today.toISOString().split("T")[0],
    validTill: expiryDate.toISOString().split("T")[0],

    items: [createEmptyItem()],

    discount: 0,
    notes: preset.notes,
    terms: preset.terms,
    customTerms: [],

  };
};

export default function QuotationForm({
  quotation,
  setQuotation,
  onDownloadPdf,
  mode
}: QuotationFormProps) {

  const [customTermInput, setCustomTermInput] = useState("");
  const [flag, setFlag] = useState(false)
  const [grandTotal,setgrandTotal] = useState(mode === "edit" ? quotation.grandTotal : 0 )

  const updateField = (
    field: keyof QuotationData,
    value: string | number | QuotationItem[],
  ) => {
    setQuotation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateItem = (
    id: string,
    field: keyof QuotationItem,
    value: string | number,
  ) => {
    console.log("update item")
    setQuotation((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
    setFlag(!flag)
  };

  const addItem = () => {
    console.log("add item")
    setQuotation((prev) => ({
      ...prev,
      items: [...prev.items, createEmptyItem()],
    }));
    setFlag(!flag)

  };

  const removeItem = (id: string) => {
    console.log("remove item")
    setQuotation((prev) => {
      if (prev.items.length === 1) return prev;

      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      };
    });
    setFlag(!flag)
  };

  const resetForm = () => {
    localStorage.removeItem("quotation_draft");
    setQuotation(createInitialQuotation());
  };

  useEffect(() => {
    
    const getItemSubtotal = (item: QuotationItem) => item.rate;
    const getItemTax = (item: QuotationItem) =>
      getItemSubtotal(item) * (item.taxPercent / 100);
    
    console.log(quotation.items)

    const subtotal = quotation.items.reduce(
      (sum, item) => sum + getItemSubtotal(item),
      0,
    );

    const grandTotal = subtotal - (quotation.discount || 0);

    console.log("Grand Total:",grandTotal, "Sub Total:",subtotal)

    setgrandTotal(grandTotal)

  }, [flag,mode])



  const handleCompanyChange = (value: "rankkit-media" | "rankkit-studio" | "both") => {
    const preset = COMPANY_PRESETS[value];

    setQuotation((prev) => ({
      ...prev,
      companyType: value,
      companyName: preset.companyName,
      companyAddress: preset.companyAddress,
      companyEmail: preset.companyEmail,
      notes: preset.notes,
      terms: preset.terms,
    }));
  };

  const handleSalespersonChange = (value: "rhea" | "babita") => {
    const preset = NUMBER_PRESET[value];

    setQuotation((prev) => ({
      ...prev,
      salesPersonName: value,
      companyPhone: preset.companyPhone,
    }));
  };

  const handleAddCustomTerm = () => {
    const value = customTermInput.trim();
    if (!value) return;

    setQuotation((prev) => ({
      ...prev,
      customTerms: Array.isArray(prev.customTerms)
        ? [...prev.customTerms, value]
        : [value],
    }));

    setCustomTermInput("");
  };

  const handleRemoveCustomTerm = (indexToRemove: number) => {
    setQuotation((prev) => ({
      ...prev,
      customTerms: Array.isArray(prev.customTerms)
        ? prev.customTerms.filter((_, index) => index !== indexToRemove)
        : [],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button type="button" onClick={addItem} className="gap-2">
          <Plus className="h-4 w-4" />
          {mode === "create" ? "Add Item" : "Edit Item"}
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              disabled={mode === "edit"}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to reset?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This will clear all quotation data including items, client details, and totals. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={resetForm}
                className="bg-red-600 hover:bg-red-700"
              >
                Yes, Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DownloadPdfAlert onDownloadPdf={onDownloadPdf} grandTotal={grandTotal || 0} mode={mode} />
      </div>

      <Card>

        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>

        <div className="md:col-span-2 pl-4">
          <label className="mb-2 block text-sm font-medium">
            Select Company
          </label>

          <Select
            value={quotation.companyType}
            onValueChange={(value) =>
              handleCompanyChange(value as "rankkit-media" | "rankkit-studio" | "both")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rankkit-media">Rankkit Media</SelectItem>
              <SelectItem value="rankkit-studio">Rankkit Studio</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2 pl-4">
          <label className="mb-2 block text-sm font-medium">
            Select Salesperson
          </label>

          <Select
            value={quotation.salesPersonName}
            onValueChange={(value) =>
              handleSalespersonChange(value as "rhea" | "babita")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Salesperson" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rhea">Rhea</SelectItem>
              <SelectItem value="babita">Babita</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Company Name"
            value={quotation.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            disabled
          />
          <Input
            placeholder="Company Phone"
            value={quotation.companyPhone}
            onChange={(e) => updateField("companyPhone", e.target.value)}
            disabled
          />
          <Input
            placeholder="Company Email"
            value={quotation.companyEmail}
            onChange={(e) => updateField("companyEmail", e.target.value)}
            disabled
          />
          <Input
            placeholder="Company Address"
            value={quotation.companyAddress}
            onChange={(e) => updateField("companyAddress", e.target.value)}
            disabled
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Client Name"
            value={quotation.clientName}
            onChange={(e) => updateField("clientName", e.target.value)}
          />
          <Input
            placeholder="Client Phone"
            value={quotation.clientPhone}
            onChange={(e) => updateField("clientPhone", e.target.value)}
          />
          <Input
            placeholder="Client Email"
            value={quotation.clientEmail}
            onChange={(e) => updateField("clientEmail", e.target.value)}
          />
          <Input
            placeholder="Client Address"
            value={quotation.clientAddress}
            onChange={(e) => updateField("clientAddress", e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quotation Details</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-3">
          {/* Quotation Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Quotation Date
            </label>
            <Input
              type="date"
              value={new Date(quotation.quotationDate).toLocaleDateString("en-CA")}
              onChange={(e) => updateField("quotationDate", e.target.value)}
            />
          </div>

          {/* Valid Till */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Quotation Valid Till
            </label>
            <Input
              type="date"
              // If validTill is undefined or null, default to empty string to avoid errors
              value={new Date(quotation.validTill).toLocaleDateString("en-CA")}
              onChange={(e) => updateField("validTill", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quotation.items.map((item, index) => (
            <div
              key={item.id || `item-${index}`}
              className="rounded-xl border p-4 space-y-4 bg-muted/20"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Service {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  disabled={quotation.items.length === 1}
                  aria-label={`Remove item ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <p>Service Name</p>

              <Input
                placeholder="Enter Service Name"
                value={item.title}
                onChange={(e) =>
                  updateItem(item.id, "title", e.target.value)
                }
              />

              <p>Service Description</p>

              {/* <RichTextEditor
                value={item.description}
                onChange={(value) => updateItem(item.id, "description", value)}
              /> */}

              <TiptapEditor
                value={item.description}
                onChange={(value) => updateItem(item.id, "description", value)}
                placeholder="Write your service details...."
              />

              <div className="grid gap-4 md:grid-cols-4">
                {/* Rate */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={item.rate}
                    onChange={(e) =>
                      updateItem(item.id, "rate", Number(e.target.value || 0))
                    }
                  />
                </div>

              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addItem}>
            <Plus className="mr-2 h-4 w-4" />
            Add Another Item
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Discount</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="number"
            min="0"
            placeholder="Discount"
            value={quotation.discount}
            onChange={(e) =>
              updateField("discount", Number(e.target.value || 0))
            }
          />

        </CardContent>

        <div className="space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-base font-semibold text-slate-900">
                Additional Terms & Conditions
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Add any custom terms that should appear below the preset terms in the final quotation.
              </p>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="custom-term"
                className="block text-sm font-medium text-slate-700"
              >
                Add Custom Term
              </label>

              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="custom-term"
                  type="text"
                  value={customTermInput}
                  onChange={(e) => setCustomTermInput(e.target.value)}
                  placeholder="Enter custom term or condition"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={handleAddCustomTerm}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.98]"
                >
                  Add Term
                </button>
              </div>
            </div>

            {Array.isArray(quotation.customTerms) && quotation.customTerms.length > 0 && (
              <div className="mt-5 space-y-3">
                <p className="text-sm font-medium text-slate-700">Added Terms</p>

                <div className="space-y-2">
                  {quotation.customTerms.map((term, index) => (
                    <div
                      key={`${term}-${index}`}
                      className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 text-sm font-semibold text-blue-600">•</span>
                        <p className="text-sm leading-6 text-slate-700">{term}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveCustomTerm(index)}
                        className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>
              {/* {subtotal.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} */}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span>{(quotation.discount || 0).toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
            <span>Grand Total</span>
            <span>
              {grandTotal?.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}