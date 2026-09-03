import React from 'react'
import {GitFork, Star, ArrowRight} from 'lucide-react'

const repositories = [
  {
    name: 'shadcn-ui/ui',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
    language: 'TypeScript',
    stars: '108k',
    forks: '24k'
  },
  {
    name: 'freeCodeCamp/freeCodeCamp',
    description: 'The open source community helping people learn to code.',
    language: 'JavaScript',
    stars: '43k',
    forks: '36k'
  },
  {
    name: 'supabase/supabase',
    description: 'The open source Firebase alternative.',
    language: 'TypeScript',
    stars: '82k',
    forks: '13k'
  }
]

const RecommendedRepos = () => {
  return (
    <section className="px-8 pb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-lg font-semibold text-gray-900">Recommended for you</p>
          <p className="text-sm text-gray-500 mt-1">Projects worth exploring based on your interests.</p>
        </div>

        <button className="flex items-center gap-1 text-sm text-indigo-600 font-medium">View all <ArrowRight size={15}/></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {repositories.map((repo) => (
          <div key={repo.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-700">{repo.name.charAt(0).toUpperCase()}</div>

              <span className="text-[10px] px-2 py-1 rounded-md bg-green-50 text-green-600 font-medium">Beginner friendly</span>
            </div>

            <p className="font-semibold text-sm mt-4">{repo.name}</p>
            <p className="text-xs text-gray-500 mt-2 leading-5">{repo.description}</p>

            <div className="flex items-center gap-4 mt-5 text-xs text-gray-500">
              <span>{repo.language}</span>
              <span className="flex items-center gap-1"><Star size={13}/> {repo.stars}</span>
              <span className="flex items-center gap-1"><GitFork size={13}/> {repo.forks}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecommendedRepos