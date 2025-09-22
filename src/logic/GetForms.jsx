import * as React from "react";
import {
    Box, Button, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent,
    DialogActions, Divider,
} from "@mui/material";
import { generatePdf } from "./pdfUtils";
import  DeleteButton  from "./DeleteButton";
import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

export default function GetForms() {
    const [forms, setForms] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [selectedForm, setSelectedForm] = React.useState(null);
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredForms = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return forms;

        return forms.filter((f) => {
            const get = (v) => (v ? String(v).toLowerCase() : "");

            // Core fields
            const haystack = [
                get(f.nameInsured),
                get(f.coverageCode),
                get(f.agentName),
                get(f.agencyName),
            ].join(" ");

            return haystack.includes(q);
        });
    }, [forms, searchQuery]);

    return (
        <Box sx={{ p: 2 }} className="max-w-6xl mx-auto">
            <Box className="rounded-2xl border shadow-sm bg-white/80 backdrop-blur p-5">

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        mb: 2,
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
                        My Forms
                    </Typography>

                    <Box
                        className="rounded-full border px-3 py-1.5 bg-white"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            minWidth: 280,
                            borderColor: "divider",
                        }}
                    >
                        <SearchIcon size={16} className="text-gray-500" />

                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by insured, coverage, agent, agency…"
                            className="outline-none w-full text-sm placeholder:text-gray-400"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="text-xs text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        )}
                    </Box>

                    <Button
                        variant="outlined"
                        onClick={fetchForms}
                        sx={{
                            borderRadius: 999,
                            textTransform: "none",
                            px: 2.5,
                            "&:hover": { backgroundColor: "rgba(16,185,129,0.06)", borderColor: "success.main" },
                            borderColor: "success.main",
                            color: "success.main",
                        }}
                    >
                        Refresh
                    </Button>
                </Box>

                {/* States */}
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

                {/* No data at all */}
                {!loading && !error && forms.length === 0 && (
                    <Typography color="text.secondary" textAlign="center">
                        No forms yet.
                    </Typography>
                )}

                {/* No results for current search */}
                {!loading && !error && forms.length > 0 && filteredForms.length === 0 && (
                    <Typography color="text.secondary" textAlign="center">
                        No matches for “{searchQuery}”.
                    </Typography>
                )}

                {/* Table */}
                {!loading && !error && filteredForms.length > 0 && (
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                            bgcolor: "background.paper",
                        }}
                    >
                        <Table size="small">
                            <TableHead>
                                <TableRow
                                    sx={{
                                        th: {
                                            bgcolor: "grey.50",
                                            color: "text.secondary",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            letterSpacing: 0.2,
                                            py: 1.25,
                                            borderBottomColor: "divider",
                                        },
                                    }}
                                >
                                    <TableCell>Name Insured</TableCell>
                                    <TableCell>Coverage Code</TableCell>
                                    <TableCell>Agent Name</TableCell>
                                    <TableCell>Agency</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredForms.map((f, idx) => (
                                    <TableRow
                                        key={f.id ?? idx}
                                        hover
                                        sx={{
                                            "&:nth-of-type(odd)": { bgcolor: "grey.50" },
                                            "& td": { py: 1.25, borderBottomColor: "rgba(0,0,0,0.04)" },
                                        }}
                                    >
                                        <TableCell>{f.nameInsured || "—"}</TableCell>
                                        <TableCell>
                                            {f.coverageCode ? (
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        px: 1,
                                                        py: 0.25,
                                                        borderRadius: 2,
                                                        border: "1px solid",
                                                        borderColor: "success.light",
                                                        color: "success.main",
                                                        fontSize: 12,
                                                        bgcolor: "rgba(16,185,129,0.06)",
                                                    }}
                                                >
                                                    {f.coverageCode}
                                                </Box>
                                            ) : (
                                                "—"
                                            )}
                                        </TableCell>
                                        <TableCell>{f.agentName || "—"}</TableCell>
                                        <TableCell>{f.agencyName || "—"}</TableCell>
                                        <TableCell align="right">
                                            <Box sx={{ display: "inline-flex", gap: 1 }}>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => setSelectedForm(f)}
                                                    sx={{
                                                        textTransform: "none",
                                                        borderRadius: 2,
                                                        px: 1.5,
                                                        borderColor: "grey.300",
                                                        "&:hover": { borderColor: "grey.400", bgcolor: "grey.50" },
                                                    }}
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => generatePdf(f)}
                                                    sx={{
                                                        textTransform: "none",
                                                        borderRadius: 2,
                                                        px: 1.5,
                                                        bgcolor: "success.main",
                                                        "&:hover": { bgcolor: "success.dark" },
                                                    }}
                                                >
                                                    PDF
                                                </Button>
                                                <DeleteButton formId={f.id} />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>




    {/* Dialog */}
            <Dialog
                open={Boolean(selectedForm)}
                onClose={() => setSelectedForm(null)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, overflow: "hidden", border: "1px solid", borderColor: "divider" },
                }}
            >
                <DialogTitle sx={{ fontWeight: 700 }}>Form Details</DialogTitle>

                <DialogContent dividers>
                    {selectedForm && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                            <Typography>
                                <strong>Agent:</strong> {selectedForm.agentName} ({selectedForm.agentNbr})
                            </Typography>
                            <Typography>
                                <strong>Agency:</strong> {selectedForm.agencyName} ({selectedForm.agencyNbr})
                            </Typography>
                            <Typography>
                                <strong>Name Insured:</strong> {selectedForm.nameInsured}
                            </Typography>
                            <Typography>
                                <strong>Description Risk:</strong> {selectedForm.descriptionRisk}
                            </Typography>
                            <Typography>
                                <strong>Coverage Code:</strong> {selectedForm.coverageCode}
                            </Typography>

                            <Divider sx={{ my: 1.5 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                Insurers
                            </Typography>

                            {[1, 2, 3].map((i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        mb: 1,
                                        p: 1.25,
                                        borderRadius: 2,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        bgcolor: "grey.50",
                                    }}
                                >
                                    <Typography>
                                        <strong>Insurer {i}:</strong> {selectedForm[`insurer${i}`] || "—"}
                                    </Typography>
                                    <Typography>
                                        <strong>Contacted Through:</strong> {selectedForm[`contactedThrough${i}`] || "—"}
                                    </Typography>
                                    <Typography>
                                        <strong>Full Contact:</strong> {selectedForm[`fullContactName${i}`] || "—"}
                                    </Typography>
                                    <Typography>
                                        <strong>Email/Phone:</strong> {selectedForm[`emailPhone${i}`] || "—"}
                                    </Typography>
                                    <Typography>
                                        <strong>Website:</strong> {selectedForm[`website${i}`] || "—"}
                                    </Typography>
                                    <Typography>
                                        <strong>NAIC:</strong> {selectedForm[`naic${i}`] || "—"}
                                    </Typography>
                                    <Typography>
                                        <strong>Date:</strong> {selectedForm[`date${i}`] || "—"}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2 }}>
                    {selectedForm && (
                        <Button
                            variant="contained"
                            onClick={() => generatePdf(selectedForm)}
                            sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                bgcolor: "success.main",
                                "&:hover": { bgcolor: "success.dark" },
                            }}
                        >
                            PDF
                        </Button>
                    )}
                    {/* pass the selectedForm id here too */}
                    <DeleteButton formId={selectedForm?.id} />
                    <Button onClick={() => setSelectedForm(null)} sx={{ textTransform: "none" }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>

    );
}