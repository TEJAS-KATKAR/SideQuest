import {useState} from 'react'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import {ArrowLeft, ArrowRight, KeyRound, UserRound} from 'lucide-react'
import {useAuth} from '../auth/AuthContext'
import AnimalAvatar from '../components/Auth/AnimalAvatar'
import {avatarChoices} from '../components/Auth/animalAvatars'

const AuthPage = ({mode}) => {
  const isSignup = mode === 'signup'
  const {user, loading: authLoading, signIn, signUp} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (authLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f6f8ff] text-sm text-gray-500">Loading your account…</div>
  }

  if (user) return <Navigate to="/" replace />

  const handleSubmit = async event => {
    event.preventDefault()
    setError('')

    if (isSignup) {
      if (!/^[a-zA-Z0-9_-]{3,24}$/.test(username.trim())) {
        setError('Use 3–24 letters, numbers, underscores, or hyphens for your username.')
        return
      }
      if (password.length < 8 || new TextEncoder().encode(password).length > 72) {
        setError('Your password must be at least 8 characters and no more than 72 UTF-8 bytes.')
        return
      }
      if (password !== confirmPassword) {
        setError('Your passwords do not match.')
        return
      }
      if (!avatar) {
        setError('Choose an avatar for your account.')
        return
      }
    } else if (!username.trim() || !password) {
      setError('Enter your username and password.')
      return
    }

    setSubmitting(true)
    try {
      if (isSignup) {
        await signUp({username: username.trim(), password, avatar})
      } else {
        await signIn({username: username.trim(), password})
      }
      const returnTo = location.state?.from?.pathname || '/'
      navigate(returnTo, {replace: true})
    } catch (requestError) {
      setError(requestError.message || 'Unable to complete your request.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f8ff] px-4 py-7 sm:px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600">
          <ArrowLeft size={16} /> Back to SideQuest
        </Link>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 text-center">
            <img src="/logo.png" alt="SideQuest" className="mx-auto size-12 object-contain" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">SideQuest</p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">{isSignup ? 'Create your account' : 'Welcome back'}</h1>
            <p className="mt-2 text-sm text-gray-500">
              {isSignup ? 'Save opportunities and personalize your open source journey.' : 'Sign in to continue your open source journey.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Username</span>
              <span className="flex h-11 items-center gap-2.5 rounded-lg border border-gray-200 px-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                <UserRound size={17} className="shrink-0 text-gray-400" />
                <input
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  autoComplete="username"
                  autoCapitalize="none"
                  maxLength={24}
                  required
                  placeholder="Choose a username"
                  className="w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Password</span>
              <span className="flex h-11 items-center gap-2.5 rounded-lg border border-gray-200 px-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                <KeyRound size={17} className="shrink-0 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  maxLength={72}
                  required
                  placeholder="Enter your password"
                  className="w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </span>
              {isSignup && <span className="mt-1.5 block text-[11px] text-gray-400">Use at least 8 characters (maximum 72 UTF-8 bytes).</span>}
            </label>

            {isSignup && <>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-gray-700">Confirm password</span>
                <span className="flex h-11 items-center gap-2.5 rounded-lg border border-gray-200 px-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                  <KeyRound size={17} className="shrink-0 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                    maxLength={72}
                    required
                    placeholder="Enter your password again"
                    className="w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                  />
                </span>
              </label>

              <fieldset>
                <legend className="text-sm font-medium text-gray-700">Choose your avatar</legend>
                <div role="radiogroup" aria-label="Choose one animal avatar" className="mt-2.5 grid grid-cols-5 gap-2">
                  {avatarChoices.map(choice => (
                    <button
                      key={choice.id}
                      type="button"
                      role="radio"
                      aria-checked={avatar === choice.id}
                      aria-label={choice.label}
                      onClick={() => setAvatar(choice.id)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border p-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${avatar === choice.id ? 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-100' : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      <AnimalAvatar type={choice.id} size={46} />
                      <span className="text-[10px] font-medium text-gray-600">{choice.label}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            </>}

            {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:bg-indigo-800 disabled:cursor-wait disabled:opacity-60"
            >
              {submitting ? (isSignup ? 'Creating account…' : 'Signing in…') : (isSignup ? 'Create account' : 'Sign in')}
              {!submitting && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            {isSignup ? 'Already have an account?' : 'New to SideQuest?'}{' '}
            <Link to={isSignup ? '/signin' : '/signup'} className="font-semibold text-indigo-600 hover:text-indigo-700">
              {isSignup ? 'Sign in' : 'Create an account'}
            </Link>
          </p>
        </section>
        <p className="mt-4 text-center text-xs leading-5 text-gray-400">Your password is securely hashed and never returned to the browser.</p>
      </div>
    </main>
  )
}

export default AuthPage
