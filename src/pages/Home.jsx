import React from 'react'
import Sidebar from '../components/SideBar/Sidebar'
import HeroBanner from '../components/MainPage/HeroBanner'
import Otherinfo from '../components/Analytics/Otherinfo'

const Home = () => {
  return (
    <div className='flex justify-between'>
        <Sidebar/>
        <HeroBanner/>
        <Otherinfo/>
    </div>
  )
}

export default Home