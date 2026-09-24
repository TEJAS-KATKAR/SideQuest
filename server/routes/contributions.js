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

const repositoryCache = new Map()
const REPOSITORY_CACHE_TIME = 5 * 60 * 1000

const getDateString = daysAgo => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split('T')[0]
}

const normalizeLabels = labels =>
  (labels || [])
    .map(label => typeof label === 'string' ? label : label?.name)
    .filter(Boolean)

const normalizeTopics = topics =>
  Array.isArray(topics)
    ? topics.map(topic => String(topic).toLowerCase())
    : []

const getRepositoryData = async (repositoryUrl, githubRequest) => {
  if (!repositoryUrl) return null

  const cached = repositoryCache.get(repositoryUrl)

  if (cached?.promise) {
    return cached.promise
  }

  if (cached && cached.expiresAt > Date.now()) {
    return cached.data
  }

  const promise = githubRequest(repositoryUrl)
    .then(repository => {
      repositoryCache.set(repositoryUrl, {
        data: repository,
        expiresAt: Date.now() + REPOSITORY_CACHE_TIME
      })

      return repository
    })
    .catch(error => {
      repositoryCache.delete(repositoryUrl)
      throw error
    })

  repositoryCache.set(repositoryUrl, {promise})

  return promise
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
    parts.push(
      '(label:"good first issue" OR label:"good-first-issue" OR label:"first issue" OR label:"beginner-friendly" OR label:"beginner friendly" OR label:beginner)'
    )
  }

  return parts.join(' ')
}

const matchesTechnology = (issue, selectedTechnologies) => {
  if (!selectedTechnologies.length) return true

  const technologies = issue.technologies || []

  return selectedTechnologies.some(technology =>
    technologies.includes(technology)
  )
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
  return issue.activity === activity
}

const matchesType = (issue, types) => {
  if (!types.length) return true
  return types.includes(issue.type)
}

const matchesDifficulty = (issue, difficulty) => {
  if (difficulty === 'All') return true
  return issue.difficulty === difficulty
}

const matchesSearch = (issue, search) => {
  if (!search) return true

  const terms = search.toLowerCase().trim().split(/\s+/).filter(Boolean)
  const searchableText = [
    issue.title,
    issue.description,
    issue.repo,
    ...normalizeLabels(issue.labels),
    ...(issue.technologies || [])
  ].join(' ').toLowerCase()

  return terms.every(term => searchableText.includes(term))
}

const formatRelativeTime = dateValue => {
  if (!dateValue) return 'Unknown'

  const seconds = Math.floor(
    (Date.now() - new Date(dateValue).getTime()) / 1000
  )

  if (seconds < 60) return 'just now'

  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return `${minutes}m ago`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours}h ago`
  }

  const days = Math.floor(hours / 24)

  if (days < 30) {
    return `${days}d ago`
  }

  const months = Math.floor(days / 30)

  if (months < 12) {
    return `${months}mo ago`
  }

  return `${Math.floor(months / 12)}y ago`
}

const formatIssue = (issue, repositoryOverride = null) => {
  const repository = repositoryOverride || issue.repository || {}
  const repositoryOwner = repository.owner || {}

  const labels = normalizeLabels(issue.labels)

  const repositoryFullName =
    repository.full_name ||
    issue.repository_url?.split('/repos/')[1] ||
    issue.repositoryFullName ||
    ''

  const [ownerFromName, repoFromName] =
    repositoryFullName.split('/')

  const owner =
    repositoryOwner.login ||
    ownerFromName ||
    ''

  const repositoryName =
    repository.name ||
    repoFromName ||
    ''

  const analysis = analyzeContribution({
    ...issue,
    labels,
    repository
  })

  const topics = normalizeTopics(repository.topics)

  const technologies = Object.keys(technologyTopicMap)
    .filter(technology =>
      technologyTopicMap[technology].some(topic =>
        topics.includes(topic)
      )
    )
    .slice(0, 10)

  const stars = Number(
    repository.stargazers_count ?? 0
  )

  const forks = Number(
    repository.forks_count ?? 0
  )

  const watchers = Number(
    repository.subscribers_count ?? 0
  )

  const language =
    repository.language ||
    'Unknown'

  const activityDate =
    repository.pushed_at ||
    repository.updated_at ||
    issue.updated_at

  const repositoryApiUrl =
    repository.full_name
      ? `https://api.github.com/repos/${repository.full_name}`
      : issue.repository_url || ''

  return {
    id: issue.id,
    repository,

    repo:
      owner && repositoryName
        ? `${owner}/${repositoryName}`
        : repositoryFullName,

    owner,
    repositoryName,
    repositoryApiUrl,

    title:
      issue.title ||
      'Untitled issue',

    number:
      issue.number,

    description:
      issue.body ||
      issue.description ||
      '',

    state:
      issue.state ||
      'open',

    opened:
      formatRelativeTime(
        issue.created_at ||
        issue.createdAt
      ),

    updated:
      formatRelativeTime(
        issue.updated_at ||
        issue.updatedAt
      ),

    difficulty:
      analysis.difficulty,

    type:
      analysis.type,

    labels,
    language,
    technologies,

    comments:
      Number(issue.comments) || 0,

    stars,
    forks,
    watchers,

    activity:
      analysis.activity !== 'Unknown'
        ? analysis.activity
        : activityDate
          ? 'Active'
          : 'Unknown',

    assignment:
      analysis.assignment,

    issueAge:
      analysis.issueAge,

    discussion:
      analysis.discussion,

    scope:
      analysis.scope,

    beginner:
      analysis.difficulty === 'Beginner' ||
      labels.some(label =>
        [
          'good first issue',
          'first issue',
          'beginner'
        ].includes(label.toLowerCase())
      ),

    verified:
      Boolean(repository.owner),

    icon:
      repositoryName?.charAt(0).toUpperCase() ||
      'G',

    avatarUrl:
      repositoryOwner.avatar_url ||
      issue.user?.avatar_url ||
      '',

    repositoryDescription:
      repository.description ||
      'No repository description available.',

    repositoryUrl:
      repository.html_url ||
      (
        owner &&
        repositoryName
          ? `https://github.com/${owner}/${repositoryName}`
          : ''
      ),

    htmlUrl:
      issue.html_url ||
      '',

    author:
      issue.user?.login ||
      issue.author ||
      'Unknown',

    authorAvatar:
      issue.user?.avatar_url ||
      issue.authorAvatar ||
      '',

    createdAt:
      issue.created_at ||
      issue.createdAt,

    updatedAt:
      issue.updated_at ||
      issue.updatedAt,

    difficultyRank:
      analysis.difficultyRank,

    repositoryActivity:
      analysis.activity,

    reasons:
      analysis.reasons ||
      []
  }
}

