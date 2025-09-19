 const Form2InputList = ({ updateForm2, form2 }) => {
  return {
    nameInsuredInput: {
      onChange: updateForm2,
      name: "nameInsured",
      type: "text",
      value: form2.nameInsured,
      placeholder: "Name of Insured",
    },

    descriptionRiskInput: {
      onChange: updateForm2,
      name: "descriptionRisk",
      type: "text",
      value: form2.descriptionRisk,
      placeholder: "Description Risk",
    },

    coverageCodeInput: {
      onChange: updateForm2,
      name: "coverageCode",
      type: "select",
      value: form2.coverageCode,
      placeholder: "Coverage Code",
      options: [
         { label: "1000 Crime", value: "1000 Crime" },
          { label: "1001 Excess Crime", value: "1001 Excess Crime" },
  //more in the API
 ],
        },
  };
};

export default Form2InputList