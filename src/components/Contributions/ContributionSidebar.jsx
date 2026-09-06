import React, {useEffect, useRef, useState} from 'react'
import {Check, ChevronDown, Filter, RotateCcw, Search, X} from 'lucide-react'

const ContributionSidebar = ({filters, setFilters}) => {
  const [openFilter, setOpenFilter] = useState(null)
  const [draftFilters, setDraftFilters] = useState(filters)
  const [languageSearch, setLanguageSearch] = useState('')
  const [technologySearch, setTechnologySearch] = useState('')
  const [labelSearch, setLabelSearch] = useState('')
  const filterRef = useRef(null)

  const languages = [
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
  ]

  const technologies = [
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

  const labels = [
    'good first issue',
    'help wanted',
    'bug',
    'documentation',
    'enhancement',
    'feature',
    'refactor',
    'testing',
    'performance',
    'accessibility',
    'security',
    'dependencies',
    'design',
    'UI',
    'UX',
    'question',
    'discussion',
    'maintenance',
    'cleanup',
    'optimization',
    'translation',
    'up-for-grabs',
    'beginner-friendly',
    'hacktoberfest'
  ]

  const difficulties = ['Beginner', 'Easy', 'Medium', 'Hard']

  const issueTypes = [
    'Bug fix',
    'Feature',
    'Documentation',
    'Testing',
    'Refactor',
    'Performance',
    'Accessibility',
    'Security',
    'Other'
  ]

  const activities = [
    'Very active',
    'Active',
    'Moderate',
    'Low activity'
  ]

  const assignments = [
    'Unassigned',
    'Assigned'
  ]

  const issueAges = [
    'Today',
    'Last 7 days',
    'Last 30 days',
    'Last 90 days'
  ]

  const discussions = [
    'No discussion',
    'Low',
    'Medium',
    'High'
  ]

  useEffect(() => {
    setDraftFilters(filters)
  }, [filters])

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

  const filteredLanguages = languages.filter(language =>
    language.toLowerCase().includes(languageSearch.toLowerCase())
  )

  const filteredTechnologies = technologies.filter(technology =>
    technology.toLowerCase().includes(technologySearch.toLowerCase())
  )

  const filteredLabels = labels.filter(label =>
    label.toLowerCase().includes(labelSearch.toLowerCase())
  )

  const updateDraft = (name, value) => {
    setDraftFilters({
      ...draftFilters,
      [name]: value
    })
  }

  const toggleMultiFilter = (name, value) => {
    const currentValues = Array.isArray(draftFilters[name])
      ? draftFilters[name]
      : []

    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value]

    updateDraft(name, newValues)
  }

  const toggleSingleFilter = (name, value) => {
    updateDraft(
      name,
      draftFilters[name] === value ? 'All' : value
    )
  }

  const applyFilters = () => {
    setFilters(draftFilters)
    setOpenFilter(null)
  }

  const resetFilters = () => {
    const resetState = {
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
    }

    setDraftFilters(resetState)
    setFilters(resetState)
    setLanguageSearch('')
    setTechnologySearch('')
    setLabelSearch('')
    setOpenFilter(null)
  }

  const selectedFilterCount =
    (draftFilters.language?.length || 0) +
    (draftFilters.technology?.length || 0) +
    (draftFilters.labels?.length || 0) +
    (draftFilters.type?.length || 0) +
    (draftFilters.difficulty !== 'All' ? 1 : 0) +
    (draftFilters.activity !== 'All' ? 1 : 0) +
    (draftFilters.assignment !== 'All' ? 1 : 0) +
    (draftFilters.issueAge !== 'All' ? 1 : 0) +
    (draftFilters.discussion !== 'All' ? 1 : 0) +
    (draftFilters.beginner ? 1 : 0)

  const renderMultiSelect = (
    filter,
    options,
    searchValue,
    setSearchValue,
    placeholder
  ) => (
    <div className="absolute right-0 z-40 w-64 mt-2 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-lg">

      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center h-10 px-3 border border-gray-300 rounded-lg transition focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-50">
          <Search className="mr-2 text-gray-400 size-4 shrink-0"/>

          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={placeholder}
            autoFocus
            className="w-full text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
          />

          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="p-1 text-gray-400 rounded hover:bg-gray-100"
            >
              <X className="size-3.5"/>
            </button>
          )}
        </div>
      </div>

      <div className="max-h-64 p-2 overflow-y-auto">
        {options.length > 0 ? (
          options.map(option => {
            const selected = draftFilters[filter]?.includes(option)

            return (
              <button
                key={option}
                onClick={() => toggleMultiFilter(filter, option)}
                className={`flex items-center w-full px-3 py-2.5 text-sm text-left rounded-lg transition ${
                  selected
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <span className={`flex items-center justify-center size-4 mr-3 border rounded ${
                  selected
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-white border-gray-300'
                }`}>
                  {selected && <Check className="size-3 text-white"/>}
                </span>

                <span className="truncate">{option}</span>
              </button>
            )
          })
        ) : (
          <p className="px-3 py-5 text-sm text-center text-gray-500">
            No results found
          </p>
        )}
      </div>

      {draftFilters[filter]?.length > 0 && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500">
            {draftFilters[filter].length} selected
          </span>

          <button
            onClick={() => updateDraft(filter, [])}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Clear
          </button>
        </div>
      )}

    </div>
  )

  return (
    <aside ref={filterRef} className="w-72 shrink-0">
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">

      <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Filter size={17} className="text-blue-500"/>

        <p className="text-sm font-semibold text-gray-900">
          Filter opportunities
        </p>

        {selectedFilterCount > 0 && (
          <span className="flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold text-blue-700 bg-blue-50 rounded-full">
            {selectedFilterCount}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
      <button
          onClick={resetFilters}
          title="Reset filters"
          aria-label="Reset filters"
          className="flex items-center justify-center size-8 text-gray-500 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <RotateCcw size={15}/>
        </button>
        <button
          onClick={applyFilters}
          title="Search with selected filters"
          aria-label="Search with selected filters"
          className="flex items-center justify-center h-8 px-3 text-sm border border-blue-300 font-semibold text-blue-600 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition"
        >
          Search
        </button>

        

      </div>

    </div>

        <div className="h-px my-4 bg-gray-100"/>

        <p className="mb-2 text-sm font-semibold text-gray-800">
          Languages
        </p>

        <div className="relative">
          <button
            onClick={() => {
              setOpenFilter(openFilter === 'language' ? null : 'language')
              setLanguageSearch('')
              setTechnologySearch('')
              setLabelSearch('')
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 border rounded-lg text-sm transition ${
              draftFilters.language?.length > 0
                ? 'border-blue-300 bg-blue-50 text-blue-700'
                : openFilter === 'language'
                  ? 'border-blue-300 ring-2 ring-blue-50 text-gray-700'
                  : 'border-gray-300 text-gray-600 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <span>
              {draftFilters.language?.length > 0
                ? `${draftFilters.language.length} selected`
                : 'Select languages'}
            </span>

            <ChevronDown
              size={15}
              className={openFilter === 'language' ? 'rotate-180' : ''}
            />
          </button>

          {openFilter === 'language' &&
            renderMultiSelect(
              'language',
              filteredLanguages,
              languageSearch,
              setLanguageSearch,
              'Search languages...'
            )}
        </div>

        <div className="h-px my-4 bg-gray-100"/>

        <p className="mb-2 text-sm font-semibold text-gray-800">
          Difficulty
        </p>

        <div className="grid grid-cols-4 gap-2">
          {difficulties.map(difficulty => (
            <button
              key={difficulty}
              onClick={() => toggleSingleFilter('difficulty', difficulty)}
              className={`py-2.5 rounded-md text-xs font-medium transition ${
                draftFilters.difficulty === difficulty
                  ? 'ring-2 ring-blue-200'
                  : ''
              } ${
                difficulty === 'Beginner'
                  ? 'bg-green-50 text-green-600 hover:bg-green-100'
                  : difficulty === 'Easy'
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    : difficulty === 'Medium'
                      ? 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        <div className="h-px my-4 bg-gray-100"/>

        <p className="mb-2 text-sm font-semibold text-gray-800">
          Issue Labels
        </p>

        <div className="relative">
          <button
            onClick={() => {
              setOpenFilter(openFilter === 'labels' ? null : 'labels')
              setLanguageSearch('')
              setTechnologySearch('')
              setLabelSearch('')
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 border rounded-lg text-sm transition ${
              draftFilters.labels?.length > 0
                ? 'border-blue-300 bg-blue-50 text-blue-700'
                : openFilter === 'labels'
                  ? 'border-blue-300 ring-2 ring-blue-50 text-gray-700'
                  : 'border-gray-300 text-gray-600 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <span>
              {draftFilters.labels?.length > 0
                ? `${draftFilters.labels.length} selected`
                : 'Select labels'}
            </span>

            <ChevronDown
              size={15}
              className={openFilter === 'labels' ? 'rotate-180' : ''}
            />
          </button>

          {openFilter === 'labels' &&
            renderMultiSelect(
              'labels',
              filteredLabels,
              labelSearch,
              setLabelSearch,
              'Search labels...'
            )}
        </div>

        <div className="h-px my-4 bg-gray-100"/>

        <p className="mb-2 text-sm font-semibold text-gray-800">
          Issue Type
        </p>

        <div className="grid grid-cols-2 gap-2">
          {issueTypes.map(type => {
            const selected = draftFilters.type?.includes(type)

            return (
              <button
                key={type}
                onClick={() => toggleMultiFilter('type', type)}
                className={`px-3 py-2.5 rounded-md text-sm text-left transition ${
                  selected
                    ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {type}
              </button>
            )
          })}
        </div>

        <div className="h-px my-4 bg-gray-100"/>

        <p className="mb-2 text-sm font-semibold text-gray-800">
          Repository Activity
        </p>

        <div className="grid grid-cols-2 gap-2">
          {activities.map(activity => (
            <button
              key={activity}
              onClick={() => toggleSingleFilter('activity', activity)}
              className={`px-3 py-2.5 rounded-md text-sm transition ${
                draftFilters.activity === activity
                  ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {activity}
            </button>
          ))}
        </div>

        <div className="h-px my-4 bg-gray-100"/>

        <p className="mb-2 text-sm font-semibold text-gray-800">
          Assignment
        </p>

        <div className="grid grid-cols-2 gap-2">
          {assignments.map(option => (
            <button
              key={option}
              onClick={() => toggleSingleFilter('assignment', option)}
              className={`px-3 py-2.5 rounded-md text-sm transition ${
                draftFilters.assignment === option
                  ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="h-px my-4 bg-gray-100"/>

        <p className="mb-2 text-sm font-semibold text-gray-800">
          Issue Age
        </p>

        <div className="flex flex-col gap-1">
          {issueAges.map(option => (
            <button
              key={option}
              onClick={() => toggleSingleFilter('issueAge', option)}
              className={`flex items-center gap-2 px-3 py-2 text-sm text-left rounded-md transition ${
                draftFilters.issueAge === option
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <span className={`flex items-center justify-center size-4 rounded-full border ${
                draftFilters.issueAge === option
                  ? 'border-blue-500'
                  : 'border-gray-300'
              }`}>
                {draftFilters.issueAge === option && (
                  <span className="size-2 rounded-full bg-blue-500"/>
                )}
              </span>

              {option}
            </button>
          ))}
        </div>

        <div className="h-px my-4 bg-gray-100"/>

        <p className="mb-2 text-sm font-semibold text-gray-800">
          Discussion
        </p>

        <div className="grid grid-cols-2 gap-2">
          {discussions.map(option => (
            <button
              key={option}
              onClick={() => toggleSingleFilter('discussion', option)}
              className={`px-3 py-2.5 rounded-md text-sm transition ${
                draftFilters.discussion === option
                  ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="h-px my-4 bg-gray-100"/>

        <p className="mb-2 text-sm font-semibold text-gray-800">
          Technologies
        </p>

        <div className="relative">
          <button
            onClick={() => {
              setOpenFilter(openFilter === 'technology' ? null : 'technology')
              setLanguageSearch('')
              setTechnologySearch('')
              setLabelSearch('')
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 border rounded-lg text-sm transition ${
              draftFilters.technology?.length > 0
                ? 'border-blue-300 bg-blue-50 text-blue-700'
                : openFilter === 'technology'
                  ? 'border-blue-300 ring-2 ring-blue-50 text-gray-700'
                  : 'border-gray-300 text-gray-600 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <span>
              {draftFilters.technology?.length > 0
                ? `${draftFilters.technology.length} selected`
                : 'Select technologies'}
            </span>

            <ChevronDown
              size={15}
              className={openFilter === 'technology' ? 'rotate-180' : ''}
            />
          </button>

          {openFilter === 'technology' &&
            renderMultiSelect(
              'technology',
              filteredTechnologies,
              technologySearch,
              setTechnologySearch,
              'Search technologies...'
            )}
        </div>

        <button
          onClick={() => updateDraft('beginner', !draftFilters.beginner)}
          className={`flex items-center gap-2 mt-5 text-sm font-medium transition ${
            draftFilters.beginner
              ? 'text-blue-700'
              : 'text-gray-600 hover:text-blue-700'
          }`}
        >
          <span className={`flex items-center justify-center size-4 rounded border ${
            draftFilters.beginner
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'border-gray-300'
          }`}>
            {draftFilters.beginner && <Check size={11}/>}
          </span>

          Show only good first issues
        </button>

        <div className="flex items-center gap-2 pt-4 mt-5 border-t border-gray-100">

          <button
            onClick={resetFilters}
            title="Reset filters"
            aria-label="Reset filters"
            className="flex items-center justify-center size-10 shrink-0 text-gray-500 border border-gray-200 rounded-lg hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition"
          >
            <RotateCcw size={16}/>
          </button>

          <button
            onClick={applyFilters}
            title="Search opportunities"
            aria-label="Search opportunities"
            className="flex items-center justify-center flex-1 gap-2 h-10 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition"
          >
            <Search size={16}/>
            Search opportunities
          </button>

        </div>

      </div>
    </aside>
  )
}

export default ContributionSidebar