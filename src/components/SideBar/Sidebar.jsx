import React from 'react'
import { NavLink } from 'react-router-dom'
import {House, Search ,HeartHandshake, Bookmark, CircleQuestionMark, Settings} from "lucide-react"
import rocket from "../../assets/rocket.png";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  React.useEffect(() => {
    const toggleSidebar = () => {
      setSidebarOpen(prev => !prev)
    }

    window.addEventListener('toggleSidebar', toggleSidebar)

    return () => {
      window.removeEventListener('toggleSidebar', toggleSidebar)
    }
  }, [])

  return (
    <div className={`bg-[#111b2f] w-50 h-screen flex flex-col fixed transition-all duration-300 ease-in-out ${
      sidebarOpen
        ? 'translate-x-0 opacity-100'
        : '-translate-x-full opacity-0'
    }`}>
        <div></div>

        <div className='flex flex-col my-4 gap-3'>

        <NavLink
          to="/"
          className="flex flex-row items-center gap-2.5 hover:bg-[#7673eb] rounded-md mx-2.5 px-2 py-2 text-white font-semibold text-sm"
        >
          <House className="size-5.5" />
            Home
        </NavLink>

        <NavLink
          to="/explore"
          className="flex flex-row items-center gap-2.5 hover:bg-[#7673eb] rounded-md mx-2.5 px-2 py-2 text-white font-semibold text-sm"
        >
          <Search className="size-5.5" />
            Explore
        </NavLink>

        <NavLink
          to="/contributions"
          className="flex flex-row items-center gap-2.5 hover:bg-[#7673eb] rounded-md mx-2.5 px-2 py-2 text-white font-semibold text-sm"
        >
          <HeartHandshake className="size-5.5" />
            Contributions
        </NavLink>

        <NavLink
          to="/saved"
          className="flex flex-row items-center gap-2.5 hover:bg-[#7673eb] rounded-md mx-2.5 px-2 py-2 text-white font-semibold text-sm"
        >
          <Bookmark className="size-5.5" />
            Saved
        </NavLink>

          <NavLink
            to="/howto"
            className="flex flex-row items-center gap-2.5 hover:bg-[#7673eb] rounded-md mx-2.5 px-2 py-2 text-white font-semibold text-sm "
          >
            <CircleQuestionMark className="size-5.5" />
            How To
          </NavLink>
        </div>

      <div className='flex flex-col m-3  '>
        <img src={rocket} className='rounded-3xl relative brightness-100'/>
        <div className='absolute w-38 flex flex-col mx-3 my-5'>
          <h1 className='text-white text-[15px] font-semibold mb-2'>New to Open Source?</h1>
          <text className='text-gray-300 text-[11px] font-semibold mr-3 mb-5 leading-4.5'>Learn how to contribute to your first project.</text>
          <div className=''>
          <NavLink className="inline-flex px-4 py-2 text-white font-semibold text-sm bg-[#7673eb] rounded-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3a34f3] hover:shadow-lg hover:shadow-indigo-500/20 active:translate-y-0 active:scale-95" to="/howto">Start Guide</NavLink>
          </div>
        </div>
      </div>

      <NavLink
        to="/settings"
        className="flex flex-row items-center gap-2.5 hover:bg-[#7673eb] rounded-md mx-2.5 px-2 py-2 text-white font-semibold text-sm mt-auto mb-10"
      >
        <Settings className="size-5.5" />
        Settings
      </NavLink>


    </div>
  )
}

export default Sidebar