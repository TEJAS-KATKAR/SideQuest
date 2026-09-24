import React, {useEffect, useState} from 'react'
import {ArrowUpRight, Flame, Search, Star} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import API_BASE from '../../config/api'

const topics = ['All', 'React', 'JavaScript', 'Python', 'AI']

const TrendingRepositories = () => {
  const navigate = useNavigate()
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTopic, setActiveTopic] = useState('All')

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true)

        const response = await fetch(
          `${API_BASE}/api/repositories/search?q=open source&page=1&per_page=5&sortMetric=stars&sortOrder=desc`
        )

        if (!response.ok) throw new Error('Failed to fetch trending repositories')

        const data = await response.json()
        setRepositories(data.repositories || [])
      } catch (error) {
        console.error('Trending repositories error:', error)
        setRepositories([])
      } finally {
        setLoading(false)
      }
    }

    fetchTrending()
  }, [])

  const filteredRepositories =
    activeTopic === 'All'
      ? repositories
      : repositories.filter((repo) => {
          const topic = activeTopic.toLowerCase()

          return (
            repo.name?.toLowerCase().includes(topic) ||
            repo.description?.toLowerCase().includes(topic) ||
            repo.language?.toLowerCase() === topic ||
            repo.topics?.some((item) => item.toLowerCase() === topic)
          )
        })

  const formatStars = (stars) => {
    if (stars >= 1000000) return `${(stars / 1000000).toFixed(1)}m`
    if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`
    return stars
  }

  const openRepository = (repo) => {
    navigate(`/repository/${repo.owner}/${repo.repo}`)
  }

  return (
    <section className="w-full px-5 sm:px-8 xl:px-0 pb-8 xl:pb-0">
      <div className="bg-white rounded-xl border border-gray-200 px-4 sm:px-5 py-5 shadow-sm">

        <div className="flex flex-col gap-4">

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Flame size={17} className="text-orange-500 shrink-0"/>
              <p className="font-semibold text-sm sm:text-base">
                Trending Repositories
              </p>
            </div>

            <button
              onClick={() => navigate('/explore')}
              className="flex items-center gap-1 text-xs sm:text-sm text-indigo-600 font-medium hover:text-indigo-700 shrink-0"
            >
              <Search size={14}/>
              Search
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 xl:scrollbar-none xl:[&::-webkit-scrollbar]:hidden">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  activeTopic === topic
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-200 shrink-0"></div>

                    <div className="flex-1 min-w-0">
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2.5 bg-gray-100 rounded w-full mb-1"></div>
                      <div className="h-2.5 bg-gray-100 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRepositories.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredRepositories.slice(0, 4).map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => openRepository(repo)}
                  className="text-left group"
                >
                  <div className="flex items-start gap-3">

                    <img
                      src={repo.avatarUrl}
                      alt=""
                      className="w-9 h-9 rounded-lg shrink-0"
                    />

                    <div className="flex-1 min-w-0">

                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 truncate">
                          {repo.fullName || repo.name}
                        </p>

                        <ArrowUpRight
                          size={14}
                          className="text-gray-300 group-hover:text-indigo-500 shrink-0 mt-0.5"
                        />
                      </div>

                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {repo.description || 'Open source repository'}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-[11px] text-gray-500">
                          <Star size={12}/>
                          {formatStars(repo.stars || 0)}
                        </span>

                        {repo.language && (
                          <span className="text-[11px] text-gray-500">
                            {repo.language}
                          </span>
                        )}
                      </div>

                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 py-2">
              No repositories found for this topic.
            </p>
          )}

          <button
            onClick={() => navigate('/explore')}
            className="w-full flex items-center justify-center gap-1 pt-1 text-xs text-indigo-600 font-medium hover:text-indigo-700"
          >
            Explore trending
            <ArrowUpRight size={13}/>
          </button>

        </div>
      </div>
    </section>
  )
}

export default TrendingRepositories
