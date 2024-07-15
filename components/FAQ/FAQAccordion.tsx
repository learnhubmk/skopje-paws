import React from 'react'
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ['cyrillic'], weight: ['400', '500', '700'] });

export default function FAQAccordion({ question, answer, isActive }) {
  return (
    <div className="space-y-4 mx-auto flex size-full">
      <div className={`border-2 border-orange p-5 flex justify-between ${isActive ? 'rounded-3xl bg-orange flex-col' : 'rounded-full size-full'}`} >
        <h2 className={`font-medium text-xl size-full flex items-center justify-between ${isActive ? 'text-black' : 'text-orange'} ${montserrat.className}`}>
          {question}
          <svg className={`transition-all duration-300 ${isActive ? 'rotate-180' : 'fill-orange'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" /></svg>
        </h2>

        <p className={`transition-all duration-300 mt-4 font-medium text-xl rounded-3xl ${isActive ? 'h-auto' : 'h-0'} ${montserrat.className}`}>
          {isActive && answer}
        </p>
      </div>
    </div >
  )
};

