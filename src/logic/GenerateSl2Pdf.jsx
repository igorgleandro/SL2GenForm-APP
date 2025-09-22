/*import { PDFDocument, StandardFonts } from "pdf-lib";

export async function generateSl2Pdf(
    data)

    // Deconstruct with safe defaults to avoid "undefined" text
    const {
        agentName = "",
        agentNbr = "",
        agencyName = "",
        agencyNbr = "",

        individualCaLicense = "",
        nameInsured = "",
        descriptionRisk = "",
        coverageCode = "",
        signatureDate = new Date().toLocaleDateString(),

        insurer1 = "",
        contactedThrough1 = "",
        fullContactName1 = "",
        emailPhone1 = "",
        website1 = "",
        naic1 = "",
        date1 = "",

        insurer2 = "",
        contactedThrough2 = "",
        fullContactName2 = "",
        emailPhone2 = "",
        website2 = "",
        naic2 = "",
        date2 = "",

        insurer3 = "",
        contactedThrough3 = "",
        fullContactName3 = "",
        emailPhone3 = "",
        website3 = "",
        naic3 = "",
        date3 = "",
        id,
    } = data || {};

// PDF Generation with pdf-lib

    const pdfLoaded = await fetch('sl2form.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfLoaded);
    const pages = pdfDoc.getPages();
    const page = pages[0];

    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    page.drawText(agentName, { x: 65, y: 720, size: 12, font: font });
    page.drawText(agentNbr, { x: 210, y: 677, size: 12, font: font });
    page.drawText(agencyName, { x: 270, y: 666, size: 12, font: font });
    page.drawText(agencyNbr,{ x: 320, y: 653, size: 12, font: font });
    page.drawText(nameOfInsured, { x: 148, y: 625, size: 12, font: font });
    page.drawText(descriptionRisk, { x: 152, y: 610, size: 12, font: font });
    page.drawText(coverageCode, { x: 230, y: 580, size: 12, font: font });

    // Draw details for insurer 1
    page.drawText(naic1, { x: 29, y: 448, size: 12, font: font });
    page.drawText(date1, { x: 118, y: 448, size: 12, font: font });
    page.drawText(insurer1, { x: 29, y: 415, size: 7, font: font });

    if (contactedThrough1.trim().toLowerCase() === "online") {
        page.drawText("Online", { x: 29, y: 372, size: 12, font: font });
        page.drawText(website1, { x: 29, y: 307,size: 8, font: font });

    } else {
        page.drawText(fullContactName1, {x: 29, y: 372, size: 12, font: font });
        page.drawText(emailPhone1, { x: 29, y: 338, size: 12, font: font });
    }

    // Draw details for insurer 2
    page.drawText(naic2, { x: 212, y: 448, size: 12, font: font });
    page.drawText(date2, { x: 300, y: 448, size: 12, font: font });
    page.drawText(insurer2, { x: 212, y: 415, size: 7, font: font });

    if (contactedThrough2.trim().toLowerCase() === "online") {
        page.drawText("Online", { x: 212, y: 372, size: 12, font: font });
        page.drawText(website2, { x: 212, y: 307,size: 8, font: font });
    } else {
        page.drawText(fullContactName2, {x: 212, y: 372, size: 12, font: font });
        page.drawText(emailPhone2, { x: 212, y: 338, size: 12, font: font });

    }

    // Draw details for insurer 3
    page.drawText(naic3, { x: 395, y: 448, size: 12, font: font });
    page.drawText(date3, { x: 482, y: 448, size: 12, font: font });
    page.drawText(insurer3, { x: 395, y: 415, size: 7, font: font });

    if (contactedThrough3.trim().toLowerCase() === "online") {
        page.drawText("Online", { x: 395, y: 372, size: 12, font: font });
        page.drawText(website3, { x: 395, y: 307,size: 8, font: font });
    } else {
        page.drawText(fullContactName3, {x: 395, y: 372, size: 12, font: font });
        page.drawText(emailPhone3, { x: 395, y: 338, size: 12, font: font });
    }

    page.drawText("x", { x: 140, y: 202, size: 12, font: font });
    page.drawText(signatureDate, { x: 420, y: 92, size: 12, font: font });

    // Save the PDF and prompt download
    const pdfBytes = await pdfDoc.save();

    // Create a Blob for downloading
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Trigger file download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'insurance_form_details.pdf';
    link.click();


});
*/