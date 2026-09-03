const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN
    ? {Authorization: `Bearer ${process.env.GITHUB_TOKEN}`}
    : {})
}

app.get('/api/test', (req, res) => {
  res.json({
    message: 'SideQuest backend is working'
  })
})

app.get('/api/repositories/search', async (req, res) => {
  const {
    q = 'open source',
    language,
    sort = 'stars',
    order = 'desc',
    page = 1,
    per_page = 10
  } = req.query

  try {
    const searchParts = [q]

    if (language && language !== 'All') {
      searchParts.push(`language:${language}`)
    }

    const githubQuery = encodeURIComponent(searchParts.join(' '))

    const response = await fetch(
      `https://api.github.com/search/repositories?q=${githubQuery}&sort=${sort}&order=${order}&page=${page}&per_page=${per_page}`,
      {
        headers: githubHeaders
      }
    )

    if (!response.ok) {
      const errorData = await response.json()

      return res.status(response.status).json({
        error: errorData.message || 'GitHub search failed'
      })
    }

    const data = await response.json()

    const repositories = data.items.map((repo) => ({
      id: repo.id,
      name: repo.full_name,
      description: repo.description || 'No description available.',
      language: repo.language || 'Unknown',
      languageColor: 'bg-indigo-500',
      topics: repo.topics || [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated: repo.updated_at,
      activity: repo.archived ? 'Archived' : 'Active',
      beginner: false,
      verified: false,
      icon: repo.name.charAt(0).toUpperCase(),
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-900',
      url: repo.html_url,
      owner: repo.owner.login,
      repo: repo.name,
      avatar: repo.owner.avatar_url
    }))

    res.json({
      total: data.total_count,
      page: Number(page),
      perPage: Number(per_page),
      repositories
    })
  } catch (error) {
    console.error('GitHub search error:', error)

    res.status(500).json({
      error: 'Unable to connect to GitHub'
    })
  }
})

app.get('/api/repositories/:owner/:repo', async (req, res) => {
  const {owner, repo} = req.params

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: githubHeaders
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Repository not found'
      })
    }

    const data = await response.json()

    res.json({
      owner: data.owner.login,
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.subscribers_count,
      language: data.language,
      topics: data.topics || [],
      license: data.license?.name || 'No license',
      defaultBranch: data.default_branch,
      openIssues: data.open_issues_count,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      pushedAt: data.pushed_at,
      url: data.html_url,
      homepage: data.homepage,
      archived: data.archived,
      fork: data.fork
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Unable to connect to GitHub'
    })
  }
})

app.get('/api/repositories/:owner/:repo/languages', async (req, res) => {
  const {owner, repo} = req.params

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      {
        headers: githubHeaders
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Unable to load language data'
      })
    }

    const data = await response.json()

    const total = Object.values(data).reduce((sum, value) => sum + value, 0)

    const languages = Object.entries(data)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: total ? Math.round((bytes / total) * 100) : 0
      }))
      .sort((a, b) => b.bytes - a.bytes)

    res.json(languages)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Unable to connect to GitHub'
    })
  }
})

app.get('/api/repositories/:owner/:repo/releases', async (req, res) => {
  const {owner, repo} = req.params

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases?per_page=5`,
      {
        headers: githubHeaders
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Unable to load release data'
      })
    }

    const data = await response.json()

    const releases = data.map((release) => ({
      name: release.name || release.tag_name,
      tag: release.tag_name,
      publishedAt: release.published_at,
      url: release.html_url,
      prerelease: release.prerelease
    }))

    res.json(releases)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Unable to connect to GitHub'
    })
  }
})

app.get('/api/repositories/:owner/:repo/commits', async (req, res) => {
  const {owner, repo} = req.params

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`,
      {
        headers: githubHeaders
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Unable to load commit data'
      })
    }

    const data = await response.json()

    const commits = data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message.split('\n')[0],
      author: commit.commit.author?.name || 'Unknown',
      date: commit.commit.author?.date || null,
      url: commit.html_url
    }))

    res.json(commits)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Unable to connect to GitHub'
    })
  }
})

app.get('/api/repositories/:owner/:repo/contributors', async (req, res) => {
  const {owner, repo} = req.params

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=10`,
      {
        headers: githubHeaders
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Unable to load contributor data'
      })
    }

    const data = await response.json()

    res.json({
      count: data.length,
      contributors: data.map((contributor) => ({
        login: contributor.login,
        contributions: contributor.contributions,
        avatar: contributor.avatar_url,
        url: contributor.html_url
      }))
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Unable to connect to GitHub'
    })
  }
})

app.listen(PORT, () => {
  console.log(`SideQuest server running on http://localhost:${PORT}`)
})