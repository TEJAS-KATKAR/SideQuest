import React, {useEffect, useState} from 'react'
import RepositoryCard from './RepositoryCard'
import API_BASE from '../../config/api'

const formatTotalRepositories = number => {
  const value = Number(number) || 0

  if (value < 100) {
    return value.toString()
  }

  if (value < 500) {
    return '100+'
  }

  if (value < 1000) {
    return '500+'
  }

  if (value < 10000) {
    return '1,000+'
  }

  if (value < 100000) {
    return '10,000+'
  }

  if (value < 1000000) {
    return '100,000+'
  }

  return '1,000,000+'
}

const RepositoryList = ({
  search,
  filters,
  metricSort,
  sortOrder,
  page,
  setTotalPages
}) => {
  const [repositories, setRepositories] = useState([])
  const [totalRepositories, setTotalRepositories] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const timer = setTimeout(async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams()

        params.set(
          'q',
          search || 'open source'
        )

        params.set('page', page)
        params.set('per_page', 10)

        filters.language.forEach(value => {
          params.append('language', value)
        })

        filters.topics.forEach(value => {
          params.append('topic', value)
        })

        if (filters.stars) {
          params.set('stars', filters.stars)
        }

        if (filters.forks) {
          params.set('forks', filters.forks)
        }

        if (filters.watchers) {
          params.set('watchers', filters.watchers)
        }

        if (filters.license) {
          params.set('license', filters.license)
        }

        if (filters.activity) {
          params.set('activity', filters.activity)
        }

        if (filters.beginner) {
          params.set('beginner', 'true')
        }

        if (metricSort) {
          params.set('sortMetric', metricSort)
          params.set('sortOrder', sortOrder)
        }

        const response = await fetch(
          `${API_BASE}/api/repositories/search?${params}`,
          {
            signal: controller.signal
          }
        )

        if (!response.ok) {
          const data =
            await response.json().catch(() => null)

          throw new Error(
            data?.error ||
            'Failed to fetch repositories'
          )
        }

        const data = await response.json()

        setRepositories(
          data.repositories || []
        )

        setTotalRepositories(
          Number(data.total) || 0
        )

        const pages = Math.min(
          Math.ceil(
            (Number(data.total) || 0) /
            (Number(data.perPage) || 10)
          ),
          100
        )

        setTotalPages(
          pages || 1
        )

      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        console.error(
          'Repository fetch error:',
          error
        )

        setRepositories([])
        setTotalRepositories(0)
        setTotalPages(1)

        setError(
          error.message ||
          'Unable to load repositories.'
        )

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }

    }, 350)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }

  }, [
    search,
    filters.language,
    filters.topics,
    filters.stars,
    filters.forks,
    filters.watchers,
    filters.license,
    filters.activity,
    filters.beginner,
    metricSort,
    sortOrder,
    page,
    setTotalPages
  ])

  if (loading) {
    return (
      <div className="flex flex-col flex-1 gap-3 min-w-0">

        <div className="px-1">
          <p className="text-sm text-gray-500">
            Finding repositories...
          </p>
        </div>

        {[1, 2, 3].map(item => (
          <div
            key={item}
            className="h-48 bg-white border border-gray-200 rounded-xl animate-pulse"
          />
        ))}

      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 min-h-64 p-8 bg-white border border-red-200 rounded-xl">

        <p className="text-sm font-semibold text-red-600">
          {error}
        </p>

        <p className="mt-2 text-xs text-gray-500">
          Try changing your filters or search.
        </p>

      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 gap-3 min-w-0">

      <div className="flex items-center justify-between px-1">

        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">
            {formatTotalRepositories(
              totalRepositories
            )}
          </span>{' '}
          repositories found
        </p>

        <p className="text-xs text-gray-400">
          Showing GitHub results
        </p>

      </div>

      {repositories.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-64 p-8 bg-white border border-gray-200 rounded-xl">

          <p className="text-sm font-semibold text-gray-800">
            No repositories found
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Try another search or remove some filters.
          </p>

        </div>
      ) : (
        repositories.map(repo => (
          <RepositoryCard
            key={repo.id}
            repo={repo}
          />
        ))
      )}

    </div>
  )
}

export default RepositoryList
