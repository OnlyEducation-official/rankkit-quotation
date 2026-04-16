import { QuotationItem } from "../../types/quotation";

export function getItemSubtotal(item: QuotationItem) {
  return item.quantity * item.rate;
}

export function getItemTax(item: QuotationItem) {
  return getItemSubtotal(item) * (item.taxPercent / 100);
}

export function getItemTotal(item: QuotationItem) {
  return getItemSubtotal(item) + getItemTax(item);
}

export function getQuotationTotals(items: QuotationItem[], discount: number) {
  const subtotal = items.reduce((sum, item) => sum + getItemSubtotal(item), 0);
  const taxTotal = items.reduce((sum, item) => sum + getItemTax(item), 0);
  const total = subtotal + taxTotal - discount;

  return {
    subtotal,
    taxTotal,
    total,
  };
}