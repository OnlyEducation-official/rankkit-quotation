"use client";

export async function downloadQuotationPDF(fileName = "quotation.pdf") {
    const element = document.getElementById("quotation-preview");

    if (!element) {
        console.error("quotation-preview element not found");
        return;
    }

    const html2pdf = (await import("html2pdf.js")).default;

    const options = {
        margin: 0.3,
        filename: fileName,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
        },
        jsPDF: {
            unit: "in" as const,
            format: "a4" as const,
            orientation: "portrait" as const,
        },
        pagebreak: {
            mode: ["css", "legacy"] as const,
        },
    };

    await html2pdf().set(options).from(element).save();
}