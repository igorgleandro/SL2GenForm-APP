import { useState } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../providers/AuthServiceProvider.jsx";

const DeleteButton = ({ formId, onDeleteSuccess }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleDelete = async () => {
        if (!formId) {
            alert("No form ID provided.");
            return;
        }

        if (!window.confirm(`Are you sure you want to delete form #${formId}? This action cannot be undone.`)) {
            return;
        }

        if (!user || !user.token) {
            alert("You must be logged in to delete forms.");
            return;
        }

        setLoading(true);
        try {
            const tokenKey = `${user.tokenType || 'Bearer'} ${user.token}`;

            const res = await fetch(`http://localhost:8080/myforms/${formId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': tokenKey,
                    'Accept': 'application/json'
                },
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${res.status}`);
            }

            alert("Form deleted successfully!");
            
            // Call the callback to refresh the list
            if (onDeleteSuccess) {
                onDeleteSuccess(formId);
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert(`Failed to delete form: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleDelete}
            disabled={loading}
            variant="contained"
            color="error"
            size="small"
        >
            {loading ? "Deleting..." : "Delete"}
        </Button>
    );
};

export default DeleteButton;