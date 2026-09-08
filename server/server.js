const {createContributionRouter} = require('./routes/contributions')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'SideQuest',
  ...(process.env.GITHUB_TOKEN
    ? {Authorization: `Bearer ${process.env.GITHUB_TOKEN}`}
    : {})
}

const cache = new Map()
const CACHE_TIME = 30 * 1000

const technologyTopicMap = {
  React: 'react',
  'Next.js': 'nextjs',
  Vue: 'vue',
  Angular: 'angular',
  'Node.js': 'nodejs',
  Express: 'express',
  'React Native': 'react-native',
  Frontend: 'frontend',
  Backend: 'backend',
  'Web Development': 'web-development',
  'Tailwind CSS': 'tailwindcss',
  Bootstrap: 'bootstrap',
  Svelte: 'svelte',
  Astro: 'astro',
  MongoDB: 'mongodb',
  PostgreSQL: 'postgresql',
  MySQL: 'mysql',
  SQLite: 'sqlite',
  Redis: 'redis',
  Firebase: 'firebase',
  Supabase: 'supabase',
  GraphQL: 'graphql',
  'REST API': 'rest-api',
  Database: 'database',
  AI: 'artificial-intelligence',
  'Artificial Intelligence': 'artificial-intelligence',
  'Machine Learning': 'machine-learning',
  'Deep Learning': 'deep-learning',
  LLM: 'llm',
  NLP: 'nlp',
  'Computer Vision': 'computer-vision',
  'Data Science': 'data-science',
  'Data Analytics': 'data-analytics',
  TensorFlow: 'tensorflow',
  PyTorch: 'pytorch',
  Pandas: 'pandas',
  'Power BI': 'power-bi',
  Tableau: 'tableau',
  Docker: 'docker',
  Kubernetes: 'kubernetes',
  AWS: 'aws',
  Azure: 'azure',
  'Google Cloud': 'google-cloud',
  Terraform: 'terraform',
  'CI/CD': 'continuous-integration',
  DevOps: 'devops',
  Cybersecurity: 'cybersecurity',
  'Game Development': 'game-development',
  Blockchain: 'blockchain',
  DevTools: 'devtools',
  CLI: 'cli',
  Testing: 'testing',
  Education: 'education',
  'Open Source': 'open-source',
  Mobile: 'mobile'
}

const convertTechnologyToTopic = technology => {
  if (technologyTopicMap[technology]) {
    return technologyTopicMap[technology]
  }

  return technology
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const getActivity = pushedAt => {
  if (!pushedAt) {
    return 'Unknown'
  }

  const daysSincePush = Math.floor(
    (Date.now() - new Date(pushedAt).getTime()) / 86400000
  )

  if (daysSincePush <= 7) {
    return 'Very active'
  }

  if (daysSincePush <= 30) {
    return 'Active'
  }

  if (daysSincePush <= 90) {
    return 'Moderately active'
  }

  return 'Low activity'
}

const formatRepository = repo => ({
  id: repo.id,
  name: repo.name || '',
  fullName: repo.full_name || '',
  owner: repo.owner?.login || '',
  repo: repo.name || '',
  description: repo.description || 'No description available.',
  stars: repo.stargazers_count || 0,
  forks: repo.forks_count || 0,
  watchers: repo.watchers_count || 0,
  language: repo.language || 'Unknown',
  topics: Array.isArray(repo.topics) ? repo.topics : [],
  license: repo.license?.spdx_id || repo.license?.name || 'Not specified',
  updatedAt: repo.updated_at || null,
  pushedAt: repo.pushed_at || null,
  createdAt: repo.created_at || null,
  archived: repo.archived || false,
  htmlUrl: repo.html_url || '',
  avatarUrl: repo.owner?.avatar_url || '',
  defaultBranch: repo.default_branch || 'main',
  openIssues: repo.open_issues_count || 0,
  homepage: repo.homepage || '',
  activity: repo.archived ? 'Archived' : getActivity(repo.pushed_at)
})

const githubRequest = async url => {
  const cached = cache.get(url)

  if (cached && Date.now() - cached.time < CACHE_TIME) {
    return cached.data
  }

  const response = await fetch(url, {
    headers: githubHeaders
  })

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(
      data?.message || `GitHub API request failed with ${response.status}`
    )

    error.status = response.status
    error.githubData = data
    error.remaining = response.headers.get('x-ratelimit-remaining')
    error.limit = response.headers.get('x-ratelimit-limit')
    error.reset = response.headers.get('x-ratelimit-reset')

    throw error
  }

  cache.set(url, {
    time: Date.now(),
    data
  })

  return data
}
app.use('/api/contributions', createContributionRouter({githubRequest}))
const buildSearchQuery = ({
  search,
  languages,
  topics,
  stars,
  forks,
  license,
  activity,
  beginner
}) => {
  const queryParts = []
  const cleanSearch = (search || '').trim()

  if (cleanSearch && cleanSearch !== 'open source') {
    queryParts.push(cleanSearch)
  }

  if (languages?.length) {
    languages.forEach(language => {
      queryParts.push(`language:${language}`)
    })
  }

  if (topics?.length) {
    topics.forEach(topic => {
      queryParts.push(`topic:${convertTechnologyToTopic(topic)}`)
    })
  }

  if (stars) {
    queryParts.push(`stars:>=${stars}`)
  }

  if (forks) {
    queryParts.push(`forks:>=${forks}`)
  }

  if (license) {
    queryParts.push(`license:${license}`)
  }

  if (activity === 'Recently updated') {
    queryParts.push('pushed:>=2025-01-01')
  }

  if (activity === 'Active') {
    queryParts.push('pushed:>=2024-01-01')
  }

  if (activity === 'Very active') {
    queryParts.push('pushed:>=2025-01-01')
  }

  if (activity === 'No recent activity') {
    queryParts.push('pushed:<2024-01-01')
  }

  if (activity === 'Archived') {
    queryParts.push('archived:true')
  }

  if (beginner) {
    queryParts.push('good-first-issues:>0')
  }

  if (queryParts.length === 0) {
    queryParts.push('stars:>10000')
  }

  return queryParts.join(' ')
}

