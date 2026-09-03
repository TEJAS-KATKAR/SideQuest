const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.get('/api/test', (req, res) => {
  res.json({
    message: 'SideQuest backend is working'
  })
})

app.get('/api/repositories/:owner/:repo', async (req, res) => {
  const {owner, repo} = req.params

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github+json'
      }
    })

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

app.listen(PORT, () => {
  console.log(`SideQuest server running on http://localhost:${PORT}`)
})