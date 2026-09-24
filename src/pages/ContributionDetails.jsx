import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import API_BASE from '../config/api'
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  ExternalLink,
  GitBranch,
  Globe,
  Heart,
  Info,
  Lightbulb,
  MessageCircle,
  Star,
  Target
} from 'lucide-react'

const SAVED_KEY = 'sidequest-saved-opportunities'

const formatNumber = number => {
  const value = Number(number) || 0

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace('.0', '')}m`
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace('.0', '')}k`
  }

  return value.toString()
}

const ContributionDetails = () => {
  const {owner, repo, issueNumber} = useParams()
  const navigate = useNavigate()

  const [issue, setIssue] = useState(null)
  const [comments, setComments] = useState([])
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const savedIssues =
        JSON.parse(
          localStorage.getItem(SAVED_KEY)
        ) || []

      setSaved(
        savedIssues.some(
          savedIssue =>
            savedIssue.id === issue?.id
        )
      )
    } catch {
      setSaved(false)
    }
  }, [issue?.id])

  useEffect(() => {
    const controller =
      new AbortController()

    const loadContribution = async () => {
      setLoading(true)
      setError('')
      setIssue(null)
      setComments([])

      try {
        const response =
          await fetch(
            `${API_BASE}/api/contributions/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${issueNumber}`,
            {
              signal:
                controller.signal
            }
          )

        const data =
          await response.json()

        if (!response.ok) {
          throw new Error(
            data?.error ||
            'Failed to load contribution'
          )
        }

        setIssue(
          data.issue || null
        )

        setComments(
          data.comments || []
        )
      } catch (error) {
        if (
          error.name ===
          'AbortError'
        ) {
          return
        }

        console.error(
          'Contribution details error:',
          error
        )

        setError(
          error.message ||
          'Unable to load contribution.'
        )
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false)
        }
      }
    }

    loadContribution()

    return () =>
      controller.abort()
  }, [owner, repo, issueNumber])

  const handleSave = () => {
    if (!issue) return

    let savedIssues = []

    try {
      savedIssues =
        JSON.parse(
          localStorage.getItem(SAVED_KEY)
        ) || []
    } catch {
      savedIssues = []
    }

    if (saved) {
      savedIssues =
        savedIssues.filter(
          savedIssue =>
            savedIssue.id !== issue.id
        )

      setSaved(false)
    } else {
      savedIssues = [
        ...savedIssues.filter(
          savedIssue =>
            savedIssue.id !== issue.id
        ),
        issue
      ]

      setSaved(true)
    }

    localStorage.setItem(
      SAVED_KEY,
      JSON.stringify(savedIssues)
    )

    window.dispatchEvent(
      new Event(
        'sidequest-saved-updated'
      )
    )
  }

  if (loading) {
    return (
      <div className="px-8 py-10">
        <div className="flex items-center justify-center min-h-80">
          <p className="text-sm text-gray-500">
            Loading contribution...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-8 py-10">
        <div className="bg-white border border-red-200 rounded-xl p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-900">
            Unable to load contribution
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {error}
          </p>

          <button
            onClick={() =>
              navigate('/contributions')
            }
            className="mt-5 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Back to Contributions
          </button>
        </div>
      </div>
    )
  }

  if (!issue) {
    return (
      <div className="px-8 py-10">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-900">
            Contribution not found
          </p>

          <p className="text-sm text-gray-500 mt-2">
            We couldn't find this GitHub contribution opportunity.
          </p>

          <button
            onClick={() =>
              navigate('/contributions')
            }
            className="mt-5 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Back to Contributions
          </button>
        </div>
      </div>
    )
  }

  const repository =
    issue.repository || {}

  const repositoryOwner =
    issue.owner ||
    repository.owner?.login ||
    owner

  const repositoryName =
    issue.repositoryName ||
    repository.name ||
    repo

  const repositoryFullName =
    issue.repo ||
    repository.full_name ||
    `${repositoryOwner}/${repositoryName}`

  const githubUrl =
    issue.htmlUrl ||
    `https://github.com/${repositoryOwner}/${repositoryName}/issues/${issue.number}`

  const repositoryUrl =
    issue.repositoryUrl ||
    repository.html_url ||
    `https://github.com/${repositoryOwner}/${repositoryName}`

  const stars =
    Number(
      issue.stars ??
      repository.stargazers_count
    ) || 0

  const forks =
    Number(
      issue.forks ??
      repository.forks_count
    ) || 0

  const watchers =
    Number(
      issue.watchers ??
      repository.subscribers_count
    ) || 0

  const language =
    issue.language ||
    repository.language ||
    'Unknown'

  const technologies =
    issue.technologies || []

  const labels =
    issue.labels || []

  const reasons =
    issue.reasons?.length
      ? issue.reasons
      : [
          'Open contribution opportunity',
          'Issue can be worked on through GitHub'
        ]

  return (
    <div className="px-8 py-5">

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
        <button
          onClick={() =>
            navigate('/contributions')
          }
          className="text-indigo-600 font-medium hover:text-indigo-800 transition"
        >
          Contributions
        </button>

        <ChevronRight size={15} />

        <span className="text-indigo-600">
          {repositoryFullName}
        </span>

        <ChevronRight size={15} />

        <span className="font-medium text-gray-800">
          Issue #{issue.number}
        </span>
      </div>

      <div className="flex items-start justify-between">

        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">
            {issue.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-semibold">
              <CircleDot size={13} />
              {issue.state || 'open'}
            </span>

            {labels.map(label => (
              <span
                key={label}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                  label.toLowerCase() === 'bug'
                    ? 'bg-red-50 text-red-600'
                    : 'bg-indigo-50 text-indigo-600'
                }`}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Globe
                size={15}
                className="text-blue-500"
              />
              {repositoryFullName}
            </span>

            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              {language}
            </span>

            {technologies[0] && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                {technologies[0]}
              </span>
            )}

            <span className="flex items-center gap-1.5">
              <Star
                size={15}
                className="text-gray-500"
              />
              {formatNumber(stars)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-6">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition"
          >
            <Globe size={15} />
            View on GitHub
            <ExternalLink size={12} />
          </a>

          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
              saved
                ? 'bg-indigo-50 border border-indigo-300 text-indigo-600'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Heart
              size={15}
              className={
                saved
                  ? 'fill-indigo-600'
                  : ''
              }
            />
            {saved
              ? 'Saved'
              : 'Save opportunity'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_352px] gap-6 mt-6">

        <div className="min-w-0">

          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Info
                size={18}
                className="text-indigo-600"
              />

              <h2 className="text-sm font-bold text-gray-900">
                THE PROBLEM
              </h2>
            </div>

            <div className="mt-4">
              {issue.description ? (
                <p className="text-sm text-gray-700 leading-6 whitespace-pre-wrap">
                  {issue.description}
                </p>
              ) : (
                <p className="text-sm text-gray-500 leading-6">
                  This issue does not currently have a description.
                </p>
              )}
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-4">
            <div className="flex items-center gap-2">
              <Check
                size={18}
                className="text-green-600"
              />

              <h2 className="text-sm font-bold text-gray-900">
                WHAT NEEDS TO BE DONE
              </h2>
            </div>

            <p className="text-sm text-gray-700 leading-6 mt-4 whitespace-pre-wrap">
              {issue.description ||
                'Review the issue requirements on GitHub and implement the requested change.'}
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-4">
            <div className="flex items-center gap-2 mb-5">
              <Target
                size={18}
                className="text-indigo-600"
              />

              <h2 className="text-sm font-bold text-gray-900">
                SIDEQUEST ANALYSIS
              </h2>
            </div>

            <div className="grid grid-cols-4">
              {[
                ['Difficulty', issue.difficulty || 'Unknown'],
                ['Type', issue.type || 'General'],
                ['Repository Activity', issue.activity || 'Unknown'],
                ['Discussion', issue.discussion || 'Unknown']
              ].map(
                ([label, value], index) => (
                  <div
                    key={label}
                    className={`px-4 ${
                      index !== 0
                        ? 'border-l border-gray-200'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-semibold text-gray-700">
                        {label}
                      </p>

                      <Info
                        size={12}
                        className="text-gray-400"
                      />
                    </div>

                    <p className="text-sm font-semibold text-green-600 mt-2">
                      {value}
                    </p>

                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full w-[78%] bg-green-500 rounded-full" />
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-4">
            <div className="flex items-center gap-2">
              <Lightbulb
                size={18}
                className="text-yellow-500"
              />

              <h2 className="text-sm font-bold text-gray-900">
                WHY THIS COULD BE A GOOD FIRST CONTRIBUTION
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
              {reasons.map(reason => (
                <div
                  key={reason}
                  className="flex items-start gap-2"
                >
                  <Check
                    size={15}
                    className="text-green-500 shrink-0 mt-0.5"
                  />

                  <p className="text-xs text-gray-600 leading-5">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-4">
            <div className="flex items-center gap-2">
              <Code2
                size={18}
                className="text-indigo-600"
              />

              <h2 className="text-sm font-bold text-gray-900">
                SKILLS / TECHNOLOGIES
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.length > 0 ? (
                technologies.map(
                  technology => (
                    <span
                      key={technology}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-medium"
                    >
                      {technology}
                    </span>
                  )
                )
              ) : (
                <span className="text-sm text-gray-500">
                  No repository technologies were detected.
                </span>
              )}
            </div>
          </section>

          <section className="bg-indigo-50 border border-indigo-100 rounded-xl mt-6 p-6 flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-gray-900">
                Ready to work on this?
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Make your contribution on GitHub and help improve this project.
              </p>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
            >
              <ExternalLink size={15} />
              View this contribution on GitHub
              <ArrowUpRight size={14} />
            </a>
          </section>
        </div>

        <aside className="flex flex-col gap-5">

          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm font-bold text-gray-900">
              REPOSITORY CONTEXT
            </p>

            <div className="flex items-center gap-3 mt-5">
              <div className="w-16 h-16 rounded-lg bg-[#111b2f] flex items-center justify-center text-white overflow-hidden">
                {issue.avatarUrl ? (
                  <img
                    src={issue.avatarUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold">
                    {repositoryName
                      ?.charAt(0)
                      .toUpperCase() || 'G'}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-indigo-600 truncate">
                    {repositoryFullName}
                  </p>

                  {issue.verified && (
                    <Check
                      size={14}
                      className="fill-indigo-500 text-white shrink-0"
                    />
                  )}
                </div>

                <p className="text-xs text-gray-500 leading-5 mt-1">
                  {issue.repositoryDescription ||
                    repository.description ||
                    'No repository description available.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-5 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                {language}
              </span>

              {technologies[0] && (
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  {technologies[0]}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-5">
              <div className="flex items-center gap-3 text-sm">
                <Star
                  size={15}
                  className="text-gray-500"
                />

                <span>
                  {formatNumber(stars)} Stars
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <GitBranch
                  size={15}
                  className="text-gray-500"
                />

                <span>
                  {formatNumber(forks)} Forks
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <CircleDot
                  size={15}
                  className="text-green-500"
                />

                <span>
                  {issue.activity || 'Unknown'}
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/repository/${repositoryOwner}/${repositoryName}`
                )
              }
              className="w-full mt-5 px-4 py-2.5 border border-indigo-300 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition"
            >
              View Repository
              <ArrowUpRight
                size={14}
                className="inline ml-1"
              />
            </button>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Info
                size={17}
                className="text-indigo-600"
              />

              <p className="text-sm font-bold text-gray-900">
                ISSUE INFORMATION
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-5">
              {[
                ['Issue', `#${issue.number}`],
                ['Opened', issue.opened || 'Unknown'],
                ['Last updated', issue.updated || 'Unknown'],
                ['Comments', issue.comments ?? 0],
                ['Assignee', issue.assignment || 'Unassigned']
              ].map(
                ([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[120px_1fr] items-center text-sm"
                  >
                    <span className="font-medium text-gray-700">
                      {label}
                    </span>

                    <span className="text-gray-600">
                      {value}
                    </span>
                  </div>
                )
              )}

              <div className="grid grid-cols-[120px_1fr] items-start text-sm">
                <span className="font-medium text-gray-700">
                  Labels
                </span>

                <div className="flex flex-wrap gap-2">
                  {labels.length > 0 ? (
                    labels.map(label => (
                      <span
                        key={label}
                        className="px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-600"
                      >
                        {label}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">
                      None
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <MessageCircle
                size={18}
                className="text-indigo-600"
              />

              <p className="text-sm font-bold text-gray-900">
                DISCUSSION PREVIEW
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-5">
              {comments.length > 0 ? (
                comments.slice(0, 5).map(comment => (
                  <div
                    key={comment.id}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden text-xs font-semibold text-gray-600">
                        {comment.avatarUrl ? (
                          <img
                            src={comment.avatarUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          comment.author
                            ?.charAt(0)
                            .toUpperCase()
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-900">
                          {comment.author}
                        </p>

                        <p className="text-[10px] text-gray-400">
                          {comment.createdAt
                            ? new Date(
                                comment.createdAt
                              ).toLocaleDateString()
                            : ''}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-5 mt-3 whitespace-pre-wrap">
                      {comment.body}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No comments yet.
                </p>
              )}
            </div>

            <a
              href={`${githubUrl}#issuecomment-new`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm text-indigo-600 font-semibold mt-5 hover:text-indigo-800 transition"
            >
              View all {issue.comments ?? 0} comments on GitHub
              <ArrowUpRight size={14} />
            </a>
          </section>


          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Lightbulb
                size={18}
                className="text-yellow-500"
              />

              <p className="text-sm font-bold text-gray-900">
                TIPS
              </p>
            </div>

            <p className="text-sm text-gray-600 leading-6 mt-4">
              Read the issue carefully, check the repository's contributing guidelines, and understand the expected change before starting work.
            </p>

            <a
              href={`${repositoryUrl}/blob/main/CONTRIBUTING.md`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm text-indigo-600 font-semibold mt-5 hover:text-indigo-800 transition"
            >
              See contributing guide
              <ArrowUpRight size={14} />
            </a>
          </section>

        </aside>
      </div>
    </div>
  )
}

export default ContributionDetails
