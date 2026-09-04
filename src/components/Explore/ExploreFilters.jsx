import React, {useState} from 'react'
import {
  ChevronDown,
  Info,
  SlidersHorizontal,
  X
} from 'lucide-react'

const ExploreFilters = ({
  filters,
  setFilters,
  metricSort,
  sortOrder,
  setMetricSort
}) => {
  const [openFilter, setOpenFilter] = useState(null)

  const multiSelectOptions = {
    language: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C++',
      'C',
      'C#',
      'Go',
      'Rust',
      'PHP',
      'Ruby',
      'Swift',
      'Kotlin',
      'Dart',
      'HTML',
      'CSS',
      'Shell'
    ],

    topics: [
      'React',
      'Next.js',
      'Vue',
      'Angular',
      'Node.js',
      'Frontend',
      'Backend',
      'Web Development',
      'AI',
      'Machine Learning',
      'LLM',
      'Open Source',
      'DevTools',
      'CLI',
      'API',
      'Database',
      'Docker',
      'DevOps',
      'Cybersecurity',
      'Mobile',
      'Game Development',
      'Tailwind CSS',
      'Testing',
      'Education'
    ]
  }

  const singleSelectOptions = {
    license: [
      'Any',
      'MIT',
      'Apache-2.0',
      'GPL-3.0',
      'BSD-3-Clause',
      'MPL-2.0'
    ],

    activity: [
      'Any',
      'Recently updated',
      'Active',
      'Very active',
      'No recent activity',
      'Archived'
    ]
  }

  const metricOptions = {
    stars: [
      ['Any', ''],
      ['10+', '10'],
      ['100+', '100'],
      ['1k+', '1000'],
      ['10k+', '10000'],
      ['50k+', '50000'],
      ['100k+', '100000']
    ],

    forks: [
      ['Any', ''],
      ['10+', '10'],
      ['100+', '100'],
      ['1k+', '1000'],
      ['10k+', '10000']
    ],

    watchers: [
      ['Any', ''],
      ['10+', '10'],
      ['100+', '100'],
      ['1k+', '1000'],
      ['10k+', '10000']
    ]
  }

  const filterLabels = {
    language: 'Language',
    topics: 'Topics',
    stars: 'Stars',
    forks: 'Forks',
    watchers: 'Watchers',
    license: 'License',
    activity: 'Activity'
  }

  const toggleMultiFilter = (filter, value) => {
    const currentValues = filters[filter] || []

    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value]

    setFilters({
      ...filters,
      [filter]: newValues
    })
  }

  const selectSingleFilter = (filter, value) => {
    setFilters({
      ...filters,
      [filter]: value === 'Any' ? '' : value
    })
  }

  const selectMetric = (metric, value) => {
    setFilters({
      ...filters,
      [metric]: value
    })
  }

  const clearFilter = (filter) => {
    const newFilters = {
      ...filters,
      [filter]: Array.isArray(filters[filter]) ? [] : ''
    }

    setFilters(newFilters)
  }

  const clearFilters = () => {
    setFilters({
      language: [],
      topics: [],
      stars: '',
      forks: '',
      watchers: '',
      license: '',
      activity: '',
      beginner: false
    })

    setMetricSort('', '')
    setOpenFilter(null)
  }

  const getFilterText = (filter) => {
    const value = filters[filter]

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return filterLabels[filter]
      }

      if (value.length === 1) {
        return value[0]
      }

      return `${filterLabels[filter]} · ${value.length}`
    }

    if (!value) {
      return filterLabels[filter]
    }

    return value
  }

  const activeFilters =
    filters.language.length +
    filters.topics.length +
    (filters.stars ? 1 : 0) +
    (filters.forks ? 1 : 0) +
    (filters.watchers ? 1 : 0) +
    (filters.license ? 1 : 0) +
    (filters.activity ? 1 : 0) +
    (filters.beginner ? 1 : 0)

  const isMetricSorted = metric => metricSort === metric

  return (
    <div className="mt-6">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-gray-700 size-5" />

          <h2 className="font-semibold text-gray-800">
            Filters
          </h2>

          {activeFilters > 0 && (
            <span className="flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-indigo-600 rounded-full">
              {activeFilters}
            </span>
          )}
        </div>

        {activeFilters > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
          >
            <X className="size-4" />
            Clear all
          </button>
        )}

      </div>

      <div className="flex flex-wrap items-center gap-3 mt-3">

        {/* LANGUAGE */}

        <div
          className="relative"
          onMouseEnter={() => setOpenFilter('language')}
        >

          <button
            onClick={() => setOpenFilter(openFilter === 'language' ? null : 'language')}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium bg-white border rounded-lg transition ${
              filters.language.length > 0
                ? 'border-indigo-400 text-indigo-600 bg-indigo-50'
                : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50'
            }`}
          >
            <span>{getFilterText('language')}</span>
            <ChevronDown className={`size-4 transition ${openFilter === 'language' ? 'rotate-180' : ''}`} />
          </button>

          {openFilter === 'language' && (
            <div
              onMouseLeave={() => setOpenFilter(null)}
              className="absolute left-0 z-30 grid grid-cols-2 w-105 gap-1 p-2 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl"
            >

              {multiSelectOptions.language.map(option => {
                const selected = filters.language.includes(option)

                return (
                  <button
                    key={option}
                    onClick={() => toggleMultiFilter('language', option)}
                    className={`flex items-center gap-2 px-3 py-2.5 text-sm text-left rounded-lg transition ${
                      selected
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                    }`}
                  >
                    <span className={`flex items-center justify-center w-4 h-4 border rounded ${
                      selected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-gray-300'
                    }`}>
                      {selected && <span className="text-[10px]">✓</span>}
                    </span>

                    {option}
                  </button>
                )
              })}

            </div>
          )}

        </div>

        {/* TOPICS */}

        <div
          className="relative"
          onMouseEnter={() => setOpenFilter('topics')}
        >

          <button
            onClick={() => setOpenFilter(openFilter === 'topics' ? null : 'topics')}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium bg-white border rounded-lg transition ${
              filters.topics.length > 0
                ? 'border-indigo-400 text-indigo-600 bg-indigo-50'
                : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50'
            }`}
          >
            <span>{getFilterText('topics')}</span>
            <ChevronDown className={`size-4 transition ${openFilter === 'topics' ? 'rotate-180' : ''}`} />
          </button>

          {openFilter === 'topics' && (
            <div
              onMouseLeave={() => setOpenFilter(null)}
              className="absolute left-0 z-30 grid grid-cols-2 w-105 gap-1 p-2 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl"
            >

              {multiSelectOptions.topics.map(option => {
                const selected = filters.topics.includes(option)

                return (
                  <button
                    key={option}
                    onClick={() => toggleMultiFilter('topics', option)}
                    className={`flex items-center gap-2 px-3 py-2.5 text-sm text-left rounded-lg transition ${
                      selected
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                    }`}
                  >
                    <span className={`flex items-center justify-center w-4 h-4 border rounded ${
                      selected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-gray-300'
                    }`}>
                      {selected && <span className="text-[10px]">✓</span>}
                    </span>

                    {option}
                  </button>
                )
              })}

            </div>
          )}

        </div>

        {/* METRIC FILTERS */}

        {['stars', 'forks', 'watchers'].map(metric => (

          <div
            key={metric}
            className="relative"
            onMouseEnter={() => setOpenFilter(metric)}
          >

            <button
              onClick={() => setOpenFilter(openFilter === metric ? null : metric)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium bg-white border rounded-lg transition ${
                filters[metric] || isMetricSorted(metric)
                  ? 'border-indigo-400 text-indigo-600 bg-indigo-50'
                  : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50'
              }`}
            >
              <span>{getFilterText(metric)}</span>
              <ChevronDown className={`size-4 transition ${openFilter === metric ? 'rotate-180' : ''}`} />
            </button>

            {openFilter === metric && (
              <div
                onMouseLeave={() => setOpenFilter(null)}
                className="absolute left-0 z-30 w-60 p-2 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl"
              >

                <p className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase">
                  {filterLabels[metric]}
                </p>

                {metricOptions[metric].map(([label, value]) => (
                  <button
                    key={label}
                    onClick={() => selectMetric(metric, value)}
                    className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-left text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    <span className={`flex items-center justify-center w-4 h-4 border rounded-full ${
                      filters[metric] === value
                        ? 'border-indigo-600'
                        : 'border-gray-300'
                    }`}>
                      {filters[metric] === value && (
                        <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                      )}
                    </span>

                    {label}
                  </button>
                ))}

                <div className="px-3 pt-3 mt-2 border-t border-gray-100">

                  <p className="mb-2 text-xs font-semibold text-gray-400 uppercase">
                    Sort
                  </p>

                  <div className="flex gap-2">

                    <button
                      onClick={() => setMetricSort(metric, 'asc')}
                      className={`flex-1 px-2 py-2 text-xs font-medium border rounded-lg transition ${
                        isMetricSorted(metric) && sortOrder === 'asc'
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'text-gray-600 border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                      }`}
                    >
                      Ascending
                    </button>

                    <button
                      onClick={() => setMetricSort(metric, 'desc')}
                      className={`flex-1 px-2 py-2 text-xs font-medium border rounded-lg transition ${
                        isMetricSorted(metric) && sortOrder === 'desc'
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'text-gray-600 border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                      }`}
                    >
                      Descending
                    </button>

                  </div>

                </div>

              </div>
            )}

          </div>

        ))}

        {/* LICENSE */}

        <div
          className="relative"
          onMouseEnter={() => setOpenFilter('license')}
        >

          <button
            onClick={() => setOpenFilter(openFilter === 'license' ? null : 'license')}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium bg-white border rounded-lg transition ${
              filters.license
                ? 'border-indigo-400 text-indigo-600 bg-indigo-50'
                : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50'
            }`}
          >
            <span>{getFilterText('license')}</span>
            <ChevronDown className={`size-4 transition ${openFilter === 'license' ? 'rotate-180' : ''}`} />
          </button>

          {openFilter === 'license' && (
            <div
              onMouseLeave={() => setOpenFilter(null)}
              className="absolute left-0 z-30 w-56 p-2 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl"
            >

              {singleSelectOptions.license.map(option => (
                <button
                  key={option}
                  onClick={() => selectSingleFilter('license', option)}
                  className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-left text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition"
                >
                  <span className={`flex items-center justify-center w-4 h-4 border rounded-full ${
                    (filters.license === '' && option === 'Any') || filters.license === option
                      ? 'border-indigo-600'
                      : 'border-gray-300'
                  }`}>
                    {((filters.license === '' && option === 'Any') || filters.license === option) && (
                      <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                    )}
                  </span>

                  {option}
                </button>
              ))}

            </div>
          )}

        </div>

        {/* ACTIVITY */}

        <div
          className="relative"
          onMouseEnter={() => setOpenFilter('activity')}
        >

          <button
            onClick={() => setOpenFilter(openFilter === 'activity' ? null : 'activity')}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium bg-white border rounded-lg transition ${
              filters.activity
                ? 'border-indigo-400 text-indigo-600 bg-indigo-50'
                : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50'
            }`}
          >
            <span>{getFilterText('activity')}</span>
            <ChevronDown className={`size-4 transition ${openFilter === 'activity' ? 'rotate-180' : ''}`} />
          </button>

          {openFilter === 'activity' && (
            <div
              onMouseLeave={() => setOpenFilter(null)}
              className="absolute left-0 z-30 w-56 p-2 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl"
            >

              {singleSelectOptions.activity.map(option => (
                <button
                  key={option}
                  onClick={() => selectSingleFilter('activity', option)}
                  className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-left text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition"
                >
                  <span className={`flex items-center justify-center w-4 h-4 border rounded-full ${
                    (filters.activity === '' && option === 'Any') || filters.activity === option
                      ? 'border-indigo-600'
                      : 'border-gray-300'
                  }`}>
                    {((filters.activity === '' && option === 'Any') || filters.activity === option) && (
                      <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                    )}
                  </span>

                  {option}
                </button>
              ))}

            </div>
          )}

        </div>

        {/* BEGINNER */}

        <label className="flex items-center gap-2 px-2 text-sm text-gray-700 cursor-pointer">

          <input
            type="checkbox"
            checked={filters.beginner}
            onChange={(e) => setFilters({
              ...filters,
              beginner: e.target.checked
            })}
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