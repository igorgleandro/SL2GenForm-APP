
export const ValidateForm = (form1, form2, form3a, form3b, form3c) => {
    const norm = (v = "") => v.trim().toLowerCase().replace(/\s+/g, " ");

    const agentName           = form1?.agentName ?? "";
    const agentNbr = form1?.agentNbr ?? "";
    const agencyName          = form1?.agencyName ?? "";
    const agencyNbr     = form1?.agencyNbr ?? "";


    const nameOfInsured  = form2?.nameInsured ?? "";
    const descriptionRisk = form2?.descriptionRisk ?? "";
    const coverageCode    = form2?.coverageCode ?? "";

    const { contactedThrough1 = "", fullContactName1 = "", emailPhone1 = "", website1 = "", date1 = "" } = form3a ?? {};
    const { contactedThrough2 = "", fullContactName2 = "", emailPhone2 = "", website2 = "", date2 = "" } = form3b ?? {};
    const { contactedThrough3 = "", fullContactName3 = "", emailPhone3 = "", website3 = "", date3 = "" } = form3c ?? {};

    //  Validations Form1 and Form2
    if (!agentName) return "Please fill Agent Name. Required field.";
    if (!agencyName && agencyNbr && !agentNbr) return "Please fill Agency Name or provide the Individual CA License Number. Required field.";
    if (!agencyName && agencyNbr) return "Please fill Agency Name. Required field.";
    if (agencyName && !agencyNbr) return "Please fill Agency Code. Required field.";
    if (!agencyName && !agencyNbr && !agentNbr) return "Please fill Agent CA License Number, or fill the Agency Name and Agency CA License Number fields. Required field.";
    if (!nameOfInsured) return "Please fill Name of Insured. Required field.";
    if (!descriptionRisk) return "Please fill Descriptions Risk. Required field.";
    if (!coverageCode) return "Please Select Coverage Code. Required field.";

    // --- Insurer 1 Validations
    if (norm(agentName) === norm(fullContactName1)) return "The insurer and contacted fields cannot be the same.";
    if (!contactedThrough1) return "Please fill in the contacted through field at Insurer 1.";
    if (norm(contactedThrough1) === "online" && !website1) return "Please fill in the website field.";
    if (norm(contactedThrough1) !== "online" && !emailPhone1) return "Please fill in the email/phone insurer of insurer 1 field.";
    if (norm(contactedThrough1) !== "online" && !fullContactName1) return "Please fill in the Full Contact Name of the Insurer 1 field.";
    if (!date1) return "Please fill in the date field at Insurer 1.";

    // --- Insurer 2 Validations
    if (norm(agentName) === norm(fullContactName2)) return "The insurer and contacted fields cannot be the same.";
    if (!contactedThrough2) return "Please fill in the contacted through field at Insurer 2.";
    if (norm(contactedThrough2) === "online" && !website2) return "Please fill in the website field.";
    if (norm(contactedThrough2) !== "online" && !emailPhone2) return "Please fill in the email/phone field of the Insurer 2.";
    if (norm(contactedThrough2) !== "online" && !fullContactName2) return "Please fill in the Full Contact Name of the Insurer 2 field.";
    if (!date2) return "Please fill in the date field at Insurer 2.";

    // --- Insurer 3 Validations
    if (norm(agentName) === norm(fullContactName3)) return "The insurer and contacted fields cannot be the same.";
    if (!contactedThrough3) return "Please fill in the contacted through field at Insurer 3.";
    if (norm(contactedThrough3) === "online" && !website3) return "Please fill in the website field.";
    if (norm(contactedThrough3) !== "online" && !emailPhone3) return "Please fill in the email/phone of the Insurer 3 field.";
    if (norm(contactedThrough3) !== "online" && !fullContactName3) return "Please fill in the Full Contact Name of the Insurer 3 field.";
    if (!date3) return "Please fill in the date field at Insurer 3.";

    return null; // Return if no errors
};
