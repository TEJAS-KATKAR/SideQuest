import React from 'react'

const Otherinfo = () => {
  return (
    <div className="flex flex-col ml-auto mr-10 w-80 gap-6 my-10">

      {/* Open Source Journey */}
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 shadow-sm">

        <p className="font-semibold text-sm">
          Your Open Source Journey
        </p>

        <div className="h-px w-full bg-gray-200 my-4"></div>

        <div className="flex items-center gap-6">

          <div className="w-28 h-28 rounded-full border-8 border-indigo-400 flex items-center justify-center">
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
      </div>


      {/* Trending Repositories */}
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 shadow-sm">

        <p className="font-semibold text-sm mb-4">
          🔥 Trending Repositories
        </p>

        <div className="flex flex-col gap-4">

          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-400">1</span>

            <div>
              <p className="text-sm font-medium">vercel/next.js</p>
              <p className="text-xs text-green-500">▲ 12.5k stars today</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-400">2</span>

            <div>
              <p className="text-sm font-medium">facebook/react</p>
              <p className="text-xs text-green-500">▲ 9.8k stars today</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-400">3</span>

            <div>
              <p className="text-sm font-medium">microsoft/vscode</p>
              <p className="text-xs text-green-500">▲ 7.3k stars today</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-400">4</span>

            <div>
              <p className="text-sm font-medium">tailwindlabs/tailwindcss</p>
              <p className="text-xs text-green-500">▲ 5.6k stars today</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-400">5</span>

            <div>
              <p className="text-sm font-medium">tensorflow/tensorflow</p>
              <p className="text-xs text-green-500">▲ 4.2k stars today</p>
            </div>
          </div>

        </div>
      </div>


      {/* Popular Topics */}
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 shadow-sm">

        <p className="font-semibold text-sm mb-4">
          🏷️ Popular Topics
        </p>

        <div className="flex flex-wrap gap-2">

          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">
            Web Development
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">
            Machine Learning
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">
            Data Science
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">
            DevOps
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">
            Mobile
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">
            AI
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">
            Game Development
          </span>

          <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">
            Design
          </span>

        </div>
      </div>

    </div>
  )
}

export default Otherinfo