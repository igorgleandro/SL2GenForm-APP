import { createContext, useState } from "react";


export const FormContext = createContext({});

export const FormProvider = ({ children }) => {
    const [form1, setForm1] = useState({
        agentName: '',
        agentNbr: '',
        agencyName: '',
        agencyNbr: '',
    })

    const [form2, setForm2] = useState({
        nameInsured: '',
        descriptionRisk: '',
        coverageCode: '',
    })

    const [form3a, setForm3a] = useState({
        insurer1: '',
        contactedThrough1: '',
        fullContactName1: '',
        emailPhone1: '',
        website1: '',
        naic1: '',
        date1: '',
    });

    const [form3b, setForm3b] = useState({
        insurer2: '',
        contactedThrough2: '',
        fullContactName2: '',
        emailPhone2: '',
        website2: '',
        naic2: '',
        date2: '',
    });

    const [form3c, setForm3c] = useState({
        insurer3: '',
        contactedThrough3: '',
        fullContactName3: '',
        emailPhone3: '',
        website3: '',
        naic3: '',
        date3: '',
    });

    return (
        <FormContext.Provider value={{ form1, setForm1, form2, setForm2, form3a, setForm3a, form3b, setForm3b, form3c, setForm3c}}>
            {children}
        </FormContext.Provider>
    );
};
