import React, {useState} from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const pages = [1, 2, 3, 4]

  return (
    <div className="flex items-center justify-center gap-2 py-8">

      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-600 transition"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10 rounded-lg border text-sm font-medium transition ${
            currentPage === page
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600'
          }`}
        >
          {page}
        </button>
      ))}

      <span className="flex items-center justify-center w-10 h-10 text-sm text-gray-400">
        ...
      </span>

      <button
        onClick={() => setCurrentPage(62)}
        className={`w-10 h-10 rounded-lg border text-sm font-medium transition ${
          currentPage === 62
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600'
        }`}
      >
        62
      </button>

      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, 62))}
        disabled={currentPage === 62}
        className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40 transition"
      >
        Next
        <ChevronRight className="size-4" />
      </button>

    </div>
  )
}

export default Pagination