const getBestMatchScore = issue => {
  let score = 0

  if (issue.beginner) {
    score += 40
  }

  if (issue.comments >= 1) {
    score += 15
  }

  if (issue.comments >= 5) {
    score += 10
  }

  if (issue.comments >= 10) {
    score += 10
  }

  if (issue.activity === 'Very active') {
    score += 15
  }

  if (issue.activity === 'Active') {
    score += 10
  }

  if (issue.difficulty === 'Easy') {
    score += 8
  }

  if (issue.difficulty === 'Beginner') {
    score += 5
  }

  if (issue.stars >= 100000) {
    score += 30
  } else if (issue.stars >= 50000) {
    score += 25
  } else if (issue.stars >= 10000) {
    score += 20
  } else if (issue.stars >= 5000) {
    score += 15
  } else if (issue.stars >= 1000) {
    score += 8
  }

  return score
}

const sortIssues = (issues, sort) => {
  const sorted = [...issues]

  if (sort === 'Recently opened') {
    return sorted.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
  }

  if (sort === 'Recently updated') {
    return sorted.sort(
      (a, b) =>
        new Date(b.updatedAt) -
        new Date(a.updatedAt)
    )
  }

  if (sort === 'Most active') {
    return sorted.sort((a, b) => {
      const activityScore = {
        'Very active': 4,
        Active: 3,
        'Moderately active': 2,
        Moderate: 2,
        'Low activity': 1,
        Unknown: 0
      }

      const scoreA =
        (activityScore[a.activity] || 0) * 100 +
        a.comments +
        a.stars / 100000

      const scoreB =
        (activityScore[b.activity] || 0) * 100 +
        b.comments +
        b.stars / 100000

      return scoreB - scoreA
    })
  }

  if (sort === 'Lowest difficulty') {
    return sorted.sort(
      (a, b) =>
        difficultyRank[a.difficulty] -
        difficultyRank[b.difficulty]
    )
  }

  return sorted.sort(
    (a, b) =>
      getBestMatchScore(b) -
      getBestMatchScore(a)
  )
}

