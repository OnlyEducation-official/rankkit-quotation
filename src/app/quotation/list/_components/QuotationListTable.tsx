"use client";
import { Copy, Trash2 } from 'lucide-react';
import QuotationListHeader from './QuotationListHeader';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { createQuotation, deleteQuotation, getQuotationById } from '@/src/services/quotation/quotation.service';
import { QuotationData } from '@/src/types/quotation';

export type QuotationListItem = {
    clientName: string;
    createdAt: string;
    id: string;
    quotationNumber: string;
};

export default function QuotationListTable({ quotations }: { quotations: QuotationListItem[] }) {

    const router = useRouter();

    const handleDelete = async (id: string) => {
        try {
            const confirmDelete = confirm("Are you sure you want to delete this quotation?");

            if (!confirmDelete) return;

            await deleteQuotation(id);

            // refresh list (depends on your setup)
            window.location.reload();

        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleDuplicate = async (id: string) => {
        try {
            // 1. get full quotation
            const res = await getQuotationById(id);

            if (!res?.success) {
                console.error("Failed to fetch quotation");
                return;
            }

            const original = res.data;

            // 2. remove DB-only fields
            const {
                id: _id,
                createdAt,
                updatedAt,
                ...rest
            } = original as QuotationData;

            // 3. optional tweaks
            const payload = {
                ...rest,
                clientName: `${rest.clientName} (Copy)`,
                // optionally reset dates
                quotationDate: new Date().toISOString().split("T")[0],
                validTill: new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                )
                    .toISOString()
                    .split("T")[0],
            };

            console.log("payload:", payload)

            // 4. create new
            const createRes = await createQuotation(payload);

            if (!createRes?.success) {
                console.error("Duplicate create failed");
                return;
            }

            // 5. redirect to new quotation
            window.location.reload();

            // router.push(`/quotation/${createRes?.data?.id}`);
        } catch (err) {
            console.error("Duplicate error:", err);
        }
    };


    return (
        <div className="mx-auto max-w-7xl px-4 py-6">

            <QuotationListHeader />

            <div className="border rounded-md">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Quotation No.</th>
                            <th className="p-3">Client Name</th>
                            <th className="p-3">Created At</th>
                            <th className="p-3">Delete</th>
                            <th className="p-3">Duplicate</th>
                        </tr>
                    </thead>

                    <tbody>
                        {quotations.map((q) => (
                            <tr
                                key={q.id}
                                className="border-t hover:bg-gray-50 cursor-pointer"
                                onClick={() => router.push(`/quotation/${q.id}`)}
                            >
                                <td className="p-3">{q.quotationNumber}</td>
                                <td className="p-3">{q.clientName}</td>

                                <td className="p-3">
                                    {new Date(q.createdAt).toLocaleDateString("en-CA")}
                                </td>

                                <td
                                    className="p-3 "
                                    onClick={(e) => e.stopPropagation()} // prevent row navigation
                                >
                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(q.id)}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>

                                <td
                                    className="p-3"
                                    onClick={(e) => e.stopPropagation()} // prevent row navigation
                                >
                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDuplicate(q.id)}
                                        className="text-gray-500 hover:text-red-700"
                                        title="Delete"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </td>




                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
