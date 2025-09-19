const Form3InputList = ({ updateForm3, form3 }) => {
  return {
    // --- Row for Insurer 1 ---
    insurer1Input: {
      onChange: updateForm3,
      name: "insurer1",
      type: "select",
      value: form3.insurer1,
      placeholder: "Insurer 1",
      options: [
        { label: "21St Century Insurance Company", value: "21St Century Insurance Company" },
        { label: "Accredited Surety and Casualty Company, Inc.", value: "Accredited Surety and Casualty Company, Inc." },
      ],
    },

    contactedThrough1Input: {
      onChange: updateForm3,
      name: "contactedThrough1",
      type: "select",
      value: form3.contactedThrough1,
      placeholder: "Contacted Through",
      options: [
        { label: "E-mail / Phone", value: "email-phone" },
        { label: "Online", value: "online" },
      ],
    },

    fullContactName1Input: {
      onChange: updateForm3,
      name: "fullContactName1",
      type: "text",
      value: form3.fullContactName1,
      placeholder: "Full Contact Name",
    },

    emailPhone1Input: {
      onChange: updateForm3,
      name: "emailPhone1",
      type: "text",
      value: form3.emailPhone1,
      placeholder: "Phone Number or Email",
    },

    website1Input: {
      onChange: updateForm3,
      name: "website1",
      type: "text",
      value: form3.website1,
      placeholder: "Website",
    },

    naic1Input: {
      onChange: updateForm3,
      name: "naic1",
      type: "number",
      value: form3.naic1,
      placeholder: "NAIC",
    },

    date1Input: {
      onChange: updateForm3,
      name: "date1",
      type: "month",
      value: form3.date1,
      placeholder: "Date (MM/YYYY)",
    },

    // --- Row for Insurer 2 ---
    insurer2Input: {
      onChange: updateForm3,
      name: "insurer2",
      type: "select",
      value: form3.insurer2,
      placeholder: "Insurer 2",
      options: [
        { label: "21St Century Insurance Company", value: "21St Century Insurance Company" },
      ],
    },

    contactedThrough2Input: {
      onChange: updateForm3,
      name: "contactedThrough2",
      type: "select",
      value: form3.contactedThrough2,
      placeholder: "Contacted Through",
      options: [
        { label: "E-mail / Phone", value: "email-phone" },
        { label: "Online", value: "online" },
      ],
    },

    fullContactName2Input: {
      onChange: updateForm3,
      name: "fullContactName2",
      type: "text",
      value: form3.fullContactName2,
      placeholder: "Full Contact Name",
    },

    emailPhone2Input: {
      onChange: updateForm3,
      name: "emailPhone2",
      type: "text",
      value: form3.emailPhone2,
      placeholder: "Phone Number or Email",
    },

    website2Input: {
      onChange: updateForm3,
      name: "website2",
      type: "text",
      value: form3.website2,
      placeholder: "Website",
    },

    naic2Input: {
      onChange: updateForm3,
      name: "naic2",
      type: "number",
      value: form3.naic2,
      placeholder: "NAIC",
    },

    date2Input: {
      onChange: updateForm3,
      name: "date2",
      type: "month",
      value: form3.date2,
      placeholder: "Date (MM/YYYY)",
    },

    // --- Row for Insurer 3 ---
    insurer3Input: {
      onChange: updateForm3,
      name: "insurer3",
      type: "select",
      value: form3.insurer3,
      placeholder: "Insurer 3",
      options: [
        { label: "21St Century Insurance Company", value: "21St Century Insurance Company" },
      ],
    },

    contactedThrough3Input: {
      onChange: updateForm3,
      name: "contactedThrough3",
      type: "select",
      value: form3.contactedThrough3,
      placeholder: "Contacted Through",
      options: [
        { label: "E-mail / Phone", value: "email-phone" },
        { label: "Online", value: "online" },
      ],
    },

    fullContactName3Input: {
      onChange: updateForm3,
      name: "fullContactName3",
      type: "text",
      value: form3.fullContactName3,
      placeholder: "Full Contact Name",
    },

    emailPhone3Input: {
      onChange: updateForm3,
      name: "emailPhone3",
      type: "text",
      value: form3.emailPhone3,
      placeholder: "Phone Number or Email",
    },

    website3Input: {
      onChange: updateForm3,
      name: "website3",
      type: "text",
      value: form3.website3,
      placeholder: "Website",
    },

    naic3Input: {
      onChange: updateForm3,
      name: "naic3",
      type: "number",
      value: form3.naic3,
      placeholder: "NAIC",
    },

    date3Input: {
      onChange: updateForm3,
      name: "date3",
      type: "month",
      value: form3.date3,
      placeholder: "Date (MM/YYYY)",
    },
  };
};

export default Form3InputList