const enrichIssues = async (issues, githubRequest) => {
  const repositoryResults = new Map()

  for (const issue of issues) {
    if (!issue.repositoryApiUrl) continue

    if (repositoryResults.has(issue.repositoryApiUrl)) {
      continue
    }

    const repository = await getRepositoryData(
      issue.repositoryApiUrl,
      githubRequest
    )

    repositoryResults.set(
      issue.repositoryApiUrl,
      repository
    )
  }

  return issues.map(issue => {
    const repository =
      repositoryResults.get(
        issue.repositoryApiUrl
      )

    if (!repository) {
      return issue
    }

    return formatIssue(
      {
        ...issue,
        body: issue.description,
        created_at: issue.createdAt,
        updated_at: issue.updatedAt,
        repository
      },
      repository
    )
  })
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

      const cleanSearch = q.trim()

      const isDefaultFeed =
        !cleanSearch &&
        !languages.length &&
        !technologies.length &&
        !issueLabels.length &&
        !issueTypes.length &&
        difficulty === 'All' &&
        activity === 'All' &&
        assignment === 'All' &&
        issueAge === 'All' &&
        discussion === 'All' &&
        beginner !== 'true'

      const currentPage =
        Math.max(
          Number(page) || 1,
          1
        )

      const perPage =
        Math.min(
          Math.max(
            Number(per_page) || 10,
            1
          ),
          10
        )

      let searchQuery
      let searchSort
      let searchOrder

      if (isDefaultFeed) {
        searchQuery =
          'is:issue is:open (label:"good first issue" OR label:"help wanted")'

        searchSort = 'comments'
        searchOrder = 'desc'
      } else {
        searchQuery = buildIssueQuery({
          search: cleanSearch,
          languages,
          labels: issueLabels,
          assignment,
          issueAge,
          beginner: beginner === 'true'
        })

        searchSort =
          sort === 'Recently opened'
            ? 'created'
            : sort === 'Recently updated'
              ? 'updated'
              : 'comments'

        searchOrder =
          sort === 'Best match' &&
          ['Beginner', 'Easy'].includes(difficulty)
            ? 'asc'
            : 'desc'
      }

      const params = new URLSearchParams({
        q: searchQuery,
        page: String(currentPage),
        per_page: String(perPage),
        sort: searchSort,
        order: searchOrder
      })

      const data = await githubRequest(
        `https://api.github.com/search/issues?${params.toString()}`
      )

      const sourceResults =
        data.total_count || 0

      let issues = (data.items || []).map(issue =>
        formatIssue(issue)
      )

      issues = await enrichIssues(
        issues,
        githubRequest
      )

      if (!isDefaultFeed) {
        issues = issues.filter(issue =>
          matchesSearch(
            issue,
            cleanSearch
          ) &&
          matchesTechnology(
            issue,
            technologies
          ) &&
          matchesDifficulty(
            issue,
            difficulty
          ) &&
          matchesType(
            issue,
            issueTypes
          ) &&
          matchesActivity(
            issue,
            activity
          ) &&
          matchesDiscussion(
            issue,
            discussion
          ) &&
          (
            beginner !== 'true' ||
            issue.beginner
          )
        )

      }

      issues = sortIssues(issues, sort)

      const totalPages =
        Math.max(
          Math.ceil(sourceResults / perPage),
          1
        )

      const safePage =
        Math.min(
          currentPage,
          totalPages
        )

      res.json({
        issues,
        total: sourceResults,
        page: safePage,
        perPage,
        totalPages,
        sourceResults,
        hasMoreSourceResults:
          sourceResults > safePage * perPage,
        featured:
          isDefaultFeed
      })
    } catch (error) {
      console.error(
        'Contribution search error:',
        error
      )

      res.status(
        error.status || 500
      ).json({
        error:
          error.message ||
          'Failed to fetch contribution opportunities',

        github:
          error.githubData ||
          null,

        rateLimit: {
          limit:
            error.limit ||
            null,

          remaining:
            error.remaining ||
            null,

          reset:
            error.reset ||
            null
        }
      })
    }
  })

  router.get(
    '/:owner/:repo/:issueNumber',
    async (req, res) => {
      try {
        const {
          owner,
          repo,
          issueNumber
        } = req.params

        const issueUrl =
          `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`

        const repositoryUrl =
          `https://api.github.com/repos/${owner}/${repo}`

        const issue =
          await githubRequest(issueUrl)

        const repository =
          await getRepositoryData(
            repositoryUrl,
            githubRequest
          )

        let comments = []

        if (Number(issue.comments) > 0) {
          const commentsUrl =
            `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments?per_page=30`

          const commentData =
            await githubRequest(commentsUrl)

          comments =
            (commentData || []).map(
              comment => ({
                id: comment.id,

                author:
                  comment.user?.login ||
                  'GitHub user',

                avatarUrl:
                  comment.user?.avatar_url ||
                  '',

                body:
                  comment.body ||
                  '',

                createdAt:
                  comment.created_at ||
                  '',

                updatedAt:
                  comment.updated_at ||
                  ''
              })
            )
        }

        const formattedIssue =
          formatIssue(
            {
              ...issue,
              repository
            },
            repository
          )

        res.json({
          issue: {
            ...formattedIssue,

            repository:
              repository || {},

            repo:
              repository?.full_name ||
              formattedIssue.repo,

            owner:
              repository?.owner?.login ||
              formattedIssue.owner ||
              owner,

            repositoryName:
              repository?.name ||
              formattedIssue.repositoryName ||
              repo,

            language:
              repository?.language ||
              formattedIssue.language,

            stars:
              Number(
                repository?.stargazers_count ??
                formattedIssue.stars ??
                0
              ),

            forks:
              Number(
                repository?.forks_count ??
                formattedIssue.forks ??
                0
              ),

            watchers:
              Number(
                repository?.subscribers_count ??
                formattedIssue.watchers ??
                0
              ),

            avatarUrl:
              repository?.owner?.avatar_url ||
              formattedIssue.avatarUrl ||
              '',

            repositoryUrl:
              repository?.html_url ||
              `https://github.com/${owner}/${repo}`,

            htmlUrl:
              issue.html_url ||
              `https://github.com/${owner}/${repo}/issues/${issueNumber}`
          },

          comments
        })
      } catch (error) {
        console.error(
          'Contribution details error:',
          error
        )

        res.status(
          error.status || 500
        ).json({
          error:
            error.message ||
            'Failed to load contribution'
        })
      }
    }
  )

  return router
}

module.exports = {
  createContributionRouter
}
