import React from 'react'
import HeroBanner from '../components/MainPage/HeroBanner'
import Otherinfo from '../components/Analytics/Otherinfo'
import RecommendedRepos from '../components/MainPage/RecommendedRepos'
import GoodFirstIssues from '../components/MainPage/GoodFirstIssues'

const Home = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row items-start min-w-0">
        <div className="flex-1 min-w-0">
          <div className="min-h-93.5">
            <HeroBanner />
          </div>

          <RecommendedRepos />
          <GoodFirstIssues />
        </div>

        <Otherinfo />
      </div>
    </div>
  )
}

export default Home