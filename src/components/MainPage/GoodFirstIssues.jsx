import React, {useEffect, useState} from 'react'
import {CircleDot, ExternalLink, ArrowRight} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import API_BASE from '../../config/api'

const IssueSkeleton = () => {
  return (
    <div className="flex items-center gap-4 px-5 py-4 animate-pulse">
      <div className="w-5 h-5 rounded-full bg-gray-200 shrink-0" />

      <div className="flex-1 min-w-0">
        <div className="w-3/4 h-3.5 bg-gray-200 rounded" />
        <div className="w-1/2 h-3 mt-2 bg-gray-100 rounded" />
      </div>

      <div className="hidden sm:flex gap-2">
        <div className="w-20 h-5 bg-gray-100 rounded-md" />
        <div className="w-20 h-5 bg-gray-100 rounded-md" />
      </div>

      <div className="w-8 h-8 bg-gray-100 rounded-lg shrink-0" />
    </div>
  )
}

const GoodFirstIssues = () => {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()

    const loadIssues = async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams()

        params.set('beginner', 'true')
        params.set('sort', 'Best match')
        params.set('page', '1')
        params.set('per_page', '4')

        const response = await fetch(
          `${API_BASE}/api/contributions/search?${params.toString()}`,
          {signal: controller.signal}
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data?.error || 'Failed to load issues')
        }

        setIssues((data.issues || []).slice(0, 4))
      } catch (error) {
        if (error.name === 'AbortError') return

        console.error('Good first issues error:', error)
        setError(error.message || 'Unable to load issues.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadIssues()

    return () => controller.abort()
  }, [])

  return (
    <section className="px-5 sm:px-7 lg:px-8 pb-10">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <p className="text-lg font-semibold text-gray-900">
            Good First Issues
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Start contributing without getting overwhelmed.
          </p>
        </div>

        <button
          onClick={() => navigate('/contributions')}
          className="flex items-center gap-1 text-sm text-indigo-600 font-medium shrink-0 hover:text-indigo-700"
        >
          Find more
          <ArrowRight size={15}/>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <>
            <IssueSkeleton />
            <IssueSkeleton />
            <IssueSkeleton />
            <IssueSkeleton />
          </>
        ) : error ? (
          <div className="p-5 text-sm text-gray-500">
            Unable to load good first issues.
          </div>
        ) : issues.length === 0 ? (
          <div className="p-5 text-sm text-gray-500">
            No good first issues are available right now.
          </div>
        ) : (
          issues.map((issue, index) => {
            const owner = issue.owner || issue.repo?.split('/')[0] || ''
            const repositoryName = issue.repositoryName || issue.repo?.split('/')[1] || ''

            return (
              <div
                key={issue.id || `${issue.repo}-${issue.number}`}
                className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 ${
                  index !== issues.length - 1
                    ? 'border-b border-gray-100'
                    : ''
                }`}
              >
                <CircleDot
                  size={18}
                  className="text-green-500 shrink-0"
                />

                <button
                  onClick={() => navigate(`/contributions/${owner}/${repositoryName}/${issue.number}`)}
                  className="flex-1 min-w-0 text-left"
                >
                  <p className="text-sm font-medium text-gray-900 truncate hover:text-indigo-600">
                    {issue.title}
                  </p>

                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {issue.repo || `${owner}/${repositoryName}`} · {issue.language || 'Unknown'}
                  </p>
                </button>

                <div className="hidden sm:flex items-center gap-2 max-w-[35%]">
                  {(issue.labels || []).slice(0, 2).map(label => (
                    <span
                      key={label}
                      className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-[10px] truncate"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/contributions/${owner}/${repositoryName}/${issue.number}`)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-indigo-600 shrink-0"
                  aria-label="View issue"
                >
                  <ExternalLink size={16}/>
                </button>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}

export default GoodFirstIssues
