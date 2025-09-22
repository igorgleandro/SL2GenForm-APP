import { useState } from "react";

const DeleteButton = ({ formId }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!formId.id) {
            alert("No form ID provided.");
            return;
        }

        if (!window.confirm(`Are you sure you want to delete this form ${formId.id}?`)) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/user-forms/${formId.id}`, {
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
        <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-800 disabled:opacity-50"
        >
            {loading ? "Deleting..." : "Delete Form"}
        </button>
    );
};

export default DeleteButton;
