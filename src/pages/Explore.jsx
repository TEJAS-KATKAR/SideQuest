import React, {useState} from 'react'
import ExploreHeader from '../components/Explore/ExploreHeader'
import ExploreFilters from '../components/Explore/ExploreFilters'
import RepositoryList from '../components/Explore/RepositoryList'
import ExploreSidebar from '../components/Explore/ExploreSidebar'
import Pagination from '../components/Explore/Pagination'

const Explore = () => {
  const [search, setSearch] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('open source')
  const [filters, setFilters] = useState({
    language: '',
    topics: '',
    stars: '',
    license: '',
    activity: '',
    beginner: false
  })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleSearch = () => {
    setSubmittedSearch(search.trim() || 'open source')
    setPage(1)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPage(1)
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
      />

      <div className="flex items-start gap-5 mt-3">
        <RepositoryList
          search={submittedSearch}
          filters={filters}
          page={page}
          setTotalPages={setTotalPages}
        />
        <ExploreSidebar />
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        setCurrentPage={setPage}
      />
    </div>
  )
}

export default Explore