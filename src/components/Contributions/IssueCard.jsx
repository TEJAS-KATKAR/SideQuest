import React, {useEffect, useRef, useState} from 'react'
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

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace('.0', '')}m`
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace('.0', '')}k`
  }

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

const TagOverflow = ({items = [], visible = 3, variant = 'label'}) => {
  const [open, setOpen] = useState(false)
  const popupRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = event => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [open])

  if (!items.length) return null

  const visibleItems = items.slice(0, visible)
  const hiddenCount = items.length - visible

  const itemClass = variant === 'technology'
    ? 'px-2.5 py-1 text-[10px] font-medium text-gray-600 bg-gray-100 rounded-md'
    : 'px-3 py-1.5 text-[11px] font-medium rounded-full'

  const getLabelClass = item => {
    const normalized = String(item).toLowerCase()

    if (normalized === 'good first issue') {
      return 'text-green-700 bg-green-50'
    }

    if (normalized === 'bug') {
      return 'text-red-600 bg-red-50'
    }

    return 'text-indigo-600 bg-indigo-50'
  }

  return (
    <div ref={popupRef} className="relative flex flex-wrap items-center gap-2">
      {visibleItems.map(item => (
        <span
          key={item}
          className={`${itemClass} ${variant === 'label' ? getLabelClass(item) : ''}`}
        >
          {item}
        </span>
      ))}

      {hiddenCount > 0 && (
        <button
          onClick={() => setOpen(!open)}
          className="px-2.5 py-1 text-[10px] font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-md hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition"
        >
          +{hiddenCount}
        </button>
      )}

      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-56 max-w-[calc(100vw-3rem)] max-h-44 overflow-y-auto p-2 bg-white border border-gray-200 rounded-xl shadow-lg">
          <div className="flex flex-wrap gap-2">
            {items.map(item => (
              <span
                key={item}
                className={`${itemClass} ${variant === 'label' ? getLabelClass(item) : ''}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const IssueCard = ({issue}) => {
  const [showMobileDetails, setShowMobileDetails] = useState(false)

  const [saved, setSaved] = useState(() => {
    const savedIssues = getSavedIssues()
    return savedIssues.some(savedIssue => savedIssue.id === issue.id)
  })

  const navigate = useNavigate()

  const owner = issue.owner || issue.repo?.split('/')[0] || ''
  const repositoryName = issue.repositoryName || issue.repo?.split('/')[1] || ''
  const repositoryPath = issue.repo || `${owner}/${repositoryName}`

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
    if (!owner || !repositoryName || !issue.number) return

    navigate(`/contributions/${owner}/${repositoryName}/${issue.number}`)
  }

  const handleSave = () => {
    const savedIssues = getSavedIssues()

    if (saved) {
      const updatedIssues = savedIssues.filter(
        savedIssue => savedIssue.id !== issue.id
      )

      localStorage.setItem(SAVED_KEY, JSON.stringify(updatedIssues))
      setSaved(false)
    } else {
      const updatedIssues = [
        ...savedIssues.filter(savedIssue => savedIssue.id !== issue.id),
        issue
      ]

      localStorage.setItem(SAVED_KEY, JSON.stringify(updatedIssues))
      setSaved(true)
    }

    window.dispatchEvent(new Event('sidequest-saved-updated'))
  }

  return (
    <div className="relative w-full min-h-62 px-6 py-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition">
      <div className={`${showMobileDetails ? 'hidden xl:flex' : 'flex'} h-full min-w-0`}>
        <div className="flex-1 min-w-0 pr-5">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center size-11 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
              {issue.avatarUrl ? (
                <img src={issue.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-semibold text-gray-600">
                  {issue.icon || repositoryName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[16px] font-semibold text-indigo-600 truncate">
                  {repositoryPath}
                </span>

                {issue.verified && (
                  <Check className="size-4 text-indigo-500 fill-indigo-100 shrink-0" />
                )}
              </div>

              <h3 className="mt-1 text-[18px] font-bold leading-6 text-gray-900 truncate">
                {issue.title}
              </h3>

              <p className="mt-1.5 max-w-2xl text-[13px] leading-5 text-gray-500 line-clamp-2">
                {issue.description || 'This issue has a clearly defined task that can be worked on by a contributor.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2.5 ml-14">
            <TagOverflow items={issue.labels} visible={3} variant="label" />
          </div>

          <div className="mt-2 pt-2.5 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-[12px] text-gray-500">
              <span className="flex items-center gap-1 min-w-0">
                <Star className="size-4 shrink-0" />
                <span className="truncate">{formatNumber(issue.stars)}</span>
              </span>

              <span className="flex items-center gap-1 min-w-0">
                <GitFork className="size-4 shrink-0" />
                <span className="truncate">{formatNumber(issue.forks)}</span>
              </span>

              <span className="flex items-center gap-1 min-w-0">
                <MessageCircle className="size-4 shrink-0" />
                <span className="truncate">{issue.comments ?? 0}</span>
              </span>

              <span className="flex items-center gap-1 min-w-0">
                <BarChart3 className="size-4 text-green-500 shrink-0" />
                <span className="truncate font-semibold text-gray-800">
                  {issue.activity || 'Unknown'}
                </span>
              </span>

              <span className="flex items-center gap-1 min-w-0">
                <Eye className="size-4 shrink-0" />
                <span className="truncate">{formatNumber(issue.watchers)}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-[11px]">
              <span className="size-2.5 rounded-full bg-yellow-400 shrink-0" />

              <span className="font-semibold text-gray-800">
                {issue.language || 'Unknown'}
              </span>

              <div className="min-w-0 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
                <TagOverflow items={issue.technologies} visible={2} variant="technology" />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex flex-col w-63.75 shrink-0 px-2 border-l border-gray-100">
          <div className="flex items-center gap-2.5">
            <span className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold rounded-xl ${difficultyStyles[issue.difficulty] || difficultyStyles.Easy}`}>
              <BarChart3 className="size-4" />
              {issue.difficulty || 'Easy'}
            </span>

            <span className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold text-indigo-700 bg-indigo-50 rounded-xl max-w-full min-w-0">
              <Settings className="size-4 shrink-0" />
              <span className="truncate">{issue.type || 'General'}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-5">
            <Sparkles className="size-4 text-yellow-500" />
            <p className="text-[13px] font-semibold text-gray-900">Why this fits:</p>
            <Info className="size-3.5 text-gray-400" />
          </div>

          <div className="flex flex-col gap-2.5 mt-3">
            {(issue.reasons || []).slice(0, 2).map(reason => (
              <div key={reason} className="flex items-start gap-2">
                <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-white fill-green-500" />
                <span className="text-[12px] leading-4 text-gray-600">
                  {reason}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden xl:flex w-46.25 shrink-0 pl-5 border-l border-gray-100 flex-col">
          <div className="text-[14px] font-medium text-gray-500">
            #{issue.number}
          </div>

          <div className="flex flex-col gap-3.5 mt-7">
            <div className="flex items-center gap-2 text-[12px] text-gray-500">
              <Clock3 className="size-4 shrink-0" />
              <span>Opened {issue.opened || 'Unknown'}</span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-gray-500">
              <Clock3 className="size-4 shrink-0" />
              <span>Updated {issue.updated || 'Unknown'}</span>
            </div>

            <div className="flex items-center gap-2 text-[12px] text-gray-500">
              <UserRound className="size-4 shrink-0" />
              <span>{issue.assignment || 'Unassigned'}</span>
            </div>
          </div>

          <button
            onClick={handleOpportunity}
            className="flex items-center justify-center w-full h-11 gap-2 mt-auto text-[13px] font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition"
          >
            View opportunity
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {showMobileDetails && (
        <div className="flex xl:hidden h-full pr-12">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold rounded-xl ${difficultyStyles[issue.difficulty] || difficultyStyles.Easy}`}>
                <BarChart3 className="size-4" />
                {issue.difficulty || 'Easy'}
              </span>

              <span className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-indigo-700 bg-indigo-50 rounded-xl min-w-0">
                <Settings className="size-4 shrink-0" />
                <span className="truncate">{issue.type || 'General'}</span>
              </span>
            </div>

            <span className="block mt-5 text-[13px] font-medium text-gray-500">
              #{issue.number}
            </span>

            <div className="grid grid-cols-3 gap-4 mt-5">
              <div className="flex flex-col gap-3">
                <p className="text-[12px] font-semibold text-gray-800">
                  Issue details
                </p>

                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <Clock3 className="size-4 shrink-0" />
                  <span className="truncate">Opened {issue.opened || 'Unknown'}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <Clock3 className="size-4 shrink-0" />
                  <span className="truncate">Updated {issue.updated || 'Unknown'}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <UserRound className="size-4 shrink-0" />
                  <span className="truncate">{issue.assignment || 'Unassigned'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-0">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="size-4 text-yellow-500 shrink-0" />
                  <p className="text-[12px] font-semibold text-gray-900">Why this fits:</p>
                  <Info className="size-3.5 text-gray-400 shrink-0" />
                </div>

                <div className="flex flex-col gap-2.5">
                  {(issue.reasons || []).slice(0, 3).map(reason => (
                    <div key={reason} className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 mt-0.5 text-white fill-green-500 shrink-0" />
                      <span className="text-[11px] leading-4 text-gray-600">
                        {reason}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleOpportunity}
              className="flex items-center justify-center w-full h-10 gap-2 mt-5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition"
            >
              View opportunity
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

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

      <button
        onClick={() => setShowMobileDetails(!showMobileDetails)}
        aria-label={showMobileDetails ? 'Show main information' : 'Show more information'}
        className="flex xl:hidden absolute right-5 top-16 items-center justify-center size-9 text-gray-500 border border-gray-200 rounded-lg hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 active:scale-95 transition"
      >
        <Forward className={`size-4 transition-transform duration-200 ${showMobileDetails ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}

export default IssueCard