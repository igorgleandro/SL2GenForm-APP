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

const router = createBrowserRouter([
    {
        path: "/",
        Component: DefaultLayout,       // your layout shell
        errorElement: <ErrorPage />,    // OK as an element
        children: [
            { index: true, Component: App },           // <- default (landing) route
            { path: "about", Component: AboutPage },
            { path: "contact", Component: ContactPage },
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
