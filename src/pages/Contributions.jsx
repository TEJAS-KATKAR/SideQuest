import React, {useState} from 'react'
import ContributionHeader from '../components/Contributions/ContributionHeader'
import ContributionFilters from '../components/Contributions/ContributionFilters'
import IssueList from '../components/Contributions/IssueList'
import ContributionSidebar from '../components/Contributions/ContributionSidebar'

const Contributions = () => {
  const [search, setSearch] = useState('')

  const [filters, setFilters] = useState({
    language: 'All',
    difficulty: 'All',
    labels: 'All',
    type: 'All',
    activity: 'All',
    beginner: true
  })

  return (
    <div className="px-8 py-6">

      <div className="flex items-start gap-6">

        <div className="flex-1 min-w-0">
          <ContributionHeader search={search} setSearch={setSearch}/>

          {/* ONLY MOBILE */}
          <div className="flex lg:hidden mt-4">
            <ContributionFilters filters={filters} setFilters={setFilters}/>
          </div>

          <div className="mt-5">
            <IssueList filters={filters} search={search}/>
          </div>
        </div>

        {/* ONLY DESKTOP */}
        <div className="hidden lg:block">
          <ContributionSidebar filters={filters} setFilters={setFilters}/>
        </div>

      </div>

    </div>
  )
}

export default Contributions