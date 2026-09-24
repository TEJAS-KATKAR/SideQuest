import React, {useEffect, useState} from 'react'
import {GitFork, Star, ArrowRight, ExternalLink} from 'lucide-react'
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

const RepositorySkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-200" />
        <div className="w-24 h-5 rounded-md bg-gray-200" />
      </div>

      <div className="w-3/4 h-4 mt-4 bg-gray-200 rounded" />
      <div className="w-full h-3 mt-3 bg-gray-100 rounded" />
      <div className="w-5/6 h-3 mt-2 bg-gray-100 rounded" />

      <div className="flex gap-4 mt-5">
        <div className="w-16 h-3 bg-gray-100 rounded" />
        <div className="w-14 h-3 bg-gray-100 rounded" />
        <div className="w-14 h-3 bg-gray-100 rounded" />
      </div>
    </div>
  )
}

const RecommendedRepos = () => {
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()

    const loadRepositories = async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams()

        params.set('q', 'open source')
        params.set('page', '1')
        params.set('per_page', '3')
        params.set('sortMetric', 'stars')
        params.set('sortOrder', 'desc')

        const response = await fetch(
          `http://localhost:5000/api/repositories/search?${params.toString()}`,
          {signal: controller.signal}
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data?.error || 'Failed to load repositories')
        }

        setRepositories((data.repositories || []).slice(0, 3))
      } catch (error) {
        if (error.name === 'AbortError') return

        console.error('Recommended repositories error:', error)
        setError(error.message || 'Unable to load repositories.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRepositories()

    return () => controller.abort()
  }, [])

  return (
    <section className="px-5 sm:px-7 lg:px-8 pb-8">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <p className="text-lg font-semibold text-gray-900">
            Recommended for you
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Projects worth exploring based on what's popular on GitHub.
          </p>
        </div>

        <button
          onClick={() => navigate('/explore')}
          className="flex items-center gap-1 text-sm text-indigo-600 font-medium shrink-0 hover:text-indigo-700"
        >
          View all
          <ArrowRight size={15}/>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <RepositorySkeleton />
          <RepositorySkeleton />
          <RepositorySkeleton />
        </div>
      ) : error ? (
        <div className="p-5 bg-white border border-red-100 rounded-xl text-sm text-gray-500">
          Unable to load recommended repositories.
        </div>
      ) : repositories.length === 0 ? (
        <div className="p-5 bg-white border border-gray-200 rounded-xl text-sm text-gray-500">
          No repositories are available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {repositories.map(repo => {
            const owner = repo.owner || repo.fullName?.split('/')[0] || ''
            const repositoryName = repo.repo || repo.name || repo.fullName?.split('/')[1] || ''
            const fullName = repo.fullName || `${owner}/${repositoryName}`

            return (
              <button
                key={repo.id || fullName}
                onClick={() => navigate(`/repository/${owner}/${repositoryName}`)}
                className="text-left bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center font-bold text-gray-700 shrink-0">
                    {repo.avatarUrl ? (
                      <img
                        src={repo.avatarUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      repositoryName.charAt(0).toUpperCase()
                    )}
                  </div>

                  <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-green-50 text-green-600 font-medium">
                    {repo.beginner ? 'Beginner friendly' : 'Open source'}
                  </span>
                </div>

                <p className="font-semibold text-sm mt-4 text-gray-900 truncate">
                  {fullName}
                </p>

                <p className="text-xs text-gray-500 mt-2 leading-5 line-clamp-2">
                  {repo.description || 'No repository description available.'}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-gray-500">
                  <span>{repo.language || 'Unknown'}</span>

                  <span className="flex items-center gap-1">
                    <Star size={13}/>
                    {formatNumber(repo.stars)}
                  </span>

                  <span className="flex items-center gap-1">
                    <GitFork size={13}/>
                    {formatNumber(repo.forks)}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default RecommendedRepos