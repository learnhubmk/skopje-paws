import LinkButton from '@/LinkButton'
import React from 'react'


export default function FAQAccordion() {
  return (
    <div className="grid grid-cols-2 gap-10 p-10 w-4/5" style={{ margin: '0 auto' }}>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'start', gap: '20px' }}>
        <h2 className='text-5xl font-bold'>Често поставувани
          прашања</h2>
        <p className='font-medium text-xl'>Погледнете дали вашето прашање се наоѓа во овие прашања и договори. Доколку не се наоѓа, слобдно контактирајте не преку копчето подолу.</p>
        <LinkButton type={'link'} url={''} text={'Поставете прашање'} bgColor={'bg-orange'} textColor={'text-black'}></LinkButton>
      </div>
      {/* accordions */}
      <div className="space-y-4">
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-black-900" style={{ border: '1px solid #FFAC66', borderRadius: '56px' }}
          >
            <h2 className='font-medium text-xl'>Како да закажам прошетка?</h2>

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

          <p className="mt-4 p-5 leading-relaxed font-medium text-xl" style={{ border: '1px solid #FFAC66', borderRadius: '25px', background: '#FFAC66' }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
            recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-black-900" style={{ border: '1px solid #FFAC66', borderRadius: '56px' }}>
            <h2 className="font-medium text-xl">Како оди процесот на запознавање?</h2>

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

          <p className="mt-4 p-5 leading-relaxed font-medium text-xl" style={{ border: '1px solid #FFAC66', borderRadius: '25px', background: '#FFAC66' }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
            recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 font-medium text-xl" style={{ border: '1px solid #FFAC66', borderRadius: '56px' }}
          >
            <h2 className="font-medium text-xl">Од што зависи цената на прошетката?</h2>

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

          <p className="mt-4 p-5 leading-relaxed font-medium text-xl" style={{ border: '1px solid #FFAC66', borderRadius: '25px', background: '#FFAC66' }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
            recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>
      </div>

    </div>
  )
};

