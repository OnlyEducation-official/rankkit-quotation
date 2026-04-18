import { QuotationListItem } from "@/src/app/quotation/list/_components/QuotationListTable";
import { apiFetch } from "@/src/lib/quotation.api";
import { QuotationData } from "@/src/types/quotation";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    action?: string;
    timestamp?: string;
  };
  error?: {
    code: string;
    details?: any;
  };
};

export async function createQuotation(payload: QuotationData) {
  console.log("Post request", payload)
  return apiFetch<ApiResponse<QuotationData>>("/api/v1/quotations/createQuotations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getQuotations() {
  return apiFetch<ApiResponse<QuotationListItem[]>>("/api/v1/quotations/getAllQuotations", {
    method: "GET",
  });
}

export async function getQuotationById(id: string) {
  return apiFetch<ApiResponse<QuotationData>>(`/api/v1/quotations/${id}`, {
    method: "GET",
  });
}

export async function updateQuotationn(id: string, payload: QuotationData) {
  return apiFetch<ApiResponse<QuotationData>>(`/api/v1/quotations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteQuotation(id: string) {
  return apiFetch<ApiResponse<null>>(`/quotations/${id}`, {
    method: "DELETE",
  });
}