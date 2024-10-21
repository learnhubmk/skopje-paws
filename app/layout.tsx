import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";
import '../components/Calendar/Calendar.css';
import React, { Suspense } from "react";
import Navigation from "../components/Navigation";
import Footer from "@/Footer";


const montserrat = Montserrat({
    subsets: ['cyrillic'],
    variable: '--font-montserrat',
    weight: ['400', '500', '700']
});
const montserratAlternates = Montserrat_Alternates({
    subsets: ['cyrillic'],
    variable: '--font-montserrat-alternates',
    weight: ['400', '500', '700']
});

export const metadata: Metadata = {
    title: "Skopje Paws",
    description: "The first personal dog walking services. Not just professionals, but animal lovers too.",
    icons: {
        icon: '/favicon.jpg',
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
                className={`${montserrat.className} flex flex-col justify-between items-center h-full w-full bg-white text-white`}>
                <Navigation />
                <main>
                    <Suspense>{children}</Suspense>
                </main>
                <Footer />
            </body>
        </html>
    );
}
