import React, {useState} from 'react'
import {Bookmark, ExternalLink, GitFork, Star} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const RepositoryCard = ({repo}) => {
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()

  const owner = repo.owner || repo.name.split('/')[0]
  const repositoryName = repo.repo || repo.name.split('/')[1]

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition">

      <div className="flex items-start justify-between gap-5">

        <div className="flex items-start flex-1 min-w-0 gap-4">

          <div className={`flex items-center justify-center w-12 h-12 shrink-0 rounded-xl text-xl font-bold ${repo.iconBg} ${repo.iconColor}`}>
            {repo.icon}
          </div>

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <button
                onClick={() => navigate(`/repository/${owner}/${repositoryName}`)}
                className="text-lg font-semibold text-left text-gray-900 hover:text-indigo-600 hover:underline"
              >
                {repo.name}
              </button>

              {repo.verified && (
                <span className="flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-blue-500 rounded-full">
                  ✓
                </span>
              )}

            </div>

            <p className="mt-1 text-sm leading-relaxed text-gray-600">
              {repo.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-3">

              <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                <span className={`w-2 h-2 rounded-full ${repo.languageColor || 'bg-gray-400'}`}></span>
                {repo.language}
              </span>

              {repo.topics.map((topic) => (
                <button key={topic} className="px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition">
                  {topic}
                </button>
              ))}

              {repo.beginner && (
                <span className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                  Good for beginners
                </span>
              )}

            </div>

          </div>

        </div>

        <div className="flex items-center gap-2 shrink-0">

          <button
            onClick={() => navigate(`/repository/${owner}/${repositoryName}`)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition"
          >
            View repo
            <ExternalLink className="size-4" />
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center justify-center w-9 h-9 border rounded-lg transition ${
              saved
                ? 'text-indigo-600 bg-indigo-50 border-indigo-300'
                : 'text-gray-500 border-gray-300 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300'
            }`}
          >
            <Bookmark className={`size-4 ${saved ? 'fill-current' : ''}`} />
          </button>

        </div>

      </div>

      <div className="flex items-center gap-6 pt-4 mt-4 text-xs text-gray-500 border-t border-gray-100">

        <span className="flex items-center gap-1.5">
          <Star className="size-4" />
          {repo.stars.toLocaleString()}
        </span>

        <span className="flex items-center gap-1.5">
          <GitFork className="size-4" />
          {repo.forks.toLocaleString()}
        </span>

        <span className="text-gray-400">
          Updated {new Date(repo.updated).toLocaleDateString()}
        </span>

        <span className="flex items-center gap-1.5 ml-auto">
          <span className={`w-2 h-2 rounded-full ${repo.activity === 'Archived' ? 'bg-gray-400' : 'bg-green-500'}`}></span>
          {repo.activity}
        </span>

      </div>

    </div>
  )
}

export default RepositoryCard