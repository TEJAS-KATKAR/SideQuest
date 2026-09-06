import React from 'react'
import {Check, Filter, Search} from 'lucide-react'

const ContributionFilters = ({filters, setFilters}) => {

  const toggleBeginner = () => {
    setFilters({
      ...filters,
      beginner: !filters.beginner
    })
  }

  const resetFilters = () => {
    setFilters({
      language: [],
      technology: [],
      difficulty: 'All',
      labels: [],
      type: [],
      activity: 'All',
      assignment: 'All',
      issueAge: 'All',
      discussion: 'All',
      beginner: false
    })
  }

  return (
    <div className="flex items-center w-full gap-3 px-3 py-3 overflow-x-auto bg-white border border-gray-200 rounded-lg">

      <button className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 whitespace-nowrap rounded-md hover:bg-blue-50 hover:text-blue-700 transition">
        <Filter size={15}/>
        Filters
      </button>

      <button
        onClick={toggleBeginner}
        className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium whitespace-nowrap rounded-md transition ${
          filters.beginner
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
        }`}
      >
        <span className={`flex items-center justify-center size-4 rounded border ${
          filters.beginner
            ? 'bg-blue-500 border-blue-500 text-white'
            : 'border-gray-300'
        }`}>
          {filters.beginner && <Check size={11}/>}
        </span>

        Good first issue
      </button>

      <button
        onClick={resetFilters}
        title="Reset filters"
        aria-label="Reset filters"
        className="flex items-center justify-center size-9 shrink-0 text-gray-500 rounded-md hover:text-blue-600 hover:bg-blue-50 transition"
      >
        <Search size={15} className="rotate-45"/>
      </button>

    </div>
  )
}

export default ContributionFilters