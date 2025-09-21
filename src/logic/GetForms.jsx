import * as React from "react";
import { Box,Button,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Divider,} from "@mui/material";

export default function GetForms() {
    const [forms, setForms] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const [selectedForm, setSelectedForm] = React.useState(null);

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
            <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, justifyContent: "center" }}
            >
                <Typography variant="h4">My Forms</Typography>
                <Button variant="outlined" onClick={fetchForms}>
                    Refresh
                </Button>
            </Box>

            {loading && (
                <Typography textAlign="center" color="text.secondary">
                    Loading…
                </Typography>
            )}

            {error && (
                <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {!loading && !error && forms.length === 0 && (
                <Typography color="text.secondary" textAlign="center">
                    No forms yet.
                </Typography>
            )}

            {!loading && !error && forms.length > 0 && (
                <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: "0 auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name Insured</strong></TableCell>
                                <TableCell><strong>Coverage Code</strong></TableCell>
                                <TableCell><strong>Agent Name</strong></TableCell>
                                <TableCell><strong>Agency</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {forms.map((f, idx) => (
                                <TableRow key={f.id ?? idx}>
                                    <TableCell>{f.nameInsured || "—"}</TableCell>
                                    <TableCell>{f.coverageCode || "—"}</TableCell>
                                    <TableCell>{f.agentName || "—"}</TableCell>
                                    <TableCell>{f.agencyName || "—"}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => setSelectedForm(f)}
                                        >
                                            View
                                        </Button>

                                        <Button size="small" onClick={() => setSelectedForm(f)}>
                                            Print PDF
                                        </Button>

                                                        </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog for full details */}
            <Dialog
                open={Boolean(selectedForm)}
                onClose={() => setSelectedForm(null)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Form Details</DialogTitle>
                <DialogContent dividers>
                    {selectedForm && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography><strong>Agent:</strong> {selectedForm.agentName} ({selectedForm.agentNbr})</Typography>
                            <Typography><strong>Agency:</strong> {selectedForm.agencyName} ({selectedForm.agencyNbr})</Typography>
                            <Typography><strong>Name Insured:</strong> {selectedForm.nameInsured}</Typography>
                            <Typography><strong>Description Risk:</strong> {selectedForm.descriptionRisk}</Typography>
                            <Typography><strong>Coverage Code:</strong> {selectedForm.coverageCode}</Typography>

                            <Divider />
                            <Typography variant="h6">Insurers</Typography>
                            {[1, 2, 3].map((i) => (
                                <Box key={i} sx={{ mb: 2 }}>
                                    <Typography><strong>Insurer {i}:</strong> {selectedForm[`insurer${i}`] || "—"}</Typography>
                                    <Typography><strong>Contacted Through:</strong> {selectedForm[`contactedThrough${i}`] || "—"}</Typography>
                                    <Typography><strong>Full Contact:</strong> {selectedForm[`fullContactName${i}`] || "—"}</Typography>
                                    <Typography><strong>Email/Phone:</strong> {selectedForm[`emailPhone${i}`] || "—"}</Typography>
                                    <Typography><strong>Website:</strong> {selectedForm[`website${i}`] || "—"}</Typography>
                                    <Typography><strong>NAIC:</strong> {selectedForm[`naic${i}`] || "—"}</Typography>
                                    <Typography><strong>Date:</strong> {selectedForm[`date${i}`] || "—"}</Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setSelectedForm(null)}>Close</Button>
                </DialogActions>

            </Dialog>
        </Box>
    );
}
