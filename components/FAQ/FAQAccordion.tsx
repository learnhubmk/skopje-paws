import { Montserrat } from 'next/font/google'
import React from 'react'

export default function FAQAccordion({ question, answer, isActive }) {
  return (
    <div className="space-y-4 mx-auto flex size-full items-center">
      <div className={`border-2 border-orange p-5 flex justify-between items-center ${isActive ? 'rounded-3xl bg-orange flex-col' : 'rounded-full size-full'}`} >
        <h2 className={`font-montserrat font-medium text-xl size-full flex items-center  justify-between ${isActive ? 'text-black' : 'text-orange'} `}>
          {question}
          <svg className={`transition-all duration-300 ${isActive ? 'rotate-180' : 'fill-orange'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" /></svg>
        </h2>

        <p className={`transition-all duration-300 mt-4 font-montserrat font-medium text-xl rounded-3xl ${isActive ? 'h-auto' : 'h-0'}`}>
          {isActive && answer}
        </p>
      </div>
    </div >
  )
};

