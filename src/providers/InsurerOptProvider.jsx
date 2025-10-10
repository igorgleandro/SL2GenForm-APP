import { useEffect, useState } from "react";

export const InsurerOptProvider = () => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await fetch("https://sl2genform-back-production.up.railway.app/insurers");
                if (!res.ok) throw new Error("Failed to fetch providers");
                const data = await res.json();

                const formatted = data.map((item) => ({
                    label: `${item.insurer} `,  // insurer + NAIC
                    value: `${item.insurer} `,
                    website: `${item.website} `,
                    naic: `${item.naic} `// NAIC + insurer
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
