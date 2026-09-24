import React, {useEffect, useState} from 'react'
import IssueCard from './IssueCard'
import API_BASE from '../../config/api'

const IssueList = ({search, filters}) => {
  const [issues, setIssues] = useState([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('Best match')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setPage(1)
  }, [search, filters])

  useEffect(() => {
    const controller = new AbortController()

    const fetchContributions = async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams()

        if (search) {
          params.set('q', search)
        }

        filters.language.forEach(value => params.append('language', value))
        filters.technology.forEach(value => params.append('technology', value))
        filters.labels.forEach(value => params.append('labels', value))
        filters.type.forEach(value => params.append('type', value))

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
          `${API_BASE}/api/contributions/search?${params.toString()}`,
          {signal: controller.signal}
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data?.error || 'Failed to fetch contribution opportunities')
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
    }

    fetchContributions()

    return () => controller.abort()
  }, [search, filters, sort, page])

  const handlePageChange = newPage => {
    setPage(newPage)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map(item => (
          <div key={item} className="w-full h-62 bg-white border border-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center bg-white border border-red-200 rounded-xl">
        <p className="font-semibold text-red-600">Unable to load opportunities</p>
        <p className="mt-1 text-sm text-gray-500">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {total.toLocaleString()} opportunities found
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            Real open-source issues matched to your current filters
          </p>
        </div>

        <select
          value={sort}
          onChange={event => {
            setSort(event.target.value)
            setPage(1)
          }}
          className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg outline-none"
        >
          <option>Best match</option>
          <option>Recently opened</option>
          <option>Recently updated</option>
          <option>Most active</option>
          <option>Lowest difficulty</option>
        </select>
      </div>

      {issues.length === 0 ? (
        <div className="p-10 text-center bg-white border border-gray-200 rounded-xl">
          <p className="font-semibold text-gray-900">No opportunities found</p>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-40"
          >
            Previous
          </button>

          <span className="px-3 py-2 text-xs font-semibold text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default IssueList