app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'SideQuest backend is working!',
    authenticated: Boolean(process.env.GITHUB_TOKEN)
  })
})

app.get('/api/github-status', async (req, res) => {
  try {
    const data = await githubRequest('https://api.github.com/rate_limit')

    res.json({
      authenticated: Boolean(process.env.GITHUB_TOKEN),
      core: data.resources?.core || null,
      search: data.resources?.search || null
    })
  } catch (error) {
    res.status(error.status || 500).json({
      authenticated: Boolean(process.env.GITHUB_TOKEN),
      error: error.message || 'Unable to check GitHub status'
    })
  }
})

app.get('/api/repositories/search', async (req, res) => {
  try {
    const {
      q = '',
      page = '1',
      per_page = '10',
      language,
      topic,
      stars,
      forks,
      watchers,
      license,
      activity,
      beginner,
      sortMetric,
      sortOrder
    } = req.query

    const languages = Array.isArray(language)
      ? language
      : language
        ? [language]
        : []

    const topics = Array.isArray(topic)
      ? topic
      : topic
        ? [topic]
        : []

    const currentPage = Math.max(Number(page) || 1, 1)
    const perPage = Math.min(Math.max(Number(per_page) || 10, 1), 100)

    const searchQuery = buildSearchQuery({
      search: q,
      languages,
      topics,
      stars,
      forks,
      license,
      activity,
      beginner
    })

    const params = new URLSearchParams({
      q: searchQuery,
      page: String(currentPage),
      per_page: String(perPage),
      sort: sortMetric || 'stars',
      order: sortOrder === 'asc' ? 'asc' : 'desc'
    })

    const data = await githubRequest(
      `https://api.github.com/search/repositories?${params.toString()}`
    )

    let repositories = (data.items || []).map(formatRepository)

    if (watchers) {
      const minimumWatchers = Number(watchers) || 0
      repositories = repositories.filter(
        repository => repository.watchers >= minimumWatchers
      )
    }

    res.json({
      repositories,
      total: data.total_count || 0,
      page: currentPage,
      perPage,
      query: searchQuery
    })
  } catch (error) {
    console.error('Repository search error:', error)

    res.status(error.status || 500).json({
      error: error.message || 'Failed to search repositories',
      github: error.githubData || null,
      rateLimit: {
        limit: error.limit || null,
        remaining: error.remaining || null,
        reset: error.reset || null
      }
    })
  }
})

app.get('/api/repositories/:owner/:repo', async (req, res) => {
  try {
    const {owner, repo} = req.params

    const data = await githubRequest(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
    )

    res.json(formatRepository(data))
  } catch (error) {
    console.error('Repository details error:', error)

    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch repository',
      rateLimit: {
        limit: error.limit || null,
        remaining: error.remaining || null,
        reset: error.reset || null
      }
    })
  }
})

app.get('/api/repositories/:owner/:repo/languages', async (req, res) => {
  try {
    const {owner, repo} = req.params

    const data = await githubRequest(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`
    )

    const total = Object.values(data).reduce((sum, value) => sum + value, 0)

    const languages = Object.entries(data)
      .map(([name, bytes]) => ({
        name,
        percentage: total ? ((bytes / total) * 100).toFixed(1) : '0'
      }))
      .sort((a, b) => Number(b.percentage) - Number(a.percentage))

    res.json(languages)
  } catch (error) {
    console.error('Repository languages error:', error)

    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch repository languages'
    })
  }
})

app.get('/api/repositories/:owner/:repo/releases', async (req, res) => {
  try {
    const {owner, repo} = req.params

    const data = await githubRequest(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases?per_page=10`
    )

    res.json(
      (data || []).map(release => ({
        name: release.name || release.tag_name || 'Untitled release',
        tag: release.tag_name || '',
        publishedAt: release.published_at || release.created_at || null,
        prerelease: release.prerelease || false,
        url: release.html_url || ''
      }))
    )
  } catch (error) {
    console.error('Repository releases error:', error)

    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch releases'
    })
  }
})

app.get('/api/repositories/:owner/:repo/commits', async (req, res) => {
  try {
    const {owner, repo} = req.params

    const data = await githubRequest(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=10`
    )

    res.json(
      (data || []).map(commit => ({
        message: commit.commit?.message || 'No commit message',
        date: commit.commit?.author?.date || commit.commit?.committer?.date || null,
        url: commit.html_url || ''
      }))
    )
  } catch (error) {
    console.error('Repository commits error:', error)

    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch repository commits'
    })
  }
})

app.get('/api/repositories/:owner/:repo/contributors', async (req, res) => {
  try {
    const {owner, repo} = req.params

    const data = await githubRequest(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contributors?per_page=10`
    )

    res.json({
      count: (data || []).length,
      contributors: data || []
    })
  } catch (error) {
    console.error('Repository contributors error:', error)

    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch repository contributors'
    })
  }
})

app.listen(PORT, () => {
  console.log(`SideQuest server running on http://localhost:${PORT}`)
})