import React, {useEffect, useState} from 'react'
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

const Contributions = () => {
  const [search, setSearch] = useState(() => {
    return sessionStorage.getItem('sidequest-contribution-search') || ''
  })

  const [filters, setFilters] = useState(() => {
    try {
      const savedFilters = sessionStorage.getItem('sidequest-contribution-filters')

      if (!savedFilters) {
        return defaultFilters
      }

      return {
        ...defaultFilters,
        ...JSON.parse(savedFilters)
      }
    } catch {
      return defaultFilters
    }
  })

  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    sessionStorage.setItem(
      'sidequest-contribution-filters',
      JSON.stringify(filters)
    )
  }, [filters])

  useEffect(() => {
    sessionStorage.setItem(
      'sidequest-contribution-search',
      search
    )
  }, [search])

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

  return (
    <div className="px-8 py-6">
      <div className="flex items-start gap-6">
        <div className="flex-1 min-w-0">
          <ContributionHeader
            search={search}
            setSearch={setSearch}
            filterCount={filterCount}
            onFilterClick={() => setFilterOpen(true)}
          />

          <div className="mt-5">
            <IssueList
              filters={filters}
              search={search}
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
          onMouseDown={() => setFilterOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[88vh] overflow-y-auto"
            onMouseDown={event => event.stopPropagation()}
          >
            <ContributionSidebar
              filters={filters}
              setFilters={setFilters}
              mobileMode
              onClose={() => setFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Contributions