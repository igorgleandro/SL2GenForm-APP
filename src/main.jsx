import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {FormProvider} from "./providers/FormProvider.jsx";
import { BrowserRouter } from "react-router";
import DefaultLayout from './components/DefaultLayout';
import { createBrowserRouter, RouterProvider,} from "react-router";
import ErrorPage from "./pages/ErrorPage.jsx";
import {AboutPage} from "./pages/AboutPage.jsx";
import {ContactPage} from "./pages/ContactPage.jsx";
import {MyFormsPage} from "./pages/MyFormsPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: DefaultLayout,
        errorElement: <ErrorPage />,
        children: [
            { index: true, Component: App },
            { path: "about", Component: AboutPage },
            { path: "contact", Component: ContactPage },
            { path: "myforms", Component: MyFormsPage },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <FormProvider>
            <RouterProvider router={router} />
        </FormProvider>
    </StrictMode>
);
