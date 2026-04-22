"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type QuotationSearchProps = {
  placeholder?: string;
};

export default function QuotationSearch({
  placeholder = "Search by quotation no, client, company, or salesperson...",
}: QuotationSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchFromUrl = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchFromUrl);

  const lastSyncedSearchRef = useRef(searchFromUrl);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    const currentUrlSearch = searchParams.get("search") || "";

    if (currentUrlSearch !== lastSyncedSearchRef.current) {
      setSearch(currentUrlSearch);
      lastSyncedSearchRef.current = currentUrlSearch;
    }
  }, [searchParams]);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const trimmedSearch = search.trim();
    const currentUrlSearch = searchParams.get("search") || "";

    if (trimmedSearch === currentUrlSearch) {
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      lastSyncedSearchRef.current = trimmedSearch;
      router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, pathname, router]);

  const handleClear = () => {
    setSearch("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");

    lastSyncedSearchRef.current = "";
    router.replace(`${pathname}?${params.toString()}`);
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