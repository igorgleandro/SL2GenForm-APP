const Form1InputList = ({ updateForm1, form1 }) => {
  return {
    agentNameInput: {
      onChange: updateForm1,
      name: "agentName",
      type: "text",
      value: form1.agentName,
      placeholder: "Agent Name",
    },

    agentNbrInput: {
      onChange: updateForm1,
      name: "agentNbr",
      type: "number",
      value: form1.agentNbr,
      placeholder: "Agent Number",
    },

    agencyNameInput: {
      onChange: updateForm1,
      name: "agencyName",
      type: "text",
      value: form1.agencyName,
      placeholder: "Agency Name",
    },

    agencyNbrInput: {
      onChange: updateForm1,
      name: "agencyNbr",
      type: "number",
      value: form1.agencyNbr,
      placeholder: "Agency Number",
    },
  };
};

export default Form1InputList;
