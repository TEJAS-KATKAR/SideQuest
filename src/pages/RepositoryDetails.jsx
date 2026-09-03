import React, {useEffect, useState} from 'react'
import {ArrowUpRight, BookOpen, Check, ChevronRight, CircleDot, Code2, Copy, Eye, ExternalLink, GitBranch, Globe, Heart, Play, Scale, Star, Users, Watch} from 'lucide-react'
import {useNavigate, useParams} from 'react-router-dom'

const RepositoryDetails = () => {
  const {owner, repo} = useParams()
  const navigate = useNavigate()

  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('Overview')
  const [copied, setCopied] = useState(false)
  const [repository, setRepository] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`http://localhost:5000/api/repositories/${owner}/${repo}`)

        if (!response.ok) {
          throw new Error('Repository not found')
        }

        const data = await response.json()
        setRepository(data)
      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepository()
  }, [owner, repo])

  const cloneCommand = `git clone https://github.com/${owner}/${repo}.git`

  const codeExample = `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count is {count}
    </button>
  )
}`

  const copyCommand = async () => {
    await navigator.clipboard.writeText(cloneCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const tabs = ['Overview', 'README', 'Setup', 'Issues', 'Contributions']

  const formatNumber = (number) => {
    if (number >= 1000000) return `${(number / 1000000).toFixed(1)}m`
    if (number >= 1000) return `${(number / 1000).toFixed(1)}k`
    return number
  }

  const formatDate = (date) => {
    if (!date) return 'Unknown'

    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="px-8 py-10">
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-600">Loading repository...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !repository) {
    return (
      <div className="px-8 py-10">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-900">Repository not found</p>
          <p className="text-sm text-gray-500 mt-2">{error || 'We could not load this repository.'}</p>
          <button onClick={() => navigate('/explore')} className="mt-5 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
            Back to Explore
          </button>
        </div>
      </div>
    )
  }

  const githubUrl = repository.url
  const repositoryName = repository.fullName || `${repository.owner}/${repository.name}`

  return (
    <div className="px-8 py-5">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button onClick={() => navigate('/explore')} className="text-indigo-600 font-medium hover:text-indigo-800 transition">
          Explore
        </button>
        <ChevronRight size={15}/>
        <span>{repository.owner}</span>
        <ChevronRight size={15}/>
        <span className="font-semibold text-gray-800">{repository.name}</span>
      </div>

      {/* Repository Header */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#111b2f] flex items-center justify-center text-white shrink-0">
            <span className="text-3xl font-bold">
              {repository.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">{repositoryName}</h1>
              <Check size={16} className="fill-indigo-500 text-white"/>
            </div>

            <p className="text-base text-gray-500 mt-1">
              {repository.description || 'No repository description available.'}
            </p>

            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Globe size={14}/>
                {repository.owner}
              </span>

              {!repository.archived && (
                <span className="flex items-center gap-1 text-green-600">
                  <CircleDot size={14}/>
                  Active
                </span>
              )}

              {repository.archived && (
                <span className="flex items-center gap-1 text-orange-600">
                  <CircleDot size={14}/>
                  Archived
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition">
            <Globe size={15}/>
            View on GitHub
            <ExternalLink size={12}/>
          </a>

          <button onClick={() => setSaved(!saved)} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${saved ? 'bg-indigo-50 border border-indigo-300 text-indigo-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
            <Heart size={15} className={saved ? 'fill-indigo-600' : ''}/>
            {saved ? 'Saved' : 'Save repository'}
          </button>
        </div>

      </div>

      {/* Repository Stats */}
      <div className="grid grid-cols-6 bg-white border border-gray-200 rounded-xl shadow-sm mt-5">

        <div className="flex items-center gap-3 px-5 py-4 border-r border-gray-100">
          <Star size={17} className="text-gray-500"/>
          <div>
            <p className="text-base font-semibold text-gray-900">{formatNumber(repository.stars)}</p>
            <p className="text-xs text-gray-500">Stars</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-r border-gray-100">
          <GitBranch size={17} className="text-gray-500"/>
          <div>
            <p className="text-base font-semibold text-gray-900">{formatNumber(repository.forks)}</p>
            <p className="text-xs text-gray-500">Forks</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-r border-gray-100">
          <Eye size={17} className="text-gray-500"/>
          <div>
            <p className="text-base font-semibold text-gray-900">{formatNumber(repository.watchers)}</p>
            <p className="text-xs text-gray-500">Watchers</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-r border-gray-100">
          <Code2 size={17} className="text-yellow-500"/>
          <div>
            <p className="text-base font-semibold text-gray-900">{repository.language || 'Unknown'}</p>
            <p className="text-xs text-gray-500">Primary language</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-r border-gray-100">
          <Watch size={17} className="text-gray-500"/>
          <div>
            <p className="text-base font-semibold text-gray-900">{formatDate(repository.pushedAt)}</p>
            <p className="text-xs text-gray-500">Last updated</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <Scale size={17} className="text-gray-500"/>
          <div>
            <p className="text-base font-semibold text-gray-900">{repository.license}</p>
            <p className="text-xs text-gray-500">License</p>
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mt-5 border-b border-gray-200">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition border-b-2 ${activeTab === tab ? 'text-indigo-600 border-indigo-600' : 'text-gray-500 border-transparent hover:text-gray-900'}`}>
            {tab === 'Overview' && <BookOpen size={15}/>}
            {tab === 'README' && <BookOpen size={15}/>}
            {tab === 'Setup' && <Play size={15}/>}
            {tab === 'Issues' && <CircleDot size={15}/>}
            {tab === 'Contributions' && <Users size={15}/>}
            {tab}
            {tab === 'Issues' && (
              <span className="px-1.5 py-0.5 rounded-full bg-gray-100 text-[10px]">
                {formatNumber(repository.openIssues)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex items-start gap-6 mt-4">

        <div className="flex-1 min-w-0">

          {/* About / Technologies / Topics */}
          <div className="grid grid-cols-3 gap-5">

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">ABOUT THIS PROJECT</p>

              <p className="text-sm text-gray-600 leading-6 mt-4">
                {repository.description || 'This repository does not have a description yet.'}
              </p>

              <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-indigo-600 font-semibold mt-5 hover:text-indigo-800 transition">
                Learn more on GitHub
                <ArrowUpRight size={14}/>
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">TECHNOLOGIES</p>

              <div className="flex flex-col gap-4 mt-4">

                {repository.language && (
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded bg-yellow-100 text-yellow-700 flex items-center justify-center text-sm font-bold">
                      {repository.language.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="text-sm font-medium">{repository.language}</span>
                  </div>
                )}

                {repository.topics.slice(0, 2).map((topic) => (
                  <div key={topic} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                      #
                    </span>
                    <span className="text-sm font-medium">{topic}</span>
                  </div>
                ))}

                {!repository.language && repository.topics.length === 0 && (
                  <p className="text-sm text-gray-500">No technology information available.</p>
                )}

              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">TOPICS</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {repository.topics.length > 0 ? (
                  repository.topics.map((topic) => (
                    <span key={topic} className="px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs">
                      {topic}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No topics available.</p>
                )}
              </div>

              {repository.topics.length > 0 && (
                <button className="flex items-center gap-1 text-sm text-indigo-600 font-semibold mt-5 hover:text-indigo-800 transition">
                  View all topics
                  <ArrowUpRight size={14}/>
                </button>
              )}
            </div>

          </div>

          {/* README */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm mt-5 overflow-hidden">

            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-sm font-bold text-gray-900">README</p>
            </div>

            <div className="grid grid-cols-2 gap-6 p-5">

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{repository.name.charAt(0).toUpperCase()}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{repository.name}</h2>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 py-1 rounded bg-gray-100 text-xs text-gray-600">issues</span>
                  <span className="px-2 py-1 rounded bg-green-100 text-xs text-green-700">{formatNumber(repository.openIssues)} open</span>
                  <span className="px-2 py-1 rounded bg-gray-100 text-xs text-gray-600">license</span>
                  <span className="px-2 py-1 rounded bg-green-100 text-xs text-green-700">{repository.license}</span>
                </div>

                <p className="text-sm text-gray-600 leading-6 mt-5">
                  {repository.description || 'No README summary is available yet.'}
                </p>

                <h3 className="text-base font-semibold text-gray-900 mt-5">✦ Repository information</h3>

                <div className="flex flex-col gap-2.5 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-indigo-600"/>
                    Default branch: {repository.defaultBranch}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-indigo-600"/>
                    {formatNumber(repository.stars)} stars
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-indigo-600"/>
                    {formatNumber(repository.forks)} forks
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-indigo-600"/>
                    {repository.language || 'Multiple'} technology stack
                  </div>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="rounded-lg overflow-hidden bg-[#182033] border border-gray-700 shadow-sm transition-all duration-300 hover:border-indigo-500 hover:shadow-[0_0_24px_rgba(99,102,241,0.35)]">

                <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-gray-700">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-white">Example</span>
                    <span className="text-xs text-gray-400">{repository.language || 'Code'}</span>
                  </div>

                  <button onClick={() => {navigator.clipboard.writeText(codeExample); setCopied(true); setTimeout(() => setCopied(false), 1800)}} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 text-xs text-gray-300 hover:bg-white/20 transition">
                    <Copy size={13}/>
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <pre className="p-5 text-xs leading-6 text-gray-300 overflow-auto">
                  {codeExample}
                </pre>

              </div>

            </div>
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-3 gap-5 mt-5">

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">GET STARTED</p>

              <div className="flex flex-col gap-4 mt-4">

                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-indigo-600 text-sm font-bold">1</span>
                    <p className="text-sm font-medium">Clone the repository</p>
                  </div>

                  <div className="flex items-center justify-between gap-2 px-3 py-2.5 bg-gray-50 rounded-md mt-2">
                    <code className="text-xs text-gray-600 truncate">{cloneCommand}</code>

                    <button onClick={copyCommand} className="text-gray-500 hover:text-indigo-600 transition shrink-0">
                      <Copy size={13}/>
                    </button>
                  </div>

                  {copied && (
                    <p className="text-xs text-green-600 mt-1">
                      Copied to clipboard
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-indigo-600 text-sm font-bold">2</span>
                  <p className="text-sm font-medium">Install dependencies</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-indigo-600 text-sm font-bold">3</span>
                  <p className="text-sm font-medium">Run the project</p>
                </div>

              </div>

              <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-indigo-600 font-semibold mt-5 hover:text-indigo-800 transition">
                View setup on GitHub
                <ArrowUpRight size={14}/>
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">DOCUMENTATION & RESOURCES</p>

              <div className="flex flex-col gap-4 mt-5">

                {repository.homepage && (
                  <a href={repository.homepage} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm text-indigo-600 font-medium hover:text-indigo-800 transition">
                    <BookOpen size={15}/>
                    <span>
                      Project Website<br/>
                      <small className="text-gray-400 text-xs font-normal">
                        {repository.homepage}
                      </small>
                    </span>
                  </a>
                )}

                <a href={`${githubUrl}/issues`} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm text-indigo-600 font-medium hover:text-indigo-800 transition">
                  <CircleDot size={15}/>
                  <span>
                    Issues<br/>
                    <small className="text-gray-400 text-xs font-normal">
                      {formatNumber(repository.openIssues)} open issues
                    </small>
                  </span>
                </a>

                <a href={`${githubUrl}/blob/${repository.defaultBranch}/README.md`} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm text-indigo-600 font-medium hover:text-indigo-800 transition">
                  <Code2 size={15}/>
                  <span>
                    README on GitHub<br/>
                    <small className="text-gray-400 text-xs font-normal">
                      {repository.defaultBranch}/README.md
                    </small>
                  </span>
                </a>

              </div>

              <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-indigo-600 font-semibold mt-5 hover:text-indigo-800 transition">
                View repository resources
                <ArrowUpRight size={14}/>
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">CONTRIBUTING</p>

              <p className="text-sm text-gray-600 leading-6 mt-4">
                Explore the repository's contribution guidelines and open issues to find ways to get involved.
              </p>

              <div className="flex flex-col gap-3 mt-4">
                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleDot size={13}/>
                  Open source under {repository.license}
                </p>

                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <GitBranch size={13}/>
                  Contributions via Pull Requests
                </p>

                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <Check size={13}/>
                  Follow project guidelines
                </p>
              </div>

              <a href={`${githubUrl}/issues`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-indigo-600 font-semibold mt-5 hover:text-indigo-800 transition">
                Find contribution opportunities
                <ArrowUpRight size={14}/>
              </a>
            </div>

          </div>

        </div>

        {/* Right Sidebar */}
        <aside className="w-72 shrink-0 flex flex-col gap-5">

          {/* Repository Activity */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <CircleDot size={16} className="text-green-500"/>
              <p className="text-sm font-bold text-gray-900">REPOSITORY ACTIVITY</p>
            </div>

            <div className="flex items-center gap-2 mt-5">
              <span className={`w-2.5 h-2.5 rounded-full ${repository.archived ? 'bg-orange-500' : 'bg-green-500'}`}></span>
              <p className="text-base font-semibold text-gray-900">
                {repository.archived ? 'Archived' : 'Active'}
              </p>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              {repository.archived ? 'No longer actively developed' : 'Repository is actively maintained'}
            </p>

            <p className="text-sm font-semibold text-gray-800 mt-6">
              Repository overview
            </p>

            <div className="flex flex-col gap-3 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Open issues</span>
                <span className="font-medium">{formatNumber(repository.openIssues)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Stars</span>
                <span className="font-medium">{formatNumber(repository.stars)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Forks</span>
                <span className="font-medium">{formatNumber(repository.forks)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last push</span>
                <span className="font-medium">{formatDate(repository.pushedAt)}</span>
              </div>
            </div>

            <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 w-full text-sm text-indigo-600 font-semibold mt-5 hover:text-indigo-800 transition">
              View repository activity
              <ArrowUpRight size={14}/>
            </a>
          </div>

          {/* Repository Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm font-bold text-gray-900">REPOSITORY DETAILS</p>

            <div className="flex flex-col gap-4 mt-5">

              <div>
                <p className="text-xs text-gray-400">Primary language</p>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  {repository.language || 'Not specified'}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Default branch</p>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  {repository.defaultBranch}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">License</p>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  {repository.license}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Repository created</p>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  {formatDate(repository.createdAt)}
                </p>
              </div>

            </div>
          </div>

          {/* Popular Languages */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm font-bold text-gray-900">POPULAR LANGUAGES</p>

            <div className="mt-5">
              {repository.language ? (
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-2 font-medium text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      {repository.language}
                    </span>

                    <span className="text-gray-500">Primary</span>
                  </div>

                  <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-full bg-indigo-500 rounded-full"></div>
                  </div>

                  <p className="text-xs text-gray-400 mt-3">
                    Detailed language percentages will be loaded from GitHub.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Language information unavailable.
                </p>
              )}
            </div>
          </div>

          {/* Recent Release */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm font-bold text-gray-900">RECENT RELEASE</p>

            <div className="flex items-center gap-2 mt-4">
              <p className="text-base font-semibold">Release data</p>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Release information will be connected to the GitHub releases API.
            </p>

            <a href={`${githubUrl}/releases`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-indigo-600 font-semibold mt-5 hover:text-indigo-800 transition">
              View releases
              <ArrowUpRight size={14}/>
            </a>
          </div>

        </aside>

      </div>

    </div>
  )
}

export default RepositoryDetails