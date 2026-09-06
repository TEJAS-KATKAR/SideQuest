import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../SideBar/Sidebar'
import TopBar from '../TopBar/TopBar'

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  return (
    <div className="min-h-screen bg-[#f6f8ff]">
      
      <Sidebar sidebarOpen={sidebarOpen} />

      <div className={`min-h-screen min-w-0 transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'ml-50' : 'ml-0'
      }`}>
        <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default MainLayout