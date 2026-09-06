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

  return (
    <div className="px-8 py-6">
      <div className="flex items-start gap-6">

        <div className="flex-1 min-w-0">
          <ContributionHeader
            search={search}
            setSearch={setSearch}
          />

          <div className="mt-5">
            <IssueList
              filters={filters}
              search={search}
            />
          </div>
        </div>

        <ContributionSidebar
          filters={filters}
          setFilters={setFilters}
        />

      </div>
    </div>
  )
}

export default Contributions