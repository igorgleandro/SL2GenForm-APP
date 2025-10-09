import {InsurerOptProvider} from "../providers/InsurerOptProvider.jsx";
import { useContext } from "react";
import { FormContext } from "../providers/FormProvider.jsx";


const Form3InputInsurer1 = ({ updateForm3a, form3a }) => {

    const { options, loading, error} = InsurerOptProvider();
    const { setForm3a } = useContext(FormContext);


    // Update all related fields at once
    const handleInsurerChange = (event) => {
        const selectedValue = event.target.value;
        const selectedOption = options.find(opt => opt.value === selectedValue);

        if (selectedOption) {
            setForm3a(prev => ({
                ...prev,
                insurer1: selectedValue,
                website1: selectedOption.website || '',
                naic1: selectedOption.naic || ''
            }));
        } else {
            // Just update the insurer field if no match found
            updateForm3a(event);
        }
    };

    return {
        insurer1Input: {
            onChange: handleInsurerChange,
            name: "insurer1",
            type: "select",
            value: form3a.insurer1 ?? "",
            placeholder: "Insurer 1",
            options
        },

        contactedThrough1Input: {
            onChange: updateForm3a,
            name: "contactedThrough1",
            type: "select",
            value: form3a.contactedThrough1 ?? "",
            placeholder: "Contacted Through",
            options: [
                { label: "E-mail / Phone", value: "email-phone" },
                { label: "Online", value: "online" },
            ],
        },

        fullContactName1Input: {
            onChange: updateForm3a,
            name: "fullContactName1",
            type: "text",
            value: form3a.fullContactName1 ?? "",
            placeholder: "Full Contact Name",
        },

        emailPhone1Input: {
            onChange: updateForm3a,
            name: "emailPhone1",
            type: "text",
            value: form3a.emailPhone1 ?? "",
            placeholder: "Phone Number or Email",
        },

        website1Input: {
            onChange: updateForm3a,
            name: "website1",
            type: "text",
            value: form3a.website1 ?? "",
            placeholder: "Website",
        },

        naic1Input: {
            onChange: updateForm3a,
            name: "naic1",
            type: "text",
            value: form3a.naic1 ?? "",
            placeholder: "NAIC",
            pattern: "\\d{3,10}",
            inputMode: "numeric",
            disabled: true,
        },

        date1Input: {
            onChange: updateForm3a,
            name: "date1",
            type: "month",
            value: form3a.date1 ?? "",
            placeholder: "Date (YYYY-MM)",
        },
    };
};

export default Form3InputInsurer1;
