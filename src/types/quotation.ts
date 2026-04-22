export type CompanyType = "rankkit-media" | "rankkit-studio" | "both";
export type salesPersonName = "rhea" | "babita"

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
  salesPersonName:salesPersonName

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
  terms?: string;
  customTerms:string[];
  grandTotal?:number;

  id?: string;
  createdAt?: string;
  updatedAt?: string;

};

export type QuotationListItem = {
    clientName: string;
    createdAt: string;
    id: string;
    quotationNumber: string;
};

export type PaginatedQuotationResponse = {
  success:boolean;
  message:string;
  data: QuotationListItem[];
  meta:{
    page:number;
    limit:number;
    total:number;
    totalPage:number;
  }
}

