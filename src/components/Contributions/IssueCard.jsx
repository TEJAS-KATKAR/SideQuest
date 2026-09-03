import React, {useState} from 'react'
import {Bookmark, Check, ExternalLink, MessageCircle, Star} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const IssueCard = ({issue}) => {
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm hover:shadow-md hover:border-gray-300 transition">

      <div className="flex gap-5">

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">

            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-700 shrink-0">
              {issue.icon}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">{issue.repo}</p>
                {issue.verified && <Check size={13} className="fill-indigo-500 text-white"/>}
              </div>

              <p className="text-sm font-semibold text-gray-900 mt-2 hover:text-indigo-600 cursor-pointer transition">{issue.title}</p>

              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span>#{issue.number}</span>
                <span>opened {issue.opened}</span>
                <span className="px-2 py-1 rounded-full bg-green-50 text-green-600">good first issue</span>
              </div>

              <div className="flex items-center gap-2 mt-3">
                {issue.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-64 shrink-0">
          <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold ${issue.difficulty === 'Beginner' ? 'bg-green-50 text-green-600' : issue.difficulty === 'Easy' ? 'bg-orange-50 text-orange-600' : issue.difficulty === 'Medium' ? 'bg-red-50 text-red-500' : 'bg-rose-100 text-rose-700'}`}>
            {issue.difficulty}
          </span>

          <p className="text-xs font-semibold text-gray-800 mt-3">Why good for beginners?</p>

          <div className="flex flex-col gap-1.5 mt-2">
            {issue.reasons.map((reason) => (
              <div key={reason} className="flex items-center gap-2 text-[11px] text-gray-500">
                <Check size={13} className="text-green-500 shrink-0"/>
                {reason}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end justify-between shrink-0">
          <button onClick={() => setSaved(!saved)} className={`p-2 rounded-lg border transition ${saved ? 'border-indigo-300 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500 hover:text-indigo-600 hover:bg-gray-50'}`}>
            <Bookmark size={16} className={saved ? 'fill-indigo-600' : ''}/>
          </button>

          <button onClick={() => navigate(`/contributions/${issue.repo.split('/')[0]}/${issue.repo.split('/')[1]}/${issue.number}`)} className="flex items-center gap-1 px-5 py-2.5 border border-indigo-300 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white active:bg-indigo-700 transition">
            View issue
            <ExternalLink size={14}/>
          </button>
        </div>

      </div>

      <div className="flex items-center gap-5 ml-13 mt-3 text-[11px] text-gray-400">
        <span>{issue.language}</span>
        <span className="flex items-center gap-1"><MessageCircle size={12}/> {issue.comments}</span>
        <span className="flex items-center gap-1"><Star size={12}/> {issue.stars}</span>
        <span>{issue.activity}</span>
      </div>

    </div>
  )
}

export default IssueCard