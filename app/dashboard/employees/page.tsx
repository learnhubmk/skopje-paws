"use client";

import {useState} from "react";
import EmployeeTable from "@/Employees/EmployeeTable";
import EmployeeModal from "@/Employees/EmployeeModal";

export default function EmployeesDashboard() {
    const [showEmployeesModal, setShowEmployeesModal] = useState(false);


    return (
        <>
            <div className="flex flex-col-reverse sm:flex-row w-full justify-between gap-2">
                <button onClick={() => setShowEmployeesModal(true)}
                        className="text-xl px-3 py-1 border-2 border-black rounded-lg">
                    + Додади вработен
                </button>
            </div>
            {showEmployeesModal && <EmployeeModal/>}
            <EmployeeTable/>
        </>
    );
}