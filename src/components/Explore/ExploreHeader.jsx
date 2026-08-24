import React, {useState} from 'react'
import {CircleQuestionMark, Compass, Search, X} from 'lucide-react'

const ExploreHeader = () => {
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    console.log('Searching for:', search)
  }

  
  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 bg-indigo-200 rounded-xl">
            <Compass className="text-indigo-700 size-8" />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-[30px] font-bold text-gray-900">Explore Repositories</h1>
            <p className="text-sm font-medium text-gray-600">Discover amazing open source projects and find the perfect one to contribute to.</p>
          </div>
        </div>

        <button onClick={() => alert('Find repositories, use filters, and discover projects that match your interests.')} className="flex items-center justify-center h-10 gap-2 px-4 mr-2 text-sm font-semibold bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition">
          <CircleQuestionMark className="size-5" />
          <span>How it works</span>
        </button>

      </div>

      {/* Search */}
      <div className="flex gap-5">

        <div className="flex items-center flex-1 h-24 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">

          <div className="flex items-center flex-1 h-12 px-4 border border-gray-300 rounded-l-xl">

            <Search className="mr-3 text-gray-400 size-5 shrink-0" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search repositories, topics, or languages..."
              className="w-full text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
            />

            {search && (
              <button onClick={() => setSearch('')} className="p-1 text-gray-400 rounded hover:bg-gray-100">
                <X className="size-4" />
              </button>
            )}

          </div>

          <button onClick={handleSearch} className="flex items-center justify-center h-12 gap-2 px-7 font-medium text-white bg-indigo-600 rounded-r-xl hover:bg-indigo-700 active:bg-indigo-800 transition">
            <Search className="size-4" />
            Search
          </button>

        </div>

        {/* Popular searches */}
        <div className="flex flex-col justify-center flex-1 h-24 px-5 bg-white border border-gray-200 rounded-xl shadow-sm">

          <p className="mb-3 text-xs font-semibold text-gray-700">Popular searches</p>

          <div className="flex flex-wrap gap-2">

            <button onClick={() => setSearch('react')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition">
              #react
            </button>
            <button onClick={() => setSearch('python')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition">#python</button>
            <button onClick={() => setSearch('web')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition">#web</button>
            <button onClick={() => setSearch('machine-learning')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition">#machine-learning</button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ExploreHeader