'use client'

import React, { useState } from 'react'
import FAQAccordion from "./FAQAccordion"
import data from "./FAQ.json"

export default function FAQ() {
  const [activeId, setActiveId] = useState(null)

  const renderFaqAccordion = ({ id, question, answer }) => {
    return (
      <div className="flex grow size-full items-center justify-between" onClick={() => {
        if (activeId === id) {
          setActiveId(null)
        } else {
          setActiveId(id)
        }
      }} key={id}>
        <FAQAccordion answer={answer} question={question} isActive={activeId === id} />
      </div>
    )
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 p-10 w-4/5 m-auto sm:grid-cols-1">
      <div className="flex flex-col items-start gap-5">
        <h2 className='lg:text-4xl sm:text-2xl font-bold font-montserrat'>Често поставувани
          прашања</h2>
        <p className='font-medium text-xl font-montserrat'>Погледнете дали вашето прашање се наоѓа во овие прашања и договори. Доколку не се наоѓа, слобдно контактирајте не преку копчето подолу.</p>
        <a href="#" className="font-montserrat text-black bg-orange font-medium rounded-lg text-base px-5 py-2.5 focus:outline-none">Поставете Прашање</a>
      </div>
      <div className="flex flex-col justify-between items-center gap-5 size-full">
        {data.faq.map(renderFaqAccordion)}
      </div>
    </div>
  )
};
