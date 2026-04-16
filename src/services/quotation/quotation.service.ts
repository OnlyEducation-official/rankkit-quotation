import { apiFetch } from "@/src/lib/quotation.api";
import { QuotationData } from "@/src/types/quotation";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function createQuotation(payload: QuotationData) {
    console.log("Post request",payload)
//   return apiFetch<ApiResponse<QuotationData>>("/quotations", {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
}

export async function getQuotations() {
  return apiFetch<ApiResponse<QuotationData[]>>("/quotations", {
    method: "GET",
  });
}

export async function getQuotationById(id: string) {
  return apiFetch<ApiResponse<QuotationData>>(`/quotations/${id}`, {
    method: "GET",
  });
}

export async function updateQuotation(id: string, payload: QuotationData) {
  return apiFetch<ApiResponse<QuotationData>>(`/quotations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteQuotation(id: string) {
  return apiFetch<ApiResponse<null>>(`/quotations/${id}`, {
    method: "DELETE",
  });
}