import React, {useEffect, useState} from 'react'
import {ChevronDown} from 'lucide-react'

const FAQItem = ({item, open, onToggle}) => {
  const [highlighted, setHighlighted] = useState(false)

  useEffect(() => {
    if (window.location.hash.slice(1) !== item.id) return

    setHighlighted(true)

    const timer = setTimeout(() => {
      setHighlighted(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [item.id])

  return (
    <div
      id={item.id}
      className={`overflow-hidden border rounded-xl transition-all duration-300 ${
        open
          ? 'border-indigo-200 bg-indigo-50/30'
          : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50/70'
      } ${highlighted ? 'ring-2 ring-indigo-200' : ''}`}
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full gap-4 px-5 py-4 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className={`text-[15px] font-semibold transition-colors ${
          open ? 'text-indigo-700' : 'text-gray-800'
        }`}>
          {item.question}
        </span>

        <span className={`flex items-center justify-center size-7 shrink-0 rounded-lg transition-all duration-300 ${
          open
            ? 'bg-indigo-100 text-indigo-600'
            : 'bg-gray-100 text-gray-500'
        }`}>
          <ChevronDown className={`size-4 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`} />
        </span>
      </button>

      <div className={`grid transition-[grid-template-rows] duration-300 ${
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5">
            <div className="pt-1 border-t border-indigo-100">
              <p className="pt-4 text-[15px] leading-6 text-gray-600">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQItem