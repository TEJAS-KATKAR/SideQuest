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
  ...(process.env.GITHUB_TOKEN
    ? {Authorization: `Bearer ${process.env.GITHUB_TOKEN}`}
    : {})
}

/*
  SideQuest display name → GitHub topic slug

  The user sees the friendly name in the UI,
  but GitHub receives the actual topic name.
*/
const technologyTopicMap = {
  'React': 'react',
  'Next.js': 'nextjs',
  'Vue': 'vue',
  'Angular': 'angular',
  'Node.js': 'nodejs',
  'Express': 'express',
  'React Native': 'react-native',
  'Frontend': 'frontend',
  'Backend': 'backend',
  'Web Development': 'web-development',
  'Tailwind CSS': 'tailwindcss',
  'Bootstrap': 'bootstrap',
  'Svelte': 'svelte',
  'Astro': 'astro',
  'MongoDB': 'mongodb',
  'PostgreSQL': 'postgresql',
  'MySQL': 'mysql',
  'SQLite': 'sqlite',
  'Redis': 'redis',
  'Firebase': 'firebase',
  'Supabase': 'supabase',
  'GraphQL': 'graphql',
  'REST API': 'rest-api',
  'Database': 'database',
  'AI': 'artificial-intelligence',
  'Artificial Intelligence': 'artificial-intelligence',
  'Machine Learning': 'machine-learning',
  'Deep Learning': 'deep-learning',
  'LLM': 'llm',
  'NLP': 'nlp',
  'Computer Vision': 'computer-vision',
  'Data Science': 'data-science',
  'Data Analytics': 'data-analytics',
  'TensorFlow': 'tensorflow',
  'PyTorch': 'pytorch',
  'Pandas': 'pandas',
  'Power BI': 'power-bi',
  'Tableau': 'tableau',
  'Docker': 'docker',
  'Kubernetes': 'kubernetes',
  'AWS': 'aws',
  'Azure': 'azure',
  'Google Cloud': 'google-cloud',
  'Terraform': 'terraform',
  'CI/CD': 'continuous-integration',
  'DevOps': 'devops',
  'Cybersecurity': 'cybersecurity',
  'Game Development': 'game-development',
  'Blockchain': 'blockchain',
  'DevTools': 'devtools',
  'CLI': 'cli',
  'Testing': 'testing',
  'Education': 'education',
  'Open Source': 'open-source',
  'Mobile': 'mobile'
}

const convertTechnologyToTopic = (technology) => {
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

const formatRepository = (repo) => ({
  id: repo.id,
  name: repo.full_name,
  owner: repo.owner?.login || '',
  repo: repo.name || '',
  description: repo.description || 'No description available.',
  stars: repo.stargazers_count || 0,
  forks: repo.forks_count || 0,
  watchers: repo.watchers_count || 0,
  language: repo.language || 'Unknown',
  topics: repo.topics || [],
  license: repo.license?.spdx_id || repo.license?.name || '',
  updatedAt: repo.updated_at || null,
  pushedAt: repo.pushed_at || null,
  archived: repo.archived || false,
  htmlUrl: repo.html_url || '',
  avatarUrl: repo.owner?.avatar_url || ''
})

const githubRequest = async (url) => {
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

    throw error
  }

  return data
}

/*
  Build the GitHub repository search query.

  Important:
  Technologies are converted to real GitHub topic slugs here.
*/
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
      const githubTopic = convertTechnologyToTopic(topic)
      queryParts.push(`topic:${githubTopic}`)
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
    queryParts.push('stars:>0')
  }

  return queryParts.join(' ')
}

app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'SideQuest backend is working!'
  })
})

/*
  Repository search
*/
app.get('/api/repositories/search', async (req, res) => {
  try {
    const {
      q = 'open source',
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
      per_page: String(perPage)
    })

    if (sortMetric) {
      params.set('sort', sortMetric)
      params.set('order', sortOrder === 'asc' ? 'asc' : 'desc')
    } else {
      params.set('sort', 'stars')
      params.set('order', 'desc')
    }

    const data = await githubRequest(
      `https://api.github.com/search/repositories?${params.toString()}`
    )

    const repositories = (data.items || []).map(formatRepository)

    res.json({
      repositories,
      total: data.total_count || 0,
      page: currentPage,
      perPage,
      query: searchQuery
    })
  } catch (error) {
    console.error('Repository search error:', error)

    const status = error.status || 500

    res.status(status).json({
      error: error.message || 'Failed to search repositories',
      github: error.githubData || null
    })
  }
})

/*
  Repository details
*/
app.get('/api/repositories/:owner/:repo', async (req, res) => {
  try {
    const {owner, repo} = req.params

    const data = await githubRequest(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
    )

    res.json({
      repository: formatRepository(data)
    })
  } catch (error) {
    console.error('Repository details error:', error)

    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch repository'
    })
  }
})

/*
  Repository languages
*/
app.get('/api/repositories/:owner/:repo/languages', async (req, res) => {
  try {
    const {owner, repo} = req.params

    const data = await githubRequest(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`
    )

    res.json(data)
  } catch (error) {
    console.error('Repository languages error:', error)

    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch repository languages'
    })
  }
})

/*
  Repository releases
*/
app.get('/api/repositories/:owner/:repo/releases', async (req, res) => {
  try {
    const {owner, repo} = req.params

    const data = await githubRequest(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases?per_page=10`
    )

    res.json({
      releases: data || []
    })
  } catch (error) {
    console.error('Repository releases error:', error)

    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch releases'
    })
  }
})

/*
  Repository commits
*/
app.get('/api/repositories/:owner/:repo/commits', async (req, res) => {
  try {
    const {owner, repo} = req.params

    const data = await githubRequest(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=10`
    )

    res.json({
      commits: data || []
    })
  } catch (error) {
    console.error('Repository commits error:', error)

    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch commits'
    })
  }
})

/*
  Repository contributors
*/
app.get('/api/repositories/:owner/:repo/contributors', async (req, res) => {
  try {
    const {owner, repo} = req.params

    const data = await githubRequest(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contributors?per_page=10`
    )

    res.json({
      contributors: data || []
    })
  } catch (error) {
    console.error('Repository contributors error:', error)

    res.status(error.status || 500).json({
      error: error.message || 'Failed to fetch contributors'
    })
  }
})

app.listen(PORT, () => {
  console.log(`SideQuest server running on http://localhost:${PORT}`)
})