"use client";

import * as React from "react";
import { Plus, Trash2, Download, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QuotationData, QuotationItem } from "../types/quotation";
import RichTextEditor from "./rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPANY_PRESETS } from "../lib/company-presets";
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

type QuotationFormProps = {
  quotation: QuotationData;
  setQuotation: React.Dispatch<React.SetStateAction<QuotationData>>;
  onDownloadPdf?: () => void;
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

  return {
    companyType: "rankkit-media",
    companyName: preset.companyName,
    companyAddress: preset.companyAddress,
    companyPhone: preset.companyPhone,
    companyEmail: preset.companyEmail,

    clientName: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",

    quotationNumber: "QT-001",
    quotationDate: new Date().toISOString().split("T")[0],
    validTill: "",

    items: [createEmptyItem()],

    discount: 0,
    notes: preset.notes,
    terms: preset.terms,
  };
};

export default function QuotationForm({
  quotation,
  setQuotation,
  onDownloadPdf,
}: QuotationFormProps) {
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
    setQuotation((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addItem = () => {
    setQuotation((prev) => ({
      ...prev,
      items: [...prev.items, createEmptyItem()],
    }));
  };

  const removeItem = (id: string) => {
    setQuotation((prev) => {
      if (prev.items.length === 1) return prev;

      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      };
    });
  };

  const resetForm = () => {
    setQuotation(createInitialQuotation());
  };

  const getItemSubtotal = (item: QuotationItem) => item.quantity * item.rate;
  const getItemTax = (item: QuotationItem) =>
    getItemSubtotal(item) * (item.taxPercent / 100);
  const getItemTotal = (item: QuotationItem) =>
    getItemSubtotal(item) + getItemTax(item);

  const subtotal = quotation.items.reduce(
    (sum, item) => sum + getItemSubtotal(item),
    0,
  );

  const taxTotal = quotation.items.reduce(
    (sum, item) => sum + getItemTax(item),
    0,
  );

  const grandTotal = subtotal + taxTotal - (quotation.discount || 0);

  const handleCompanyChange = (value: "rankkit-media" | "rankkit-studio") => {
    const preset = COMPANY_PRESETS[value];

    setQuotation((prev) => ({
      ...prev,
      companyType: value,
      companyName: preset.companyName,
      companyAddress: preset.companyAddress,
      companyPhone: preset.companyPhone,
      companyEmail: preset.companyEmail,
      notes: preset.notes,
      terms: preset.terms,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button type="button" onClick={addItem} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="gap-2"
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

        <Button
          type="button"
          onClick={onDownloadPdf}
          className="gap-2 sm:ml-auto"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card>

        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Select Company
          </label>

          <Select
            value={quotation.companyType}
            onValueChange={(value) =>
              handleCompanyChange(value as "rankkit-media" | "rankkit-studio")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rankkit-media">Rankkit Media</SelectItem>
              <SelectItem value="rankkit-studio">Rankkit Studio</SelectItem>
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
              value={quotation.quotationDate}
              onChange={(e) => updateField("quotationDate", e.target.value)}
            />
          </div>

          {/* Valid Till */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Valid Till
            </label>
            <Input
              type="date"
              value={quotation.validTill}
              onChange={(e) => updateField("validTill", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Items / Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quotation.items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border p-4 space-y-4 bg-muted/20"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Item {index + 1}</h3>
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

              <p>Title</p>

              <Input
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  updateItem(item.id, "title", e.target.value)
                }
              />

              <p>Description</p>

              <RichTextEditor
                value={item.description}
                onChange={(value) => updateItem(item.id, "description", value)}
              />

              <div className="grid gap-4 md:grid-cols-4">
                {/* Rate */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Rate
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
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span>{(quotation.discount || 0).toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
            <span>Grand Total</span>
            <span>{grandTotal.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}