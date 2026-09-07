const express = require('express')
const {analyzeContribution, difficultyRank} = require('../utils/contributionAnalysis')

const router = express.Router()

const technologyTopicMap = {
  React: ['react'],
  'Next.js': ['nextjs', 'next'],
  Vue: ['vue'],
  Angular: ['angular'],
  'Node.js': ['nodejs'],
  Express: ['express'],
  'React Native': ['react-native'],
  Frontend: ['frontend'],
  Backend: ['backend'],
  'Web Development': ['web-development', 'web'],
  'Tailwind CSS': ['tailwindcss', 'tailwind'],
  Bootstrap: ['bootstrap'],
  Svelte: ['svelte'],
  Astro: ['astro'],
  MongoDB: ['mongodb'],
  PostgreSQL: ['postgresql'],
  MySQL: ['mysql'],
  SQLite: ['sqlite'],
  Redis: ['redis'],
  Firebase: ['firebase'],
  Supabase: ['supabase'],
  GraphQL: ['graphql'],
  'REST API': ['rest-api'],
  Database: ['database'],
  AI: ['artificial-intelligence', 'ai'],
  'Artificial Intelligence': ['artificial-intelligence', 'ai'],
  'Machine Learning': ['machine-learning'],
  'Deep Learning': ['deep-learning'],
  LLM: ['llm'],
  NLP: ['nlp'],
  'Computer Vision': ['computer-vision'],
  'Data Science': ['data-science'],
  'Data Analytics': ['data-analytics'],
  TensorFlow: ['tensorflow'],
  PyTorch: ['pytorch'],
  Pandas: ['pandas'],
  'Power BI': ['power-bi'],
  Tableau: ['tableau'],
  Docker: ['docker'],
  Kubernetes: ['kubernetes'],
  AWS: ['aws'],
  Azure: ['azure'],
  'Google Cloud': ['google-cloud'],
  Terraform: ['terraform'],
  'CI/CD': ['continuous-integration', 'ci-cd'],
  DevOps: ['devops'],
  Cybersecurity: ['cybersecurity'],
  'Game Development': ['game-development'],
  Blockchain: ['blockchain'],
  DevTools: ['devtools'],
  CLI: ['cli'],
  Testing: ['testing'],
  Education: ['education'],
  'Open Source': ['open-source'],
  Mobile: ['mobile']
}

const getDateString = daysAgo => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

const buildIssueQuery = ({
  search,
  languages,
  labels,
  assignment,
  issueAge,
  beginner
}) => {
  const parts = ['is:issue', 'is:open']

  const cleanSearch = (search || '').trim()

  if (cleanSearch) {
    parts.push(cleanSearch)
  }

  languages.forEach(language => {
    parts.push(`language:${language}`)
  })

  labels.forEach(label => {
    parts.push(`label:"${label}"`)
  })

  if (assignment === 'Unassigned') {
    parts.push('no:assignee')
  }

  if (assignment === 'Assigned') {
    parts.push('-no:assignee')
  }

  if (issueAge === 'Today') {
    parts.push(`created:>=${getDateString(1)}`)
  }

  if (issueAge === 'Last 7 days') {
    parts.push(`created:>=${getDateString(7)}`)
  }

  if (issueAge === 'Last 30 days') {
    parts.push(`created:>=${getDateString(30)}`)
  }

  if (issueAge === 'Last 90 days') {
    parts.push(`created:>=${getDateString(90)}`)
  }

  if (beginner) {
    parts.push('label:"good first issue"')
  }

  if (
    !cleanSearch &&
    !languages.length &&
    !labels.length &&
    assignment === 'All' &&
    issueAge === 'All' &&
    !beginner
  ) {
    parts.push('(label:"good first issue" OR label:"help wanted")')
  }

  return parts.join(' ')
}

const normalizeLabels = labels =>
  (labels || [])
    .map(label => typeof label === 'string' ? label : label.name)
    .filter(Boolean)

const normalizeTopics = topics =>
  Array.isArray(topics)
    ? topics.map(topic => topic.toLowerCase())
    : []

