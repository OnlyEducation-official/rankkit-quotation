"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { quotationSchema } from "@/src/app/lib/validations/quotation.schema";

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
  // const [grandTotal, setgrandTotal] = useState(mode === "edit" ? quotation.grandTotal : 0)
  const [errors, setErrors] = useState<Record<string, string>>({});

  const grandTotal = useMemo(() => {
    if (mode === "edit" && !flag) {
      return quotation.grandTotal || 0;
    }

    const subtotal = quotation.items.reduce(
      (sum, item) => sum + item.rate,
      0
    );

    return subtotal - (quotation.discount || 0);
  }, [mode, flag, quotation.items, quotation.discount, quotation.grandTotal]);

  const handleValidatedDownload = async () => {
    const isValid = validateQuotation();

    if (!isValid) return;

    await onDownloadPdf(grandTotal || 0);
  };

  const validateQuotation = () => {
    const result = quotationSchema.safeParse(quotation);

    console.log(quotation)

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      if (!fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    });

    setErrors(fieldErrors);
    return false;
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const updateField = (
    field: keyof QuotationData,
    value: string | number | QuotationItem[],
  ) => {
    setQuotation((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFlag(true)
  };

  const updateItem = (
    id: string,
    field: keyof QuotationItem,
    value: string | number,
  ) => {
    setQuotation((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
    setFlag(true)
  };

  const addItem = () => {
    setQuotation((prev) => ({
      ...prev,
      items: [...prev.items, createEmptyItem()],
    }));
    setFlag(true)

  };

  const removeItem = (id: string) => {
    setQuotation((prev) => {
      if (prev.items.length === 1) return prev;

      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      };
    });
    setFlag(true)
  };

  const resetForm = () => {
    localStorage.removeItem("quotation_draft");
    setQuotation(createInitialQuotation());
  };


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
    <div className="space-y-8">
      <div className="sticky top-4 z-10 rounded-2xl border bg-background/95 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {mode === "create" ? "Create Quotation" : "Edit Quotation"}
            </h2>
          </div>

          <div className="flex flex-row gap-2 justify-between overflow-x-auto">
            <div>
              <Button
                type="button"
                onClick={addItem}
                className="flex-1 whitespace-nowrap rounded-xl px-3 py-2 text-sm sm:flex-none"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add
              </Button>
            </div>

            <div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2 rounded-xl px-4"
                    disabled={mode === "edit"}
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset quotation form?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will clear all quotation data including services, client details, and totals.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={resetForm}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Yes, Reset
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div>
            <DownloadPdfAlert
              onDownloadPdf={handleValidatedDownload}
              grandTotal={grandTotal || 0}
              mode={mode}
            />
          </div>
        </div>
      </div>

      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-lg">Company Details</CardTitle>
          <p className="text-sm text-muted-foreground">
            Select the company and salesperson. Company information is auto-filled.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Company</label>
              <Select
                value={quotation.companyType}
                onValueChange={(value) =>
                  handleCompanyChange(value as "rankkit-media" | "rankkit-studio" | "both")
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rankkit-media">Rankkit Media</SelectItem>
                  <SelectItem value="rankkit-studio">Rankkit Studio</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Salesperson</label>
              <Select
                value={quotation.salesPersonName}
                onValueChange={(value) =>
                  handleSalespersonChange(value as "rhea" | "babita")
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select Salesperson" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rhea">Rhea</SelectItem>
                  <SelectItem value="babita">Babita</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Company Name</label>
              <Input
                placeholder="Company Name"
                value={quotation.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                disabled
                className="rounded-xl bg-muted/40"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Company Phone</label>
              <Input
                placeholder="Company Phone"
                value={quotation.companyPhone}
                onChange={(e) => updateField("companyPhone", e.target.value || "")}
                disabled
                className="rounded-xl bg-muted/40"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Company Email</label>
              <Input
                placeholder="Company Email"
                value={quotation.companyEmail}
                onChange={(e) => updateField("companyEmail", e.target.value || "")}
                disabled
                className="rounded-xl bg-muted/40"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Company Address</label>
              <Input
                placeholder="Company Address"
                value={quotation.companyAddress}
                onChange={(e) => updateField("companyAddress", e.target.value || "")}
                disabled
                className="rounded-xl bg-muted/40"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-lg">Client Details</CardTitle>
          <p className="text-sm text-muted-foreground">
            Fill in the client information used in the quotation.
          </p>
        </CardHeader>

        <CardContent className="grid gap-5 p-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Client Name</label>
            <Input
              placeholder="Client Name"
              value={quotation.clientName}
              onChange={(e) => {
                updateField("clientName", e.target.value);
                clearError("clientName");
              }}
              className="rounded-xl"
            />
            {errors.clientName && (
              <p className="text-sm text-red-500">{errors.clientName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Client Phone</label>
            <Input
              placeholder="Client Phone"
              value={quotation.clientPhone}
              inputMode="numeric"
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                updateField("clientPhone", value);
              }}
              className="rounded-xl"
            />
            
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Client Email</label>
            <Input
              placeholder="Client Email"
              value={quotation.clientEmail}
              onChange={(e) => {
                updateField("clientEmail", e.target.value);
              }}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Client Address</label>
            <Input
              placeholder="Client Address"
              value={quotation.clientAddress}
              onChange={(e) => {
                updateField("clientAddress", e.target.value);
              }}
              className="rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-lg">Quotation Details</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose the quotation date and validity period.
          </p>
        </CardHeader>

        <CardContent className="grid gap-5 p-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Quotation Date</label>
            <Input
              type="date"
              value={new Date(quotation.quotationDate).toLocaleDateString("en-CA")}
              onChange={(e) => {
                updateField("quotationDate", e.target.value);
                clearError("quotationDate");
              }}
              className="rounded-xl"
            />
            {errors.quotationDate && (
              <p className="text-sm text-red-500">{errors.quotationDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Quotation Valid Till</label>
            <Input
              type="date"
              value={new Date(quotation.validTill).toLocaleDateString("en-CA")}
              onChange={(e) => {
                updateField("validTill", e.target.value);
                clearError("validTill");
              }}
              className="rounded-xl"
            />
            {errors.validTill && (
              <p className="text-sm text-red-500">{errors.validTill}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">Services</CardTitle>
              <p className="text-sm text-muted-foreground">
                Add service names, descriptions, and pricing details.
              </p>
            </div>

            <Button type="button" variant="outline" onClick={addItem} className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              Add Another Service
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 p-6">
          {quotation.items.map((item, index) => (
            <div
              key={item.id || `item-${index}`}
              className="rounded-2xl border bg-background p-5 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Service {index + 1}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Enter service details and pricing.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  disabled={quotation.items.length === 1}
                  aria-label={`Remove item ${index + 1}`}
                  className="rounded-xl text-muted-foreground hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Service Name</label>
                  <Input
                    placeholder="Enter Service Name"
                    value={item.title}
                    onChange={(e) => {
                      updateItem(item.id, "title", e.target.value);
                      clearError(`items.${index}.title`);
                    }}
                    className="rounded-xl"
                  />
                  {errors[`items.${index}.title`] && (
                    <p className="text-sm text-red-500">
                      {errors[`items.${index}.title`]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Service Description
                  </label>
                  <div className="rounded-xl border bg-background">
                    <TiptapEditor
                      value={item.description}
                      onChange={(value) => {
                        updateItem(item.id, "description", value);
                        clearError(`items.${index}.description`);
                      }}
                      placeholder="Write your service details...."
                    />
                  </div>
                  {errors[`items.${index}.description`] && (
                    <p className="text-sm text-red-500">
                      {errors[`items.${index}.description`]}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Amount</label>
                    <Input
                      type="number"
                      min="0"
                      value={item.rate}
                      onChange={(e) => {
                        updateItem(item.id, "rate", Number(e.target.value));
                        clearError(`items.${index}.rate`);
                      }}
                      className="rounded-xl"
                    />
                    {errors[`items.${index}.rate`] && (
                      <p className="text-sm text-red-500">
                        {errors[`items.${index}.rate`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden rounded-2xl border shadow-sm">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-lg">Discount</CardTitle>
            <p className="text-sm text-muted-foreground">
              Apply any discount to the quotation total.
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Discount Amount</label>
              <Input
                type="number"
                min="0"
                placeholder="Discount"
                value={quotation.discount}
                onChange={(e) =>
                  updateField("discount", Number(e.target.value || 0))
                }
                className="rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-2xl border shadow-sm">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-lg">Summary</CardTitle>
            <p className="text-sm text-muted-foreground">
              Final quotation amount after discount.
            </p>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>
                {/* {subtotal.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} */}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Discount</span>
              <span>
                {(quotation.discount || 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="rounded-xl bg-primary/5 px-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-foreground">
                  Grand Total
                </span>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  ₹
                  {grandTotal?.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-lg">Additional Terms & Conditions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Add custom terms that should appear below the preset terms in the final quotation.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <label htmlFor="custom-term" className="text-sm font-medium text-foreground">
              Add Custom Term
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="custom-term"
                type="text"
                value={customTermInput}
                onChange={(e) => setCustomTermInput(e.target.value)}
                placeholder="Enter custom term or condition"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <button
                type="button"
                onClick={handleAddCustomTerm}
                className="inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
              >
                Add Term
              </button>
            </div>
          </div>

          {Array.isArray(quotation.customTerms) && quotation.customTerms.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Added Terms</p>

              <div className="space-y-3">
                {quotation.customTerms.map((term, index) => (
                  <div
                    key={`${term}-${index}`}
                    className="flex items-start justify-between gap-4 rounded-xl border bg-muted/20 px-4 py-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 text-sm font-semibold text-primary">•</span>
                      <p className="text-sm leading-6 text-foreground">{term}</p>
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
        </CardContent>
      </Card>
    </div>
  );
}