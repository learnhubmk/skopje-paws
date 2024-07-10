import LinkButton from "@/LinkButton"
import React from 'react'
import FAQAccordion from "./FAQAccordion"
import data from "./FAQ.json"


export default function FAQ() {
  return (
    <div className="grid grid-cols-2 gap-10 p-10 w-4/5 m-auto">
      <div className="flex flex-col justify-between items-start gap-5">
        <h2 className='text-5xl font-bold'>Често поставувани
          прашања</h2>
        <p className='font-medium text-xl'>Погледнете дали вашето прашање се наоѓа во овие прашања и договори. Доколку не се наоѓа, слобдно контактирајте не преку копчето подолу.</p>
        <LinkButton type={'link'} url={''} text={'Поставете прашање'} bgColor={'bg-orange'} textColor={'text-black'}></LinkButton>
      </div>
      <div className="flex flex-col justify-between items-start gap-5 size-full">
        {data.faq.map(({ id, question, answer }) => <FAQAccordion key={id} answer={answer} question={question} />)}
      </div>
    </div>
  )
};
