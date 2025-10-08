import { useState} from 'react'
import { InputForm } from './components/InputForm'

import ColorButtons from './components/ColorButtons.jsx';
import Form2InputList from './components/Form2InputList.jsx'
import Form1InputList from './components/Form1InputList.jsx';
import Form3InputInsurer1 from './components/Form3InputInsurer1.jsx';
import Form3InputInsurer2 from './components/Form3InputInsurer2.jsx';
import Form3InputInsurer3 from './components/Form3InputInsurer3.jsx';
import Box from '@mui/material/Box';
import { useContext } from "react";
import { FormContext } from "./providers/FormProvider";
import Drawer from "@mui/material/Drawer";


import ConfirmationComponent from "./components/ConfirmationComponent.jsx";
import PreviewPanel from "./components/PreviewPanel.jsx";
import {Navigate} from "react-router";
import {useAuth} from "./providers/AuthServiceProvider.jsx";



const App = () => {

    const { form1, setForm1, form2, setForm2, form3a, setForm3a, form3b, setForm3b, form3c, setForm3c } = useContext(FormContext);
    const [showConfirm, setShowConfirm] = useState(false)
    const [openPreview, setOpenPreview] = useState(false);



    const openDrawer = () => setOpenPreview(true);

    const { isLoggedIn, user } = useAuth();


    if (!isLoggedIn) {
        console.log(isLoggedIn)
        console.log(user)
        return <Navigate to="/login" replace />;
   }



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


    //List Form1 data
    const form1InputList = Form1InputList({updateForm1, form1})
    const form2InputList= Form2InputList({ updateForm2, form2 })
    const form3aInputList = Form3InputInsurer1({ updateForm3a, form3a });
    const form3bInputList = Form3InputInsurer2({ updateForm3b, form3b });
    const form3cInputList = Form3InputInsurer3({ updateForm3c, form3c });

    return (
        <>
            <Box className="min-h-screen grid place-items-center bg-gray-200 dark:bg-gray-900">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] w-full max-w-7xl gap-4">

                    {/* LEFT COLUMN */}
                    <Box
                        sx={{ justifyContent: "flex-end", alignItems: "flex-start", p: 1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4"
                    >
                        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3 p-2">SL2 Form</h3>

                        {/* Form 1 */}
                        <div>
                            <div className="rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4">
                                <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">Form 1</h3>
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
                                                placeholder={placeholder}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 dark:bg-gray-600 my-5" />

                        {/* Form 2 */}
                        <div>
                            <div className="rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4">
                                <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">Form 2</h3>
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
                                                placeholder={placeholder}
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
                        className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800"
                    >
                        {/* FORM 3 – Inputs */}
                        <div className="w-full p-4">
                            <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">Insurers</h3>

                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-3">
                                <section className="rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-flex items-center justify-center w-6 h-6 text-[11px] font-semibold rounded-full border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-gray-800">01</span>
                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Insurer #01</h4>
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
                                                    placeholder={placeholder}
                                                    options={options}
                                                />
                                            )
                                        )}
                                    </div>
                                </section>

                                <section className="rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-flex items-center justify-center w-6 h-6 text-[11px] font-semibold rounded-full border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-gray-800">02</span>
                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Insurer #02</h4>
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
                                                    placeholder={placeholder}
                                                    options={options}
                                                />
                                            )
                                        )}
                                    </div>
                                </section>

                                <section className="rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-flex items-center justify-center w-6 h-6 text-[11px] font-semibold rounded-full border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-gray-800">03</span>
                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Insurer #03</h4>
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
                                                    placeholder={placeholder}
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
                        <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur p-6 flex justify-center">
                            <div className="flex flex-row gap-4">
                                <ColorButtons color="green" text="Confirm Input" func={handleConfirm} />
                                <ColorButtons color="red" text="Reset Input" func={handleCloseConfirm} />
                                <ColorButtons color="blue" text="Open Preview" func={openDrawer} />
                            </div>
                        </div>
                    </div>
                </div>
            </Box>

            {showConfirm && (
                <ConfirmationComponent
                    form1={form1}
                    form2={form2}
                    form3a={form3a}
                    form3b={form3b}
                    form3c={form3c}
                    onCloseConfirm={() => setShowConfirm(false)}
                />
            )}

            <Drawer
                variant="persistent"
                anchor="right"
                open={openPreview}
                PaperProps={{
                    className: "bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700"
                }}
            >
                <PreviewPanel
                    form1={form1}
                    form2={form2}
                    form3a={form3a}
                    form3b={form3b}
                    form3c={form3c}
                    closeDrawer={() => setOpenPreview(false)}
                    handleConfirm={() => setShowConfirm(true)}
                    handleCloseConfirm={() => {handleCloseConfirm()}}
                />
            </Drawer>
        </>
    );
};

export default App;
