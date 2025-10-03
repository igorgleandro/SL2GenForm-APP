import {useProviderOptions} from "../providers/CovOptionsProvider.jsx";

const Form2InputList = ({ updateForm2, form2 }) => {
    const { options, loading, error} = useProviderOptions();

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
      options,
        },
  };
};

export default Form2InputList