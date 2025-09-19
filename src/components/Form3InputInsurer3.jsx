
const Form3InputInsurer2 = ({ updateForm3c, form3c }) => {
    return {
        insurer1Input: {
            onChange: updateForm3c,
            name: "insurer3",
            type: "select",
            value: form3c.insurer3 ?? "",
            placeholder: "Insurer 3",
            options: [
                { label: "21st Century Insurance Company", value: "21st Century Insurance Company" },
                { label: "Accredited Surety and Casualty Company, Inc.", value: "Accredited Surety and Casualty Company, Inc." },
            ],
        },

        contactedThrough1Input: {
            onChange: updateForm3c,
            name: "contactedThrough3",
            type: "select",
            value: form3c.contactedThrough3 ?? "",
            placeholder: "Contacted Through",
            options: [
                { label: "E-mail / Phone", value: "email-phone" },
                { label: "Online", value: "online" },
            ],
        },

        fullContactName1Input: {
            onChange: updateForm3c,
            name: "fullContactName3",
            type: "text",
            value: form3c.fullContactName3 ?? "",
            placeholder: "Full Contact Name",
        },

        emailPhone1Input: {
            onChange: updateForm3c,
            name: "emailPhone3",
            type: "text",
            value: form3c.emailPhone3 ?? "",
            placeholder: "Phone Number or Email",
        },

        website1Input: {
            onChange: updateForm3c,
            name: "website3",
            type: "text",
            value: form3c.website3 ?? "",
            placeholder: "Website",
        },

        naic1Input: {
            onChange: updateForm3c,
            name: "naic3",
            type: "text",
            value: form3c.naic3 ?? "",
            placeholder: "NAIC",
            pattern: "\\d{3,10}",
            inputMode: "numeric",
        },

        date1Input: {
            onChange: updateForm3c,
            name: "date3",
            type: "month",
            value: form3c.date3 ?? "",
            placeholder: "Date (YYYY-MM)",
        },
    };
};

export default Form3InputInsurer2;
