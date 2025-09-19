
const Form3InputInsurer2 = ({ updateForm3b, form3b }) => {
    return {
        insurer1Input: {
            onChange: updateForm3b,
            name: "insurer2",
            type: "select",
            value: form3b.insurer2 ?? "",
            placeholder: "Insurer 2",
            options: [
                { label: "21st Century Insurance Company", value: "21st Century Insurance Company" },
                { label: "Accredited Surety and Casualty Company, Inc.", value: "Accredited Surety and Casualty Company, Inc." },
            ],
        },

        contactedThrough1Input: {
            onChange: updateForm3b,
            name: "contactedThrough2",
            type: "select",
            value: form3b.contactedThrough2 ?? "",
            placeholder: "Contacted Through",
            options: [
                { label: "E-mail / Phone", value: "email-phone" },
                { label: "Online", value: "online" },
            ],
        },

        fullContactName1Input: {
            onChange: updateForm3b,
            name: "fullContactName2",
            type: "text",
            value: form3b.fullContactName2 ?? "",
            placeholder: "Full Contact Name",
        },

        emailPhone1Input: {
            onChange: updateForm3b,
            name: "emailPhone2",
            type: "text",
            value: form3b.emailPhone2 ?? "",
            placeholder: "Phone Number or Email",
        },

        website1Input: {
            onChange: updateForm3b,
            name: "website2",
            type: "text",
            value: form3b.website2 ?? "",
            placeholder: "Website",
        },

        naic1Input: {
            onChange: updateForm3b,
            name: "naic2",
            type: "text",
            value: form3b.naic2 ?? "",
            placeholder: "NAIC",
            pattern: "\\d{3,10}",
            inputMode: "numeric",
        },

        date1Input: {
            onChange: updateForm3b,
            name: "date2",
            type: "month",
            value: form3b.date2 ?? "",
            placeholder: "Date (YYYY-MM)",
        },
    };
};

export default Form3InputInsurer2;
