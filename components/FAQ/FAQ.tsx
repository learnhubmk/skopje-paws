'use client'

import LinkButton from "@/LinkButton"
import React, { useState } from 'react'
import FAQAccordion from "./FAQAccordion"
import data from "./FAQ.json"


export default function FAQ() {
  const [activeId, setActiveId] = useState(null)

  return (
    <div className="grid lg:grid-cols-2 gap-10 p-10 w-4/5 m-auto sm:grid-cols-1">
      <div className="flex flex-col justify-between items-start gap-5">
        <h2 className='text-5xl font-bold'>Често поставувани
          прашања</h2>
        <p className='font-medium text-xl'>Погледнете дали вашето прашање се наоѓа во овие прашања и договори. Доколку не се наоѓа, слобдно контактирајте не преку копчето подолу.</p>
        <LinkButton type={'link'} url={''} text={'Поставете прашање'} bgColor={'bg-orange'} textColor={'text-black'}></LinkButton>
      </div>
      <div className="flex flex-col justify-between items-start gap-5 size-full">
        {data.faq.map(({ id, question, answer }) =>
          <div className="flex grow size-full items-center justify-between" onClick={() => {
            if (activeId === id) {
              setActiveId(null)
            } else {
              setActiveId(id)
            }
          }} key={id}>
            <FAQAccordion answer={answer} question={question} isActive={activeId === id} />
          </div>
        )}
      </div>
    </div>
  )
};
