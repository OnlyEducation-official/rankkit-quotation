import QuotationListTable, { QuotationListItem } from './_components/QuotationListTable'
import { getQuotations } from '@/src/services/quotation/quotation.service';

export default async function page() {

    const response = await getQuotations();

    const quotations: QuotationListItem[] = response.data || [];

    return (
        <div>
            <QuotationListTable quotations={quotations} />
        </div>
    )
}
