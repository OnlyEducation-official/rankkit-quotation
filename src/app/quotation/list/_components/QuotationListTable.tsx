"use client";

import { Copy, Trash2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import QuotationListHeader from "./QuotationListHeader";
import AppPagination from "@/src/components/common/AppPagination";
import QuotationSearch from "@/src/components/common/QuotationSearch";
import {
  createQuotation,
  deleteQuotation,
  getAllQuotations,
  getQuotationById,
} from "@/src/services/quotation/quotation.service";
import { QuotationData, QuotationListItem } from "@/src/types/quotation";

export default function QuotationListTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const page = pageFromUrl < 1 ? 1 : pageFromUrl;
  const limit = 25;
  const search = searchParams.get("search") || "";

  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["quotations", page, limit, search],
    queryFn: () =>
      getAllQuotations({
        page,
        limit,
        search,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteQuotation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["quotations"],
      });
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await getQuotationById(id);

      if (!res?.success) {
        throw new Error("Failed to fetch quotation");
      }

      const original = res.data;

      const {
        id: _id,
        createdAt,
        updatedAt,
        ...rest
      } = original as QuotationData;

      const payload = {
        ...rest,
        clientName: `${rest.clientName} (Copy)`,
        quotationDate: new Date().toISOString().split("T")[0],
        validTill: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      };

      const createRes = await createQuotation(payload);

      if (!createRes?.success) {
        throw new Error("Duplicate create failed");
      }

      return createRes;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["quotations"],
      });
    },
  });

  const quotations = data?.data ?? [];
  const meta = data?.meta;

  const updatePageInUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    try {

      const confirmDelete = confirm("Are you sure you want to delete this quotation?");
      if (!confirmDelete) return;

      await deleteMutation.mutateAsync(id);

      if (quotations.length === 1 && page > 1) {
        updatePageInUrl(page - 1);
      }

    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {

      const confirmDuplicate = confirm("Are you sure you want to duplicate this quotation?");
      if (!confirmDuplicate) return;

      await duplicateMutation.mutateAsync(id);

    } catch (err) {
      console.error("Duplicate error:", err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
      <QuotationListHeader />

      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Quotations
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage, review, duplicate, and delete quotations.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:w-auto">
              <QuotationSearch />
              <div className="text-sm text-muted-foreground">
                Total:{" "}
                <span className="font-medium text-foreground">
                  {meta?.total ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-muted/40">
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Quotation No.
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Client Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Created At
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Delete
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Duplicate
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-sm text-muted-foreground"
                  >
                    Loading quotations...
                  </td>
                </tr>
              ) : quotations.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-sm text-muted-foreground"
                  >
                    No quotations found.
                  </td>
                </tr>
              ) : (
                quotations.map((q: QuotationListItem) => (
                  <tr
                    key={q.id}
                    className="group cursor-pointer border-b border-border/60 transition-colors hover:bg-muted/30"
                    onClick={() => router.push(`/quotation/${q.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">
                        {q.quotationNumber}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">
                        {q.clientName}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(q.createdAt).toLocaleDateString("en-CA")}
                    </td>

                    <td
                      className="px-6 py-4 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleDelete(q.id)}
                        title="Delete"
                        disabled={deleteMutation.isPending}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>

                    <td
                      className="px-6 py-4 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleDuplicate(q.id)}
                        title="Duplicate"
                        disabled={duplicateMutation.isPending}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Copy size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Page{" "}
            <span className="font-medium text-foreground">
              {meta?.page ?? page}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {meta?.totalPage ?? 1}
            </span>
            {" • "}
            Total{" "}
            <span className="font-medium text-foreground">
              {meta?.total ?? 0}
            </span>
            {search ? (
              <>
                {" • "}
                Search:{" "}
                <span className="font-medium text-foreground">
                  &quot;{search}&quot;
                </span>
              </>
            ) : null}
            {isFetching && !isLoading ? (
              <span className="ml-2 text-xs text-muted-foreground">
                Updating...
              </span>
            ) : null}
          </div>

          <AppPagination
            currentPage={page}
            totalPages={meta?.totalPage ?? 1}
            onPageChange={updatePageInUrl}
            isLoading={isFetching}
          />
        </div>
      </div>
    </div>
  );
}