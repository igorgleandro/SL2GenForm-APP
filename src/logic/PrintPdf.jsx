import { PDFDocument, StandardFonts } from "pdf-lib";

const pdfLoaded = await fetch("/sl2form.pdf").then(res => res.arrayBuffer());


