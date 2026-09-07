import React, {useEffect, useState} from 'react'
import IssueCard from './IssueCard'

const IssueList = ({filters, search}) => {
  const [issues, setIssues] = useState([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('Best match')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setPage(1)
  }, [filters, search, sort])

  useEffect(() => {
    const controller = new AbortController()

    const timer = setTimeout(async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams()

        if (search.trim()) {
          params.set('q', search.trim())
        }

        filters.language.forEach(value => {
          params.append('language', value)
        })

        filters.technology.forEach(value => {
          params.append('technology', value)
        })

        filters.labels.forEach(value => {
          params.append('labels', value)
        })

        filters.type.forEach(value => {
          params.append('type', value)
        })

        if (filters.difficulty !== 'All') {
          params.set('difficulty', filters.difficulty)
        }

        if (filters.activity !== 'All') {
          params.set('activity', filters.activity)
        }

        if (filters.assignment !== 'All') {
          params.set('assignment', filters.assignment)
        }

        if (filters.issueAge !== 'All') {
          params.set('issueAge', filters.issueAge)
        }

        if (filters.discussion !== 'All') {
          params.set('discussion', filters.discussion)
        }

        if (filters.beginner) {
          params.set('beginner', 'true')
        }

        params.set('sort', sort)
        params.set('page', String(page))
        params.set('per_page', '10')

        const response = await fetch(
          `http://localhost:5000/api/contributions/search?${params.toString()}`,
          {
            signal: controller.signal
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data?.error || 'Failed to load contribution opportunities'
          )
        }

        setIssues(data.issues || [])
        setTotal(Number(data.total) || 0)
        setTotalPages(Number(data.totalPages) || 1)
      } catch (error) {
        if (error.name === 'AbortError') return

        console.error('Contribution fetch error:', error)
        setIssues([])
        setTotal(0)
        setTotalPages(1)
        setError(error.message || 'Unable to load contribution opportunities.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [filters, search, sort, page])

  const handlePageChange = nextPage => {
    if (nextPage < 1 || nextPage > totalPages) return
    setPage(nextPage)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const renderSkeletons = () => (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map(item => (
        <div
          key={item}
          className="w-full min-h-62 px-6 py-5 bg-white border border-gray-200 rounded-2xl animate-pulse"
        >
          <div className="flex gap-3">
            <div className="size-11 rounded-lg bg-gray-200 shrink-0" />
            <div className="flex-1">
              <div className="w-40 h-4 bg-gray-200 rounded" />
              <div className="w-3/4 h-5 mt-3 bg-gray-200 rounded" />
              <div className="w-full h-3 mt-3 bg-gray-100 rounded" />
              <div className="w-2/3 h-3 mt-2 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []

    if (totalPages <= 5) {
      for (let index = 1; index <= totalPages; index += 1) {
        pages.push(index)
      }
    } else {
      pages.push(1)

      if (page > 3) {
        pages.push('...')
      }

      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)

      for (let index = start; index <= end; index += 1) {
        pages.push(index)
      }

      if (page < totalPages - 2) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-5">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="h-8 px-3 text-xs font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {pages.map((item, index) =>
          item === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => handlePageChange(item)}
              className={`w-8 h-8 text-xs font-semibold rounded-md transition ${
                item === page
                  ? 'text-white bg-blue-500'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="h-8 px-3 text-xs font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    )
  }

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {total} opportunities found
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Real open-source issues matched to your current filters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-gray-500 sm:inline">
            Sort by:
          </span>

          <select
            value={sort}
            onChange={event => setSort(event.target.value)}
            className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg outline-none hover:border-gray-300"
          >
            <option>Best match</option>
            <option>Recently opened</option>
            <option>Recently updated</option>
            <option>Most active</option>
            <option>Lowest difficulty</option>
          </select>
        </div>
      </div>

      {loading && renderSkeletons()}

      {!loading && error && (
        <div className="p-8 text-center bg-white border border-red-200 rounded-xl">
          <p className="font-semibold text-gray-900">
            Couldn't load contribution opportunities
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && issues.length === 0 && (
        <div className="p-10 text-center bg-white border border-gray-200 rounded-xl">
          <p className="font-semibold text-gray-900">
            No opportunities found
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your filters or search terms.
          </p>
        </div>
      )}

      {!loading && !error && issues.length > 0 && (
        <>
          <div className="flex flex-col gap-3">
            {issues.map(issue => (
              <IssueCard
                key={`${issue.repo}-${issue.number}`}
                issue={issue}
              />
            ))}
          </div>

          {renderPagination()}
        </>
      )}
    </div>
  )
}

export default IssueList