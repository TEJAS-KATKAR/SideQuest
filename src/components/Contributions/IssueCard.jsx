import React, {useEffect, useState} from 'react'
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  Check,
  CheckCircle2,
  Clock3,
  Forward,
  GitFork,
  Info,
  MessageCircle,
  Settings,
  Sparkles,
  Star,
  UserRound,
  Eye
} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const SAVED_KEY = 'sidequest-saved-opportunities'

const formatNumber = number => {
  const value = Number(number) || 0

  if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace('.0', '')}m`
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace('.0', '')}k`

  return value.toString()
}

const difficultyStyles = {
  Beginner: 'text-green-700 bg-green-50',
  Easy: 'text-blue-700 bg-blue-50',
  Medium: 'text-orange-700 bg-orange-50',
  Hard: 'text-red-700 bg-red-50'
}

const getSavedIssues = () => {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY)) || []
  } catch {
    return []
  }
}

const IssueCard = ({issue}) => {
  const [showMobileDetails, setShowMobileDetails] = useState(false)
  const [saved, setSaved] = useState(() => {
    const savedIssues = getSavedIssues()
    return savedIssues.some(savedIssue => savedIssue.id === issue.id)
  })

  const navigate = useNavigate()

  const [owner, repositoryName] = issue.repo.split('/')

  useEffect(() => {
    const handleSavedUpdate = () => {
      const savedIssues = getSavedIssues()
      setSaved(savedIssues.some(savedIssue => savedIssue.id === issue.id))
    }

    window.addEventListener('sidequest-saved-updated', handleSavedUpdate)

    return () => {
      window.removeEventListener('sidequest-saved-updated', handleSavedUpdate)
    }
  }, [issue.id])

  const handleOpportunity = () => {
    navigate(`/contributions/${owner}/${repositoryName}/${issue.number}`)
  }

  const handleSave = () => {
    const savedIssues = getSavedIssues()

    if (saved) {
      const updatedIssues = savedIssues.filter(savedIssue => savedIssue.id !== issue.id)
      localStorage.setItem(SAVED_KEY, JSON.stringify(updatedIssues))
      setSaved(false)
    } else {
      const updatedIssues = [...savedIssues.filter(savedIssue => savedIssue.id !== issue.id), issue]
      localStorage.setItem(SAVED_KEY, JSON.stringify(updatedIssues))
      setSaved(true)
    }

    window.dispatchEvent(new Event('sidequest-saved-updated'))
  }

  return (
    <div className="relative w-full min-h-62 bg-white border border-gray-200 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md hover:border-gray-300 transition">

      {/* DESKTOP / TABLET MAIN VIEW */}
      <div className={`${showMobileDetails ? 'hidden lg:flex' : 'flex'} h-full min-w-0`}>

        {/* MAIN CONTENT */}
        <div className="flex-1 min-w-0 pr-5">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center size-11 shrink-0 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600">
              {issue.icon}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[16px] font-semibold text-indigo-600">{owner}/{repositoryName}</span>
                {issue.verified && <Check className="size-4 text-indigo-500 fill-indigo-100" />}
              </div>

              <h3 className="mt-1 text-[18px] font-bold leading-6 text-gray-900 truncate">
                {issue.title}
              </h3>

              <p className="mt-1.5 max-w-2xl text-[13px] leading-5 text-gray-500 line-clamp-2">
                {issue.description || 'This issue has a clearly defined task that can be worked on by a contributor.'}
              </p>
            </div>
          </div>

          {/* LABELS */}
          <div className="flex flex-wrap items-center gap-2 mt-2.5 ml-14">
            {issue.labels.slice(0, 3).map(label => (
              <span
                key={label}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-full ${
                  label.toLowerCase() === 'good first issue'
                    ? 'text-green-700 bg-green-50'
                    : label.toLowerCase() === 'bug'
                      ? 'text-red-600 bg-red-50'
                      : 'text-indigo-600 bg-indigo-50'
                }`}
              >
                {label}
              </span>
            ))}

            {issue.labels.length > 3 && (
              <span className="px-3 py-1.5 text-[11px] font-medium text-gray-500 bg-gray-50 rounded-full">
                +{issue.labels.length - 3}
              </span>
            )}
          </div>

          {/* STATS */}
          <div className="mt-2 pt-2.5 border-t border-gray-100">
            <div className="flex items-center flex-wrap gap-x-5 gap-y-2 text-[12px] text-gray-500">

              <span className="flex items-center gap-1">
                <Star className="size-4" />
                {formatNumber(issue.stars)}
              </span>

              <span className="flex items-center gap-1">
                <GitFork className="size-4" />
                {formatNumber(issue.forks)}
              </span>

              <span className="flex items-center gap-1">
                <Eye className="size-4" />
                {formatNumber(issue.watchers)}
              </span>

              <span className="flex items-center gap-1">
                <MessageCircle className="size-4" />
                {issue.comments}
              </span>

              <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                <BarChart3 className="size-4 text-green-500" />
                {issue.activity}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-[11px]">
              <span className="size-2.5 rounded-full bg-yellow-400 shrink-0" />
              <span className="font-semibold text-gray-800">{issue.language}</span>

              {issue.technologies.map(technology => (
                <span
                  key={technology}
                  className="px-2.5 py-1 text-[10px] font-medium text-gray-600 bg-gray-100 rounded-md"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEQUEST ANALYSIS */}
        <div className="hidden lg:flex flex-col w-63.75 shrink-0 px-2 border-l border-gray-100">

          <div className="flex items-center gap-2.5">
            <span className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold rounded-xl ${difficultyStyles[issue.difficulty]}`}>
              <BarChart3 className="size-4" />
              {issue.difficulty}
            </span>

            <span className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold text-indigo-700 bg-indigo-50 rounded-xl max-w-full min-w-0">
              <Settings className="size-4 shrink-0" />
              <span className="truncate">{issue.type}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-5">
            <Sparkles className="size-4 text-yellow-500" />
            <p className="text-[13px] font-semibold text-gray-900">Why this fits:</p>
            <Info className="size-3.5 text-gray-400" />
          </div>

          <div className="flex flex-col gap-2.5 mt-3">
            {issue.reasons.slice(0, 2).map(reason => (
              <div key={reason} className="flex items-start gap-2">
                <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-white fill-green-500" />
                <span className="text-[12px] leading-4 text-gray-600">{reason}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleOpportunity}
            className="flex xl:hidden items-center justify-center w-full h-11 gap-2 mt-auto text-[13px] font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            View opportunity
            <ArrowRight className="size-4" />
          </button>
        </div>

        {/* RIGHT INFORMATION */}
        <div className="hidden xl:flex w-46.25 shrink-0 pl-5 border-l border-gray-100 flex-col">

          <div className="text-[14px] font-medium text-gray-500">
            #{issue.number}
          </div>

          <div className="flex flex-col gap-3.5 mt-7">
            <div className="flex items-center gap-2 text-[12px] text-gray-500">
              <Clock3 className="size-4 shrink-0" />
              <span>Opened {issue.opened}</span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-gray-500">
              <Clock3 className="size-4 shrink-0" />
              <span>Updated {issue.updated}</span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-gray-500">
              <UserRound className="size-4 shrink-0" />
              <span>{issue.assignment}</span>
            </div>
          </div>

          <button
            onClick={handleOpportunity}
            className="flex items-center justify-center w-full h-11 gap-2 mt-auto text-[13px] font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            View opportunity
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* DETAILS VIEW */}
      {showMobileDetails && (
        <div className="flex lg:hidden h-full pr-12">

          <div className="flex-1 min-w-0">

            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold rounded-xl ${difficultyStyles[issue.difficulty]}`}>
                <BarChart3 className="size-4" />
                {issue.difficulty}
              </span>

              <span className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-indigo-700 bg-indigo-50 rounded-xl">
                <Settings className="size-4" />
                {issue.type}
              </span>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <span className="text-[13px] font-medium text-gray-500">
                #{issue.number}
              </span>

              <div className="flex items-center gap-2 text-[12px] text-gray-500">
                <Clock3 className="size-4" />
                Opened {issue.opened}
              </div>

              <div className="flex items-center gap-2 text-[12px] text-gray-500">
                <Clock3 className="size-4" />
                Updated {issue.updated}
              </div>

              <div className="flex items-center gap-2 text-[12px] text-gray-500">
                <UserRound className="size-4" />
                {issue.assignment}
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-4">
              <Sparkles className="size-4 text-yellow-500" />
              <p className="text-[13px] font-semibold text-gray-900">Why this fits:</p>
              <Info className="size-3.5 text-gray-400" />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              {issue.reasons.slice(0, 2).map(reason => (
                <div key={reason} className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 mt-0.5 text-white fill-green-500" />
                  <span className="text-[11px] leading-4 text-gray-600">{reason}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleOpportunity}
              className="flex items-center justify-center w-full h-10 gap-2 mt-3 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            >
              View opportunity
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        aria-label={saved ? 'Remove saved opportunity' : 'Save opportunity'}
        className={`absolute right-5 top-5 flex items-center justify-center size-9 border rounded-lg transition ${
          saved
            ? 'text-indigo-600 bg-indigo-50 border-indigo-200'
            : 'text-gray-500 border-gray-200 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200'
        }`}
      >
        <Bookmark className={`size-4 ${saved ? 'fill-current' : ''}`} />
      </button>

      {/* MOBILE FORWARD BUTTON */}
      <button
        onClick={() => setShowMobileDetails(!showMobileDetails)}
        aria-label={showMobileDetails ? 'Show main information' : 'Show more information'}
        className="flex lg:hidden absolute right-5 top-16 items-center justify-center size-9 text-gray-500 border border-gray-200 rounded-lg hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition"
      >
        <Forward className={`size-4 transition-transform duration-200 ${showMobileDetails ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}

export default IssueCard