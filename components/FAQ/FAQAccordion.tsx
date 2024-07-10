import React from 'react'


export default function FAQAccordion({ question, answer }) {
  return (
    < div className="space-y-4 mx-auto size-full">
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 border-2 border-orange rounded-full">
          <h2 className='font-medium text-xl text-orange'>{question}</h2>

          <svg
            className="size-5 shrink-0 transition duration-300 group-open:-rotate-180 path-orange"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="orange"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <p className="mt-4 p-5 leading-relaxed font-medium text-xl border-2 border-orange rounded-3xl bg-orange">
          {answer}
        </p>
      </details>

    </div >
  )
};

