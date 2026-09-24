import {useState} from 'react'
import {Menu, Bell, Sun, ChevronDown} from 'lucide-react'
import Profile from './profile'
import {useAuth} from '../../auth/AuthContext'
import AnimalAvatar from '../Auth/AnimalAvatar'

const TopBar = ({onMenuClick}) => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const {user} = useAuth()

  return (
    <div className="relative z-30 flex items-center justify-between w-full h-14 px-5 md:px-8 lg:px-10 bg-white shadow-sm">
      <button onClick={onMenuClick} className="flex items-center justify-center p-1 rounded-md cursor-pointer hover:bg-gray-100 transition" aria-label="Toggle sidebar">
        <Menu />
      </button>

      <div className="flex items-center justify-center gap-4 md:gap-5">
        <button className="flex items-center justify-center p-1 rounded-md cursor-pointer hover:bg-gray-100 transition" aria-label="Light theme">
          <Sun />
        </button>

        <button onClick={() => setNotificationsOpen(prev => !prev)} className="relative flex items-center justify-center p-1 rounded-md cursor-pointer hover:bg-gray-100 transition" aria-label="Notifications">
          <Bell />
          {notificationsOpen && (
            <div className="absolute right-0 top-10 w-72 p-4 text-left bg-white border border-gray-200 rounded-xl shadow-lg">
              <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
              <p className="mt-2 text-sm text-gray-500">You're all caught up. New SideQuest activity will appear here.</p>
            </div>
          )}
        </button>

        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className={`flex gap-1 justify-center items-center rounded-full border px-2 py-1 cursor-pointer transition-all duration-200 ${profileOpen ? 'border-gray-300 bg-gray-50 scale-95' : 'border-transparent hover:border-gray-400 hover:bg-gray-50 hover:scale-95 shadow-inner'}`}
        >
          <div className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-lg font-semibold text-white">
            {user ? <AnimalAvatar type={user.avatar} size={36} /> : 'G'}
          </div>
          <span className="hidden text-md font-semibold sm:inline">{user?.username || 'Guest'}</span>
          <ChevronDown size={18} className={`transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {profileOpen && <Profile user={user} onClose={() => setProfileOpen(false)} />}
    </div>
  )
}

export default TopBar
