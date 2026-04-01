"use client";

import * as React from "react";
import { QuotationData } from "../types/quotation";

type Props = {
  quotation: QuotationData;
};

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

  return (
    <div
      style={{
        background: "#ffffff",
        color: "#000000",
        width: "210mm",
        minHeight: "297mm",
        padding: "18mm",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <style>
        {`
          @page {
            size: A4;
            margin: 12mm;
          }

          @media print {
            html, body {
              margin: 0;
              padding: 0;
              background: #fff;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            thead {
              display: table-row-group;
            }

            tfoot {
              display: table-footer-group;
            }

            tr, td, th {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .avoid-break {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .item-group {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .summary-box,
            .notes-box,
            .signature-box,
            .quotation-description,
            .terms-page,
            .terms-section {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .terms-page {
              break-before: page;
              page-break-before: always;
            }
          }

          .quotation-description p {
            margin: 0 0 6px 0;
            line-height: 1.5;
          }

          .quotation-description ul,
          .quotation-description ol {
            margin: 0;
            padding-left: 18px;
          }

          .quotation-description li {
            margin: 0 0 6px 0;
            line-height: 1.5;
          }

          .terms-section p {
            margin: 0 0 10px 0;
            line-height: 1.6;
          }

          .terms-section ul,
          .terms-section ol {
            margin: 0 0 10px 0;
            padding-left: 18px;
          }

          .terms-section li {
            margin: 0 0 8px 0;
            line-height: 1.6;
          }
        `}
      </style>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          padding: "16px",
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

          {quotation.items.map((item, index) => {
            const amount =
              item.quantity * item.rate +
              item.quantity * item.rate * (item.taxPercent / 100);

            return (
              <tbody key={item.id} className="item-group">
                <tr>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{item.title}</td>
                  <td style={tdStyleRight}>{item.rate.toFixed(2)}</td>
                  <td style={tdStyleRight}>{amount.toFixed(2)}</td>
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
                      background: "#f9fafb",
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
              </tbody>
            );
          })}
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
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div style={summaryRow}>
              <span>Tax</span>
              <span>{taxTotal.toFixed(2)}</span>
            </div>
            <div style={summaryRow}>
              <span>Discount</span>
              <span>{(quotation.discount || 0).toFixed(2)}</span>
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
              <span>{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="terms-page"
        style={{
          marginTop: "0",
          paddingTop: "8mm",
        }}
      >
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "16px",
            minHeight: "240mm",
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
            style={{
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "14px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "1px",
                marginBottom: "6px",
                color: "#111827",
              }}
            >
              Terms & Conditions
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#6b7280",
                lineHeight: 1.6,
              }}
            >
              Please review the following terms carefully before acceptance.
            </div>
          </div>

          <div
            className="terms-section"
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              marginBottom: "50px",
            }}
            dangerouslySetInnerHTML={{
              __html:
                quotation.terms ||
                "<p>Prices are subject to confirmation and validity period mentioned above.</p>",
            }}
          />

          <div
            className="signature-box avoid-break"
            style={{
              marginTop: "60px",
              display: "flex",
              justifyContent: "space-between",
              gap: "40px",
            }}
          >
            <div style={{ width: "240px" }}>
              <div
                style={{
                  borderTop: "1px solid #d1d5db",
                  paddingTop: "8px",
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
                  paddingTop: "8px",
                  fontSize: "13px",
                  color: "#374151",
                }}
              >
                Authorized Signatory
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "30px",
              fontSize: "12px",
              color: "#9ca3af",
              textAlign: "center",
            }}
          >
            This is a system-generated quotation and does not require a signature.
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