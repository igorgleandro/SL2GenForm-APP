// components/SubmitButton.jsx
import {useState, useContext } from "react";
import { FormContext } from "../providers/FormProvider";
import { ValidateForm} from "./ValidateForm.jsx";

const SubmitButton = () => {
    const { form1, form2, form3a, form3b, form3c } = useContext(FormContext);
    const [loading, setLoading] = useState(false);

       const handleSubmit = async () => {

           // return the error message if error, show alerts and stop the submission

           const errorMessage = ValidateForm(form1, form2, form3a, form3b, form3c);
           if (errorMessage) {
               alert(errorMessage);
               return;
           }

        const newForm = {
            agentName: form1.agentName,
            agentNbr: form1.agentNbr,
            agencyName: form1.agencyName,
            agencyNbr: form1.agencyNbr,

            nameInsured: form2.nameInsured,
            descriptionRisk: form2.descriptionRisk,
            coverageCode: form2.coverageCode,

            insurer1: form3a.insurer1,
            contactedThrough1: form3a.contactedThrough1,
            fullContactName1: form3a.fullContactName1,
            emailPhone1: form3a.emailPhone1,
            website1: form3a.website1,
            naic1: form3a.naic1,
            date1: form3a.date1,

            insurer2: form3b.insurer2,
            contactedThrough2: form3b.contactedThrough2,
            fullContactName2: form3b.fullContactName2,
            emailPhone2: form3b.emailPhone2,
            website2: form3b.website2,
            naic2: form3b.naic2,
            date2: form3b.date2,

            insurer3: form3c.insurer3,
            contactedThrough3: form3c.contactedThrough3,
            fullContactName3: form3c.fullContactName3,
            emailPhone3: form3c.emailPhone3,
            website3: form3c.website3,
            naic3: form3c.naic3,
            date3: form3c.date3,
        };

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/user-forms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newForm),
            });
            const data = await res.json();
            console.log("Success:", data);
            alert("Data sent successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to send data. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-800 disabled:opacity-50"
        >
            {loading ? "Saving..." : "Save Form"}
        </button>
    );
};

export default SubmitButton;
