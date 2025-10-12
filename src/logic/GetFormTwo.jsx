import * as React from "react";
import {
    Box, Button, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent,
    DialogActions, Divider, TextField,
} from "@mui/material";
import { generatePdf } from "./pdfUtils";
import DeleteButton from "./DeleteButton";
import { useMemo, useState } from "react";
import { Search as SearchIcon, Edit2, Save, X } from "lucide-react";
import { useAuth } from "../providers/AuthServiceProvider.jsx";
import { Navigate } from "react-router";

export default function GetFormTwo() {
    const [forms, setForms] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [selectedForm, setSelectedForm] = React.useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editedForm, setEditedForm] = useState(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });

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
        setForms(prevForms => prevForms.filter(f => f.id !== deletedFormId));

        if (selectedForm?.id === deletedFormId) {
            setSelectedForm(null);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedForm({ ...selectedForm });
        setSaveMessage({ text: '', type: '' });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedForm(null);
        setSaveMessage({ text: '', type: '' });
    };

    const handleFieldChange = (field, value) => {
        setEditedForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveEdit = async () => {
        if (!editedForm || !user) return;

        try {
            setSaveLoading(true);
            setSaveMessage({ text: '', type: '' });

            const tokenKey = `${user.tokenType || 'Bearer'} ${user.token}`;

            // Create update payload with only changed fields
            const updatePayload = {};
            Object.keys(editedForm).forEach(key => {
                if (editedForm[key] !== selectedForm[key]) {
                    updatePayload[key] = editedForm[key];
                }
            });

            const response = await fetch(
                `https://sl2genform-back-production.up.railway.app/myforms/${editedForm.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': tokenKey,
                    },
                    body: JSON.stringify(updatePayload),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to update form');
            }

            const updatedFormData = await response.json();

            // Update the forms list
            setForms(prevForms =>
                prevForms.map(f => f.id === updatedFormData.id ? updatedFormData : f)
            );

            // Update selected form
            setSelectedForm(updatedFormData);
            setIsEditing(false);
            setEditedForm(null);
            setSaveMessage({ text: 'Form updated successfully!', type: 'success' });

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSaveMessage({ text: '', type: '' });
            }, 3000);

        } catch (err) {
            console.error('Save error:', err);
            setSaveMessage({ text: err.message || 'Failed to save changes', type: 'error' });
        } finally {
            setSaveLoading(false);
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

    const renderField = (label, field, multiline = false) => {
        const value = isEditing ? editedForm?.[field] : selectedForm?.[field];

        if (isEditing) {
            return (
                <TextField
                    label={label}
                    value={value || ''}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    fullWidth
                    size="small"
                    multiline={multiline}
                    rows={multiline ? 2 : 1}
                    sx={{ mb: 1.5 }}
                    className="[&_.MuiInputLabel-root]:text-gray-700 [&_.MuiInputLabel-root]:dark:text-gray-300 [&_.MuiOutlinedInput-root]:dark:text-white [&_.MuiOutlinedInput-notchedOutline]:dark:border-gray-600"
                />
            );
        }

        return (
            <Typography className="text-gray-900 dark:text-gray-100" sx={{ mb: 1 }}>
                <strong>{label}:</strong> {value || "—"}
            </Typography>
        );
    };

    const renderInsurerSection = (insurerNum) => {
        const fields = [
            { label: `Insurer ${insurerNum}`, field: `insurer${insurerNum}` },
            { label: 'Contacted Through', field: `contactedThrough${insurerNum}` },
            { label: 'Full Contact', field: `fullContactName${insurerNum}` },
            { label: 'Email/Phone', field: `emailPhone${insurerNum}` },
            { label: 'Website', field: `website${insurerNum}` },
            { label: 'NAIC', field: `naic${insurerNum}` },
            { label: 'Date', field: `date${insurerNum}` },
        ];

        return (
            <Box
                key={insurerNum}
                sx={{
                    mb: 2,
                    p: 1.5,
                    borderRadius: 2,
                    border: "1px solid",
                }}
                className="border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            >
                {fields.map(({ label, field }) => renderField(label, field))}
            </Box>
        );
    };

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

                {!loading && !error && forms.length === 0 && (
                    <Typography
                        textAlign="center"
                        className="text-gray-600 dark:text-gray-400 py-8"
                    >
                        No forms yet. Create your first form to get started!
                    </Typography>
                )}

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
                                                    onClick={() => {
                                                        setSelectedForm(f);
                                                        setIsEditing(false);
                                                        setEditedForm(null);
                                                        setSaveMessage({ text: '', type: '' });
                                                    }}
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

            {/* Form Details Dialog */}
            <Dialog
                open={Boolean(selectedForm)}
                onClose={() => {
                    if (!isEditing) {
                        setSelectedForm(null);
                    }
                }}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, overflow: "hidden", border: "1px solid" },
                    className: "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }}
            >
                <DialogTitle
                    sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    className="text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
                >
                    <span>Form Details {isEditing && '(Editing)'}</span>
                    {!isEditing && (
                        <Button
                            startIcon={<Edit2 className="w-4 h-4" />}
                            onClick={handleEditClick}
                            variant="outlined"
                            size="small"
                            sx={{
                                textTransform: "none",
                                borderRadius: 2,
                            }}
                            className="border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                        >
                            Edit
                        </Button>
                    )}
                </DialogTitle>

                <DialogContent
                    dividers
                    className="bg-white dark:bg-gray-800 [&_.MuiDialogContent-dividers]:border-gray-200 [&_.MuiDialogContent-dividers]:dark:border-gray-700"
                >
                    {saveMessage.text && (
                        <Box
                            sx={{ mb: 2, p: 2, borderRadius: 2 }}
                            className={
                                saveMessage.type === 'success'
                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                            }
                        >
                            {saveMessage.text}
                        </Box>
                    )}

                    {selectedForm && (
                        <Box sx={{ display: "flex", flexDirection: "column" }} className="dark:bg-gray-800">
                            {renderField('Agent Name', 'agentName')}
                            {renderField('Agent Number', 'agentNbr')}
                            {renderField('Agency Name', 'agencyName')}
                            {renderField('Agency Number', 'agencyNbr')}
                            {renderField('Name Insured', 'nameInsured')}
                            {renderField('Description Risk', 'descriptionRisk', true)}
                            {renderField('Coverage Code', 'coverageCode')}

                            <Divider
                                sx={{ my: 2 }}
                                className="border-gray-200 dark:border-gray-600"
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 700, mb: 2 }}
                                className="text-gray-900 dark:text-white"
                            >
                                Insurers
                            </Typography>

                            {[1, 2, 3].map(i => renderInsurerSection(i))}
                        </Box>
                    )}
                </DialogContent>

                <DialogActions
                    sx={{ px: 3, py: 2 }}
                    className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
                >
                    {isEditing ? (
                        <>
                            <Button
                                onClick={handleCancelEdit}
                                startIcon={<X className="w-4 h-4" />}
                                sx={{ textTransform: "none" }}
                                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveEdit}
                                disabled={saveLoading}
                                startIcon={<Save className="w-4 h-4" />}
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 2,
                                    bgcolor: "primary.main",
                                    "&:hover": { bgcolor: "primary.dark" },
                                }}
                                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                            >
                                {saveLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
}