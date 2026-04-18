import Link from 'next/link'

export default function QuotationListHeader() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">
                    All Quotations List
                </h1>

                <Link
                    href="/quotation"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    + Create New Quotation
                </Link>
            </div>
        </div>
    )
}
