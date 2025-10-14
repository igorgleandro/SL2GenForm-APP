import { useEffect, useState } from "react";


export const useProviderOptions = () => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/covcode`);
                if (!res.ok) throw new Error("Failed to fetch providers");
                const data = await res.json();

                const formatted = data.map((item) => ({
                    label: `${item.id} - ${item.name} `,
                    value: `${item.id} - ${item.name} `,
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
