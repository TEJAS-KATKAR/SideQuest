const difficultyRank = {
    Beginner: 1,
    Easy: 2,
    Medium: 3,
    Hard: 4
  }
  
  const getDifficulty = ({labels, comments, body, type, assignment, ageDays}) => {
    const normalizedLabels = labels.map(label => label.toLowerCase())
    const text = `${type} ${body || ''}`.toLowerCase()
  
    if (
      normalizedLabels.includes('good first issue') ||
      normalizedLabels.includes('beginner-friendly')
    ) {
      return 'Beginner'
    }
  
    let score = 0
  
    if (comments >= 20) score += 2
    else if (comments >= 8) score += 1
  
    if (body && body.length > 5000) score += 2
    else if (body && body.length > 2500) score += 1
  
    if (
      normalizedLabels.some(label =>
        ['security', 'performance', 'architecture', 'refactor'].includes(label)
      )
    ) {
      score += 2
    }
  
    if (text.includes('breaking change')) score += 2
    if (text.includes('multiple packages')) score += 2
    if (text.includes('migration')) score += 1
  
    if (assignment === 'Assigned') score += 1
    if (ageDays > 90) score += 1
  
    if (score <= 1) return 'Easy'
    if (score <= 4) return 'Medium'
    return 'Hard'
  }
  
  const getIssueType = labels => {
    const normalizedLabels = labels.map(label => label.toLowerCase())
  
    if (normalizedLabels.some(label => ['bug', 'bugfix', 'type: bug'].includes(label))) {
      return 'Bug fix'
    }
  
    if (
      normalizedLabels.some(label =>
        ['documentation', 'docs', 'good documentation'].includes(label)
      )
    ) {
      return 'Documentation'
    }
  
    if (
      normalizedLabels.some(label =>
        ['testing', 'tests', 'test'].includes(label)
      )
    ) {
      return 'Testing'
    }
  
    if (normalizedLabels.some(label => ['refactor', 'refactoring'].includes(label))) {
      return 'Refactor'
    }
  
    if (
      normalizedLabels.some(label =>
        ['performance', 'perf', 'optimization'].includes(label)
      )
    ) {
      return 'Performance'
    }
  
    if (
      normalizedLabels.some(label =>
        ['accessibility', 'a11y'].includes(label)
      )
    ) {
      return 'Accessibility'
    }
  
    if (
      normalizedLabels.some(label =>
        ['security', 'vulnerability'].includes(label)
      )
    ) {
      return 'Security'
    }
  
    if (
      normalizedLabels.some(label =>
        ['enhancement', 'feature', 'feature request'].includes(label)
      )
    ) {
      return 'Feature'
    }
  
    return 'Other'
  }
  
  const getActivity = pushedAt => {
    if (!pushedAt) return 'Unknown'
  
    const daysSincePush = Math.floor(
      (Date.now() - new Date(pushedAt).getTime()) / 86400000
    )
  
    if (daysSincePush <= 7) return 'Very active'
    if (daysSincePush <= 30) return 'Active'
    if (daysSincePush <= 90) return 'Moderate'
    return 'Low activity'
  }
  
  const getIssueAge = createdAt => {
    const days = Math.floor(
      (Date.now() - new Date(createdAt).getTime()) / 86400000
    )
  
    if (days < 1) return 'Today'
    if (days <= 7) return 'Last 7 days'
    if (days <= 30) return 'Last 30 days'
    return 'Last 90 days'
  }
  
  const getDiscussion = comments => {
    if (comments === 0) return 'No discussion'
    if (comments <= 5) return 'Low'
    if (comments <= 20) return 'Medium'
    return 'High'
  }
  
  const getScope = ({body, labels}) => {
    const normalizedLabels = labels.map(label => label.toLowerCase())
  
    if (
      normalizedLabels.includes('good first issue') ||
      normalizedLabels.includes('documentation')
    ) {
      return 'Small'
    }
  
    if (!body || body.length < 1200) return 'Small'
    if (body.length < 3500) return 'Medium'
    return 'Large'
  }
  
  const getReasons = ({
    labels,
    comments,
    difficulty,
    assignment,
    body,
    ageDays,
    activity
  }) => {
    const normalizedLabels = labels.map(label => label.toLowerCase())
    const reasons = []
  
    if (
      normalizedLabels.includes('good first issue') ||
      normalizedLabels.includes('beginner-friendly')
    ) {
      reasons.push('Marked as a beginner-friendly issue')
    }
  
    if (normalizedLabels.includes('help wanted')) {
      reasons.push('Maintainers are asking for community help')
    }
  
    if (
      normalizedLabels.includes('documentation') ||
      normalizedLabels.includes('docs')
    ) {
      reasons.push('Documentation-focused contribution')
    }
  
    if (assignment === 'Unassigned') {
      reasons.push('Currently unassigned')
    }
  
    if (comments <= 5) {
      reasons.push('Limited discussion so far')
    }
  
    if (body && body.length < 1500) {
      reasons.push('Focused issue description')
    }
  
    if (ageDays <= 7) {
      reasons.push('Recently opened')
    }
  
    if (activity === 'Very active' || activity === 'Active') {
      reasons.push('Repository is actively maintained')
    }
  
    if (difficulty === 'Easy') {
      reasons.push('Relatively contained scope')
    }
  
    if (difficulty === 'Medium') {
      reasons.push('Moderate implementation complexity')
    }
  
    if (reasons.length < 2) {
      reasons.push('Issue contains enough information to evaluate')
    }
  
    return reasons.slice(0, 3)
  }
  
  const analyzeContribution = issue => {
    const labels = issue.labels || []
    const comments = Number(issue.comments) || 0
    const body = issue.body || ''
    const assignment = issue.assignees?.length ? 'Assigned' : 'Unassigned'
    const ageDays = Math.max(
      0,
      Math.floor((Date.now() - new Date(issue.created_at).getTime()) / 86400000)
    )
    const type = getIssueType(labels)
    const activity = getActivity(issue.repository?.pushed_at)
    const difficulty = getDifficulty({
      labels,
      comments,
      body,
      type,
      assignment,
      ageDays
    })
  
    return {
      difficulty,
      type,
      activity,
      assignment,
      issueAge: getIssueAge(issue.created_at),
      discussion: getDiscussion(comments),
      scope: getScope({body, labels}),
      reasons: getReasons({
        labels,
        comments,
        difficulty,
        assignment,
        body,
        ageDays,
        activity
      }),
      difficultyRank: difficultyRank[difficulty]
    }
  }
  
  module.exports = {
    analyzeContribution,
    difficultyRank
  }