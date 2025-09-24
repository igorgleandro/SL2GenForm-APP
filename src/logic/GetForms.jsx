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
        <Box sx={{ p: 2 }} className="max-w-6xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Box className="rounded-2xl border shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur p-5 dark:border-gray-700 transition-colors duration-300">

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
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                        className="text-gray-900 dark:text-white transition-colors duration-300"
                    >
                        My Forms
                    </Typography>

                    <Box
                        className="rounded-full border px-3 py-1.5 bg-white dark:bg-gray-700 dark:border-gray-600 transition-colors duration-300"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            minWidth: 280,
                        }}
                    >
                        <SearchIcon size={16} className="text-gray-500 dark:text-gray-400" />

                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by insured, coverage, agent, agency…"
                            className="outline-none w-full text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-transparent text-gray-900 dark:text-white transition-colors duration-300"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-300"
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
                            "&:hover": {
                                backgroundColor: "rgba(16,185,129,0.06)",
                            },
                            borderColor: "success.main",
                            color: "success.main",
                        }}
                        className="dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400/10"
                    >
                        Refresh
                    </Button>
                </Box>

                {/* States */}
                {loading && (
                    <Typography
                        textAlign="center"
                        className="text-gray-600 dark:text-gray-400 transition-colors duration-300"
                    >
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
                    <Typography
                        textAlign="center"
                        className="text-gray-600 dark:text-gray-400 transition-colors duration-300"
                    >
                        No forms yet.
                    </Typography>
                )}

                {/* No results for current search */}
                {!loading && !error && forms.length > 0 && filteredForms.length === 0 && (
                    <Typography
                        textAlign="center"
                        className="text-gray-600 dark:text-gray-400 transition-colors duration-300"
                    >
                        No matches for "{searchQuery}".
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
                        }}
                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300"
                    >
                        <Table size="small">
                            <TableHead>
                                <TableRow
                                    sx={{
                                        th: {
                                            fontSize: 12,
                                            fontWeight: 700,
                                            letterSpacing: 0.2,
                                            py: 1.25,
                                        },
                                    }}
                                    className="[&_th]:bg-gray-50 [&_th]:dark:bg-gray-700 [&_th]:text-gray-700 [&_th]:dark:text-gray-300 [&_th]:border-b [&_th]:border-gray-200 [&_th]:dark:border-gray-600 [&_th]:transition-colors [&_th]:duration-300"
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
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 [&:nth-of-type(odd)]:bg-gray-50 [&:nth-of-type(odd)]:dark:bg-gray-700/30 [&_td]:py-3 [&_td]:border-b [&_td]:border-gray-100 [&_td]:dark:border-gray-600 [&_td]:text-gray-900 [&_td]:dark:text-gray-100 [&_td]:transition-colors [&_td]:duration-300"
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
                                                        fontSize: 12,
                                                    }}
                                                    className="border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30 transition-colors duration-300"
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
                                                    }}
                                                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
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
                                                    className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
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
                    sx: { borderRadius: 3, overflow: "hidden", border: "1px solid" },
                    className: "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300"
                }}
            >
                <DialogTitle
                    sx={{ fontWeight: 700 }}
                    className="text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300"
                >
                    Form Details
                </DialogTitle>

                <DialogContent
                    dividers
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300"
                >
                    {selectedForm && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                            <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                <strong>Agent:</strong> {selectedForm.agentName} ({selectedForm.agentNbr})
                            </Typography>
                            <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                <strong>Agency:</strong> {selectedForm.agencyName} ({selectedForm.agencyNbr})
                            </Typography>
                            <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                <strong>Name Insured:</strong> {selectedForm.nameInsured}
                            </Typography>
                            <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                <strong>Description Risk:</strong> {selectedForm.descriptionRisk}
                            </Typography>
                            <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                <strong>Coverage Code:</strong> {selectedForm.coverageCode}
                            </Typography>

                            <Divider
                                sx={{ my: 1.5 }}
                                className="border-gray-200 dark:border-gray-600 transition-colors duration-300"
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 700 }}
                                className="text-gray-900 dark:text-white transition-colors duration-300"
                            >
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
                                    }}
                                    className="border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 transition-colors duration-300"
                                >
                                    <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                        <strong>Insurer {i}:</strong> {selectedForm[`insurer${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                        <strong>Contacted Through:</strong> {selectedForm[`contactedThrough${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                        <strong>Full Contact:</strong> {selectedForm[`fullContactName${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                        <strong>Email/Phone:</strong> {selectedForm[`emailPhone${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                        <strong>Website:</strong> {selectedForm[`website${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                        <strong>NAIC:</strong> {selectedForm[`naic${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                        <strong>Date:</strong> {selectedForm[`date${i}`] || "—"}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </DialogContent>

                <DialogActions
                    sx={{ px: 3, py: 2 }}
                    className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300"
                >
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
                            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                        >
                            PDF
                        </Button>
                    )}
                    <DeleteButton formId={selectedForm?.id} />
                    <Button
                        onClick={() => setSelectedForm(null)}
                        sx={{ textTransform: "none" }}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}