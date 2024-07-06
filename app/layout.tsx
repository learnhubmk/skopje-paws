"use client"

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React, { Suspense } from "react";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "@/Footer";

const montserrat = Montserrat_Alternates({ subsets: ['cyrillic'], weight: ['400', '500', '700'] });

const RecaptchaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const recaptchaKey: string | undefined = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
            {children}
        </GoogleReCaptchaProvider>
    );
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${montserrat.className} h-full w-full bg-white text-white`}>
                <RecaptchaProvider>
                    <Navigation />
                    <main>
                        <Suspense>
                            {children}
                        </Suspense>
                    </main>
                    <Footer />
                </RecaptchaProvider>
            </body>
        </html>
    );
}
