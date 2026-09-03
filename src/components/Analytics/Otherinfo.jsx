import React from 'react'
import {ArrowUpRight, Flame, Star, Tag, Trophy} from 'lucide-react'

const Otherinfo = () => {
  return (
    <div className="flex flex-col ml-auto mr-8 w-80 gap-5 my-8">

      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">Your Open Source Journey</p>
          <Trophy size={17} className="text-indigo-500"/>
        </div>

        <div className="h-px w-full bg-gray-100 my-4"></div>

        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-full border-8 border-indigo-400 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-semibold">12</p>
              <p className="text-xs text-gray-500">Points</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div>
              <p className="font-semibold">4</p>
              <p className="text-gray-500 text-xs">Contributions</p>
            </div>
            <div>
              <p className="font-semibold">2</p>
              <p className="text-gray-500 text-xs">Repositories</p>
            </div>
            <div>
              <p className="font-semibold">3</p>
              <p className="text-gray-500 text-xs">Days Active</p>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-1 text-xs text-indigo-600 font-medium mt-5">View your progress <ArrowUpRight size={13}/></button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Flame size={17} className="text-orange-500"/>
          <p className="font-semibold text-sm">Trending Repositories</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium">vercel/next.js</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Star size={12}/> 113k</span>
              <span className="text-green-500">+12.5k today</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">facebook/react</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Star size={12}/> 235k</span>
              <span className="text-green-500">+8.2k today</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">tailwindlabs/tailwindcss</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Star size={12}/> 89k</span>
              <span className="text-green-500">+6.8k today</span>
            </div>
          </div>
        </div>

        <button className="text-xs text-indigo-600 font-medium mt-5">Explore trending →</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 px-5 py-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Tag size={16} className="text-indigo-500"/>
          <p className="font-semibold text-sm">Popular Topics</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">React</span>
          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">Python</span>
          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">AI</span>
          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">Web Development</span>
          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">Machine Learning</span>
        </div>
      </div>

    </div>
  )
}

export default Otherinfo