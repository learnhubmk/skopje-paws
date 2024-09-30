import React from "react"

export default function FAQAccordion({ question, answer, isActive }) {
  return (
    <div className="space-y-4 mx-auto w-full">
      <div className={`border-2 border-orange p-5 ${isActive ? "rounded-3xl bg-orange" : "rounded-full"}`}>
        <div className={`flex justify-between items-center ${isActive ? "mb-4" : ""}`}>
          <h2 className={`font-montserrat font-medium text-xl pr-2 ${isActive ? "text-black" : "text-orange"}`}>
            {question}
          </h2>
          <svg
            className={`transition-all duration-300 flex-shrink-0 ${isActive ? "rotate-180" : "fill-orange"}`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
          </svg>
        </div>

        {isActive && (
          <p className="transition-all duration-300 font-montserrat font-medium text-xl">
            {answer}
          </p>
        )}
      </div>
    </div>
  )
};

