import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../SideBar/Sidebar'
import TopBar from '../TopBar/TopBar'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#f6f8ff]">
      
      <Sidebar />

      <div className="ml-50 min-h-screen min-w-0">
        <TopBar />

        <main>
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default MainLayout