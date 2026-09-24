import React, {useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import ExploreHeader from '../components/Explore/ExploreHeader'
import ExploreFilters from '../components/Explore/ExploreFilters'
import RepositoryList from '../components/Explore/RepositoryList'
import ExploreSidebar from '../components/Explore/ExploreSidebar'
import Pagination from '../components/Explore/Pagination'

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

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialSearch = searchParams.get('q') || ''

  const [search, setSearch] = useState(initialSearch)
  const [submittedSearch, setSubmittedSearch] = useState(
    initialSearch || 'open source'
  )

  const [filters, setFilters] = useState(defaultFilters)

  const [metricSort, setMetricSort] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [page, setPage] = useState(1)

  const [totalPages, setTotalPages] = useState(1)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const updateUrl = (newSearch) => {
    const params = new URLSearchParams()

    if (newSearch && newSearch !== 'open source') {
      params.set('q', newSearch)
    }

    setSearchParams(params)
  }

  const handleSearch = (value = search) => {
    const newSearch = value.trim() || 'open source'

    setSearch(newSearch)
    setSubmittedSearch(newSearch)
    setPage(1)

    updateUrl(newSearch)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleSortChange = (metric, order) => {
    setMetricSort(metric)
    setSortOrder(order)
    setPage(1)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <div className="flex flex-col mx-8 my-6">

      <ExploreHeader
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        onFilterOpen={() => setMobileFilterOpen(true)}
        mobileFilterOpen={mobileFilterOpen}
        selectedFilterCount={
          filters.language.length +
          filters.topics.length +
          (filters.stars ? 1 : 0) +
          (filters.forks ? 1 : 0) +
          (filters.watchers ? 1 : 0) +
          (filters.license ? 1 : 0) +
          (filters.activity ? 1 : 0) +
          (filters.beginner ? 1 : 0)
        }
      />

      <ExploreFilters
        filters={filters}
        setFilters={handleFilterChange}
        metricSort={metricSort}
        sortOrder={sortOrder}
        setMetricSort={handleSortChange}
        mobileOpen={mobileFilterOpen}
        setMobileOpen={setMobileFilterOpen}
      />

      <div className="flex items-start gap-5 mt-3">

        <div className="flex-1 min-w-0">
          <RepositoryList
            search={submittedSearch}
            filters={filters}
            metricSort={metricSort}
            sortOrder={sortOrder}
            page={page}
            setTotalPages={setTotalPages}
          />
        </div>

        <div className="hidden xl:block w-80 shrink-0">
          <ExploreSidebar />
        </div>

      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        setCurrentPage={handlePageChange}
      />

    </div>
  )
}

export default Explore