import { Suspense } from "react";
import QuotationListTable from './_components/QuotationListTable';

export default async function page() {


    return (
        <Suspense fallback={<div>Loading quotations...</div>}>
            <QuotationListTable />
        </Suspense>
    )
}
