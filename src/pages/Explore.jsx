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

  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [submittedSearch, setSubmittedSearch] = useState(searchParams.get('q') || 'open source')

  const [filters, setFilters] = useState({
    language: searchParams.getAll('language'),
    topics: searchParams.getAll('topic'),
    stars: searchParams.get('stars') || '',
    forks: searchParams.get('forks') || '',
    watchers: searchParams.get('watchers') || '',
    license: searchParams.get('license') || '',
    activity: searchParams.get('activity') || '',
    beginner: searchParams.get('beginner') === 'true'
  })

  const [metricSort, setMetricSort] = useState(
    searchParams.get('sortMetric') || ''
  )

  const [sortOrder, setSortOrder] = useState(
    searchParams.get('sortOrder') || ''
  )

  const [page, setPage] = useState(
    Number(searchParams.get('page')) || 1
  )

  const [totalPages, setTotalPages] = useState(1)

  const updateUrl = (
    newSearch,
    newFilters,
    newMetricSort,
    newSortOrder,
    newPage
  ) => {
    const params = new URLSearchParams()

    if (newSearch && newSearch !== 'open source') {
      params.set('q', newSearch)
    }

    newFilters.language.forEach(value => {
      params.append('language', value)
    })

    newFilters.topics.forEach(value => {
      params.append('topic', value)
    })

    if (newFilters.stars) {
      params.set('stars', newFilters.stars)
    }

    if (newFilters.forks) {
      params.set('forks', newFilters.forks)
    }

    if (newFilters.watchers) {
      params.set('watchers', newFilters.watchers)
    }

    if (newFilters.license) {
      params.set('license', newFilters.license)
    }

    if (newFilters.activity) {
      params.set('activity', newFilters.activity)
    }

    if (newFilters.beginner) {
      params.set('beginner', 'true')
    }

    if (newMetricSort) {
      params.set('sortMetric', newMetricSort)
    }

    if (newSortOrder) {
      params.set('sortOrder', newSortOrder)
    }

    if (newPage > 1) {
      params.set('page', newPage)
    }

    setSearchParams(params)
  }

  const handleSearch = (value = search) => {
    const newSearch = value.trim() || 'open source'

    setSearch(newSearch)
    setSubmittedSearch(newSearch)
    setPage(1)

    updateUrl(
      newSearch,
      filters,
      metricSort,
      sortOrder,
      1
    )
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPage(1)

    updateUrl(
      submittedSearch,
      newFilters,
      metricSort,
      sortOrder,
      1
    )
  }

  const handleSortChange = (metric, order) => {
    setMetricSort(metric)
    setSortOrder(order)
    setPage(1)

    updateUrl(
      submittedSearch,
      filters,
      metric,
      order,
      1
    )
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)

    updateUrl(
      submittedSearch,
      filters,
      metricSort,
      sortOrder,
      newPage
    )
  }

  return (
    <div className="flex flex-col mx-8 my-6">

      <ExploreHeader
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />

      <ExploreFilters
        filters={filters}
        setFilters={handleFilterChange}
        metricSort={metricSort}
        sortOrder={sortOrder}
        setMetricSort={handleSortChange}
      />

      <div className="flex items-start gap-5 mt-3">

        <RepositoryList
          search={submittedSearch}
          filters={filters}
          metricSort={metricSort}
          sortOrder={sortOrder}
          page={page}
          setTotalPages={setTotalPages}
        />

        <ExploreSidebar />

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