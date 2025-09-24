import { useEffect, useState } from "react";

export const InsurerOptProvider = () => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await fetch("http://localhost:3000/form-options-Insurers");
                if (!res.ok) throw new Error("Failed to fetch providers");
                const data = await res.json();

                const formatted = data.map((item) => ({
                    label: `${item.insurer} `,  // insurer + NAIC
                    value: `${item.naic} `,
                    website: `${item.website} `,  // NAIC + insurer
                }));

                setOptions(formatted);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    return { options, loading, error };
};
