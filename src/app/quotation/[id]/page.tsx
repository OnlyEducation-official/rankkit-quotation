import QuotationPageClient from "@/src/components/quotation/InitialData";
import { getQuotationById } from "@/src/services/quotation/quotation.service";
import { QuotationData } from "@/src/types/quotation";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function QuotationIdPage({ params }: PageProps) {

    const { id } = await params;

    // // fetch quotation by id
    const response = await getQuotationById(id);

    const initialData: QuotationData | null = response.data || null;

    return (
        <div>

            <QuotationPageClient mode="edit" initialData={initialData} />

        </div>
    )
}
