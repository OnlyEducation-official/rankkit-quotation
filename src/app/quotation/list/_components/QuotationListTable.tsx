import { QuotationData, QuotationDataOk } from '@/src/types/quotation';
import QuotationListHeader from './QuotationListHeader';

export type QuotationListItem = {
    clientName: string;
    createdAt: string;
    id: string;
    quotationNumber: string;
};

export default function QuotationListTable({ quotations }: { quotations: QuotationListItem[] }) {
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
                        </tr>
                    </thead>

                    <tbody>
                        {quotations.map((q) => (
                            <tr key={q.id} className="border-t">
                                <td className="p-3">{q.quotationNumber}</td>
                                <td className="p-3">{q.clientName}</td>
                                <td className="p-3">
                                    {new Date(q.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
