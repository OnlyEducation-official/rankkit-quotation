"use client";

import { createRoot } from "react-dom/client";
import { QuotationData } from "../../types/quotation";
import React from "react";
import QuotationPrint from "./quotation-print";


export function printQuotation(quotation: QuotationData) {
  const printWindow = window.open("", "_blank", "width=900,height=1200");

  if (!printWindow) {
    alert("Popup blocked. Please allow popups for this site.");
    return;
  }

  console.log(quotation)

  printWindow.document.write(`
    <html>
      <head>
        <title>Quotation to ${quotation.clientName || "Quotation"} - ${quotation.companyName}</title>
        <style>
          @page { size: A4; margin: 0; }
          html, body {
            margin: 0;
            padding: 0;
            background: #ffffff;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        </style>
      </head>
      <body>
        <div id="print-root"></div>
      </body>
    </html>
  `);

  printWindow.document.close();

  const mountNode = printWindow.document.getElementById("print-root");
  if (!mountNode) return;

  const root = createRoot(mountNode);
  root.render(React.createElement(QuotationPrint, { quotation }));

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 500);
}