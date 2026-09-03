import React from 'react'
import {CircleDot, ExternalLink, ArrowRight} from 'lucide-react'

const issues = [
  {
    repo: 'facebook/react',
    title: 'Improve documentation for useEffect',
    labels: ['documentation', 'good first issue'],
    language: 'JavaScript'
  },
  {
    repo: 'vercel/next.js',
    title: 'Add example for image optimization',
    labels: ['documentation', 'good first issue'],
    language: 'TypeScript'
  },
  {
    repo: 'tailwindlabs/tailwindcss',
    title: 'Improve error message for invalid class',
    labels: ['good first issue', 'help wanted'],
    language: 'TypeScript'
  }
]

const GoodFirstIssues = () => {
  return (
    <section className="px-8 pb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-lg font-semibold text-gray-900">Good First Issues</p>
          <p className="text-sm text-gray-500 mt-1">Start contributing without getting overwhelmed.</p>
        </div>

        <button className="flex items-center gap-1 text-sm text-indigo-600 font-medium">Find more <ArrowRight size={15}/></button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {issues.map((issue, index) => (
          <div key={issue.title} className={`flex items-center gap-4 px-5 py-4 ${index !== issues.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <CircleDot size={18} className="text-green-500 shrink-0"/>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{issue.title}</p>
              <p className="text-xs text-gray-500 mt-1">{issue.repo} · {issue.language}</p>
            </div>

            <div className="flex items-center gap-2">
              {issue.labels.map((label) => (
                <span key={label} className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-[10px]">{label}</span>
              ))}
            </div>

            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
              <ExternalLink size={16}/>
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GoodFirstIssues