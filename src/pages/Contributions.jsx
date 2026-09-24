import {useState} from 'react'
import ContributionHeader from '../components/Contributions/ContributionHeader'
import IssueList from '../components/Contributions/IssueList'
import ContributionSidebar from '../components/Contributions/ContributionSidebar'

const defaultFilters = {
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

const getInitialFilters = () => {
  try {
    const settings = JSON.parse(localStorage.getItem('sidequest-settings')) || {}
    const preferences = settings.contributionPreferences || {}

    return {
      ...defaultFilters,
      language: Array.isArray(preferences.languages) ? preferences.languages : [],
      technology: Array.isArray(preferences.technologies) ? preferences.technologies : [],
      type: Array.isArray(preferences.types) ? preferences.types : [],
      beginner: Boolean(preferences.beginner)
    }
  } catch {
    return defaultFilters
  }
}

const Contributions = () => {
  const [search, setSearch] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')
  const [filters, setFilters] = useState(getInitialFilters)
  const [mobileDraftFilters, setMobileDraftFilters] = useState(getInitialFilters)
  const [filterOpen, setFilterOpen] = useState(false)

  const filterCount =
    (filters.language?.length || 0) +
    (filters.technology?.length || 0) +
    (filters.labels?.length || 0) +
    (filters.type?.length || 0) +
    (filters.difficulty !== 'All' ? 1 : 0) +
    (filters.activity !== 'All' ? 1 : 0) +
    (filters.assignment !== 'All' ? 1 : 0) +
    (filters.issueAge !== 'All' ? 1 : 0) +
    (filters.discussion !== 'All' ? 1 : 0) +
    (filters.beginner ? 1 : 0)

  const handleSearch = () => {
    setSubmittedSearch(search.trim())
  }

  const openMobileFilters = () => {
    setMobileDraftFilters(filters)
    setFilterOpen(true)
  }

  const applyMobileFilters = () => {
    setFilters(mobileDraftFilters)
    setFilterOpen(false)
  }

  return (
    <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex items-start gap-6">
        <div className="flex-1 min-w-0">
          <ContributionHeader
            search={search}
            setSearch={setSearch}
            onSearch={handleSearch}
            filterCount={filterCount}
            onFilterClick={openMobileFilters}
          />

          <div className="mt-5">
            <IssueList
              search={submittedSearch}
              filters={filters}
            />
          </div>
        </div>

        <div className="hidden xl:block">
          <ContributionSidebar
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>

      {filterOpen && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center px-4 bg-black/30 xl:hidden"
          onMouseDown={applyMobileFilters}
        >
          <div
            className="w-full max-w-lg max-h-[88vh] overflow-y-auto"
            onMouseDown={event => event.stopPropagation()}
          >
            <ContributionSidebar
              filters={mobileDraftFilters}
              setFilters={setMobileDraftFilters}
              mobileMode
              onDraftChange={setMobileDraftFilters}
              onClose={() => setFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Contributions
