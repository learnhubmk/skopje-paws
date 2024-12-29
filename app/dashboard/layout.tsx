import DashboardHeader from "@/DashboardHeader";
import React, {Suspense} from "react";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return <div className="flex flex-col w-screen justify-center items-center py-12 px-4 lg:px-12 gap-4 text-charcoal">
        <DashboardHeader/>
        <Suspense>{children}</Suspense>
    </div>
}