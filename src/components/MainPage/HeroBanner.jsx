import React from 'react'
import gitfinal from '../../assets/gitfinal.png'
import {Search} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const trendingTopics = [
  'React',
  'JavaScript',
  'TypeScript',
  'Python',
  'Node.js',
  'AI',
  'Machine Learning',
  'Web Development',
  'Good First Issue'
]

const HeroBanner = () => {
  const navigate = useNavigate()

  const searchTopic = (topic) => {
    if (topic === 'Good First Issue') {
      navigate(`/contributions?search=${encodeURIComponent(topic)}`)
      return
    }

    navigate(`/explore?q=${encodeURIComponent(topic)}`)
  }

  return (
    <div className="w-full h-30 flex p-6">

      <div className="flex-6 px-12 py-4">
        <p className="mb-3 text-sm font-semibold tracking-wide text-indigo-600">
          ✦ OPEN SOURCE DISCOVERY
        </p>

        <h1 className="text-4xl font-bold leading-tight text-gray-900">
          Discover.
          <span className="text-indigo-600"> Contribute.</span>
          <span className="text-purple-600"> Grow.</span>
        </h1>

        <p className="mt-4 max-w-md text-gray-500 font-semibold leading-relaxed text-[16px]">
          Find beginner-friendly open source projects and
          start your open source journey today.
        </p>

        <div className="flex w-full max-w-2xl mt-7">

          <div className="flex flex-1 items-center h-12 px-4 bg-white border border-gray-200 rounded-l-xl shadow-sm">
            <Search className="w-5 h-5 mr-3 text-gray-400 shrink-0"/>

            <input
              type="text"
              placeholder="Search repositories, topics, or languages..."
              className="w-full text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            className="h-12 px-7 font-medium text-white bg-indigo-600 rounded-r-xl hover:bg-indigo-700 transition"
          >
            Search
          </button>

        </div>

        <div className="flex flex-wrap items-center gap-2 mt-5">

          <span className="mr-1 text-sm text-gray-500">
            Trending:
          </span>

          {trendingTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => searchTopic(topic)}
              className="px-3 py-1 text-xs text-indigo-600 bg-white border border-gray-200 rounded-full hover:bg-indigo-50 hover:border-indigo-200 transition"
            >
              {topic}
            </button>
          ))}

        </div>
      </div>

      <div className="hidden lg:flex flex-3">
        <img
          src={gitfinal}
          alt=""
          className="w-full py-10 object-contain mix-blend-multiply"
        />
      </div>

    </div>
  )
}

export default HeroBanner