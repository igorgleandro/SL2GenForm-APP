import { useState } from 'react'
import { createPortal } from "react-dom";
import { InputForm } from './components/InputForm'
import Typography from '@mui/material/Typography';
import ColorButtons from './components/ColorButtons.jsx';
import Form2InputList from './components/Form2InputList.jsx'
import Form1InputList from './components/Form1InputList.jsx';
import Form3InputInsurer1 from './components/Form3InputInsurer1.jsx';
import Form3InputInsurer2 from './components/Form3InputInsurer2.jsx';
import Form3InputInsurer3 from './components/Form3InputInsurer3.jsx';
import Box from '@mui/material/Box';
import { useContext } from "react";
import { FormContext } from "./providers/FormProvider";
import SubmitButton from "./logic/SubmitButton";
import SL2FormImg from "./assets/Images/Sl2FormImg.png";


//Preview Import
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import GetForms from "./logic/GetForms.jsx";




const App = () => {

    const { form1, setForm1, form2, setForm2, form3a, setForm3a, form3b, setForm3b, form3c, setForm3c } = useContext(FormContext);
    const [showConfirm, setShowConfirm] = useState(false)

    const [openPreview, setOpenPreview] = useState(false);
    const openDrawer = () => setOpenPreview(true);
    const closeDrawer = () => setOpenPreview(false);

  const updateForm1 = (event) => {
    const { name, value } = event.target
    setForm1(prev => ({
      ...prev,
      [name] : value,
    }))
  }

  const updateForm2 = (event) => {
    const { name, value } = event.target
    setForm2(prev => ({
      ...prev,
      [name] : value,
    }))
  }

  const updateForm3a = (event) => {
    const { name, value } = event.target
    setForm3a(prev => ({
      ...prev,
      [name] : value,
    }))
  }

    const updateForm3b = (event) => {
        const { name, value } = event.target
        setForm3b(prev => ({
            ...prev,
            [name] : value,
        }))
    }

    const updateForm3c = (event) => {
        const { name, value } = event.target
        setForm3c(prev => ({
            ...prev,
            [name] : value,
        }))
    }


    const handleConfirm = () => setShowConfirm(true)
    const handleCloseConfirm = () => setShowConfirm(false)

const ConfirmedInfo = ({ form1, form2, form3a,form3b,form3c }) => {

  return createPortal(
    
    <Box className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">

      <Box className="bg-white p-10 rounded-4xl shadow-lg max-w-4xl w-full">
          <Typography variant="h5" sx={{ color: "#dc2626" , mb:2}}>Review</Typography>
          <Box sx={{mb:4}} >
            <p><strong>Agent Name:</strong> {form1.agentName}</p>
            <p><strong>Agent Nbr:</strong> {String(form1.agentNbr)}</p>
            <p><strong>Agency Name:</strong> {form1.agencyName}</p>
            <p><strong>Agency Nbr:</strong> {String(form1.agencyNbr)}</p>
            <br></br>
            <p><strong>Name of Insured:</strong> {form2.nameInsured}</p>
            <p><strong>Description Risk:</strong> {String(form2.descriptionRisk)}</p>
            <p><strong>Coverage Code</strong> {form2.coverageCode}</p>
          </Box>
      
            <Box sx={{ p: 2,borderRadius: 2,boxShadow: 2,bgcolor: "background.paper",display: "flex", gap: 4,
    alignItems: "flex-start", mb:2,
  }}>
              <Box sx={{mb:2}}>
              <Typography variant="h6" gutterBottom>Insurer 1</Typography>
              <p><strong>Insurer:</strong> {form3a.insurer1}</p>
              <p><strong>Contacted Through:</strong> {form3a.contactedThrough1}</p>
              <p><strong>Full Contact Name: </strong>{form3a.fullContactName1}</p>
              <p><strong>Phone Number / Email:</strong> {form3a.emailPhone1}</p>
              <p><strong>Website:</strong> {form3a.website1}</p>
              <p><strong>NAIC:</strong> {form3a.naic1}</p>
              <p><strong>Date:</strong> {form3a.date1}</p>
              </Box>
              <Box>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Insurer 2</Typography>
              <p><strong>Insurer:</strong> {form3b.insurer2}</p>
              <p><strong>Contacted Through:</strong> {form3b.contactedThrough2}</p>
              <p><strong>Full Contact Name:</strong> {form3b.fullContactName2}</p>
              <p><strong>Phone Number / Email:</strong> {form3b.emailPhone2}</p>
              <p><strong>Website:</strong> {form3b.website2}</p>
              <p><strong>NAIC:</strong> {form3b.naic2}</p>
              <p><strong>Date:</strong> {form3b.date2}</p>
              </Box>
              <Box>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Insurer 3</Typography>
              <p><strong>Insurer:</strong> {form3c.insurer3}</p>
              <p><strong>Contacted Through:</strong> {form3c.contactedThrough3}</p>
              <p><strong>Full Contact Name:</strong> {form3c.fullContactName3}</p>
              <p><strong>Phone Number / Email:</strong> {form3c.emailPhone3}</p>
              <p><strong>Website:</strong> {form3c.website3}</p>
              <p><strong>NAIC: </strong>{form3c.naic3}</p>
              <p><strong>Date:</strong> {form3c.date3}</p>
              </Box>
            </Box>

          <Box
              sx={{
                  display: "flex",
                  gap: 2,             // spacing between buttons
                  width: "100%",      // optional, so they expand to full row
              }}
          >
              <SubmitButton />

              <ColorButtons
                  color="blue"
                  text="Close"
                  func={handleCloseConfirm}

              />
          </Box>
    </Box>
    </Box>,
    document.body 
  );
};

    //List Form1 data
    const form1InputList = Form1InputList({updateForm1, form1})
    const form2InputList= Form2InputList({ updateForm2, form2 })
    const form3aInputList = Form3InputInsurer1({ updateForm3a, form3a });
    const form3bInputList = Form3InputInsurer2({ updateForm3b, form3b });
    const form3cInputList = Form3InputInsurer3({ updateForm3c, form3c });

    const PreviewPanel = () => (
        <Box sx={{ width: 380, p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="h6" fontWeight={700}>Live Preview</Typography>
                <IconButton onClick={closeDrawer}><CloseIcon /></IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Form 1</Typography>
            <Typography>Agent Name: {form1.agentName || "-"}</Typography>
            <Typography>Agent Nbr: {form1.agentNbr || "-"}</Typography>
            <Typography>Agency Name: {form1.agencyName || "-"}</Typography>
            <Typography>Agency Nbr: {form1.agencyNbr || "-"}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Form 2</Typography>
            <Typography>Name of Insured: {form2.nameInsured || "-"}</Typography>
            <Typography>Description Risk: {form2.descriptionRisk || "-"}</Typography>
            <Typography>Coverage Code: {form2.coverageCode || "-"}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Insurer 1</Typography>
            <Typography>Insurer: {form3a.insurer1 || "-"}</Typography>
            <Typography>Contacted Through: {form3a.contactedThrough1 || "-"}</Typography>
            <Typography>Full Contact Name: {form3a.fullContactName1 || "-"}</Typography>
            <Typography>Phone / Email: {form3a.emailPhone1 || "-"}</Typography>
            <Typography>Website: {form3a.website1 || "-"}</Typography>
            <Typography>NAIC: {form3a.naic1 || "-"}</Typography>
            <Typography>Date: {form3a.date1 || "-"}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Insurer 2</Typography>
            <Typography>Insurer: {form3b.insurer2 || "-"}</Typography>
            <Typography>Contacted Through: {form3b.contactedThrough2 || "-"}</Typography>
            <Typography>Full Contact Name: {form3b.fullContactName2 || "-"}</Typography>
            <Typography>Phone / Email: {form3b.emailPhone2 || "-"}</Typography>
            <Typography>Website: {form3b.website2 || "-"}</Typography>
            <Typography>NAIC: {form3b.naic2 || "-"}</Typography>
            <Typography>Date: {form3b.date2 || "-"}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Insurer 3</Typography>
            <Typography>Insurer: {form3c.insurer3 || "-"}</Typography>
            <Typography>Contacted Through: {form3c.contactedThrough3 || "-"}</Typography>
            <Typography>Full Contact Name: {form3c.fullContactName3 || "-"}</Typography>
            <Typography>Phone / Email: {form3c.emailPhone3 || "-"}</Typography>
            <Typography>Website: {form3c.website3 || "-"}</Typography>
            <Typography>NAIC: {form3c.naic3 || "-"}</Typography>
            <Typography>Date: {form3c.date3 || "-"}</Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <ColorButtons color="green" text="Confirm Input" func={handleConfirm} />

                <ColorButtons
                    color={'red'}
                    text={'Reset Input'}
                    func= {handleCloseConfirm}
                />

                <ColorButtons
                    color={'blue'}
                    text={'Close Preview'}
                    func={closeDrawer}/>

            </Box>
        </Box>
    );



    return (
        <>
        <Box className="min-h-screen grid place-items-center bg-gray-200">
             <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] w-full max-w-7xl gap-4">

                {/* LEFT COLUMN */}
                <Box
                    sx={{ justifyContent: "flex-end", alignItems: "flex-start", p: 1 }}
                    className="bg-white rounded-2xl border shadow-sm p-4"
                >
                    <h3 className="text-base font-semibold text-gray-800 mb-3 p-2">SL2 Form</h3>
                    {/* Form 1 */}
                    <div>
                        <div className="rounded-xl border bg-gray-50 p-4">
                        <h3 className="text-xs font-semibold text-gray-700 mb-3">Form 1</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.values(form1InputList).map(
                                ({ onChange, name, type, value, placeholder }, idx) => (
                                    <InputForm
                                        key={idx}
                                        onChange={onChange}
                                        name={name}
                                        type={type}
                                        value={value}
                                        label={placeholder}
                                        placeholder= {placeholder}
                                    />
                                )
                            )}
                        </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 my-5" />

                    {/* Form 2 */}
                    <div>
                        <div className="rounded-xl border bg-gray-50 p-4 ">
                        <h3 className="text-xs font-semibold text-gray-700 mb-3">Form 2</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {Object.values(form2InputList).map(
                                ({ onChange, name, type, value, placeholder, options }, idx) => (
                                    <InputForm
                                        key={idx}
                                        onChange={onChange}
                                        name={name}
                                        type={type}
                                        value={value}
                                        label={placeholder}
                                        placeholder= {placeholder}
                                        options={options}
                                    />
                                )
                            )}
                        </div>
                        </div>
                    </div>
                </Box>

                {/* RIGHT COLUMN */}
                <Box
                    sx={{ display: "flex", justifyContent: "center", alignItems: "stretch", p: 1 }}
                    className="rounded-2xl border shadow-sm bg-white"
                >
                    {/* FORM 3 – Inputs */}
                    <div className="w-full p-4">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">Insurers</h3>

                        {/* 3 columns; last one a bit wider */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-3">
                            <section className="rounded-xl border bg-gray-50 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center justify-center w-6 h-6 text-[11px] font-semibold rounded-full border border-emerald-500 text-emerald-600">01</span>
                                    <h4 className="text-sm font-semibold text-gray-700">Insurer #01</h4>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {Object.values(form3aInputList).map(
                                        ({ onChange, name, type, value, placeholder, options }, idx) => (
                                            <InputForm
                                                key={idx}
                                                onChange={onChange}
                                                name={name}
                                                type={type}
                                                value={value}
                                                label={placeholder}
                                                placeholder= {placeholder}
                                                options={options}
                                            />
                                        )
                                    )}
                                </div>
                            </section>

                            <section className="rounded-xl border bg-gray-50 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center justify-center w-6 h-6 text-[11px] font-semibold rounded-full border border-emerald-500 text-emerald-600">02</span>
                                    <h4 className="text-sm font-semibold text-gray-700">Insurer #02</h4>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {Object.values(form3bInputList).map(
                                        ({ onChange, name, type, value, placeholder, options }, idx) => (
                                            <InputForm
                                                key={idx}
                                                onChange={onChange}
                                                name={name}
                                                type={type}
                                                value={value}
                                                label={placeholder}
                                                placeholder= {placeholder}
                                                options={options}
                                            />
                                        )
                                    )}
                                </div>
                            </section>

                            <section className="rounded-xl border bg-gray-50 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center justify-center w-6 h-6 text-[11px] font-semibold rounded-full border border-emerald-500 text-emerald-600">03</span>
                                    <h4 className="text-sm font-semibold text-gray-700">Insurer #03</h4>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {Object.values(form3cInputList).map(
                                        ({ onChange, name, type, value, placeholder, options }, idx) => (
                                            <InputForm
                                                key={idx}
                                                onChange={onChange}
                                                name={name}
                                                type={type}
                                                value={value}
                                                label={placeholder}
                                                placeholder= {placeholder}
                                                options={options}
                                            />
                                        )
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </Box>

                <div className="col-span-full">
                    <div className="w-full rounded-2xl border shadow-sm bg-white/80 backdrop-blur p-6 flex justify-center">
                        <div className="flex flex-row gap-4">
                            <ColorButtons color="green" text="Confirm Input" func={handleConfirm} />
                            <ColorButtons color="red" text="Reset Input" func={handleCloseConfirm} />
                            <ColorButtons color="blue" text="Open Preview" func={openDrawer} />
                        </div>
                    </div>
                </div>
            </div>








            </Box>

                    {showConfirm ? (
                    <ConfirmedInfo
                        form1={form1}
                        form2={form2}
                        form3a={form3a}
                        form3b={form3b}
                        form3c={form3c}
                    />
                ) : (
                    <p className="mt-4 text-gray-600">Create Footer here.</p>
                )}


            <Drawer
                variant="persistent"
                anchor="right"
                open={openPreview}
                PaperProps={{ sx: { width: { xs: '90vw', sm: 420 } } }}
            >
                <PreviewPanel />
            </Drawer>

        </>
    );
};

export default App;
