import React from 'react'
import {NavLink} from 'react-router-dom'
import {House, Search, HeartHandshake, Bookmark, CircleQuestionMark, Settings} from 'lucide-react'
import rocket from '../../assets/rocket.png'

const Sidebar = ({collapsed, mobileOpen, onClose}) => {
  const navItems = [
    {to: '/', label: 'Home', icon: House},
    {to: '/explore', label: 'Explore', icon: Search},
    {to: '/contributions', label: 'Contributions', icon: HeartHandshake},
    {to: '/saved', label: 'Saved', icon: Bookmark},
    {to: '/howto', label: 'How To', icon: CircleQuestionMark}
  ]

  return (
    <aside className={`fixed top-0 left-0 z-50 flex h-screen flex-col bg-[#111b2f] transition-all duration-300 ${collapsed ? 'w-16' : 'w-50'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className={`flex items-center h-16 px-4 ${collapsed ? 'justify-center' : 'justify-start'}`}>
        <div className="flex items-center justify-center shrink-0 w-9 h-9 text-lg font-bold text-white bg-[#7673eb] rounded-lg">
          S
        </div>
        {!collapsed && <span className="ml-3 text-lg font-bold text-white">SideQuest</span>}
      </div>

      <div className="flex flex-col gap-3 my-4">
        {navItems.map(({to, label, icon: Icon}) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            title={collapsed ? label : ''}
            className={({isActive}) => `flex items-center rounded-md mx-2.5 px-2 py-2 text-white font-semibold text-sm transition-all duration-200 ${collapsed ? 'justify-center' : 'gap-2.5'} ${isActive ? 'bg-[#7673eb] shadow-sm' : 'hover:text-[#7673eb]/80 hover:translate-x-0.5'} active:scale-95 active:bg-[#6865dc]`}
          >
            <Icon className="size-5.5 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </div>

      {!collapsed && (
        <div className="flex flex-col m-3">
          <img src={rocket} className="rounded-3xl brightness-100" />
          <div className="absolute w-38 flex flex-col mx-3 my-5">
            <h1 className="mb-2 text-[15px] font-semibold text-white">New to Open Source?</h1>
            <p className="mr-3 mb-5 text-[11px] font-semibold leading-4.5 text-gray-300">Learn how to contribute to your first project.</p>
            <div>
              <NavLink onClick={onClose} className="self-center px-4 py-2 text-sm font-semibold text-white bg-[#7673eb] rounded-md" to="/howto">Start Guide</NavLink>
            </div>
          </div>
        </div>
      )}

      <NavLink
        to="/settings"
        onClick={onClose}
        title={collapsed ? 'Settings' : ''}
        className={({isActive}) => `flex items-center mt-auto mb-10 rounded-md mx-2.5 px-2 py-2 text-white font-semibold text-sm transition-all duration-200 ${collapsed ? 'justify-center' : 'gap-2.5'} ${isActive ? 'bg-[#7673eb] shadow-sm' : 'hover:text-[#7673eb]/80 hover:translate-x-0.5'} active:scale-95 active:bg-[#6865dc]`}
      >
        <Settings className="size-5.5 shrink-0" />
        {!collapsed && <span>Settings</span>}
      </NavLink>
    </aside>
  )
}

export default Sidebar