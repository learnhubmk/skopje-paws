"use client"

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";

interface RecaptchaProviderProps {
    children: React.ReactNode;
}

const RecaptchaProvider: React.FC<RecaptchaProviderProps> = ({ children }) => {
    const recaptchaKey: string | undefined = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
            {children}
        </GoogleReCaptchaProvider>
    );
};

export default RecaptchaProvider;
