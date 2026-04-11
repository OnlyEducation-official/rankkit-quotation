"use client";

import * as React from "react";
import { QuotationData } from "../../types/quotation";

type Props = {
  quotation: QuotationData;
};

const BRAND_WATERMARKS: Record<string, string> = {
  "rankkit media":
    "/media_logo.png",
  "rankkit studio":
    "/studio_logo.png",
};

function escapeHtml(value: string) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

function buildCustomTermsHtml(customTerms: string[]) {
    if (!Array.isArray(customTerms) || customTerms.length === 0) return "";

    return `
    <div style="margin-top: 16px;">
      <div style="font-weight: 700; color: #111827; margin-bottom: 4px;">
        Additional Terms
      </div>
      <div style="display: flex; flex-direction: column;">
        ${customTerms
        .map(
          (term) => `
              <div style="display: flex; gap: 8px; align-items: flex-start;">
                <span style="font-weight: 700; color: #3b82f6; min-width: 20px;">•</span>
                <p style="margin: 0; ">${escapeHtml(term)}</p>
              </div>
            `
        )
        .join("")}
      </div>
    </div>
  `;
  }

export function getMergedTermsHtml(quotation: QuotationData) {
    const fallback =
      "<p>Prices are subject to confirmation and validity period mentioned above.</p>";

    const termsHtml = quotation.terms || fallback;
    const customTermsHtml = buildCustomTermsHtml(quotation.customTerms || []);

    return termsHtml.replace("{{CUSTOM_TERMS}}", customTermsHtml);
  }

