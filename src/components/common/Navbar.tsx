"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();

  const isQuotationActive =
    pathname.startsWith("/quotation");

  return (
    <header className="w-full border-b bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          Quotation App
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">
          
          {/* Home */}
          <Link
            href="/"
            className={pathname === "/" ? "font-bold text-blue-600" : ""}
          >
            Home
          </Link>

          {/* Quotation Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center gap-1 ${
                isQuotationActive ? "font-bold text-blue-600" : ""
              }`}
            >
              Quotation ▼
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/quotation/list">
                  All Quotations
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/quotation">
                  Quotation Creator
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </nav>
    </header>
  );
}