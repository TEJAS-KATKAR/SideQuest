import React, {useEffect, useState} from 'react'
import RepositoryCard from './RepositoryCard'

const RepositoryList = ({search, filters, page, setTotalPages}) => {
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({
          q: search || 'open source',
          page,
          per_page: 10
        })

        if (filters.language) {
          params.append('language', filters.language)
        }

        const response = await fetch(`http://localhost:5000/api/repositories/search?${params}`)

        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }

        const data = await response.json()

        setRepositories(data.repositories)

        const pages = Math.min(Math.ceil(data.total / data.perPage), 100)
        setTotalPages(pages)
      } catch (error) {
        console.error(error)
        setRepositories([])
        setTotalPages(1)
        setError('Unable to load repositories. Make sure the SideQuest server is running.')
      } finally {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [search, filters.language, page, setTotalPages])

  if (loading) {
    return (
      <div className="flex flex-col flex-1 gap-3 min-w-0">

        <div className="px-1">
          <p className="text-sm text-gray-500">Finding repositories...</p>
        </div>

        {[1, 2, 3].map((item) => (
          <div key={item} className="h-48 bg-white border border-gray-200 rounded-xl animate-pulse" />
        ))}

      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 min-h-64 p-8 bg-white border border-red-200 rounded-xl">
        <p className="text-sm font-semibold text-red-600">{error}</p>
        <p className="mt-2 text-xs text-gray-500">Start the backend with <span className="font-semibold">node server.js</span>.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 gap-3 min-w-0">

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{repositories.length}</span> repositories found
        </p>

        <p className="text-xs text-gray-400">
          Showing GitHub results
        </p>
      </div>

      {repositories.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-64 p-8 bg-white border border-gray-200 rounded-xl">
          <p className="text-sm font-semibold text-gray-800">No repositories found</p>
          <p className="mt-1 text-xs text-gray-500">Try another search or remove some filters.</p>
        </div>
      ) : (
        repositories.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))
      )}

    </div>
  )
}

export default RepositoryList