import Link from "next/link";
import { Plus } from "lucide-react";

export default function QuotationListHeader() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Left Content */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            All Quotations
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage, search, and track all your quotations in one place.
          </p>
        </div>

        {/* CTA Button */}
        <Link
          href="/quotation"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <Plus className="h-4 w-4" />
          Create Quotation
        </Link>

      </div>
    </div>
  );
}