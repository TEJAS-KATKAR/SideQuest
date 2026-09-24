import {useState} from 'react'
import {Link} from 'react-router-dom'
import {
  Bell,
  Check,
  CircleHelp,
  Code2,
  HeartHandshake,
  LockKeyhole,
  Monitor,
  RotateCcw,
  ShieldCheck,
  UserRound,
  X
} from 'lucide-react'
import {useAuth} from '../auth/AuthContext'
import AnimalAvatar from '../components/Auth/AnimalAvatar'

const SETTINGS_KEY = 'sidequest-settings'
const SAVED_KEY = 'sidequest-saved-opportunities'

const languages = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Go',
  'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart', 'R', 'Scala', 'HTML',
  'CSS', 'SQL', 'Shell', 'Lua', 'Perl', 'Haskell', 'Elixir', 'Clojure',
  'Objective-C', 'MATLAB', 'Assembly'
]

const technologies = [
  'React', 'Next.js', 'Vue', 'Angular', 'Node.js', 'Express',
  'React Native', 'Frontend', 'Backend', 'Web Development', 'Tailwind CSS',
  'Bootstrap', 'Svelte', 'Astro', 'MongoDB', 'PostgreSQL', 'MySQL',
  'SQLite', 'Redis', 'Firebase', 'Supabase', 'GraphQL', 'REST API',
  'Database', 'AI', 'Artificial Intelligence', 'Machine Learning',
  'Deep Learning', 'LLM', 'NLP', 'Computer Vision', 'Data Science',
  'Data Analytics', 'TensorFlow', 'PyTorch', 'Pandas', 'Power BI', 'Tableau',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Terraform',
  'CI/CD', 'DevOps', 'Cybersecurity', 'Game Development', 'Blockchain',
  'DevTools', 'CLI', 'Testing', 'Education', 'Open Source', 'Mobile'
]

const contributionTypes = [
  'Bug fix', 'Feature', 'Documentation', 'Testing', 'Refactor',
  'Performance', 'Accessibility', 'Security', 'Other'
]

const defaults = {
  appearance: 'light',
  notifications: {
    contributionUpdates: true,
    savedOpportunityUpdates: true,
    githubActivity: false,
    productNews: false
  },
  contributionPreferences: {
    languages: [],
    technologies: [],
    types: [],
    beginner: false
  }
}

const readSettings = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}
    const preferences = stored.contributionPreferences || {}
    return {
      ...defaults,
      ...stored,
      notifications: {...defaults.notifications, ...stored.notifications},
      contributionPreferences: {
        ...defaults.contributionPreferences,
        ...preferences,
        languages: Array.isArray(preferences.languages) ? preferences.languages : [],
        technologies: Array.isArray(preferences.technologies) ? preferences.technologies : [],
        types: Array.isArray(preferences.types) ? preferences.types : []
      }
    }
  } catch {
    return defaults
  }
}

const saveSettings = settings => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

const readSavedCount = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVED_KEY))
    return Array.isArray(saved) ? saved.length : 0
  } catch {
    return 0
  }
}

const SectionHeading = ({icon: Icon, title, description}) => (
  <div className="flex items-start gap-3">
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
      <Icon size={19} />
    </span>
    <div className="min-w-0">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm leading-5 text-gray-500">{description}</p>
    </div>
  </div>
)

const Toggle = ({checked, onChange, label}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${checked ? 'bg-indigo-600' : 'bg-gray-300'}`}
  >
    <span className={`inline-block size-5 transform rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
  </button>
)

