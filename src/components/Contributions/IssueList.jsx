import React from 'react'
import IssueCard from './IssueCard'

const issues = [
  {
    repo: 'vercel/next.js',
    title: 'Improve mobile navigation menu accessibility',
    number: '49245',
    opened: '2 days ago',
    difficulty: 'Beginner',
    tags: ['React', 'TypeScript', 'a11y'],
    language: 'TypeScript',
    comments: 6,
    stars: '113k',
    activity: 'Very active',
    icon: 'N',
    verified: true,
    reasons: ['Small, focused change', 'Clear acceptance criteria', 'Mentor responsive']
  },
  {
    repo: 'facebook/react',
    title: 'Fix typo in documentation',
    number: '27985',
    opened: '1 day ago',
    difficulty: 'Beginner',
    tags: ['Documentation', 'JavaScript'],
    language: 'JavaScript',
    comments: 3,
    stars: '235k',
    activity: 'Very active',
    icon: '⚛',
    verified: true,
    reasons: ['Docs update only', 'Low risk', 'Great for first PR']
  },
  {
    repo: 'sindresorhus/awesome',
    title: 'Add dark mode toggle to README',
    number: '2141',
    opened: '3 days ago',
    difficulty: 'Beginner',
    tags: ['JavaScript', 'CSS', 'enhancement'],
    language: 'JavaScript',
    comments: 7,
    stars: '420k',
    activity: 'Active',
    icon: 'T',
    verified: true,
    reasons: ['UI improvement', 'Straightforward task', 'Maintainer active']
  },
  {
    repo: 'nodejs/node',
    title: 'Improve error message for invalid input',
    number: '50212',
    opened: '5 hours ago',
    difficulty: 'Easy',
    tags: ['JavaScript', 'good first issue'],
    language: 'JavaScript',
    comments: 9,
    stars: '110k',
    activity: 'Very active',
    icon: '⬡',
    verified: true,
    reasons: ['Guidance in comments', 'Well explained issue', 'High impact']
  },
  {
    repo: 'tailwindlabs/tailwindcss',
    title: 'Update docs for new utility class',
    number: '12034',
    opened: '6 hours ago',
    difficulty: 'Easy',
    tags: ['Documentation', 'CSS'],
    language: 'CSS',
    comments: 4,
    stars: '89k',
    activity: 'Active',
    icon: '≈',
    verified: true,
    reasons: ['Docs update', 'Clear steps provided', 'Active project']
  }
]

const IssueList = ({filters, search}) => {

  const filteredIssues = issues.filter((issue) => {
    const searchText = search.toLowerCase()

    const matchesSearch = !searchText ||
      issue.title.toLowerCase().includes(searchText) ||
      issue.repo.toLowerCase().includes(searchText) ||
      issue.tags.some((tag) => tag.toLowerCase().includes(searchText))

    const matchesDifficulty = filters.difficulty === 'All' || issue.difficulty === filters.difficulty
    const matchesLanguage = filters.language === 'All' || issue.language === filters.language
    const matchesActivity = filters.activity === 'All' || issue.activity === filters.activity
    const matchesLabels = filters.labels === 'All' || issue.tags.some((tag) => tag.toLowerCase() === filters.labels.toLowerCase())
    const matchesType = filters.type === 'All' || issue.type === filters.type

    return matchesSearch && matchesDifficulty && matchesLanguage && matchesActivity && matchesLabels && matchesType
  })

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">{filteredIssues.length === issues.length ? '512' : filteredIssues.length} opportunities found</p>
          <p className="text-xs text-gray-500 mt-1">Issues matched to your current filters</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sort by:</span>
          <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 outline-none hover:border-gray-300">
            <option>Best match</option>
            <option>Recently opened</option>
            <option>Most active</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <IssueCard key={issue.number} issue={issue}/>
          ))
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
            <p className="font-semibold text-gray-900">No opportunities found</p>
            <p className="text-sm text-gray-500 mt-2">Try changing your filters or search terms.</p>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-2 mt-5">
        <button className="w-8 h-8 rounded-md bg-indigo-600 text-white text-xs font-semibold">1</button>
        <button className="w-8 h-8 rounded-md bg-white border border-gray-200 text-xs hover:bg-gray-50">2</button>
        <button className="w-8 h-8 rounded-md bg-white border border-gray-200 text-xs hover:bg-gray-50">3</button>
        <span className="px-2 text-gray-400">...</span>
        <button className="w-10 h-8 rounded-md bg-white border border-gray-200 text-xs hover:bg-gray-50">11</button>
        <button className="px-3 h-8 rounded-md bg-white border border-gray-200 text-xs font-medium hover:bg-gray-50">Next</button>
      </div>
    </div>
  )
}

export default IssueList