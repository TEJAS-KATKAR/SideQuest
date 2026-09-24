import React, {useState} from 'react'
import {Bookmark, ExternalLink, GitFork, Star, Eye} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

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

const RepositoryCard = ({repo}) => {
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()

  const owner = repo.owner || repo.fullName?.split('/')[0] || ''
  const repositoryName = repo.repo || repo.name || repo.fullName?.split('/')[1] || ''
  const displayName = repo.fullName || `${owner}/${repositoryName}`

  const stars = Number(repo.stars) || 0
  const forks = Number(repo.forks) || 0
  const watchers = Number(repo.watchers) || 0

  const openRepository = () => {
    if (!owner || !repositoryName) return
    navigate(`/repository/${owner}/${repositoryName}`)
  }

  return (
    <div className="p-3 sm:p-5 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition">

      <div className="flex items-start justify-between gap-3 sm:gap-5">

        <div className="flex items-start flex-1 min-w-0 gap-3 sm:gap-4">

          <div className={`flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 shrink-0 rounded-lg sm:rounded-xl text-base sm:text-xl font-bold ${repo.iconBg || 'bg-gray-100'} ${repo.iconColor || 'text-gray-900'}`}>
            {repo.icon || repositoryName.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">

            <div className="flex items-center min-w-0 gap-1.5 sm:gap-2">

              <button
                onClick={openRepository}
                className="min-w-0 max-w-full text-sm sm:text-lg font-semibold text-left text-gray-900 truncate hover:text-indigo-600 hover:underline"
              >
                {displayName}
              </button>

              {repo.verified && (
                <span className="flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 text-[8px] sm:text-[10px] font-bold text-white bg-blue-500 rounded-full shrink-0">
                  ✓
                </span>
              )}

            </div>

            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm leading-relaxed text-gray-600 truncate">
              {repo.description || 'No description available.'}
            </p>

            <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

              <span className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-medium text-gray-600 bg-gray-100 rounded-full whitespace-nowrap shrink-0">
                <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${repo.languageColor || 'bg-gray-400'}`}></span>
                {repo.language || 'Unknown'}
              </span>

              {(repo.topics || []).map(topic => (
                <button
                  key={topic}
                  className="px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition whitespace-nowrap shrink-0"
                >
                  {topic}
                </button>
              ))}

              {repo.beginner && (
                <span className="px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-medium text-green-700 bg-green-50 rounded-full whitespace-nowrap shrink-0">
                  Good for beginners
                </span>
              )}

            </div>

          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 shrink-0">

          <button
            onClick={openRepository}
            aria-label="View repository"
            className="flex items-center justify-center size-8 sm:size-auto sm:h-auto gap-2 sm:px-3 sm:py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition"
          >
            <span className="hidden sm:inline">View repo</span>
            <ExternalLink className="size-3.5 sm:size-4" />
          </button>

          <button
            onClick={() => setSaved(!saved)}
            aria-label={saved ? 'Remove from saved' : 'Save repository'}
            className={`flex items-center justify-center size-8 sm:w-9 sm:h-9 border rounded-lg transition ${saved ? 'text-indigo-600 bg-indigo-50 border-indigo-300' : 'text-gray-500 border-gray-300 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300'}`}
          >
            <Bookmark className={`size-3.5 sm:size-4 ${saved ? 'fill-current' : ''}`} />
          </button>

        </div>

      </div>

      <div className="grid grid-cols-3 gap-x-3 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-6 pt-0 sm:pt-4 mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-500 border-t border-gray-100">

        <span
          className="flex items-center gap-1 sm:gap-1.5 min-w-0"
          title={`${stars.toLocaleString()} stars`}
        >
          <Star className="size-3 sm:size-4 shrink-0" />
          {formatNumber(stars)}
        </span>

        <span
          className="flex items-center gap-1 sm:gap-1.5 min-w-0"
          title={`${forks.toLocaleString()} forks`}
        >
          <GitFork className="size-3 sm:size-4 shrink-0" />
          {formatNumber(forks)}
        </span>

        <span
          className="flex items-center gap-1 sm:gap-1.5 min-w-0"
          title={`${watchers.toLocaleString()} watchers`}
        >
          <Eye className="size-3 sm:size-4 shrink-0" />
          {formatNumber(watchers)}
        </span>

        <span className="truncate">
          Updated {repo.updatedAt ? new Date(repo.updatedAt).toLocaleDateString() : 'Unknown'}
        </span>

        <span className="flex items-center gap-1 sm:gap-1.5 min-w-0">

          <span
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${
              repo.activity === 'Archived'
                ? 'bg-gray-400'
                : repo.activity === 'Low activity'
                  ? 'bg-gray-400'
                  : 'bg-green-500'
            }`}
          ></span>

          <span className="truncate">
            {repo.activity || 'Active'}
          </span>

        </span>

      </div>

    </div>
  )
}

export default RepositoryCard