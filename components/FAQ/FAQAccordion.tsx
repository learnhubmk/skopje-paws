import LinkButton from '@/LinkButton'
import React from 'react'
import FAQ from './FAQ.json'


export default function FAQAccordion() {
  return (
    <div className="grid grid-cols-2 gap-10 p-10 w-4/5 m-auto">

      <div className="flex flex-col justify-between items-start gap-5">
        <h2 className='text-5xl font-bold'>Често поставувани
          прашања</h2>
        <p className='font-medium text-xl'>Погледнете дали вашето прашање се наоѓа во овие прашања и договори. Доколку не се наоѓа, слобдно контактирајте не преку копчето подолу.</p>
        <LinkButton type={'link'} url={''} text={'Поставете прашање'} bgColor={'bg-orange'} textColor={'text-black'}></LinkButton>
      </div>
      {/* accordions */}
      <div className="space-y-4">
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 border-2 border-orange rounded-full">
            <h2 className='font-medium text-xl text-orange'>Како да закажам прошетка?</h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          <p className="mt-4 p-5 leading-relaxed font-medium text-xl border-2 border-orange rounded-3xl bg-orange">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
            recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 border-2 border-orange rounded-full">
            <h2 className="font-medium text-xl text-orange">Како оди процесот на запознавање?</h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          <p className="mt-4 p-5 leading-relaxed font-medium text-xl border-2 border-orange rounded-3xl bg-orange">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
            recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 font-medium text-xl border-2 border-orange rounded-full">
            <h2 className="font-medium text-xl text-orange">Од што зависи цената на прошетката?</h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          <p className="mt-4 p-5 leading-relaxed font-medium text-xl border-2 border-orange rounded-3xl bg-orange">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
            recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>
      </div>

    </div>
  )
};

