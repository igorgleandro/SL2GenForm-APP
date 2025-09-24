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
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/25 dark:bg-black/75 p-2"
        >
            <Box
                className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-3xl shadow-lg dark:shadow-2xl dark:border dark:border-gray-700 w-full max-w-4xl"
            >
                <Typography 
                    variant="h5" 
                    className="text-red-600 dark:text-red-400 mb-4"
                >
                    Review
                </Typography>

                <Box className="mb-6 text-gray-900 dark:text-gray-200">
                    <p><strong className="text-gray-900 dark:text-white">Agent Name:</strong> {form1.agentName}</p>
                    <p><strong className="text-gray-900 dark:text-white">Agent Nbr:</strong> {String(form1.agentNbr ?? "")}</p>
                    <p><strong className="text-gray-900 dark:text-white">Agency Name:</strong> {form1.agencyName}</p>
                    <p><strong className="text-gray-900 dark:text-white">Agency Nbr:</strong> {String(form1.agencyNbr ?? "")}</p>
                    <br />
                    <p><strong className="text-gray-900 dark:text-white">Name of Insured:</strong> {form2.nameInsured}</p>
                    <p><strong className="text-gray-900 dark:text-white">Description Risk:</strong> {String(form2.descriptionRisk ?? "")}</p>
                    <p><strong className="text-gray-900 dark:text-white">Coverage Code:</strong> {form2.coverageCode}</p>
                </Box>

                <Box
                    className="p-4 rounded-2xl shadow-md dark:shadow-lg bg-gray-50 dark:bg-gray-800 dark:border dark:border-gray-600 text-gray-900 dark:text-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
                >
                    <Box>
                        <Typography variant="h6" className="text-gray-900 dark:text-white mb-2">Insurer 1</Typography>
                        <p><strong className="text-gray-900 dark:text-white">Insurer:</strong> {form3a.insurer1}</p>
                        <p><strong className="text-gray-900 dark:text-white">Contacted Through:</strong> {form3a.contactedThrough1}</p>
                        <p><strong className="text-gray-900 dark:text-white">Full Contact Name:</strong> {form3a.fullContactName1}</p>
                        <p><strong className="text-gray-900 dark:text-white">Phone Number / Email:</strong> {form3a.emailPhone1}</p>
                        <p><strong className="text-gray-900 dark:text-white">Website:</strong> {form3a.website1}</p>
                        <p><strong className="text-gray-900 dark:text-white">NAIC:</strong> {form3a.naic1}</p>
                        <p><strong className="text-gray-900 dark:text-white">Date:</strong> {form3a.date1}</p>
                    </Box>

                    <Box>
                        <Typography variant="h6" className="text-gray-900 dark:text-white mb-2">Insurer 2</Typography>
                        <p><strong className="text-gray-900 dark:text-white">Insurer:</strong> {form3b.insurer2}</p>
                        <p><strong className="text-gray-900 dark:text-white">Contacted Through:</strong> {form3b.contactedThrough2}</p>
                        <p><strong className="text-gray-900 dark:text-white">Full Contact Name:</strong> {form3b.fullContactName2}</p>
                        <p><strong className="text-gray-900 dark:text-white">Phone Number / Email:</strong> {form3b.emailPhone2}</p>
                        <p><strong className="text-gray-900 dark:text-white">Website:</strong> {form3b.website2}</p>
                        <p><strong className="text-gray-900 dark:text-white">NAIC:</strong> {form3b.naic2}</p>
                        <p><strong className="text-gray-900 dark:text-white">Date:</strong> {form3b.date2}</p>
                    </Box>

                    <Box>
                        <Typography variant="h6" className="text-gray-900 dark:text-white mb-2">Insurer 3</Typography>
                        <p><strong className="text-gray-900 dark:text-white">Insurer:</strong> {form3c.insurer3}</p>
                        <p><strong className="text-gray-900 dark:text-white">Contacted Through:</strong> {form3c.contactedThrough3}</p>
                        <p><strong className="text-gray-900 dark:text-white">Full Contact Name:</strong> {form3c.fullContactName3}</p>
                        <p><strong className="text-gray-900 dark:text-white">Phone Number / Email:</strong> {form3c.emailPhone3}</p>
                        <p><strong className="text-gray-900 dark:text-white">Website:</strong> {form3c.website3}</p>
                        <p><strong className="text-gray-900 dark:text-white">NAIC:</strong> {form3c.naic3}</p>
                        <p><strong className="text-gray-900 dark:text-white">Date:</strong> {form3c.date3}</p>
                    </Box>
                </Box>

                <Box className="flex gap-4 justify-end">
                    <ColorButtons color="blue" text="Close" func={onCloseConfirm} />
                    <SubmitButton />
                </Box>
            </Box>
        </Box>,
        document.body
    );
}