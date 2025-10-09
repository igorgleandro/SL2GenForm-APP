import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import ColorButtons from "./ColorButtons.jsx";

export default function PreviewPanel({
                                         form1 = {},
                                         form2 = {},
                                         form3a = {},
                                         form3b = {},
                                         form3c = {},
                                         closeDrawer = () => {},
                                         handleConfirm = () => {},
                                         handleReset = () => {},
                                     }) {
    return (
        <Box sx={{ width: 380, p: 2 }} className="bg-white dark:bg-gray-800">
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="h6" fontWeight={700} className="text-gray-900 dark:text-white">
                    Live Preview
                </Typography>
                <IconButton onClick={closeDrawer} aria-label="Close preview" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider sx={{ mb: 2 }} className="border-gray-200 dark:border-gray-600" />

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }} className="text-gray-900 dark:text-white">
                Form 1
            </Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Agent Name: {form1.agentName ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Agent Nbr: {form1.agentNbr ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Agency Name: {form1.agencyName ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Agency Nbr: {form1.agencyNbr ?? "-"}</Typography>

            <Divider sx={{ my: 2 }} className="border-gray-200 dark:border-gray-600" />

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }} className="text-gray-900 dark:text-white">
                Form 2
            </Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Name of Insured: {form2.nameInsured ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Description Risk: {form2.descriptionRisk ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Coverage Code: {form2.coverageCode ?? "-"}</Typography>

            <Divider sx={{ my: 2 }} className="border-gray-200 dark:border-gray-600" />

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }} className="text-gray-900 dark:text-white">
                Insurer 1
            </Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Insurer: {form3a.insurer1 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Contacted Through: {form3a.contactedThrough1 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Full Contact Name: {form3a.fullContactName1 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Phone / Email: {form3a.emailPhone1 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Website: {form3a.website1 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">NAIC: {form3a.naic1 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Date: {form3a.date1 ?? "-"}</Typography>

            <Divider sx={{ my: 2 }} className="border-gray-200 dark:border-gray-600" />

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }} className="text-gray-900 dark:text-white">
                Insurer 2
            </Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Insurer: {form3b.insurer2 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Contacted Through: {form3b.contactedThrough2 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Full Contact Name: {form3b.fullContactName2 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Phone / Email: {form3b.emailPhone2 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Website: {form3b.website2 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">NAIC: {form3b.naic2 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Date: {form3b.date2 ?? "-"}</Typography>

            <Divider sx={{ my: 2 }} className="border-gray-200 dark:border-gray-600" />

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }} className="text-gray-900 dark:text-white">
                Insurer 3
            </Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Insurer: {form3c.insurer3 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Contacted Through: {form3c.contactedThrough3 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Full Contact Name: {form3c.fullContactName3 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Phone / Email: {form3c.emailPhone3 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Website: {form3c.website3 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">NAIC: {form3c.naic3 ?? "-"}</Typography>
            <Typography className="text-gray-700 dark:text-gray-300">Date: {form3c.date3 ?? "-"}</Typography>

            <Divider sx={{ my: 2 }} className="border-gray-200 dark:border-gray-600" />

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <ColorButtons color="green" text="Confirm Input" func={handleConfirm} />
                <ColorButtons color="red" text="Reset Input" func={handleReset} />
                <ColorButtons color="blue" text="Close Preview" func={closeDrawer} />
            </Box>
        </Box>
    );
}