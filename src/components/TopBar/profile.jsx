import {useEffect, useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {LogOut, Settings, ShieldCheck, UserRound} from 'lucide-react'
import {useAuth} from '../../auth/AuthContext'
import AnimalAvatar from '../Auth/AnimalAvatar'

const Profile = ({user, onClose}) => {
  const profileRef = useRef(null)
  const [error, setError] = useState('')
  const [signingOut, setSigningOut] = useState(false)
  const {signOut} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = event => {
      if (profileRef.current && !profileRef.current.contains(event.target)) onClose()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleSignOut = async () => {
    setError('')
    setSigningOut(true)
    try {
      await signOut()
      onClose()
      navigate('/signin', {replace: true})
    } catch (signOutError) {
      setError(signOutError.message || 'Could not sign out. Please try again.')
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <>
      <button type="button" onClick={onClose} aria-label="Close account menu" className="fixed inset-0 z-40 cursor-default bg-black/20 backdrop-blur-[2px]" />

      <div
        ref={profileRef}
        className="fixed right-5 top-17 z-50 w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
      >
        <div className="flex flex-col items-center px-6 pb-5 pt-6">
          <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-2xl font-semibold text-white">
            {user ? <AnimalAvatar type={user.avatar} size={64} /> : 'G'}
          </div>
          <h2 className="mt-3 max-w-full truncate text-lg font-semibold text-gray-800">{user?.username || 'Guest'}</h2>
          <p className="mt-1 text-sm text-gray-500">
            {user ? 'Your SideQuest account' : 'You are browsing as a guest'}
          </p>
        </div>

        {user ? (
          <div className="border-t border-gray-100 px-3 py-3">
            <div className="flex items-center gap-3 rounded-xl px-3 py-3">
              <ShieldCheck className="size-5 shrink-0 text-green-600" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700">Account active</p>
                <p className="text-xs text-gray-400">Signed in to SideQuest</p>
              </div>
            </div>
            <Link to="/settings" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-gray-50">
              <Settings className="size-5 shrink-0 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Settings</span>
            </Link>
            {error && <p role="alert" className="mx-3 mt-1 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
            <button type="button" onClick={handleSignOut} disabled={signingOut} className="mt-2 flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-50">
              <LogOut size={16} /> {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        ) : (
          <div className="space-y-2 border-t border-gray-100 px-5 py-4">
            <Link to="/signin" onClick={onClose} className="flex min-h-10 w-full items-center justify-center rounded-lg bg-[#7673eb] px-4 text-sm font-semibold text-white transition hover:bg-[#625fdb]">Sign in</Link>
            <Link to="/signup" onClick={onClose} className="flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
              <UserRound size={15} /> Create an account
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Profile
