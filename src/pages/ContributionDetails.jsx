import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {ArrowUpRight, Check, ChevronRight, CircleDot, Code2, ExternalLink, GitBranch, Globe, Heart, Info, Lightbulb, MessageCircle, Star, Target, Users} from 'lucide-react'
import {contributions} from '../data/contributions'

const ContributionDetails = () => {
  const {owner, repo, issueNumber} = useParams()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  const contribution = contributions.find(
    (item) =>
      item.owner === owner &&
      item.repo === repo &&
      item.issueNumber === issueNumber
  )

  if (!contribution) {
    return (
      <div className="px-8 py-10">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-900">Contribution not found</p>
          <p className="text-sm text-gray-500 mt-2">We couldn't find this contribution opportunity.</p>
          <button onClick={() => navigate('/contributions')} className="mt-5 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
            Back to Contributions
          </button>
        </div>
      </div>
    )
  }

  const githubUrl = `https://github.com/${contribution.owner}/${contribution.repo}/issues/${contribution.issueNumber}`
  const repositoryUrl = `https://github.com/${contribution.owner}/${contribution.repo}`

  return (
    <div className="px-8 py-5">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
        <button onClick={() => navigate('/contributions')} className="text-indigo-600 font-medium hover:text-indigo-800 transition">Contributions</button>
        <ChevronRight size={15}/>
        <span className="text-indigo-600">{contribution.owner}/{contribution.repo}</span>
        <ChevronRight size={15}/>
        <span className="font-medium text-gray-800">Issue #{contribution.issueNumber}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">{contribution.title}</h1>

          <div className="flex items-center gap-2 mt-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-semibold">
              <CircleDot size={13}/>
              {contribution.state}
            </span>

            {contribution.labels.map((label) => (
              <span key={label} className={`px-3 py-1.5 rounded-full text-sm font-semibold ${label === 'bug' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
                {label}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Globe size={15} className="text-blue-500"/>
              {contribution.owner}/{contribution.repo}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              {contribution.language}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              {contribution.technology}
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={15} className="text-gray-500"/>
              {contribution.repository.stars}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-6">
          <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition">
            <Globe size={15}/>
            View on GitHub
            <ExternalLink size={12}/>
          </a>

          <button onClick={() => setSaved(!saved)} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${saved ? 'bg-indigo-50 border border-indigo-300 text-indigo-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
            <Heart size={15} className={saved ? 'fill-indigo-600' : ''}/>
            {saved ? 'Saved' : 'Save opportunity'}
          </button>
        </div>

      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-[minmax(0,1fr)_352px] gap-6 mt-6">

        {/* Left Content */}
        <div className="min-w-0">

          {/* Problem */}
          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Info size={18} className="text-indigo-600"/>
              <h2 className="text-sm font-bold text-gray-900">THE PROBLEM</h2>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              {contribution.description.map((paragraph) => (
                <p key={paragraph} className="text-sm text-gray-700 leading-6">{paragraph}</p>
              ))}
            </div>
          </section>

          {/* What Needs To Be Done */}
          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-4">
            <div className="flex items-center gap-2">
              <Check size={18} className="text-green-600"/>
              <h2 className="text-sm font-bold text-gray-900">WHAT NEEDS TO BE DONE</h2>
            </div>

            <p className="text-sm text-gray-700 leading-6 mt-4">
              Update the navigation component to ensure consistent markup between server and client renders.
            </p>

            <div className="flex flex-col gap-2 mt-3">
              {contribution.tasks.map((task) => (
                <div key={task} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SideQuest Analysis */}
          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-4">
            <div className="flex items-center gap-2 mb-5">
              <Target size={18} className="text-indigo-600"/>
              <h2 className="text-sm font-bold text-gray-900">SIDEQUEST ANALYSIS</h2>
            </div>

            <div className="grid grid-cols-5">
              {[
                ['Difficulty', contribution.difficulty],
                ['Complexity', contribution.complexity],
                ['Beginner Friendly', contribution.beginnerFriendly],
                ['Repository Activity', contribution.repositoryActivity],
                ['Issue Clarity', contribution.issueClarity]
              ].map(([label, value], index) => (
                <div key={label} className={`px-4 ${index !== 0 ? 'border-l border-gray-200' : ''}`}>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-semibold text-gray-700">{label}</p>
                    <Info size={12} className="text-gray-400"/>
                  </div>
                  <p className="text-sm font-semibold text-green-600 mt-2">{value}</p>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-[78%] bg-green-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Good First Contribution */}
          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-4">
            <div className="flex items-center gap-2">
              <Lightbulb size={18} className="text-yellow-500"/>
              <h2 className="text-sm font-bold text-gray-900">WHY THIS COULD BE A GOOD FIRST CONTRIBUTION</h2>
            </div>

            <div className="grid grid-cols-5 gap-4 mt-5">
              {contribution.reasons.map((reason) => (
                <div key={reason} className="flex items-start gap-2">
                  <Check size={15} className="text-green-500 shrink-0 mt-0.5"/>
                  <p className="text-xs text-gray-600 leading-5">{reason}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mt-4">
            <div className="flex items-center gap-2">
              <Code2 size={18} className="text-indigo-600"/>
              <h2 className="text-sm font-bold text-gray-900">SKILLS / TECHNOLOGIES</h2>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {contribution.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="bg-indigo-50 border border-indigo-100 rounded-xl mt-6 p-6 flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-gray-900">Ready to work on this?</p>
              <p className="text-sm text-gray-600 mt-1">Make your contribution on GitHub and help improve this project.</p>
            </div>

            <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
              <ExternalLink size={15}/>
              View this contribution on GitHub
              <ArrowUpRight size={14}/>
            </a>
          </section>

        </div>

        {/* Right Content */}
        <aside className="flex flex-col gap-5">

          {/* Repository Context */}
          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm font-bold text-gray-900">REPOSITORY CONTEXT</p>

            <div className="flex items-center gap-3 mt-5">
              <div className="w-16 h-16 rounded-lg bg-[#111b2f] flex items-center justify-center text-white">
                <span className="text-2xl font-bold">⚛</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-indigo-600">{contribution.owner}/{contribution.repo}</p>
                  {contribution.repository.verified && <Check size={14} className="fill-indigo-500 text-white"/>}
                </div>
                <p className="text-xs text-gray-500 leading-5 mt-1">{contribution.repository.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 mt-5 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                {contribution.language}
              </span>

              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                {contribution.technology}
              </span>
            </div>

            <div className="flex flex-col gap-4 mt-5">
              <div className="flex items-center gap-3 text-sm">
                <Star size={15} className="text-gray-500"/>
                <span>{contribution.repository.stars} Stars</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <GitBranch size={15} className="text-gray-500"/>
                <span>{contribution.repository.forks} Forks</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <CircleDot size={15} className="text-green-500"/>
                <span>{contribution.repository.activity}</span>
              </div>
            </div>

            <button onClick={() => navigate(`/repository/${contribution.owner}/${contribution.repo}`)} className="w-full mt-5 px-4 py-2.5 border border-indigo-300 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition">
              View Repository
              <ArrowUpRight size={14} className="inline ml-1"/>
            </button>
          </section>

          {/* Issue Information */}
          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Info size={17} className="text-indigo-600"/>
              <p className="text-sm font-bold text-gray-900">ISSUE INFORMATION</p>
            </div>

            <div className="flex flex-col gap-4 mt-5">
              {[
                ['Issue', `#${contribution.issueNumber}`],
                ['Opened', contribution.opened],
                ['Last updated', contribution.updated],
                ['Comments', contribution.comments],
                ['Assignee', contribution.assignee]
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[120px_1fr] items-center text-sm">
                  <span className="font-medium text-gray-700">{label}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}

              <div className="grid grid-cols-[120px_1fr] items-start text-sm">
                <span className="font-medium text-gray-700">Labels</span>
                <div className="flex flex-wrap gap-2">
                  {contribution.labels.map((label) => (
                    <span key={label} className="px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-600">{label}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center text-sm">
                <span className="font-medium text-gray-700">Related issues</span>
                <span className="text-indigo-600">{contribution.relatedIssues.join(', ')}</span>
              </div>
            </div>
          </section>

          {/* Discussion */}
          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} className="text-indigo-600"/>
              <p className="text-sm font-bold text-gray-900">DISCUSSION PREVIEW</p>
            </div>

            <div className="flex flex-col gap-3 mt-5">
              {contribution.discussion.map((comment) => (
                <div key={`${comment.author}-${comment.date}`} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-gray-900">{comment.author}</p>
                        {comment.role && <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-[9px] text-indigo-600">{comment.role}</span>}
                      </div>
                      <p className="text-[10px] text-gray-400">{comment.date}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 leading-5 mt-3">{comment.message}</p>
                </div>
              ))}
            </div>

            <a href={`${githubUrl}#issuecomment-new`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-indigo-600 font-semibold mt-5 hover:text-indigo-800 transition">
              View all {contribution.comments} comments on GitHub
              <ArrowUpRight size={14}/>
            </a>
          </section>

          {/* Profile Match */}
          <section className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
            <div className="flex items-center gap-2">
              <Target size={17} className="text-indigo-600"/>
              <p className="text-sm font-bold text-gray-900">MATCH WITH YOUR PROFILE</p>
            </div>

            <div className="flex items-end gap-3 mt-6">
              <p className="text-3xl font-bold text-indigo-600">{contribution.profileMatch.score}%</p>
              <p className="text-sm font-semibold text-green-600 mb-1">Great match</p>
            </div>

            <div className="h-1.5 bg-indigo-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{width: `${contribution.profileMatch.score}%`}}></div>
            </div>

            <div className="flex flex-col gap-3 mt-5">
              {contribution.profileMatch.reasons.map((reason) => (
                <div key={reason} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">+ {reason}</span>
                  <Check size={15} className="text-green-500"/>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Lightbulb size={18} className="text-yellow-500"/>
              <p className="text-sm font-bold text-gray-900">TIPS</p>
            </div>

            <p className="text-sm text-gray-600 leading-6 mt-4">{contribution.tip}</p>

            <a href={`${repositoryUrl}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-indigo-600 font-semibold mt-5 hover:text-indigo-800 transition">
              See contributing guide
              <ArrowUpRight size={14}/>
            </a>
          </section>

        </aside>

      </div>

    </div>
  )
}

export default ContributionDetails