const matchesTechnology = (issue, selectedTechnologies) => {
  if (!selectedTechnologies.length) return true

  const topics = normalizeTopics(issue.repository?.topics)

  return selectedTechnologies.some(technology => {
    const mappedTopics = technologyTopicMap[technology] || [
      technology.toLowerCase().replace(/\s+/g, '-')
    ]

    return mappedTopics.some(topic => topics.includes(topic))
  })
}

const matchesDiscussion = (issue, discussion) => {
  if (discussion === 'All') return true

  const comments = Number(issue.comments) || 0

  if (discussion === 'No discussion') return comments === 0
  if (discussion === 'Low') return comments >= 1 && comments <= 5
  if (discussion === 'Medium') return comments >= 6 && comments <= 20
  if (discussion === 'High') return comments > 20

  return true
}

const matchesActivity = (issue, activity) => {
  if (activity === 'All') return true

  return analyzeContribution(issue).activity === activity
}

const matchesType = (issue, types) => {
  if (!types.length) return true

  return types.includes(analyzeContribution(issue).type)
}

const matchesDifficulty = (issue, difficulty) => {
  if (difficulty === 'All') return true

  return analyzeContribution(issue).difficulty === difficulty
}

const matchesSearch = (issue, search) => {
  if (!search) return true

  const value = search.toLowerCase()

  const labels = normalizeLabels(issue.labels).join(' ').toLowerCase()
  const topics = normalizeTopics(issue.repository?.topics).join(' ').toLowerCase()
  const repo = issue.repository?.full_name?.toLowerCase() || ''
  const title = issue.title?.toLowerCase() || ''
  const body = issue.body?.toLowerCase() || ''

  return (
    title.includes(value) ||
    body.includes(value) ||
    repo.includes(value) ||
    labels.includes(value) ||
    topics.includes(value)
  )
}

const formatRelativeTime = dateValue => {
  if (!dateValue) return 'Unknown'

  const seconds = Math.floor(
    (Date.now() - new Date(dateValue).getTime()) / 1000
  )

  if (seconds < 60) return 'just now'

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`

  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`

  return `${Math.floor(months / 12)}y ago`
}

const formatIssue = issue => {
  const repository = issue.repository || {}
  const labels = normalizeLabels(issue.labels)
  const analysis = analyzeContribution({
    ...issue,
    labels
  })

  return {
    id: issue.id,
    repo: repository.full_name || '',
    title: issue.title || 'Untitled issue',
    number: issue.number,
    description: issue.body || '',
    opened: formatRelativeTime(issue.created_at),
    updated: formatRelativeTime(issue.updated_at),
    difficulty: analysis.difficulty,
    type: analysis.type,
    labels,
    language: repository.language || 'Unknown',
    technologies: Object.keys(technologyTopicMap).filter(technology =>
      (technologyTopicMap[technology] || []).some(topic =>
        normalizeTopics(repository.topics).includes(topic)
      )
    ).slice(0, 3),
    comments: Number(issue.comments) || 0,
    stars: Number(repository.stargazers_count) || 0,
    forks: Number(repository.forks_count) || 0,
    watchers: Number(repository.watchers_count) || 0,
    activity: analysis.activity,
    assignment: analysis.assignment,
    issueAge: analysis.issueAge,
    discussion: analysis.discussion,
    scope: analysis.scope,
    beginner: analysis.difficulty === 'Beginner',
    verified: Boolean(issue.html_url),
    icon: repository.name?.charAt(0).toUpperCase() || 'G',
    reasons: analysis.reasons,
    htmlUrl: issue.html_url || '',
    repositoryUrl: repository.html_url || '',
    author: issue.user?.login || 'Unknown',
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
    difficultyRank: analysis.difficultyRank
  }
}

const getBestMatchScore = issue => {
  let score = 0

  if (issue.beginner) score += 40
  if (issue.labels.some(label => label.toLowerCase() === 'help wanted')) score += 25
  if (issue.assignment === 'Unassigned') score += 15
  if (issue.discussion === 'No discussion') score += 8
  if (issue.discussion === 'Low') score += 5
  if (issue.activity === 'Very active') score += 12
  if (issue.activity === 'Active') score += 8
  if (issue.difficulty === 'Easy') score += 8

  const ageDays = Math.floor(
    (Date.now() - new Date(issue.createdAt).getTime()) / 86400000
  )

  if (ageDays <= 7) score += 10

  return score
}

