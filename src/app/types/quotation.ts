export type CompanyType = "rankkit-media" | "rankkit-studio";

export type QuotationItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  taxPercent: number;
  title:string;
};

export type QuotationData = {

  companyType:CompanyType

  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;

  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;

  quotationNumber: string;
  quotationDate: string;
  validTill: string;

  items: QuotationItem[];

  discount: number;
  notes: string;
  terms: string;
};