export default function QuotationPrint({ quotation }: Props) {
  const subtotal = quotation.items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0,
  );

  const taxTotal = quotation.items.reduce(
    (sum, item) => sum + item.quantity * item.rate * (item.taxPercent / 100),
    0,
  );

  const grandTotal = subtotal + taxTotal - (quotation.discount || 0);

  const companyKey = (quotation.companyName || "").trim().toLowerCase();
  const watermarkLogo = BRAND_WATERMARKS[companyKey] || "";

  return (
    <div
      style={{
        background: "#ffffff",
        color: "#000000",
        width: "210mm",
        minHeight: "297mm",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <style>
        {`
    @page {
  size: A4;
  margin: 28mm 12mm 18mm 12mm;
}

@media print {
  html,
  body {
    margin: 0;
    padding: 0;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .print-top-band::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4mm;

  /* MAIN TOP STRIP (red → maroon → purple) */
  background: linear-gradient(
    90deg,
    #b91c1c 0%,     /* deep red */
    #be123c 40%,    /* rose */
    #7e22ce 100%    /* purple */
  );
}

.print-top-band::after {
  content: "";
  position: absolute;
  left: 0;
  top: 4mm;
  width: 58mm;
  height: 18mm;

  /* ANGLED SHAPE (darker tone of same palette) */
  background: linear-gradient(
    135deg,
    #7f1d1d 0%,     /* dark red */
    #4c1d95 100%    /* deep purple */
  );

  clip-path: polygon(0 0, 100% 0, 78% 100%, 0 100%);
}

  .print-bottom-band {
  bottom: 0;
  height: 14mm;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  position: absolute;
  left: 0;
  width: 100%;
}

/* MAIN BOTTOM STRIP */
.print-bottom-band::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.5mm;

  background: linear-gradient(
    90deg,
    #b91c1c 0%,     /* deep red */
    #be123c 40%,    /* rose */
    #7e22ce 100%    /* purple */
  );
}

/* ANGLED ACCENT (RIGHT SIDE) */
.print-bottom-band::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 3.5mm;
  width: 42mm;
  height: 10.5mm;

  background: linear-gradient(
    135deg,
    #4c1d95 0%,     /* deep purple */
    #7f1d1d 100%    /* dark red */
  );

  clip-path: polygon(22% 0, 100% 0, 100% 100%, 0 100%);
}

  .print-content {
    padding: 0;
    position: relative;
  }

  .page-watermark {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page-watermark img {
    width: 95mm;
    max-width: 55%;
    opacity: 0.05;
    transform: rotate(-28deg);
    object-fit: contain;
  }

  .page-layer {
    position: relative;
    z-index: 1;
  }

  table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  display: table-header-group;
}

tfoot {
  display: table-footer-group;
}

/* Let table rows split when needed */
tr,
td,
th {
  page-break-inside: auto;
  break-inside: auto;
}

/* Keep only these sections together */
.avoid-break,
.summary-box,
.notes-box,
.signature-box,
.terms-section {
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Allow description content to flow across pages */
.quotation-description,
.quotation-description * {
  page-break-inside: auto;
  break-inside: auto;
}

.terms-page {
  break-before: page;
  page-break-before: always;
  margin-top: 0 !important;
  padding-top: 0 !important;
}
}
  `}
      </style>

      <div className="page-watermark">
        <img src={watermarkLogo} alt="Watermark" />
      </div>

      <div className="print-content">
        <div className="page-layer">
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "16px",
              background: "transparent",
            }}
          >
            <div
              style={{
                height: "6px",
                background: "linear-gradient(to right, #111827, #4f46e5)",
                marginBottom: "20px",
                borderRadius: "4px",
              }}
            />

            <div
              className="avoid-break"
              style={{
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "14px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "20px",
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "28px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  {quotation.companyName || "Your Company Name"}
                </h1>
                <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#374151" }}>
                  {quotation.companyAddress}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#374151" }}>
                  {quotation.companyPhone}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#374151" }}>
                  {quotation.companyEmail}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    color: "#111827",
                  }}
                >
                  QUOTATION
                </div>
                <p style={{ margin: "4px 0 0", fontSize: "14px" }}>
                  <strong>Date:</strong> {quotation.quotationDate}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "14px" }}>
                  <strong>Valid Until:</strong> {quotation.validTill}
                </p>
              </div>
            </div>

            <div
              className="avoid-break"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  padding: "16px",
                  borderRadius: "6px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 10px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#6b7280",
                  }}
                >
                  From
                </h2>
                <p style={{ margin: "4px 0", fontWeight: 600 }}>
                  {quotation.companyName}
                </p>
                <p style={{ margin: "4px 0" }}>{quotation.companyAddress}</p>
                <p style={{ margin: "4px 0" }}>{quotation.companyPhone}</p>
                <p style={{ margin: "4px 0" }}>{quotation.companyEmail}</p>
              </div>

              <div
                style={{
                  border: "1px solid #e5e7eb",
                  padding: "16px",
                  borderRadius: "6px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 10px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#6b7280",
                  }}
                >
                  To
                </h2>
                <p style={{ margin: "4px 0", fontWeight: 600 }}>
                  {quotation.clientName}
                </p>
                <p style={{ margin: "4px 0" }}>{quotation.clientAddress}</p>
                <p style={{ margin: "4px 0" }}>{quotation.clientPhone}</p>
                <p style={{ margin: "4px 0" }}>{quotation.clientEmail}</p>
              </div>
            </div>

            <div
              className="avoid-break"
              style={{
                marginBottom: "20px",
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#374151",
              }}
            >
              We are pleased to submit our quotation for the requested
              products/services. Please find the proposed details below.
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "24px",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: "70px" }}>Sr. No.</th>
                  <th style={thStyle}>Title</th>
                  <th style={{ ...thStyleRight, width: "120px" }}>Rate</th>
                  <th style={{ ...thStyleRight, width: "140px" }}>Amount</th>
                </tr>
              </thead>

              <tbody>
                {quotation.items.map((item, index) => {
                  const amount =
                    item.quantity * item.rate +
                    item.quantity * item.rate * (item.taxPercent / 100);

                  return (
                    <React.Fragment key={item.id}>
                      <tr>
                        <td style={tdStyle}>{index + 1}</td>
                        <td style={{ ...tdStyle, fontWeight: 600 }}>{item.title}</td>
                        <td style={tdStyleRight}>
                          {item.rate.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td style={tdStyleRight}>
                          {amount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>

                      <tr>
                        <td style={{ ...tdStyle, borderBottom: "1px solid #e5e7eb" }} />
                        <td
                          colSpan={3}
                          style={{
                            ...tdStyle,
                            fontSize: "13px",
                            paddingTop: "8px",
                            paddingBottom: "10px",
                            background: "transparent",
                            borderRadius: "6px",
                            padding: "10px",
                            border: "1px solid #f1f5f9",
                          }}
                        >
                          <div
                            className="quotation-description"
                            dangerouslySetInnerHTML={{ __html: item.description }}
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "24px",
                marginBottom: "28px",
              }}
            >
              <div
                className="notes-box"
                style={{
                  flex: 1,
                  marginTop: "12px",
                  borderTop: "1px dashed #e5e7eb",
                  paddingTop: "12px",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#6b7280",
                  }}
                >
                  Notes
                </h3>
                <p style={{ margin: "0 0 8px", fontSize: "14px", lineHeight: 1.6 }}>
                  {quotation.notes ||
                    "Thank you for the opportunity to submit this quotation."}
                </p>
              </div>

              <div
                className="summary-box"
                style={{
                  width: "320px",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  padding: "16px",
                  background: "#f9fafb",
                }}
              >
                <div style={summaryRow}>
                  <span>Subtotal</span>
                  <span>
                    {subtotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div
                  style={{
                    ...summaryRow,
                    marginTop: "10px",
                    paddingTop: "12px",
                    borderTop: "1px solid #d1d5db",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#111827",
                  }}
                >
                  <span>Estimated Total</span>
                  <span>
                    {grandTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="terms-page">
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "16px",
                minHeight: "240mm",
                background: "transparent",
              }}
            >
              <div
                style={{
                  height: "6px",
                  background: "linear-gradient(to right, #111827, #4f46e5)",
                  marginBottom: "20px",
                  borderRadius: "4px",
                }}
              />

              <div
                className="terms-section"
                style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  marginBottom: "50px",
                }}
                dangerouslySetInnerHTML={{
                  __html: getMergedTermsHtml(quotation),
                }}
              />

              <div
                className="signature-box avoid-break"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "240px" }}>
                  <div
                    style={{
                      borderTop: "1px solid #d1d5db",
                      paddingTop: "6px",
                      fontSize: "13px",
                      color: "#374151",
                    }}
                  >
                    Client Acceptance
                  </div>
                </div>

                <div style={{ width: "240px", textAlign: "right" }}>
                  <div
                    style={{
                      borderTop: "1px solid #d1d5db",
                      paddingTop: "6px",
                      fontSize: "13px",
                      color: "#374151",
                    }}
                  >
                    Authorized Signatory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 8px",
  borderBottom: "1px solid #d1d5db",
  fontSize: "13px",
  textTransform: "uppercase",
  color: "#6b7280",
  letterSpacing: "0.5px",
};

const thStyleRight: React.CSSProperties = {
  ...thStyle,
  textAlign: "right",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 8px",
  borderBottom: "1px solid #f1f5f9",
  verticalAlign: "top",
};

const tdStyleRight: React.CSSProperties = {
  ...tdStyle,
  textAlign: "right",
};

const summaryRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
  fontSize: "14px",
};