const PreferenceChips = ({title, options, selected, onChange}) => {
  const toggle = value => {
    onChange(selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value])
  }

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-800">{title}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map(option => {
          const active = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(option)}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${active ? 'border-indigo-200 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
            >
              {active && <Check size={13} />}
              {option}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

const Settings = () => {
  const {user} = useAuth()
  const [settings, setSettings] = useState(readSettings)
  const [savedCount, setSavedCount] = useState(readSavedCount)
  const [notice, setNotice] = useState('')

  const updateSettings = updater => {
    const updated = updater(settings)

    try {
      saveSettings(updated)
      setSettings(updated)
      setNotice('Settings saved on this device.')
    } catch {
      setNotice('Could not save settings in this browser.')
    }
  }

  const updateNotification = (key, value) => {
    updateSettings(current => ({
      ...current,
      notifications: {...current.notifications, [key]: value}
    }))
  }

  const updatePreference = (key, value) => {
    updateSettings(current => ({
      ...current,
      contributionPreferences: {
        ...current.contributionPreferences,
        [key]: value
      }
    }))
  }

  const resetSettings = () => {
    if (!window.confirm('Reset notification and contribution preferences to their defaults?')) return
    updateSettings(() => defaults)
    setNotice('Preferences have been reset.')
  }

  const clearSaved = () => {
    if (!window.confirm(`Remove all ${savedCount} saved opportunities from this device?`)) return
    localStorage.removeItem(SAVED_KEY)
    setSavedCount(0)
    window.dispatchEvent(new Event('sidequest-saved-updated'))
    setNotice('Saved opportunities cleared from this device.')
  }

  const preference = settings.contributionPreferences

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">Your workspace</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Settings</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Manage your local preferences and shape the opportunities SideQuest shows you.
          </p>
        </div>

        {notice && (
          <div role="status" className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice('')} aria-label="Dismiss message" className="rounded p-1 hover:bg-green-100"><X size={16} /></button>
          </div>
        )}

        <nav aria-label="Settings sections" className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
          {[
            ['account', 'Profile & account', UserRound],
            ['appearance', 'Appearance', Monitor],
            ['notifications', 'Notifications', Bell],
            ['contributions', 'Contribution preferences', Code2],
            ['privacy', 'Privacy & local data', ShieldCheck],
            ['general', 'General & reset', RotateCcw]
          ].map(([id, label, Icon]) => (
            <a key={id} href={`#${id}`} className="inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              <Icon size={15} className="shrink-0" />
              {label}
            </a>
          ))}
        </nav>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="min-w-0 space-y-5">
            <section id="account" className="scroll-mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading icon={UserRound} title="Profile & account" description="Your current SideQuest browsing profile." />
              <div className="mt-5 flex flex-col gap-4 rounded-xl border border-gray-100 bg-gray-50/70 p-4 sm:flex-row sm:items-center">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#111b2f] text-xl font-semibold text-white">
                  {user ? <AnimalAvatar type={user.avatar} size={56} /> : 'G'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="max-w-full truncate font-semibold text-gray-900">{user?.username || 'Guest'}</h3>
                    <span className="rounded-full bg-gray-200 px-2.5 py-1 text-[11px] font-semibold text-gray-600">{user ? 'SideQuest account' : 'Local profile'}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{user ? 'Your account is signed in on this device.' : 'Your preferences and saved opportunities stay in this browser.'}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500"><Code2 size={14} /> GitHub account not connected</p>
                </div>
                {!user && <Link to="/signup" className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 px-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700">Create account</Link>}
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-indigo-50/70 px-3.5 py-3 text-xs leading-5 text-indigo-800">
                <CircleHelp size={15} className="mt-0.5 shrink-0" />
                <p>{user ? 'Your SideQuest account is active. GitHub OAuth is not part of this app, so your GitHub account is not connected.' : 'Create a SideQuest account to keep your username and avatar. GitHub OAuth is not implemented, so GitHub is not connected.'}</p>
              </div>
            </section>

            <section id="appearance" className="scroll-mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading icon={Monitor} title="Appearance" description="Choose how SideQuest looks on this device." />
              <div className="mt-5 flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Light appearance</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">This is the current application theme.</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-indigo-200 bg-white px-3 py-2 text-xs font-semibold text-indigo-700"><Check size={14} /> Current</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-gray-500">A dark theme is not available in the current design system.</p>
            </section>

            <section id="notifications" className="scroll-mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading icon={Bell} title="Notifications" description="Save your notification preferences for a future connected experience." />
              <div className="mt-4 divide-y divide-gray-100">
                {[
                  ['contributionUpdates', 'Contribution updates', 'Updates related to issues you are following.'],
                  ['savedOpportunityUpdates', 'Saved opportunities', 'Changes related to opportunities you have saved.'],
                  ['githubActivity', 'GitHub activity', 'Activity from a connected GitHub account.'],
                  ['productNews', 'SideQuest announcements', 'Occasional product and feature news.']
                ].map(([key, title, description]) => (
                  <div key={key} className="flex items-center justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
                    </div>
                    <Toggle checked={settings.notifications[key]} onChange={value => updateNotification(key, value)} label={title} />
                  </div>
                ))}
              </div>
              <p className="mt-1 text-xs leading-5 text-gray-400">These choices are stored locally. The app does not currently send push, email, or GitHub notifications.</p>
            </section>

            <section id="contributions" className="scroll-mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading icon={HeartHandshake} title="Contribution preferences" description="Choose the kinds of opportunities that should be selected by default on the Contributions page." />
              <div className="mt-5 space-y-6">
                <PreferenceChips title="Preferred languages" options={languages} selected={preference.languages} onChange={value => updatePreference('languages', value)} />
                <PreferenceChips title="Technologies & interests" options={technologies} selected={preference.technologies} onChange={value => updatePreference('technologies', value)} />
                <PreferenceChips title="Contribution types" options={contributionTypes} selected={preference.types} onChange={value => updatePreference('types', value)} />
                <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Beginner-friendly opportunities</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Start with issues marked good first issue.</p>
                  </div>
                  <Toggle checked={preference.beginner} onChange={value => updatePreference('beginner', value)} label="Beginner-friendly opportunities" />
                </div>
                <p className="text-xs leading-5 text-gray-400">Preferences are saved on this device and preselect matching filters when you open Contributions. You can still adjust filters there.</p>
              </div>
            </section>

            <section id="privacy" className="scroll-mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading icon={ShieldCheck} title="Privacy & local data" description="Understand where your SideQuest information is stored." />
              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                  <LockKeyhole size={17} className="mt-0.5 shrink-0 text-gray-500" />
                  <div><p className="text-sm font-medium text-gray-800">Stored in this browser</p><p className="mt-1 text-xs leading-5 text-gray-500">Settings and saved opportunities use local browser storage. They are not synced to an account or backend.</p></div>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-4 py-3">
                  <div><p className="text-sm font-medium text-gray-800">Saved opportunities</p><p className="mt-1 text-xs text-gray-500">{savedCount} {savedCount === 1 ? 'opportunity' : 'opportunities'} stored locally</p></div>
                  <a href="#general" className="shrink-0 text-xs font-semibold text-indigo-600 hover:text-indigo-700">Manage data</a>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-20">
            <section id="general" className="scroll-mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <SectionHeading icon={RotateCcw} title="General" description="Reset your local SideQuest preferences." />
              <div className="mt-4 flex items-start justify-between gap-3 border-t border-gray-100 pt-4">
                <div><p className="text-sm font-medium text-gray-800">Reset preferences</p><p className="mt-1 text-xs leading-5 text-gray-500">Restore notification and contribution defaults.</p></div>
                <button type="button" onClick={resetSettings} aria-label="Reset preferences" className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"><RotateCcw size={15} /></button>
              </div>
              <p className="mt-4 text-xs text-gray-400">SideQuest · English</p>
            </section>

            <section className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-red-700">Danger zone</h2>
              <p className="mt-1 text-xs leading-5 text-gray-500">Remove saved opportunities from this browser. This cannot be undone.</p>
              <button type="button" disabled={!savedCount} onClick={clearSaved} className="mt-4 min-h-10 w-full rounded-lg border border-red-200 px-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40">Clear local saved data</button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Settings
