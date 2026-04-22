"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type QuotationSearchProps = {
  placeholder?: string;
};

type SearchInputProps = {
  initialValue: string;
  placeholder: string;
  pathname: string;
  currentParams: string;
};

function SearchInput({
  initialValue,
  placeholder,
  pathname,
  currentParams,
}: SearchInputProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialValue);

  useEffect(() => {
    const trimmedSearch = search.trim();
    const params = new URLSearchParams(currentParams);
    const currentUrlSearch = params.get("search") || "";

    if (trimmedSearch === currentUrlSearch) return;

    const timer = setTimeout(() => {
      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, pathname, currentParams, router]);

  const handleClear = () => {
    setSearch("");

    const params = new URLSearchParams(currentParams);
    params.delete("search");
    params.set("page", "1");

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      {search ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

export default function QuotationSearch({
  placeholder = "Search by quotation no, client, company, or salesperson...",
}: QuotationSearchProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchFromUrl = searchParams.get("search") || "";
  const currentParams = searchParams.toString();

  return (
    <SearchInput
      key={searchFromUrl}
      initialValue={searchFromUrl}
      placeholder={placeholder}
      pathname={pathname}
      currentParams={currentParams}
    />
  );
}