"use client";
import { Trash2 } from 'lucide-react';
import QuotationListHeader from './QuotationListHeader';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { deleteQuotation } from '@/src/services/quotation/quotation.service';

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

                                {/* 🔥 ACTION COLUMN */}
                                <td
                                    className="p-3"
                                    onClick={(e) => e.stopPropagation()} // IMPORTANT
                                >
                                    <button
                                        onClick={() => handleDelete(q.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
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
