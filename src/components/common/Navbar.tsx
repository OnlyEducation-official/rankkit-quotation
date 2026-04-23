"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Navbar() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [quotationOpen, setQuotationOpen] = useState(
    pathname.startsWith("/quotation")
  );

  const isQuotationActive = pathname.startsWith("/quotation");

  const clearLocalDraft = () => {
    localStorage.removeItem("quotation_draft");
  };

  const handleNavClick = () => {
    clearLocalDraft();
    setSheetOpen(false);
  };

  const navLinkClass = (active: boolean) =>
    active
      ? "font-semibold text-blue-600"
      : "text-muted-foreground transition hover:text-foreground";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
          onClick={clearLocalDraft}
        >
          Quotation App
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={navLinkClass(pathname === "/")}
            onClick={clearLocalDraft}
          >
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center gap-1 outline-none ${
                isQuotationActive
                  ? "font-semibold text-blue-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Quotation
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-52">
              <DropdownMenuItem asChild>
                <Link href="/quotation/list" onClick={clearLocalDraft}>
                  All Quotations
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/quotation" onClick={clearLocalDraft}>
                  Create Quotation
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background text-foreground shadow-sm transition hover:bg-muted"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px] p-0">
              <SheetHeader className="border-b px-6 py-4 text-left">
                <SheetTitle className="text-lg font-semibold">
                  Quotation App
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col p-4">
                <Link
                  href="/"
                  className={`rounded-xl px-4 py-3 text-sm ${navLinkClass(
                    pathname === "/"
                  )}`}
                  onClick={handleNavClick}
                >
                  Home
                </Link>

                <div className="mt-2">
                  <Collapsible
                    open={quotationOpen}
                    onOpenChange={setQuotationOpen}
                  >
                    <CollapsibleTrigger asChild>
                      <button
                        type="button"
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                          isQuotationActive
                            ? "text-blue-600"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>Quotation</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            quotationOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-1 space-y-1 pl-4">
                      <Link
                        href="/quotation/list"
                        className={`block rounded-xl px-4 py-2.5 text-sm ${
                          pathname === "/quotation/list"
                            ? "font-medium text-blue-600"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={handleNavClick}
                      >
                        All Quotations
                      </Link>

                      <Link
                        href="/quotation"
                        className={`block rounded-xl px-4 py-2.5 text-sm ${
                          pathname === "/quotation"
                            ? "font-medium text-blue-600"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={handleNavClick}
                      >
                        Create Quotation
                      </Link>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}