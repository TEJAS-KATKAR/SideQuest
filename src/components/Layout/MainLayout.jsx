import React, {useState} from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from '../SideBar/Sidebar'
import TopBar from '../TopBar/TopBar'

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileSidebarOpen(prev => !prev)
      return
    }

    setSidebarCollapsed(prev => !prev)
  }

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#f6f8ff]">
      <Sidebar collapsed={sidebarCollapsed} mobileOpen={mobileSidebarOpen} onClose={closeMobileSidebar} />

      {mobileSidebarOpen && (
        <button onClick={closeMobileSidebar} className="fixed inset-0 z-40 bg-black/30 md:hidden" aria-label="Close sidebar" />
      )}

      <div className={`min-h-screen min-w-0 transition-[margin] duration-300 ${sidebarCollapsed ? 'md:ml-16 lg:ml-16' : 'md:ml-50 lg:ml-50'}`}>
        <TopBar onMenuClick={toggleSidebar} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout