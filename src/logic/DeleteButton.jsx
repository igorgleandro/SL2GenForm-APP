import { useState } from "react";
import {Button} from "@mui/material";

const DeleteButton = ({ formId }) => {
    const [loading, setLoading] = useState(false);


    console.log(formId);
    const handleDelete = async () => {
        if (!formId) {
            alert("No form ID provided.");
            return;
        }

        if (!window.confirm(`Are you sure you want to delete this form ${formId}?`)) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/myforms/${formId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            alert("Form deleted successfully!");
                    } catch (err) {
            console.error(err);
            alert("Failed to delete form. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleDelete}
            disabled={loading}
            variant="contained" color="error"
        >
            {loading ? "Deleting..." : "Delete Form"}
        </Button>
    );
};

export default DeleteButton;
