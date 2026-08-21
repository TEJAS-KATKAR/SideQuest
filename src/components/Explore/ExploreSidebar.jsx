import React from 'react'
import {ArrowRight, Lightbulb, TrendingUp} from 'lucide-react'

const ExploreSidebar = () => {
  const trending = [
    {name: 'strapi/strapi', stars: '23.5k'},
    {name: 'supabase/supabase', stars: '20.1k'},
    {name: 'tanstack/query', stars: '18.7k'},
    {name: 'docker/compose', stars: '17.2k'},
    {name: 'openai/openai-node', stars: '16.9k'}
  ]

  return (
    <div className="flex flex-col w-72 gap-4 shrink-0">

      {/* Refine search */}
      <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">

        <div className="flex items-center gap-2">
          <Lightbulb className="text-amber-500 size-5" />
          <h3 className="font-semibold text-gray-900">Refine your search</h3>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-gray-500">
          Use filters to narrow down repositories and find projects that match your interests.
        </p>

        <div className="mt-5 space-y-4">

          <div className="p-3 rounded-lg bg-indigo-50">
            <p className="text-xs font-semibold text-indigo-700">💡 Tip</p>
            <p className="mt-1 text-xs leading-relaxed text-indigo-600">
              Start with a language you already know.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">Good for beginners</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">
              Look for repositories with good-first-issue labels and clear documentation.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">Check activity</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">
              Active repositories are more likely to respond to your contribution.
            </p>
          </div>

        </div>

      </div>


      {/* Trending */}
      <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">

        <div className="flex items-center gap-2">
          <TrendingUp className="text-indigo-500 size-5" />
          <h3 className="font-semibold text-gray-900">Trending this week</h3>
        </div>

        <div className="flex flex-col mt-4">

          {trending.map((repo, index) => (
            <button key={repo.name} className="flex items-center justify-between w-full py-3 text-left border-b border-gray-100 last:border-0 group">

              <div className="flex items-center min-w-0 gap-3">
                <span className="text-xs font-semibold text-gray-400">{index + 1}</span>

                <span className="text-sm font-medium text-gray-700 truncate group-hover:text-indigo-600 transition">
                  {repo.name}
                </span>
              </div>

              <span className="ml-2 text-xs text-gray-400 shrink-0">
                ★ {repo.stars}
              </span>

            </button>
          ))}

        </div>

        <button className="flex items-center justify-center w-full gap-2 py-2 mt-4 text-sm font-medium text-indigo-600 border border-indigo-100 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition">
          View all trending
          <ArrowRight className="size-4" />
        </button>

      </div>


      {/* Contribution tip */}
      <div className="p-5 text-white bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-sm">

        <p className="text-sm font-semibold">Ready to contribute?</p>

        <p className="mt-2 text-xs leading-relaxed text-indigo-100">
          Find beginner-friendly issues and make your first open source contribution.
        </p>

        <button className="flex items-center gap-2 px-3 py-2 mt-4 text-xs font-semibold text-indigo-700 bg-white rounded-lg hover:bg-indigo-50 transition">
          Find good first issues
          <ArrowRight className="size-4" />
        </button>

      </div>

    </div>
  )
}

export default ExploreSidebar