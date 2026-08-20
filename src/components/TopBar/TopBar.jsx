import React from 'react'
import { useState } from 'react'
import {Menu , Bell, Sun, ChevronDown } from 'lucide-react'
import Profile from './profile'

const TopBar = () => {
    const [profileOpen, setProfileOpen] = useState(false)

  return (
    <div className='w-full h-14 flex justify-between items-center px-10 shadow-sm bg-white'>
        <div className='justify-center items-center'>
            <Menu />
        </div>
        <div className="flex justify-center items-center gap-5">
            <Sun />
            <Bell />

            <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex gap-1 justify-center items-center rounded-full border px-2 py-1 cursor-pointer transition-all duration-200 ${
                profileOpen
                    ? 'border-gray-300 bg-gray-50 scale-95'
                    : 'border-transparent hover:border-gray-400 hover:bg-gray-50 hover:scale-95 shadow-inner'
                }`}
            >
            <div className="size-9 rounded-full bg-gray-400 flex justify-center items-center text-lg text-white font-semibold">
              G
            </div>

            <span className="text-md font-semibold">
              Guest
            </span>

            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                profileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

        </div>
      

      {profileOpen && (
        <Profile onClose={() => setProfileOpen(false)} />
      )}
    </div>
  )
}

export default TopBar