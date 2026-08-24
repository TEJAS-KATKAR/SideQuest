import React, {useState} from 'react'
import {ChevronDown, Info, SlidersHorizontal, X} from 'lucide-react'

const ExploreFilters = () => {
  const [filters, setFilters] = useState({
    language: '',
    topics: '',
    stars: '',
    license: '',
    activity: ''
  })


  
  const [beginner, setBeginner] = useState(false)

  const [openFilter, setOpenFilter] = useState(null)

  const filterOptions = {
    language: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
    topics: ['React', 'Web Development', 'AI', 'Machine Learning', 'Backend'],
    stars: ['100+', '1k+', '10k+', '50k+'],
    license: ['MIT', 'Apache-2.0', 'GPL-3.0'],
    activity: ['Recently updated', 'Active', 'Very active']
  }

  const filterLabels = {
    language: 'Language',
    topics: 'Topics',
    stars: 'Stars',
    license: 'License',
    activity: 'Activity'
  }

  const selectFilter = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }))
    setOpenFilter(null)
  }

  const clearFilters = () => {
    setFilters({
      language: '',
      topics: '',
      stars: '',
      license: '',
      activity: ''
    })
    setBeginner(false)
  }

  const activeFilters = Object.values(filters).filter(Boolean).length + (beginner ? 1 : 0)

  return (
    <div className="mt-6">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-gray-700 size-5" />
          <h2 className="font-semibold text-gray-800">Filters</h2>

          {activeFilters > 0 && (
            <span className="flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-indigo-600 rounded-full">
              {activeFilters}
            </span>
          )}
        </div>

        {activeFilters > 0 && (
          <button onClick={clearFilters} className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800">
            <X className="size-4" />
            Clear all
          </button>
        )}

      </div>

      <div className="flex flex-wrap items-center gap-3 mt-3">

        {Object.keys(filterLabels).map((filter) => (

          <div key={filter} className="relative">

            <button
              onClick={() => setOpenFilter(openFilter === filter ? null : filter)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium bg-white border rounded-lg transition ${
                filters[filter]
                  ? 'border-indigo-400 text-indigo-600 bg-indigo-50'
                  : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50'
              }`}
            >
              <span>{filters[filter] || filterLabels[filter]}</span>
              <ChevronDown className={`size-4 transition ${openFilter === filter ? 'rotate-180' : ''}`} />
            </button>

            {openFilter === filter && (
              <div className="absolute left-0 z-30 w-52 p-2 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">

                {filterOptions[filter].map((option) => (

                  <button
                    key={option}
                    onClick={() => selectFilter(filter, option)}
                    className="flex w-full px-3 py-2.5 text-sm text-left text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    {option}
                  </button>

                ))}

              </div>
            )}

          </div>

        ))}

        <label className="flex items-center gap-2 px-2 text-sm text-gray-700 cursor-pointer">

          <input
            type="checkbox"
            checked={beginner}
            onChange={(e) => setBeginner(e.target.checked)}
            className="w-4 h-4 accent-indigo-600"
          />

          <span>Good for beginners</span>

          <Info className="text-gray-400 size-4" />

        </label>

      </div>

    </div>
  )
}

export default ExploreFilters