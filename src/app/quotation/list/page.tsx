// import QuotationListTable, { QuotationListItem } from './_components/QuotationListTable'
import { getAllQuotations } from '@/src/services/quotation/quotation.service';
import QuotationListTable from './_components/QuotationListTable';

export default async function page() {

    // const response = await getQuotations();
    // const response = await getAllQuotations();

    // const quotations: QuotationListItem[] = response.data || [];
    let quotations

    return (
        <div>
            <QuotationListTable />
        </div>
    )
}
