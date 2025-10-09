
import { PDFDocument, StandardFonts } from "pdf-lib";

export const generatePdf = async (form) => {


    try {
        const existingPdfBytes = await fetch("/sl2form.pdf").then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const page = pdfDoc.getPages()[0];
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Example placements — adjust to your template
        page.drawText(form.agentName ?? "", { x: 65, y: 720, size: 12, font });
        page.drawText(form.agentNbr, { x: 210, y: 677, size: 12, font: font });
        page.drawText(form.agencyName, { x: 270, y: 666, size: 12, font: font });
        page.drawText(form.agencyNbr,{ x: 320, y: 653, size: 12, font: font });
        page.drawText(form.nameInsured, { x: 148, y: 625, size: 12, font: font });
        page.drawText(form.descriptionRisk, { x: 152, y: 610, size: 12, font: font });
        page.drawText(form.coverageCode, { x: 230, y: 580, size: 12, font: font });

        // Draw details for insurer 1
        page.drawText(form.naic1, { x: 29, y: 448, size: 12, font: font });
        page.drawText(form.date1, { x: 118, y: 448, size: 12, font: font });
        page.drawText(form.insurer1, { x: 29, y: 415, size: 7, font: font });

        if (form.contactedThrough1.trim().toLowerCase() === "online") {
            page.drawText("Online", { x: 29, y: 372, size: 12, font: font });
            page.drawText(form.website1, { x: 29, y: 307,size: 8, font: font });

        } else {
            page.drawText(form.fullContactName1, {x: 29, y: 372, size: 12, font: font });
            page.drawText(form.emailPhone1, { x: 29, y: 338, size: 12, font: font });
        }

        // Draw details for insurer 2
        page.drawText(form.naic2, { x: 212, y: 448, size: 12, font: font });
        page.drawText(form.date2, { x: 300, y: 448, size: 12, font: font });
        page.drawText(form.insurer2, { x: 212, y: 415, size: 7, font: font });

        if (form.contactedThrough2.trim().toLowerCase() === "online") {
            page.drawText("Online", { x: 212, y: 372, size: 12, font: font });
            page.drawText(form.website2, { x: 212, y: 307,size: 8, font: font });
        } else {
            page.drawText(form.fullContactName2, {x: 212, y: 372, size: 12, font: font });
            page.drawText(form.emailPhone2, { x: 212, y: 338, size: 12, font: font });

        }

        // Draw details for insurer 3
        page.drawText(form.naic3, { x: 395, y: 448, size: 12, font: font });
        page.drawText(form.date3, { x: 482, y: 448, size: 12, font: font });
        page.drawText(form.insurer3, { x: 395, y: 415, size: 7, font: font });

        if (form.contactedThrough3.trim().toLowerCase() === "online") {
            page.drawText("Online", { x: 395, y: 372, size: 12, font: font });
            page.drawText(form.website3, { x: 395, y: 307,size: 8, font: font });
        } else {
            page.drawText(form.fullContactName3, {x: 395, y: 372, size: 12, font: font });
            page.drawText(form.emailPhone3, { x: 395, y: 338, size: 12, font: font });
        }

        page.drawText("x", { x: 140, y: 202, size: 12, font: font });
       // page.drawText(form.signatureDate, { x: 420, y: 92, size: 12, font: font });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Form-${form.id ?? "download"}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Error generating PDF:", err);
        alert("Failed to generate PDF. See console.");
    }
};
