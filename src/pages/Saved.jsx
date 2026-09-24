import React, {useEffect, useState} from 'react'
import {
  Bookmark,
  BookmarkX,
  HeartHandshake
} from 'lucide-react'
import IssueCard from '../components/Contributions/IssueCard'

const SAVED_KEY = 'sidequest-saved-opportunities'

const getSavedIssues = () => {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY)) || []
  } catch {
    return []
  }
}

const Saved = () => {
  const [savedIssues, setSavedIssues] = useState(getSavedIssues)

  useEffect(() => {
    const handleSavedUpdate = () => {
      setSavedIssues(getSavedIssues())
    }

    window.addEventListener('sidequest-saved-updated', handleSavedUpdate)

    return () => {
      window.removeEventListener('sidequest-saved-updated', handleSavedUpdate)
    }
  }, [])

  return (
    <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8">

      <div className="flex items-start sm:items-center gap-4 min-w-0">
        <div className="flex items-center justify-center size-12 bg-indigo-100 rounded-xl">
          <Bookmark className="size-6 text-indigo-600" />
        </div>

        <div className="min-w-0">
          <h1 className="text-[28px] font-bold text-gray-900">
            Saved Opportunities
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Keep track of contribution opportunities you want to explore.
          </p>
        </div>
      </div>

      {savedIssues.length > 0 ? (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-gray-900">
              {savedIssues.length} saved {savedIssues.length === 1 ? 'opportunity' : 'opportunities'}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {savedIssues.map(issue => (
              <IssueCard
                key={issue.id}
                issue={issue}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-105 mt-6 bg-white border border-gray-200 rounded-2xl">
          <div className="flex items-center justify-center size-16 bg-indigo-50 rounded-2xl">
            <BookmarkX className="size-8 text-indigo-400" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-900">
            No saved opportunities yet
          </h2>

          <p className="max-w-md mt-2 text-sm leading-5 text-center text-gray-500">
            Save contribution opportunities while exploring projects and they will appear here for easy access later.
          </p>
        </div>
      )}
    </div>
  )
}

export default Saved
