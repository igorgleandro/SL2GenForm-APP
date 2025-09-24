// components/ConfirmationComponent.jsx
import { createPortal } from "react-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SubmitButton from "../logic/SubmitButton.jsx";
import ColorButtons from "./ColorButtons.jsx";

export default function ConfirmationComponent({
                                                  form1 = {},
                                                  form2 = {},
                                                  form3a = {},
                                                  form3b = {},
                                                  form3c = {},
                                                  onCloseConfirm = () => {}, // simple callback (not "open/onClose" pattern)
                                              }) {
    return createPortal(
        <Box
            role="dialog"
            aria-modal="true"
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: (t) => t.zIndex.modal,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(6px)",
                backgroundColor: "rgba(0,0,0,0.25)",
                p: 2,
            }}
        >
            <Box
                sx={{
                    bgcolor: "background.paper",
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 6,
                    width: "100%",
                    maxWidth: 960,
                }}
            >
                <Typography variant="h5" sx={{ color: "#dc2626", mb: 2 }}>
                    Review
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <p><strong>Agent Name:</strong> {form1.agentName}</p>
                    <p><strong>Agent Nbr:</strong> {String(form1.agentNbr ?? "")}</p>
                    <p><strong>Agency Name:</strong> {form1.agencyName}</p>
                    <p><strong>Agency Nbr:</strong> {String(form1.agencyNbr ?? "")}</p>
                    <br />
                    <p><strong>Name of Insured:</strong> {form2.nameInsured}</p>
                    <p><strong>Description Risk:</strong> {String(form2.descriptionRisk ?? "")}</p>
                    <p><strong>Coverage Code:</strong> {form2.coverageCode}</p>
                </Box>

                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 2,
                        bgcolor: "background.default",
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                        gap: 3,
                        mb: 3,
                    }}
                >
                    <Box>
                        <Typography variant="h6" gutterBottom>Insurer 1</Typography>
                        <p><strong>Insurer:</strong> {form3a.insurer1}</p>
                        <p><strong>Contacted Through:</strong> {form3a.contactedThrough1}</p>
                        <p><strong>Full Contact Name:</strong> {form3a.fullContactName1}</p>
                        <p><strong>Phone Number / Email:</strong> {form3a.emailPhone1}</p>
                        <p><strong>Website:</strong> {form3a.website1}</p>
                        <p><strong>NAIC:</strong> {form3a.naic1}</p>
                        <p><strong>Date:</strong> {form3a.date1}</p>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>Insurer 2</Typography>
                        <p><strong>Insurer:</strong> {form3b.insurer2}</p>
                        <p><strong>Contacted Through:</strong> {form3b.contactedThrough2}</p>
                        <p><strong>Full Contact Name:</strong> {form3b.fullContactName2}</p>
                        <p><strong>Phone Number / Email:</strong> {form3b.emailPhone2}</p>
                        <p><strong>Website:</strong> {form3b.website2}</p>
                        <p><strong>NAIC:</strong> {form3b.naic2}</p>
                        <p><strong>Date:</strong> {form3b.date2}</p>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>Insurer 3</Typography>
                        <p><strong>Insurer:</strong> {form3c.insurer3}</p>
                        <p><strong>Contacted Through:</strong> {form3c.contactedThrough3}</p>
                        <p><strong>Full Contact Name:</strong> {form3c.fullContactName3}</p>
                        <p><strong>Phone Number / Email:</strong> {form3c.emailPhone3}</p>
                        <p><strong>Website:</strong> {form3c.website3}</p>
                        <p><strong>NAIC:</strong> {form3c.naic3}</p>
                        <p><strong>Date:</strong> {form3c.date3}</p>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                    <ColorButtons color="blue" text="Close" func={onCloseConfirm} />
                    <SubmitButton />
                </Box>
            </Box>
        </Box>,
        document.body
    );
}
