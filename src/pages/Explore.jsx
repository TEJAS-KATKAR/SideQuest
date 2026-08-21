import React from 'react'
import ExploreHeader from '../components/Explore/ExploreHeader'
import ExploreFilters from '../components/Explore/ExploreFilters'
import RepositoryList from '../components/Explore/RepositoryList'
import ExploreSidebar from '../components/Explore/ExploreSidebar'
import Pagination from '../components/Explore/Pagination'

const Explore = () => {
  return (
    <div className="flex flex-col mx-8 my-6">
      <ExploreHeader />
      <ExploreFilters />
      <div className="flex items-start gap-5 mt-3">
        <RepositoryList />
        <ExploreSidebar />
      </div>
      <Pagination />
    </div>
  )
}

export default Explore