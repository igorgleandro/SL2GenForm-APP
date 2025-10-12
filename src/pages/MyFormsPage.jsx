import * as React from "react";
import GetForms from "../logic/GetForms.jsx";
import GetFormTwo from "../logic/GetFormTwo.jsx";

export const MyFormsPage = () => {
    return (
        <>
            <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
                <GetFormTwo />
            </div>
        </>
    );
};