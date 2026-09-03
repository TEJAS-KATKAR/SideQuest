import React, {useState} from 'react'
import {Check, CircleQuestionMark, Search, ArrowUpRight} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import learningperson from '../../assets/learningperson.png'

const ContributionHeader = ({search, setSearch}) => {
  const [searched, setSearched] = useState(false)
  const navigate = useNavigate()

  const handleSearch = () => {
    setSearched(true)
  }

  return (
    <div>
      <div className="relative min-h-38.5">

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Check size={28} className="text-indigo-700"/>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Contributions</h1>
              <p className="text-sm text-gray-500 mt-1 max-w-xl">Discover beginner-friendly issues and opportunities to contribute to open source projects.</p>
            </div>
          </div>

          <button className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-800 transition">
            How it works
            <CircleQuestionMark size={14}/>
          </button>
        </div>

        <button
          onClick={() => navigate('/howto')}
          title="Learn how to contribute"
          className="absolute right-3 top-0 w-64 h-36 flex items-end justify-center cursor-pointer group"
        >
          <img
            src={learningperson}
            alt="Learn how to contribute"
            className="w-60 h-36 object-contain transition-all duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1 group-active:scale-95"
          />
          <span className="absolute right-2 bottom-1 flex items-center gap-1 px-2 py-1 rounded-md bg-white/90 border border-gray-200 text-[10px] font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
            Start learning
            <ArrowUpRight size={11}/>
          </span>
        </button>

        <div className="flex w-[72%] mt-4">
          <div className={`flex flex-1 items-center h-11 px-4 bg-white border rounded-l-lg shadow-sm ${searched ? 'border-indigo-400' : 'border-gray-200'}`}>
            <Search size={18} className="mr-3 text-gray-400 shrink-0"/>
            <input value={search} onChange={(e) => {setSearch(e.target.value); setSearched(false)}} type="text" placeholder="Search issues, repos, or keywords..." className="w-full text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"/>
          </div>

          <button onClick={handleSearch} className="h-11 px-6 font-medium text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700 active:bg-indigo-800 transition">
            Search
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-1 border-b border-gray-200">
        <button className="px-4 py-3 text-sm font-semibold text-indigo-600 border-b-2 border-indigo-600">Issues</button>
        <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition">Pull Requests</button>
        <span className="px-2 py-1 mb-1 rounded-full bg-green-50 text-green-600 text-[10px] font-semibold">Soon</span>
      </div>
    </div>
  )
}

export default ContributionHeader