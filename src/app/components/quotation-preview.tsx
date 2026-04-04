"use client";

import * as React from "react";
import { QuotationData } from "../types/quotation";

type Props = {
    quotation: QuotationData;
};

export default function QuotationPreview({ quotation }: Props) {
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
                width: "100%",
                overflow: "auto",
                padding: "16px",
                boxSizing: "border-box",
            }}
        >
            <div
                id="quotation-preview"
                style={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    padding: "32px",
                    all: "initial", // 🔥 IMPORTANT
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <div style={{ marginBottom: "24px" }}>
                    <h1 style={{ fontSize: "28px", fontWeight: 700, margin: 0 }}>
                        {quotation.companyName || "Your Company Name"}
                    </h1>
                    <p style={{ margin: "8px 0 0" }}>{quotation.companyAddress}</p>
                    <p style={{ margin: "4px 0 0" }}>{quotation.companyPhone}</p>
                    <p style={{ margin: "4px 0 0" }}>{quotation.companyEmail}</p>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "24px",
                        marginBottom: "24px",
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <h2 style={{ fontSize: "16px", margin: "0 0 8px", fontWeight: 700 }}>
                            Bill To
                        </h2>
                        <p style={{ margin: "4px 0" }}>{quotation.clientName}</p>
                        <p style={{ margin: "4px 0" }}>{quotation.clientAddress}</p>
                        <p style={{ margin: "4px 0" }}>{quotation.clientPhone}</p>
                        <p style={{ margin: "4px 0" }}>{quotation.clientEmail}</p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                        <p style={{ margin: "4px 0" }}>
                            <strong>Date:</strong> {quotation.quotationDate}
                        </p>
                        <p style={{ margin: "4px 0" }}>
                            <strong>Valid Till:</strong> {quotation.validTill}
                        </p>
                    </div>
                </div>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "24px",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={thStyle}>Title</th>
                            <th style={thStyle}>Description</th>
                            {/* <th style={thStyleRight}>Qty</th> */}
                            <th style={thStyleRight}>Rate</th>
                            {/* <th style={thStyleRight}>Tax %</th> */}
                            <th style={thStyleRight}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotation.items.map((item) => {
                            const amount =
                                item.quantity * item.rate +
                                item.quantity * item.rate * (item.taxPercent / 100);

                            return (
                                <tr key={item.id} className="avoid-break">
                                    <td style={tdStyle}>{item.title}</td>
                                    <td style={tdStyle}>
                                        <div
                                            className="quotation-description avoid-break"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    </td>
                                    {/* <td style={tdStyleRight}>{item.quantity}</td> */}
                                    <td style={tdStyleRight}>
                                        {item.rate.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                    {/* <td style={tdStyleRight}>{item.taxPercent}</td> */}
                                    <td style={tdStyleRight}>
                                        {amount.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div style={{ marginLeft: "auto", width: "100%", maxWidth: "320px", marginBottom: "24px" }}>
                    <div style={rowStyle}>
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
                            ...rowStyle,
                            fontWeight: 700,
                            borderTop: "2px solid #000",
                            paddingTop: "10px",
                        }}
                    >
                        <span>Grand Total</span>
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
    );
}

const thStyle: React.CSSProperties = {
    textAlign: "left",
    borderBottom: "1px solid #d1d5db",
    padding: "10px 8px",
    backgroundColor: "#f3f4f6",
};

const thStyleRight: React.CSSProperties = {
    ...thStyle,
    textAlign: "right",
};

const tdStyle: React.CSSProperties = {
    padding: "10px 8px",
    borderBottom: "1px solid #e5e7eb",
};

const tdStyleRight: React.CSSProperties = {
    ...tdStyle,
    textAlign: "right",
};

const rowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
};