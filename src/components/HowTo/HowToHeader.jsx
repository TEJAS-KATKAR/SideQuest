import React from 'react'
import {CircleQuestionMark, Search} from 'lucide-react'

const HowToHeader = ({search, setSearch}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center size-14 bg-indigo-100 rounded-2xl">
        <CircleQuestionMark className="size-7 text-indigo-600" />
      </div>

      <h1 className="mt-4 text-[30px] font-bold text-gray-900">
        How can we help?
      </h1>

      <p className="max-w-2xl mt-2 text-[15px] leading-6 text-gray-500">
        Find quick answers about SideQuest, discovering repositories, finding contribution opportunities, and more.
      </p>

      <div className="flex items-center w-full max-w-2xl h-12 px-4 mt-6 bg-white border border-gray-200 rounded-xl shadow-sm focus-within:border-indigo-400 focus-within:ring-3 focus-within:ring-indigo-50 transition">
        <Search className="size-5 mr-3 text-gray-400 shrink-0" />

        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full text-[14px] text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  )
}

export default HowToHeader