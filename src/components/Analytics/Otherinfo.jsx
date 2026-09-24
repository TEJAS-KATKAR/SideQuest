import React from 'react'
import {ArrowUpRight, Tag, Trophy} from 'lucide-react'
import TrendingRepositories from '../MainPage/TrendingRepositories'
import {useNavigate} from 'react-router-dom'

const Otherinfo = () => {
  const navigate = useNavigate()


  return (
    <div className="hidden xl:flex flex-col ml-auto mr-8 w-80 shrink-0 gap-5 my-8">

      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">Your Open Source Journey</p>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-semibold">
              Soon
            </span>
          </div>

          <Trophy size={17} className="text-indigo-500"/>
        </div>

        <div className="h-px w-full bg-gray-100 my-4"></div>

        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-full border-8 border-indigo-200 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-400">0</p>
              <p className="text-xs text-gray-500">Points</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div>
              <p className="font-semibold text-gray-400">0</p>
              <p className="text-gray-500 text-xs">Contributions</p>
            </div>

            <div>
              <p className="font-semibold text-gray-400">0</p>
              <p className="text-gray-500 text-xs">Repositories</p>
            </div>

            <div>
              <p className="font-semibold text-gray-400">0</p>
              <p className="text-gray-500 text-xs">Days Active</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mt-5">
          <span>Progress tracking is coming soon</span>
          <ArrowUpRight size={13}/>
        </div>
      </div>

      <TrendingRepositories />

      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5 shadow-sm">
  <div className="flex items-center gap-2 mb-4">
    <Tag size={16} className="text-indigo-500"/>
    <p className="font-semibold text-sm">Popular Topics</p>
  </div>

  <div className="flex flex-wrap gap-2">
    {[
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C++',
      'C#',
      'Go',
      'Rust',
      'PHP',
      'React',
      'Node.js',
      'Next.js',
      'Vue',
      'Angular',
      'AI',
      'Machine Learning'
    ].map((topic) => (
      <button
        key={topic}
        onClick={() => navigate(`/explore?q=${encodeURIComponent(topic)}`)}
        className="px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition"
      >
        {topic}
      </button>
    ))}
  </div>
</div>

    </div>
  )
}

export default Otherinfo