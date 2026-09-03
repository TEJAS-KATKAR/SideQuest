import React from 'react'
import {Check, ChevronDown, Filter, RotateCcw} from 'lucide-react'

const ContributionSidebar = ({filters, setFilters}) => {

  const difficulties = ['Beginner', 'Easy', 'Medium', 'Hard']
  const issueTypes = ['Bug fix', 'Feature', 'Documentation', 'Testing', 'Refactor', 'Other']

  const resetFilters = () => {
    setFilters({
      language: 'All',
      difficulty: 'All',
      labels: 'All',
      type: 'All',
      activity: 'All',
      beginner: true
    })
  }

  return (
    <aside className="w-72 shrink-0">

      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-indigo-600"/>
            <p className="text-sm font-semibold">Filter opportunities</p>
          </div>

          <button onClick={resetFilters} className="text-xs text-indigo-600 font-medium hover:text-indigo-800 transition">
            Reset
          </button>
        </div>

        <div className="h-px bg-gray-100 my-4"></div>

        <p className="text-xs font-semibold text-gray-800 mb-2">Language / Technology</p>

        <button onClick={() => setFilters({...filters, language: filters.language === 'JavaScript' ? 'All' : 'JavaScript'})} className={`w-full flex items-center justify-between px-3 py-2.5 border rounded-lg text-xs transition ${filters.language !== 'All' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}>
          {filters.language === 'All' ? 'Search languages...' : filters.language}
          <ChevronDown size={14}/>
        </button>

        <div className="flex flex-wrap gap-2 mt-3">
          {['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C++', 'CSS'].map((language) => (
            <button key={language} onClick={() => setFilters({...filters, language: filters.language === language ? 'All' : language})} className={`px-2 py-1 rounded-md text-[10px] transition ${filters.language === language ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}>
              {language}
            </button>
          ))}
        </div>

        <div className="h-px bg-gray-100 my-4"></div>

        <p className="text-xs font-semibold text-gray-800 mb-2">Difficulty</p>

        <div className="grid grid-cols-4 gap-2">
          {difficulties.map((difficulty) => (
            <button key={difficulty} onClick={() => setFilters({...filters, difficulty: filters.difficulty === difficulty ? 'All' : difficulty})} className={`py-2 rounded-md text-[10px] font-medium transition ${filters.difficulty === difficulty ? 'ring-2 ring-indigo-200 ' : ''} ${difficulty === 'Beginner' ? 'bg-green-50 text-green-600 hover:bg-green-100' : difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : difficulty === 'Medium' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
              {difficulty}
            </button>
          ))}
        </div>

        <div className="h-px bg-gray-100 my-4"></div>

        <p className="text-xs font-semibold text-gray-800 mb-2">Issue Labels</p>

        <button onClick={() => setFilters({...filters, labels: filters.labels === 'documentation' ? 'All' : 'documentation'})} className={`w-full flex items-center justify-between px-3 py-2.5 border rounded-lg text-xs transition ${filters.labels !== 'All' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}>
          {filters.labels === 'All' ? 'Search labels...' : filters.labels}
          <ChevronDown size={14}/>
        </button>

        <div className="flex flex-wrap gap-2 mt-3">
          {['good first issue', 'help wanted', 'bug', 'documentation', 'enhancement'].map((label) => (
            <button key={label} onClick={() => setFilters({...filters, labels: filters.labels === label ? 'All' : label})} className={`px-2 py-1 rounded-md text-[10px] transition ${filters.labels === label ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="h-px bg-gray-100 my-4"></div>

        <p className="text-xs font-semibold text-gray-800 mb-2">Issue Type</p>

        <div className="flex flex-col gap-2">
          {issueTypes.map((type) => (
            <button key={type} onClick={() => setFilters({...filters, type: filters.type === type ? 'All' : type})} className="flex items-center gap-2 text-left text-xs text-gray-600 hover:text-indigo-600 transition">
              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${filters.type === type ? 'border-indigo-600' : 'border-gray-300'}`}>
                {filters.type === type && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
              </span>
              {type}
            </button>
          ))}
        </div>

        <div className="h-px bg-gray-100 my-4"></div>

        <p className="text-xs font-semibold text-gray-800 mb-2">Repository Activity</p>

        <button onClick={() => setFilters({...filters, activity: filters.activity === 'Very active' ? 'All' : 'Very active'})} className={`w-full flex items-center justify-between px-3 py-2.5 border rounded-lg text-xs transition ${filters.activity !== 'All' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}>
          {filters.activity === 'All' ? 'Any activity' : filters.activity}
          <ChevronDown size={14}/>
        </button>

        <button onClick={() => setFilters({...filters, beginner: !filters.beginner})} className="flex items-center gap-2 mt-5 text-xs font-medium text-gray-700 hover:text-indigo-600 transition">
          <span className={`w-4 h-4 rounded flex items-center justify-center border ${filters.beginner ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300'}`}>
            {filters.beginner && <Check size={11}/>}
          </span>
          Show only good first issues
        </button>

        <button onClick={resetFilters} className="w-full flex items-center justify-center gap-2 mt-5 pt-4 border-t border-gray-100 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition">
          <RotateCcw size={13}/>
          Reset all filters
        </button>

      </div>
    </aside>
  )
}

export default ContributionSidebar