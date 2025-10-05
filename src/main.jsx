import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {FormProvider} from "./providers/FormProvider.jsx";
import DefaultLayout from './components/DefaultLayout';
import { createBrowserRouter, RouterProvider,} from "react-router";
import ErrorPage from "./pages/ErrorPage.jsx";
import {AboutPage} from "./pages/AboutPage.jsx";
import {ContactPage} from "./pages/ContactPage.jsx";
import {MyFormsPage} from "./pages/MyFormsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {AuthProvider} from "./providers/AuthServiceProvider.jsx";
import SignupPage from "./pages/SignupPage.jsx";


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
            { path: "login", Component: LoginPage },
            { path: "profile", Component: LoginPage },
            { path: "signup", Component: SignupPage },


        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <FormProvider>
                    <RouterProvider router={router} />
            </FormProvider>
        </AuthProvider>
    </StrictMode>
);
