import QuotationPageClient from "@/src/components/quotation/InitialData";
import { getQuotationById } from "@/src/services/quotation/quotation.service";
import { QuotationData } from "@/src/types/quotation";
import { COMPANY_PRESETS } from "../../lib/company-presets";

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

    console.log("Setting preset : ", initialData)

    if (!initialData) return;

    if (initialData.companyName === "Rankkit Media") {
        initialData.terms = COMPANY_PRESETS["rankkit-media"].terms;
    } else if (initialData.companyName === "Rankkit Studio") {
        initialData.terms = COMPANY_PRESETS["rankkit-studio"].terms;
    } else {
        initialData.terms = COMPANY_PRESETS["both"].terms;
    }

    return (
        <div>

            <QuotationPageClient mode="edit" initialData={initialData} />

        </div>
    )
}
