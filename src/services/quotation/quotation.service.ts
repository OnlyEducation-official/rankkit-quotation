import { apiFetch } from "@/src/lib/quotation.api";
import { PaginatedQuotationResponse, QuotationData, QuotationListItem } from "@/src/types/quotation";

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
  return apiFetch<ApiResponse<QuotationData>>("/api/v1/quotations/createQuotations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getAllQuotations(params?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

  const queryString = searchParams.toString();

  return apiFetch<PaginatedQuotationResponse>(
    `/api/v1/quotations/getAllQuotations${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
    }
  );
}

// export async function getQuotations() {
//   return apiFetch<ApiResponse<QuotationListItem[]>>("/api/v1/quotations/getAllQuotations", {
//     method: "GET",
//   });
// }

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
  return apiFetch<ApiResponse<null>>(`/api/v1/quotations/${id}`, {
    method: "DELETE",
  });
}

