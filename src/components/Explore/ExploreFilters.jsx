import React, {useEffect, useRef, useState} from 'react'
import {
  ChevronDown,
  Info,
  Search,
  SlidersHorizontal,
  X
} from 'lucide-react'

const defaultFilters = {
  language: [],
  topics: [],
  stars: '',
  forks: '',
  watchers: '',
  license: '',
  activity: '',
  beginner: false
}

const ExploreFilters = ({
  filters,
  setFilters,
  metricSort,
  sortOrder,
  setMetricSort,
  mobileOpen,
  setMobileOpen
}) => {
  const [openFilter, setOpenFilter] = useState(null)
  const filterRef = useRef(null)

  const [languageSearch, setLanguageSearch] = useState('')
  const [technologySearch, setTechnologySearch] = useState('')

  const [mobileFilters, setMobileFilters] = useState(filters)
  const [mobileMetricSort, setMobileMetricSort] = useState(metricSort)
  const [mobileSortOrder, setMobileSortOrder] = useState(sortOrder)

  useEffect(() => {
    if (mobileOpen) {
      setMobileFilters(filters)
      setMobileMetricSort(metricSort)
      setMobileSortOrder(sortOrder)
      setLanguageSearch('')
      setTechnologySearch('')
      setOpenFilter(null)
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const multiSelectOptions = {
    language: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C',
      'C++',
      'C#',
      'Go',
      'Rust',
      'PHP',
      'Ruby',
      'Swift',
      'Kotlin',
      'Dart',
      'R',
      'Scala',
      'HTML',
      'CSS',
      'SQL',
      'Shell',
      'Lua',
      'Perl',
      'Haskell',
      'Elixir',
      'Clojure',
      'Objective-C',
      'MATLAB',
      'Assembly'
    ],
    topics: [
      'React',
      'Next.js',
      'Vue',
      'Angular',
      'Node.js',
      'Express',
      'React Native',
      'Frontend',
      'Backend',
      'Web Development',
      'Tailwind CSS',
      'Bootstrap',
      'Svelte',
      'Astro',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'Redis',
      'Firebase',
      'Supabase',
      'GraphQL',
      'REST API',
      'Database',
      'AI',
      'Artificial Intelligence',
      'Machine Learning',
      'Deep Learning',
      'LLM',
      'NLP',
      'Computer Vision',
      'Data Science',
      'Data Analytics',
      'TensorFlow',
      'PyTorch',
      'Pandas',
      'Power BI',
      'Tableau',
      'Docker',
      'Kubernetes',
      'AWS',
      'Azure',
      'Google Cloud',
      'Terraform',
      'CI/CD',
      'DevOps',
      'Cybersecurity',
      'Game Development',
      'Blockchain',
      'DevTools',
      'CLI',
      'Testing',
      'Education',
      'Open Source',
      'Mobile'
    ]
  }

  const singleSelectOptions = {
    license: [
      ['Any', ''],
      ['MIT', 'MIT'],
      ['Apache-2.0', 'Apache-2.0'],
      ['GPL-3.0', 'GPL-3.0'],
      ['BSD-3-Clause', 'BSD-3-Clause'],
      ['MPL-2.0', 'MPL-2.0']
    ],
    activity: [
      ['Any', ''],
      ['Recently updated', 'Recently updated'],
      ['Active', 'Active'],
      ['Very active', 'Very active'],
      ['No recent activity', 'No recent activity'],
      ['Archived', 'Archived']
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

  const filteredLanguages = multiSelectOptions.language.filter(language =>
    language.toLowerCase().includes(languageSearch.toLowerCase())
  )

  const filteredTechnologies = multiSelectOptions.topics.filter(topic =>
    topic.toLowerCase().includes(technologySearch.toLowerCase())
  )

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

  const handleSingleSelect = (filter, value) => {
    setFilters({
      ...filters,
      [filter]: value
    })

    setOpenFilter(null)
  }

  const handleMetricSelect = (filter, value) => {
    setFilters({
      ...filters,
      [filter]: value
    })
  }

  const handleClearAll = () => {
    setFilters(defaultFilters)

    setLanguageSearch('')
    setTechnologySearch('')
    setOpenFilter(null)
  }

  const selectedFilterCount =
    filters.language.length +
    filters.topics.length +
    (filters.stars ? 1 : 0) +
    (filters.forks ? 1 : 0) +
    (filters.watchers ? 1 : 0) +
    (filters.license ? 1 : 0) +
    (filters.activity ? 1 : 0) +
    (filters.beginner ? 1 : 0)

  const mobileSelectedFilterCount =
    mobileFilters.language.length +
    mobileFilters.topics.length +
    (mobileFilters.stars ? 1 : 0) +
    (mobileFilters.forks ? 1 : 0) +
    (mobileFilters.watchers ? 1 : 0) +
    (mobileFilters.license ? 1 : 0) +
    (mobileFilters.activity ? 1 : 0) +
    (mobileFilters.beginner ? 1 : 0)

  const toggleMobileMultiFilter = (filter, value) => {
    const currentValues = mobileFilters[filter] || []

    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value]

    setMobileFilters({
      ...mobileFilters,
      [filter]: newValues
    })
  }

  const applyMobileFilters = () => {
    setFilters(mobileFilters)
    setMetricSort(mobileMetricSort, mobileSortOrder)
    setMobileOpen(false)
  }

  const handleMobileOutsideClick = () => {
    applyMobileFilters()
  }

  const handleMobileClearAll = () => {
    setMobileFilters(defaultFilters)
    setMobileMetricSort('')
    setMobileSortOrder('')
    setLanguageSearch('')
    setTechnologySearch('')
  }

  const renderMultiSelectDropdown = (filter) => {
    const isLanguage = filter === 'language'
    const searchValue = isLanguage ? languageSearch : technologySearch
    const setSearchValue = isLanguage ? setLanguageSearch : setTechnologySearch
    const options = isLanguage ? filteredLanguages : filteredTechnologies

    return (
      <div className={`absolute top-full left-0 z-30 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg ${isLanguage ? 'w-64' : 'w-80'}`}>
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center h-9 px-3 border border-gray-200 rounded-lg">
            <Search className="mr-2 text-gray-400 size-4 shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={isLanguage ? 'Search languages...' : 'Search technologies...'}
              className="w-full text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
              autoFocus
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue('')}
                className="p-0.5 text-gray-400 rounded hover:bg-gray-100"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto p-2">
          {options.length > 0 ? (
            options.map(option => {
              const selected = filters[filter]?.includes(option)

              return (
                <button
                  key={option}
                  onClick={() => toggleMultiFilter(filter, option)}
                  className={`flex items-center w-full px-3 py-2 text-sm text-left rounded-lg transition ${
                    selected
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span
                    className={`flex items-center justify-center size-4 mr-3 border rounded ${
                      selected
                        ? 'bg-indigo-600 border-indigo-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {selected && (
                      <svg viewBox="0 0 20 20" fill="none" className="size-3 text-white">
                        <path
                          d="M5 10.5L8.5 14L15 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="truncate">{option}</span>
                </button>
              )
            })
          ) : (
            <p className="px-3 py-4 text-sm text-center text-gray-500">
              No {isLanguage ? 'languages' : 'technologies'} found
            </p>
          )}
        </div>

        {filters[filter]?.length > 0 && (
          <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
            <span className="text-xs font-medium text-gray-500">
              {filters[filter].length} selected
            </span>
            <button
              onClick={() => setFilters({...filters, [filter]: []})}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    )
  }

  const renderMetricDropdown = (filter) => (
    <div className="absolute top-full left-0 z-30 w-56 mt-2 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-lg">
      <div className="max-h-56 overflow-y-auto p-2">
        {metricOptions[filter].map(([label, value]) => (
          <button
            key={label}
            onClick={() => handleMetricSelect(filter, value)}
            className={`flex items-center w-full px-3 py-2 text-sm text-left rounded-lg transition ${
              filters[filter] === value
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="px-3 py-3 border-t border-gray-100">
        <p className="mb-2 text-xs font-semibold text-gray-500">Sort by {filter}</p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMetricSort(filter, 'asc')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${
              metricSort === filter && sortOrder === 'asc'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Low → High
          </button>

          <button
            onClick={() => setMetricSort(filter, 'desc')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${
              metricSort === filter && sortOrder === 'desc'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            High → Low
          </button>
        </div>
      </div>
    </div>
  )

  const renderSingleSelectDropdown = (filter) => (
    <div className="absolute top-full left-0 z-30 w-52 mt-2 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-lg">
      <div className="max-h-64 overflow-y-auto p-2">
        {singleSelectOptions[filter].map(([label, value]) => (
          <button
            key={label}
            onClick={() => handleSingleSelect(filter, value)}
            className={`flex items-center w-full px-3 py-2 text-sm text-left rounded-lg transition ${
              filters[filter] === value
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span
              className={`size-4 mr-3 rounded-full border flex items-center justify-center ${
                filters[filter] === value
                  ? 'border-indigo-600'
                  : 'border-gray-300'
              }`}
            >
              {filters[filter] === value && (
                <span className="size-2 rounded-full bg-indigo-600" />
              )}
            </span>
            {label}
          </button>
        ))}
      </div>
    </div>
  )

  const renderMobileMultiSelect = (filter, options, searchValue, setSearchValue, placeholder) => (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center h-10 px-3 border border-gray-200 rounded-lg">
          <Search className="mr-2 text-gray-400 size-4 shrink-0" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={placeholder}
            className="w-full text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="p-1 text-gray-400 rounded hover:bg-gray-100"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="max-h-44 overflow-y-auto p-2">
        {options.map(option => {
          const selected = mobileFilters[filter]?.includes(option)

          return (
            <button
              key={option}
              onClick={() => toggleMobileMultiFilter(filter, option)}
              className={`flex items-center w-full px-3 py-2.5 text-sm text-left rounded-lg transition ${
                selected
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-700 active:bg-gray-50'
              }`}
            >
              <span
                className={`flex items-center justify-center size-5 mr-3 border rounded ${
                  selected
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                {selected && (
                  <svg viewBox="0 0 20 20" fill="none" className="size-3.5 text-white">
                    <path
                      d="M5 10.5L8.5 14L15 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="truncate">{option}</span>
            </button>
          )
        })}
      </div>
    </div>
  )

  const renderMobileMetric = filter => (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="grid grid-cols-2 gap-2 p-2">
        {metricOptions[filter].map(([label, value]) => (
          <button
            key={label}
            onClick={() => setMobileFilters({...mobileFilters, [filter]: value})}
            className={`py-2.5 px-3 text-sm font-medium rounded-lg border transition ${
              mobileFilters[filter] === value
                ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                : 'border-transparent bg-gray-50 text-gray-700 active:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="px-3 py-3 border-t border-gray-100">
        <p className="mb-2 text-xs font-semibold text-gray-500">
          Sort by {filter}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setMobileMetricSort(filter)
              setMobileSortOrder('asc')
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              mobileMetricSort === filter && mobileSortOrder === 'asc'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-50 text-gray-600'
            }`}
          >
            Low → High
          </button>

          <button
            onClick={() => {
              setMobileMetricSort(filter)
              setMobileSortOrder('desc')
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              mobileMetricSort === filter && mobileSortOrder === 'desc'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-50 text-gray-600'
            }`}
          >
            High → Low
          </button>
        </div>
      </div>
    </div>
  )

  const renderMobileSingle = filter => (
    <div className="grid grid-cols-1 gap-2">
      {singleSelectOptions[filter].map(([label, value]) => (
        <button
          key={label}
          onClick={() => setMobileFilters({...mobileFilters, [filter]: value})}
          className={`flex items-center w-full px-4 py-3 text-sm text-left rounded-xl border transition ${
            mobileFilters[filter] === value
              ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
              : 'border-gray-200 bg-white text-gray-700 active:bg-gray-50'
          }`}
        >
          <span
            className={`size-4 mr-3 rounded-full border flex items-center justify-center ${
              mobileFilters[filter] === value
                ? 'border-indigo-600'
                : 'border-gray-300'
            }`}
          >
            {mobileFilters[filter] === value && (
              <span className="size-2 rounded-full bg-indigo-600" />
            )}
          </span>
          {label}
        </button>
      ))}
    </div>
  )

  return (
    <>
      <div ref={filterRef} className="hidden md:block mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-gray-600" />
            <span className="text-lg font-semibold text-gray-900">Filters</span>

            {selectedFilterCount > 0 && (
              <span className="flex items-center justify-center size-6 text-xs font-bold text-indigo-700 bg-indigo-100 rounded-full">
                {selectedFilterCount}
              </span>
            )}
          </div>

          {selectedFilterCount > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <X className="size-4" />
              Clear all
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">

          <div className="relative">
            <button
              onClick={() => {
                setOpenFilter(openFilter === 'language' ? null : 'language')
                setLanguageSearch('')
                setTechnologySearch('')
              }}
              className={`flex items-center gap-2 h-12 px-4 bg-white border rounded-xl text-sm font-medium transition ${
                openFilter === 'language' || filters.language.length > 0
                  ? 'border-indigo-400 text-indigo-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <span>Language</span>
              {filters.language.length > 0 && (
                <span className="flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold text-indigo-700 bg-indigo-100 rounded-full">
                  {filters.language.length}
                </span>
              )}
              <ChevronDown className={`size-4 transition-transform ${openFilter === 'language' ? 'rotate-180' : ''}`} />
            </button>

            {openFilter === 'language' && renderMultiSelectDropdown('language')}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setOpenFilter(openFilter === 'topics' ? null : 'topics')
                setLanguageSearch('')
                setTechnologySearch('')
              }}
              className={`flex items-center gap-2 h-12 px-4 bg-white border rounded-xl text-sm font-medium transition ${
                openFilter === 'topics' || filters.topics.length > 0
                  ? 'border-indigo-400 text-indigo-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <span>Technologies</span>
              {filters.topics.length > 0 && (
                <span className="flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold text-indigo-700 bg-indigo-100 rounded-full">
                  {filters.topics.length}
                </span>
              )}
              <ChevronDown className={`size-4 transition-transform ${openFilter === 'topics' ? 'rotate-180' : ''}`} />
            </button>

            {openFilter === 'topics' && renderMultiSelectDropdown('topics')}
          </div>

          {['stars', 'forks', 'watchers'].map(filter => (
            <div className="relative" key={filter}>
              <button
                onClick={() => setOpenFilter(openFilter === filter ? null : filter)}
                className={`flex items-center gap-2 h-12 px-4 bg-white border rounded-xl text-sm font-medium transition ${
                  openFilter === filter || filters[filter]
                    ? 'border-indigo-400 text-indigo-700'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <span className="capitalize">{filter}</span>
                {filters[filter] && (
                  <span className="text-xs font-semibold text-indigo-600">
                    {filters[filter]}+
                  </span>
                )}
                <ChevronDown className={`size-4 transition-transform ${openFilter === filter ? 'rotate-180' : ''}`} />
              </button>

              {openFilter === filter && renderMetricDropdown(filter)}
            </div>
          ))}

          {['license', 'activity'].map(filter => (
            <div className="relative" key={filter}>
              <button
                onClick={() => setOpenFilter(openFilter === filter ? null : filter)}
                className={`flex items-center gap-2 h-12 px-4 bg-white border rounded-xl text-sm font-medium transition ${
                  openFilter === filter || filters[filter]
                    ? 'border-indigo-400 text-indigo-700'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <span className="capitalize">{filter}</span>
                <ChevronDown className={`size-4 transition-transform ${openFilter === filter ? 'rotate-180' : ''}`} />
              </button>

              {openFilter === filter && renderSingleSelectDropdown(filter)}
            </div>
          ))}

          <label className="flex items-center gap-2 h-12 px-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.beginner}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  beginner: e.target.checked
                })
              }
              className="size-5 accent-indigo-600"
            />
            <span>Good for beginners</span>
            <Info className="size-4 text-gray-400" />
          </label>

        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-100 flex items-end justify-center bg-gray-900/45 backdrop-blur-sm md:hidden"
          onMouseDown={handleMobileOutsideClick}
        >
          <div
            className="flex flex-col w-full max-h-[92vh] bg-[#f6f8ff] rounded-t-3xl shadow-2xl overflow-hidden"
            onMouseDown={(event) => event.stopPropagation()}
          >

            <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-200 shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="size-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-900">
                  Filters
                </h2>

                {mobileSelectedFilterCount > 0 && (
                  <span className="flex items-center justify-center min-w-6 h-6 px-1 text-xs font-bold text-indigo-700 bg-indigo-100 rounded-full">
                    {mobileSelectedFilterCount}
                  </span>
                )}
              </div>

              <button
                onClick={handleMobileOutsideClick}
                className="flex items-center justify-center size-9 text-gray-500 bg-gray-100 rounded-full active:bg-gray-200"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 px-4 py-4 overflow-y-auto">

              <div className="flex flex-col gap-5">

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      Language
                    </h3>

                    {mobileFilters.language.length > 0 && (
                      <span className="text-xs font-semibold text-indigo-600">
                        {mobileFilters.language.length} selected
                      </span>
                    )}
                  </div>

                  {renderMobileMultiSelect(
                    'language',
                    multiSelectOptions.language.filter(language =>
                      language.toLowerCase().includes(languageSearch.toLowerCase())
                    ),
                    languageSearch,
                    setLanguageSearch,
                    'Search languages...'
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      Technologies
                    </h3>

                    {mobileFilters.topics.length > 0 && (
                      <span className="text-xs font-semibold text-indigo-600">
                        {mobileFilters.topics.length} selected
                      </span>
                    )}
                  </div>

                  {renderMobileMultiSelect(
                    'topics',
                    multiSelectOptions.topics.filter(topic =>
                      topic.toLowerCase().includes(technologySearch.toLowerCase())
                    ),
                    technologySearch,
                    setTechnologySearch,
                    'Search technologies...'
                  )}
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold text-gray-900">
                    Stars
                  </h3>
                  {renderMobileMetric('stars')}
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold text-gray-900">
                    Forks
                  </h3>
                  {renderMobileMetric('forks')}
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold text-gray-900">
                    Watchers
                  </h3>
                  {renderMobileMetric('watchers')}
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold text-gray-900">
                    License
                  </h3>
                  {renderMobileSingle('license')}
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-bold text-gray-900">
                    Activity
                  </h3>
                  {renderMobileSingle('activity')}
                </div>

                <label className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl">
                  <input
                    type="checkbox"
                    checked={mobileFilters.beginner}
                    onChange={(e) =>
                      setMobileFilters({
                        ...mobileFilters,
                        beginner: e.target.checked
                      })
                    }
                    className="size-5 accent-indigo-600"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      Good for beginners
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Show repositories suitable for new contributors
                    </p>
                  </div>

                  <Info className="size-4 text-gray-400 shrink-0" />
                </label>

              </div>

            </div>

            <div className="flex items-center gap-3 px-4 py-4 bg-white border-t border-gray-200 shrink-0">
              <button
                onClick={handleMobileClearAll}
                className="flex-1 h-11 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl active:bg-gray-200"
              >
                Clear all
              </button>

              <button
                onClick={applyMobileFilters}
                className="flex-[1.5] h-11 text-sm font-semibold text-white bg-indigo-600 rounded-xl active:bg-indigo-700"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default ExploreFilters