const sortIssues = (issues, sort) => {
  const sorted = [...issues]

  if (sort === 'Recently opened') {
    return sorted.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  }

  if (sort === 'Recently updated') {
    return sorted.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )
  }

  if (sort === 'Most active') {
    return sorted.sort((a, b) => {
      const activityScore = {
        'Very active': 4,
        Active: 3,
        Moderate: 2,
        'Low activity': 1,
        Unknown: 0
      }

      const scoreA =
        activityScore[a.activity] * 100 +
        a.comments +
        a.stars / 100000

      const scoreB =
        activityScore[b.activity] * 100 +
        b.comments +
        b.stars / 100000

      return scoreB - scoreA
    })
  }

  if (sort === 'Lowest difficulty') {
    return sorted.sort(
      (a, b) =>
        difficultyRank[a.difficulty] - difficultyRank[b.difficulty]
    )
  }

  return sorted.sort(
    (a, b) => getBestMatchScore(b) - getBestMatchScore(a)
  )
}

const createContributionRouter = ({githubRequest}) => {
  router.get('/search', async (req, res) => {
    try {
      const {
        q = '',
        language,
        technology,
        labels,
        type,
        difficulty = 'All',
        activity = 'All',
        assignment = 'All',
        issueAge = 'All',
        discussion = 'All',
        beginner = 'false',
        sort = 'Best match',
        page = '1',
        per_page = '10'
      } = req.query

      const languages = Array.isArray(language)
        ? language
        : language
          ? [language]
          : []

      const technologies = Array.isArray(technology)
        ? technology
        : technology
          ? [technology]
          : []

      const issueLabels = Array.isArray(labels)
        ? labels
        : labels
          ? [labels]
          : []

      const issueTypes = Array.isArray(type)
        ? type
        : type
          ? [type]
          : []

      const searchQuery = buildIssueQuery({
        search: q,
        languages,
        labels: issueLabels,
        assignment,
        issueAge,
        beginner: beginner === 'true'
      })

      const params = new URLSearchParams({
        q: searchQuery,
        page: '1',
        per_page: '100',
        sort: 'updated',
        order: 'desc'
      })

      const data = await githubRequest(
        `https://api.github.com/search/issues?${params.toString()}`
      )

      let issues = (data.items || []).map(formatIssue)

      issues = issues.filter(issue => {
        const rawIssue = data.items.find(item => item.id === issue.id)

        return (
          matchesSearch(rawIssue, q.trim()) &&
          matchesTechnology(rawIssue, technologies) &&
          matchesDifficulty(rawIssue, difficulty) &&
          matchesType(rawIssue, issueTypes) &&
          matchesActivity(rawIssue, activity) &&
          matchesDiscussion(rawIssue, discussion) &&
          (beginner !== 'true' || issue.beginner)
        )
      })

      issues = sortIssues(issues, sort)

      const currentPage = Math.max(Number(page) || 1, 1)
      const perPage = Math.min(
        Math.max(Number(per_page) || 10, 1),
        10
      )

      const total = issues.length
      const totalPages = Math.max(Math.ceil(total / perPage), 1)
      const safePage = Math.min(currentPage, totalPages)

      const start = (safePage - 1) * perPage
      const paginatedIssues = issues.slice(start, start + perPage)

      res.json({
        issues: paginatedIssues,
        total,
        page: safePage,
        perPage,
        totalPages,
        sourceResults: data.total_count || 0,
        hasMoreSourceResults: (data.total_count || 0) > 100,
        query: searchQuery
      })
    } catch (error) {
      console.error('Contribution search error:', error)

      res.status(error.status || 500).json({
        error: error.message || 'Failed to fetch contribution opportunities',
        github: error.githubData || null,
        rateLimit: {
          limit: error.limit || null,
          remaining: error.remaining || null,
          reset: error.reset || null
        }
      })
    }
  })

  return router
}

module.exports = {
  createContributionRouter
}