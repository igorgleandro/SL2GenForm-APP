import * as React from "react";
import {
    Box, Button, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent,
    DialogActions, Divider,
} from "@mui/material";
import { generatePdf } from "./pdfUtils";
import DeleteButton from "./DeleteButton";
import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useAuth } from "../providers/AuthServiceProvider.jsx";
import { Navigate } from "react-router";

export default function GetForms() {
    const [forms, setForms] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [selectedForm, setSelectedForm] = React.useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { isLoggedIn, user } = useAuth();

    const fetchForms = React.useCallback(async () => {
        if (!user || !user.id) {
            setError("User not authenticated");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const tokenKey = `${user.tokenType || 'Bearer'} ${user.token}`;

            const res = await fetch(`https://sl2genform-back-production.up.railway.app/users/${user.id}/myforms`, {
                headers: {
                    'Authorization': tokenKey,
                    'Accept': 'application/json'
                },
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${res.status}`);
            }

            const data = await res.json();
            setForms(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Fetch forms error:', err);
            setError(err.message || "Failed to fetch forms.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    React.useEffect(() => {
        if (user && user.id) {
            fetchForms();
        }
    }, [user, fetchForms]);

    const handleDeleteSuccess = (deletedFormId) => {
        // Remove the deleted form from the list
        setForms(prevForms => prevForms.filter(f => f.id !== deletedFormId));

        // Close the dialog if it's showing the deleted form
        if (selectedForm?.id === deletedFormId) {
            setSelectedForm(null);
        }
    };

    const filteredForms = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return forms;

        return forms.filter((f) => {
            const get = (v) => (v ? String(v).toLowerCase() : "");

            const haystack = [
                get(f.nameInsured),
                get(f.coverageCode),
                get(f.agentName),
                get(f.agencyName),
                get(f.id)
            ].join(" ");

            return haystack.includes(q);
        });
    }, [forms, searchQuery]);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Box sx={{ p: 2 }} className="max-w-6xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-900">
            <Box className="rounded-2xl border shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur p-5 border-gray-200 dark:border-gray-700">

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                        className="text-gray-900 dark:text-white"
                    >
                        My Forms
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                        <Box
                            className="rounded-full border px-3 py-1.5 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
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
                                placeholder="Search by insured, coverage, agent..."
                                className="outline-none w-full text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-transparent text-gray-900 dark:text-white"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    ✕
                                </button>
                            )}
                        </Box>

                        <Button
                            variant="outlined"
                            onClick={fetchForms}
                            disabled={loading}
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
                            className="border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-400/10"
                        >
                            {loading ? 'Loading...' : 'Refresh'}
                        </Button>
                    </Box>
                </Box>

                {/* States */}
                {loading && (
                    <Typography
                        textAlign="center"
                        className="text-gray-600 dark:text-gray-400 py-8"
                    >
                        Loading forms...
                    </Typography>
                )}

                {error && (
                    <Typography color="error" textAlign="center" sx={{ mb: 2, py: 4 }}>
                        {error}
                    </Typography>
                )}

                {/* No data at all */}
                {!loading && !error && forms.length === 0 && (
                    <Typography
                        textAlign="center"
                        className="text-gray-600 dark:text-gray-400 py-8"
                    >
                        No forms yet. Create your first form to get started!
                    </Typography>
                )}

                {/* No results for current search */}
                {!loading && !error && forms.length > 0 && filteredForms.length === 0 && (
                    <Typography
                        textAlign="center"
                        className="text-gray-600 dark:text-gray-400 py-8"
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
                        className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
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
                                    className="[&_th]:bg-gray-50 [&_th]:dark:bg-gray-700 [&_th]:text-gray-700 [&_th]:dark:text-gray-300 [&_th]:border-b [&_th]:border-gray-200 [&_th]:dark:border-gray-800"
                                >
                                    <TableCell>Form ID</TableCell>
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
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 [&:nth-of-type(odd)]:bg-gray-50/50 [&:nth-of-type(odd)]:dark:bg-gray-700/30 [&_td]:py-3 [&_td]:border-b [&_td]:border-gray-100 [&_td]:dark:border-gray-600 [&_td]:text-gray-900 [&_td]:dark:text-gray-100"
                                    >
                                        <TableCell>{f.id || "—"}</TableCell>
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
                                                    className="border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30"
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
                                                    className="border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
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
                                                <DeleteButton
                                                    formId={f.id}
                                                    onDeleteSuccess={handleDeleteSuccess}
                                                />
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
                    className: "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }}
            >
                <DialogTitle
                    sx={{ fontWeight: 700 }}
                    className="text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
                >
                    Form Details
                </DialogTitle>

                <DialogContent
                    dividers
                    className="bg-white dark:bg-gray-800 [&_.MuiDialogContent-dividers]:border-gray-200 [&_.MuiDialogContent-dividers]:dark:border-gray-700"
                >
                    {selectedForm && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }} className="dark:bg-gray-800">
                            <Typography className="text-gray-900 dark:text-gray-100">
                                <strong>Agent:</strong> {selectedForm.agentName} ({selectedForm.agentNbr})
                            </Typography>
                            <Typography className="text-gray-900 dark:text-gray-100">
                                <strong>Agency:</strong> {selectedForm.agencyName} ({selectedForm.agencyNbr})
                            </Typography>
                            <Typography className="text-gray-900 dark:text-gray-100">
                                <strong>Name Insured:</strong> {selectedForm.nameInsured}
                            </Typography>
                            <Typography className="text-gray-900 dark:text-gray-100">
                                <strong>Description Risk:</strong> {selectedForm.descriptionRisk}
                            </Typography>
                            <Typography className="text-gray-900 dark:text-gray-100">
                                <strong>Coverage Code:</strong> {selectedForm.coverageCode}
                            </Typography>

                            <Divider
                                sx={{ my: 1.5 }}
                                className="border-gray-200 dark:border-gray-600"
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 700 }}
                                className="text-gray-900 dark:text-white"
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
                                    className="border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                                >
                                    <Typography className="text-gray-900 dark:text-gray-100">
                                        <strong>Insurer {i}:</strong> {selectedForm[`insurer${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100">
                                        <strong>Contacted Through:</strong> {selectedForm[`contactedThrough${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100">
                                        <strong>Full Contact:</strong> {selectedForm[`fullContactName${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100">
                                        <strong>Email/Phone:</strong> {selectedForm[`emailPhone${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100">
                                        <strong>Website:</strong> {selectedForm[`website${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100">
                                        <strong>NAIC:</strong> {selectedForm[`naic${i}`] || "—"}
                                    </Typography>
                                    <Typography className="text-gray-900 dark:text-gray-100">
                                        <strong>Date:</strong> {selectedForm[`date${i}`] || "—"}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </DialogContent>

                <DialogActions
                    sx={{ px: 3, py: 2 }}
                    className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
                >
                    {selectedForm && (
                        <>
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
                                Download PDF
                            </Button>
                            <DeleteButton
                                formId={selectedForm.id}
                                onDeleteSuccess={handleDeleteSuccess}
                            />
                        </>
                    )}
                    <Button
                        onClick={() => setSelectedForm(null)}
                        sx={{ textTransform: "none" }}
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}