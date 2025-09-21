import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";

export default function GetForms() {
    const [forms, setForms] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const fetchForms = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:3000/user-forms");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setForms(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || "Failed to fetch.");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchForms();
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Typography variant="h6">Saved Forms</Typography>
                <Button variant="outlined" onClick={fetchForms}>
                    Refresh
                </Button>
            </Box>

            {loading && (
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <CircularProgress size={20} /> <span>Loading…</span>
                </Box>
            )}

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {!loading && !error && forms.length === 0 && (
                <Typography color="text.secondary">No forms yet.</Typography>
            )}

            {!loading &&
                !error &&
                forms.map((f, idx) => (
                    <Box
                        key={f.id ?? idx}
                        sx={{
                            p: 2,
                            mb: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            {f.nameInsured || "Unnamed"} — {f.coverageCode || "No Coverage"}
                        </Typography>

                        <Box
                            sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}
                        >
                            <Item label="Agent Name" value={f.agentName} />
                            <Item label="Agent Nbr" value={f.agentNbr} />
                            <Item label="Agency Name" value={f.agencyName} />
                            <Item label="Agency Nbr" value={f.agencyNbr} />
                            <Item label="Description Risk" value={f.descriptionRisk} />
                            <Item label="Coverage Code" value={f.coverageCode} />
                        </Box>

                        <Divider sx={{ my: 1.5 }} />

                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            Insurers
                        </Typography>

                        <InsurerBlock idx={1} f={f} />
                        <InsurerBlock idx={2} f={f} />
                        <InsurerBlock idx={3} f={f} />
                    </Box>
                ))}
        </Box>
    );
}

function Item({ label, value }) {
    return (
        <Box>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body2">{value || "—"}</Typography>
        </Box>
    );
}

function InsurerBlock({ idx, f }) {
    const prefix = (k) => f[`${k}${idx}`];
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
                mb: 1,
            }}
        >
            <Item label={`Insurer ${idx}`} value={prefix("insurer")} />
            <Item label="Contacted Through" value={prefix("contactedThrough")} />
            <Item label="Contact Name" value={prefix("fullContactName")} />
            <Item label="Email/Phone" value={prefix("emailPhone")} />
            <Item label="Website" value={prefix("website")} />
            <Item label="NAIC" value={prefix("naic")} />
            <Item label="Date" value={prefix("date")} />
        </Box>
    );
}
