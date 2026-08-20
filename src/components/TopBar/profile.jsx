import React, { useEffect, useRef } from 'react'
import { User, Settings, ShieldCheck } from 'lucide-react'

const Profile = ({ onClose }) => {
  const profileRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]" />

      <div
        ref={profileRef}
        className="fixed right-5 top-17 z-50 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center px-6 pt-6 pb-5">
          <div className="flex size-16 items-center justify-center rounded-full bg-gray-400 text-2xl font-semibold text-white">
            G
          </div>

          <h2 className="mt-3 text-lg font-semibold text-gray-800">
            Guest
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            You're currently browsing as a guest
          </p>
        </div>

        {/* Sign In */}
        <div className="px-5 pb-5">
          <button className="w-full rounded-full bg-[#7673eb] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#625fdb] active:scale-[0.98]">
            Sign in
          </button>
        </div>

        {/* Options */}
        <div className="border-t border-gray-100 px-3 py-3">
          <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-gray-100">
            <User className="size-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Your profile
              </p>
              <p className="text-xs text-gray-400">
                Sign in to access your profile
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-gray-100">
            <ShieldCheck className="size-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Account & privacy
              </p>
              <p className="text-xs text-gray-400">
                Manage your account settings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-gray-100">
            <Settings className="size-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                Settings
              </p>
              <p className="text-xs text-gray-400">
                Customize your experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile