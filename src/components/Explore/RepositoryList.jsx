import React from 'react'
import RepositoryCard from './RepositoryCard'

const RepositoryList = () => {
  const repositories = [
    {
      name: 'vercel/next.js',
      description: "The React Framework for the Web — used by some of the world's largest companies.",
      language: 'TypeScript',
      languageColor: 'bg-blue-500',
      topics: ['react', 'nextjs', 'framework'],
      stars: '113k',
      forks: '23k',
      updated: 'Updated 2 hours ago',
      activity: 'Very active',
      beginner: true,
      verified: true,
      icon: 'N',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-900',
      url: 'https://github.com/vercel/next.js'
    },
    {
      name: 'facebook/react',
      description: 'The library for web and native user interfaces.',
      language: 'JavaScript',
      languageColor: 'bg-yellow-400',
      topics: ['react', 'javascript', 'ui'],
      stars: '238k',
      forks: '49k',
      updated: 'Updated 1 hour ago',
      activity: 'Very active',
      beginner: true,
      verified: true,
      icon: '⚛',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      url: 'https://github.com/facebook/react'
    },
    {
      name: 'nodejs/node',
      description: "Node.js JavaScript runtime built on Chrome's V8 JavaScript engine.",
      language: 'JavaScript',
      languageColor: 'bg-yellow-400',
      topics: ['nodejs', 'javascript', 'runtime'],
      stars: '110k',
      forks: '31k',
      updated: 'Updated 3 hours ago',
      activity: 'Very active',
      beginner: false,
      verified: true,
      icon: '⬢',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      url: 'https://github.com/nodejs/node'
    },
    {
      name: 'tailwindlabs/tailwindcss',
      description: 'A utility-first CSS framework for rapidly building custom user interfaces.',
      language: 'TypeScript',
      languageColor: 'bg-blue-500',
      topics: ['css', 'tailwind', 'frontend'],
      stars: '87k',
      forks: '4.3k',
      updated: 'Updated 5 hours ago',
      activity: 'Very active',
      beginner: true,
      verified: true,
      icon: '≋',
      iconBg: 'bg-cyan-50',
      iconColor: 'text-cyan-500',
      url: 'https://github.com/tailwindlabs/tailwindcss'
    },
    {
      name: 'vuejs/core',
      description: 'Vue.js is a progressive JavaScript framework for building user interfaces.',
      language: 'TypeScript',
      languageColor: 'bg-blue-500',
      topics: ['vue', 'javascript', 'frontend'],
      stars: '49k',
      forks: '8.2k',
      updated: 'Updated 4 hours ago',
      activity: 'Very active',
      beginner: true,
      verified: true,
      icon: 'V',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
      url: 'https://github.com/vuejs/core'
    }
  ]

  return (
    <div className="flex flex-col flex-1 gap-3 min-w-0">

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-gray-600"><span className="font-semibold text-gray-900">{repositories.length}</span> repositories found</p>
        <p className="text-xs text-gray-400">Showing popular repositories</p>
      </div>

      {repositories.map((repo) => (
        <RepositoryCard key={repo.name} repo={repo} />
      ))}

    </div>
  )
}

export default RepositoryList