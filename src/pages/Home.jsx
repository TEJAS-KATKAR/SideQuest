import React from 'react'
import HeroBanner from '../components/MainPage/HeroBanner'
import Otherinfo from '../components/Analytics/Otherinfo'

const Home = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row min-w-0">
        <HeroBanner />
        <Otherinfo />
      </div>
    </div>
  )
}

export default Home