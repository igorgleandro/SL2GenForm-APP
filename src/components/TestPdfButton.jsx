import * as React from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import Button from "@mui/material/Button";

export default function TestPdfButton() {
    const handleDownload = async () => {
        try {
            // Load the template PDF from public/
            const existingPdfBytes = await fetch("/sl2form.pdf").then((res) =>
                res.arrayBuffer()
            );

            // Load the PDF with pdf-lib
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // Get the first page
            const pages = pdfDoc.getPages();
            const page = pages[0];

            // Embed a font
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

            // Draw "Hello World"
            page.drawText("Hello World", {
                x: 100,
                y: 700,
                size: 24,
                font: font,
                color: undefined, // you can add rgb(...) if needed
            });

            // Save and create Blob
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            // Trigger file download
            const a = document.createElement("a");
            a.href = url;
            a.download = "test.pdf";
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error generating test PDF:", err);
            alert("Failed to generate test PDF. Check console.");
        }
    };

    return (
        <Button variant="contained" onClick={handleDownload}>
            Test PDF
        </Button>
    );
}
