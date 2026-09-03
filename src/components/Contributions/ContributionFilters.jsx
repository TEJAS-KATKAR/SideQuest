import React from 'react'
import {ChevronDown, Filter, Info} from 'lucide-react'

const ContributionFilters = ({filters, setFilters}) => {

  const toggleFilter = (name) => {
    setFilters({...filters, [name]: filters[name] === 'All' ? 'Selected' : 'All'})
  }

  return (
    <div className="flex items-center gap-3 w-full px-3 py-3 bg-white border border-gray-200 rounded-lg overflow-x-auto">

      <button onClick={() => toggleFilter('language')} className={`flex items-center gap-2 px-3 py-2 border rounded-md text-xs font-medium whitespace-nowrap transition ${filters.language !== 'All' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}>
        Language
        <ChevronDown size={14}/>
      </button>

      <button onClick={() => toggleFilter('difficulty')} className={`flex items-center gap-2 px-3 py-2 border rounded-md text-xs font-medium whitespace-nowrap transition ${filters.difficulty !== 'All' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}>
        Difficulty
        <ChevronDown size={14}/>
      </button>

      <button onClick={() => toggleFilter('labels')} className={`flex items-center gap-2 px-3 py-2 border rounded-md text-xs font-medium whitespace-nowrap transition ${filters.labels !== 'All' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}>
        Labels
        <ChevronDown size={14}/>
      </button>

      <button onClick={() => toggleFilter('type')} className={`flex items-center gap-2 px-3 py-2 border rounded-md text-xs font-medium whitespace-nowrap transition ${filters.type !== 'All' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}>
        Issue type
        <ChevronDown size={14}/>
      </button>

      <button onClick={() => toggleFilter('activity')} className={`flex items-center gap-2 px-3 py-2 border rounded-md text-xs font-medium whitespace-nowrap transition ${filters.activity !== 'All' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}>
        Repository activity
        <ChevronDown size={14}/>
      </button>

      <button onClick={() => setFilters({...filters, beginner: !filters.beginner})} className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition ${filters.beginner ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}>
        <span className={`w-4 h-4 rounded flex items-center justify-center border ${filters.beginner ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300'}`}>
          {filters.beginner && '✓'}
        </span>
        Good first issue
        <Info size={13} className="text-gray-400"/>
      </button>

      <button onClick={() => setFilters({language: 'All', difficulty: 'All', labels: 'All', type: 'All', activity: 'All', beginner: true})} className="flex items-center gap-1 px-2 text-xs text-indigo-600 font-medium whitespace-nowrap hover:text-indigo-800 transition">
        <Filter size={13}/>
        Reset
      </button>

    </div>
  )
}

export default ContributionFilters