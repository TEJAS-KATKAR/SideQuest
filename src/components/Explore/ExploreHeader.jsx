import React from 'react'
import {CircleQuestionMark, Compass, Search, SlidersHorizontal, X} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const ExploreHeader = ({
  search,
  setSearch,
  onSearch,
  onFilterOpen,
  selectedFilterCount
}) => {
  const navigate = useNavigate()

  const openHowTo = () => {
    navigate('/howto?section=explore')
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-start justify-between gap-3">

        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center justify-center w-14 h-14 bg-indigo-200 rounded-xl shrink-0">
            <Compass className="text-indigo-700 size-8" />
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <h1 className="text-[25px] sm:text-[30px] font-bold text-gray-900 truncate">
              Explore Repositories
            </h1>

            <p className="text-sm font-medium text-gray-600 line-clamp-2 sm:line-clamp-1">
              Discover amazing open source projects and find the perfect one to contribute to.
            </p>
          </div>
        </div>

        <button
          onClick={openHowTo}
          aria-label="How it works"
          className="flex items-center justify-center h-10 gap-2 px-3 sm:px-4 sm:mr-2 text-sm font-semibold bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition shrink-0"
        >
          <CircleQuestionMark className="size-5" />
          <span className="hidden sm:inline">How it works</span>
        </button>

      </div>

      <div className="flex flex-col xl:flex-row gap-4 xl:gap-5">

        <div className="flex flex-col w-full xl:flex-1 min-w-0 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">

          <div className="flex items-center w-full h-12">

            <div className="flex items-center flex-1 min-w-0 h-12 px-4 border border-gray-300 rounded-l-xl">

              <Search className="mr-3 text-gray-400 size-5 shrink-0" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                placeholder="Search repositories, topics, or languages..."
                className="w-full min-w-0 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
              />

              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="p-1 text-gray-400 rounded hover:bg-gray-100 shrink-0"
                >
                  <X className="size-4" />
                </button>
              )}

            </div>

            <button
              onClick={onSearch}
              className="flex items-center justify-center h-12 gap-2 px-5 sm:px-7 font-medium text-white bg-indigo-600 rounded-r-xl hover:bg-indigo-700 active:bg-indigo-800 transition shrink-0"
            >
              <Search className="size-4" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              onClick={onFilterOpen}
              aria-label="Open filters"
              className="relative flex items-center justify-center size-12 ml-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition md:hidden shrink-0"
            >
              <SlidersHorizontal className="size-5" />

              {selectedFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold text-white bg-indigo-600 rounded-full">
                  {selectedFilterCount}
                </span>
              )}
            </button>

          </div>

          <div className="flex items-center gap-2 mt-3 min-w-0">

            <span className="text-xs font-semibold text-gray-700 shrink-0">
              Popular:
            </span>

            <div
              className="flex gap-2 overflow-x-auto pb-1 min-w-0 scrollbar-none [&::-webkit-scrollbar]:hidden"
            >

              <button onClick={() => onSearch('react')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition whitespace-nowrap shrink-0">#react</button>

              <button onClick={() => onSearch('python')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition whitespace-nowrap shrink-0">#python</button>

              <button onClick={() => onSearch('web')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition whitespace-nowrap shrink-0">#web</button>

              <button onClick={() => onSearch('machine-learning')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition whitespace-nowrap shrink-0">#machine-learning</button>

              <button onClick={() => onSearch('nodejs')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition whitespace-nowrap shrink-0">#NodeJS</button>

              <button onClick={() => onSearch('frontend')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition whitespace-nowrap shrink-0">#Frontend</button>

              <button onClick={() => onSearch('Backend')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition whitespace-nowrap shrink-0">#Backend</button>

              <button onClick={() => onSearch('c++')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition whitespace-nowrap shrink-0">#C++</button>

              <button onClick={() => onSearch('responsive')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition whitespace-nowrap shrink-0">#responsive</button>

              <button onClick={() => onSearch('tailwindcss')} className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition whitespace-nowrap shrink-0">#TailwindCSS</button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ExploreHeader