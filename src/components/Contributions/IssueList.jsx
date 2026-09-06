import React from 'react'
import IssueCard from './IssueCard'

const issues = [
  {
    repo: 'vercel/next.js',
    title: 'Improve mobile navigation menu accessibility',
    number: '49245',
    opened: '2 days ago',
    updated: '4 hours ago',
    difficulty: 'Beginner',
    type: 'Accessibility',
    labels: ['good first issue', 'accessibility', 'React'],
    language: 'TypeScript',
    technologies: ['React', 'Next.js'],
    comments: 6,
    stars: 113000,
    forks: 24500,
    watchers: 3100,
    activity: 'Very active',
    assignment: 'Unassigned',
    issueAge: 'Last 7 days',
    discussion: 'Medium',
    scope: 'Small',
    beginner: true,
    verified: true,
    icon: 'N',
    reasons: [
      'Marked as good first issue',
      'Small, focused change',
      'Clear issue description'
    ]
  },
  {
    repo: 'facebook/react',
    title: 'Fix typo in documentation',
    number: '27985',
    opened: '1 day ago',
    updated: '8 hours ago',
    difficulty: 'Beginner',
    type: 'Documentation',
    labels: ['good first issue', 'documentation'],
    language: 'JavaScript',
    technologies: ['React'],
    comments: 3,
    stars: 235000,
    forks: 48000,
    watchers: 6200,
    activity: 'Very active',
    assignment: 'Unassigned',
    issueAge: 'Last 7 days',
    discussion: 'Low',
    scope: 'Small',
    beginner: true,
    verified: true,
    icon: '⚛',
    reasons: [
      'Documentation-only change',
      'Low implementation risk',
      'Good first issue label'
    ]
  },
  {
    repo: 'sindresorhus/awesome',
    title: 'Add dark mode toggle to README',
    number: '2141',
    opened: '3 days ago',
    updated: '1 day ago',
    difficulty: 'Easy',
    type: 'Feature',
    labels: ['enhancement', 'documentation', 'CSS'],
    language: 'JavaScript',
    technologies: ['JavaScript', 'CSS'],
    comments: 7,
    stars: 420000,
    forks: 31000,
    watchers: 7200,
    activity: 'Active',
    assignment: 'Unassigned',
    issueAge: 'Last 7 days',
    discussion: 'Medium',
    scope: 'Small',
    beginner: false,
    verified: true,
    icon: 'T',
    reasons: [
      'Straightforward UI change',
      'Limited project scope',
      'Maintainers recently active'
    ]
  },
  {
    repo: 'nodejs/node',
    title: 'Improve error message for invalid input',
    number: '50212',
    opened: '5 hours ago',
    updated: '2 hours ago',
    difficulty: 'Easy',
    type: 'Bug fix',
    labels: ['bug', 'good first issue'],
    language: 'JavaScript',
    technologies: ['Node.js'],
    comments: 9,
    stars: 110000,
    forks: 31000,
    watchers: 4200,
    activity: 'Very active',
    assignment: 'Unassigned',
    issueAge: 'Today',
    discussion: 'Medium',
    scope: 'Small',
    beginner: true,
    verified: true,
    icon: '⬡',
    reasons: [
      'Good first issue label',
      'Problem is clearly described',
      'Active maintainer community'
    ]
  },
  {
    repo: 'tailwindlabs/tailwindcss',
    title: 'Update docs for new utility class',
    number: '12034',
    opened: '6 hours ago',
    updated: '3 hours ago',
    difficulty: 'Easy',
    type: 'Documentation',
    labels: ['documentation', 'good first issue'],
    language: 'CSS',
    technologies: ['Tailwind CSS'],
    comments: 4,
    stars: 89000,
    forks: 4600,
    watchers: 1800,
    activity: 'Active',
    assignment: 'Unassigned',
    issueAge: 'Today',
    discussion: 'Low',
    scope: 'Small',
    beginner: true,
    verified: true,
    icon: '≈',
    reasons: [
      'Documentation-focused task',
      'Clear steps provided',
      'Active project'
    ]
  }
]

const IssueList = ({filters, search}) => {

  const filteredIssues = issues.filter(issue => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      !searchText ||
      issue.title.toLowerCase().includes(searchText) ||
      issue.repo.toLowerCase().includes(searchText) ||
      issue.labels.some(label => label.toLowerCase().includes(searchText)) ||
      issue.technologies.some(technology => technology.toLowerCase().includes(searchText))

    const matchesDifficulty =
      filters.difficulty === 'All' ||
      issue.difficulty === filters.difficulty

    const matchesLanguage =
      !filters.language?.length ||
      filters.language.includes(issue.language)

    const matchesTechnology =
      !filters.technology?.length ||
      filters.technology.some(technology =>
        issue.technologies.includes(technology)
      )

    const matchesActivity =
      filters.activity === 'All' ||
      issue.activity === filters.activity

    const matchesLabels =
      !filters.labels?.length ||
      filters.labels.some(label =>
        issue.labels.some(issueLabel =>
          issueLabel.toLowerCase() === label.toLowerCase()
        )
      )

    const matchesType =
      !filters.type?.length ||
      filters.type.includes(issue.type)

    const matchesAssignment =
      filters.assignment === 'All' ||
      issue.assignment === filters.assignment

    const matchesIssueAge =
      filters.issueAge === 'All' ||
      issue.issueAge === filters.issueAge

    const matchesDiscussion =
      filters.discussion === 'All' ||
      issue.discussion === filters.discussion

    const matchesBeginner =
      !filters.beginner ||
      issue.beginner

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesLanguage &&
      matchesTechnology &&
      matchesActivity &&
      matchesLabels &&
      matchesType &&
      matchesAssignment &&
      matchesIssueAge &&
      matchesDiscussion &&
      matchesBeginner
    )
  })

  return (
    <div className="flex-1 min-w-0">

      <div className="flex items-center justify-between mb-4">

        <div>
          <p className="text-sm font-semibold text-gray-900">
            {filteredIssues.length === issues.length ? '512' : filteredIssues.length} opportunities found
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Issues matched to your current filters
          </p>
        </div>

        <div className="flex items-center gap-2">

          <span className="text-xs text-gray-500">
            Sort by:
          </span>

          <select className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg outline-none hover:border-gray-300">
            <option>Best match</option>
            <option>Recently opened</option>
            <option>Recently updated</option>
            <option>Most active</option>
            <option>Lowest difficulty</option>
          </select>

        </div>

      </div>

      <div className="flex flex-col gap-3">

        {filteredIssues.length > 0 ? (
          filteredIssues.map(issue => (
            <IssueCard
              key={`${issue.repo}-${issue.number}`}
              issue={issue}
            />
          ))
        ) : (
          <div className="p-10 text-center bg-white border border-gray-200 rounded-xl">
            <p className="font-semibold text-gray-900">
              No opportunities found
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your filters or search terms.
            </p>
          </div>
        )}

      </div>

      <div className="flex items-center justify-center gap-2 mt-5">

        <button className="w-8 h-8 text-xs font-semibold text-white bg-blue-500 rounded-md">
          1
        </button>

        <button className="w-8 h-8 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50">
          2
        </button>

        <button className="w-8 h-8 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50">
          3
        </button>

        <span className="px-2 text-gray-400">
          ...
        </span>

        <button className="w-10 h-8 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50">
          11
        </button>

        <button className="h-8 px-3 text-xs font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50">
          Next
        </button>

      </div>

    </div>
  )
}

export default IssueList