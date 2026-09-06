import React, {useEffect, useMemo, useState} from 'react'
import {Search} from 'lucide-react'
import HowToHeader from '../components/HowTo/HowToHeader'
import FAQSection from '../components/HowTo/FAQSection'

const faqSections = [
  {
    title: 'Getting Started',
    description: 'The basics you need before using SideQuest.',
    questions: [
      {
        id: 'what-is-sidequest',
        question: 'What is SideQuest?',
        answer: 'SideQuest is a platform that helps developers discover open-source repositories and contribution opportunities. Instead of only showing GitHub data, SideQuest organizes useful information so you can understand which projects and issues may be worth contributing to.'
      },
      {
        id: 'how-sidequest-works',
        question: 'How does SideQuest work?',
        answer: 'SideQuest gets repository and issue information from GitHub and presents it in a simpler way. You can explore repositories, filter contribution opportunities, compare useful project information, save opportunities, and open a detailed view before deciding what you want to work on.'
      },
      {
        id: 'need-github-account',
        question: 'Do I need a GitHub account to use SideQuest?',
        answer: 'You can use SideQuest to discover and explore opportunities without connecting a GitHub account. However, you will need a GitHub account when you want to actually contribute to a GitHub project, such as opening a pull request or participating in an issue.'
      },
      {
        id: 'how-to-start',
        question: 'How do I get started with open source?',
        answer: 'Start by choosing a project that matches your interests and the technologies you already know. Then look for an issue that seems understandable and suitable for your experience level. Read the issue and repository guidelines before making any changes.'
      }
    ]
  },
  {
    title: 'Explore Repositories',
    description: 'Learn how to discover projects using Explore.',
    questions: [
      {
        id: 'what-is-explore',
        question: 'What does the Explore page do?',
        answer: 'Explore helps you find open-source repositories using search, languages, technologies, popularity, activity, licenses, and other filters. It is useful when you want to discover projects first and decide which repositories interest you before looking for a specific issue.'
      },
      {
        id: 'explore-filters',
        question: 'How do the repository filters work?',
        answer: 'Filters narrow the repositories shown in your results. For example, you can choose JavaScript as a language, React as a technology, a minimum number of stars, a license, or a certain activity level. You can combine multiple filters to make the results more relevant.'
      },
      {
        id: 'stars-forks-watchers',
        question: 'What do Stars, Forks, and Watchers mean?',
        answer: 'Stars generally show how many GitHub users have bookmarked or shown interest in a repository. Forks show how many copies of the repository have been created under other GitHub accounts. Watchers are users who are following activity in the repository.'
      },
      {
        id: 'explore-technologies',
        question: 'What are Technologies?',
        answer: 'Technologies represent tools, frameworks, platforms, and technical areas associated with a repository. They help you discover projects using technologies you already know or want to learn, such as React, Node.js, Python, Docker, or Machine Learning.'
      },
      {
        id: 'beginner-filter',
        question: 'What does “Good for beginners” mean?',
        answer: 'This filter looks for opportunities that SideQuest considers more approachable for newer contributors. GitHub labels such as “good first issue” can be an important signal, but SideQuest can also consider other issue information when evaluating an opportunity.'
      },
      {
        id: 'explore-sorting',
        question: 'How does sorting work?',
        answer: 'Sorting changes the order of repository results based on the metric you choose. For example, you can sort by stars, forks, or watchers and choose whether the results should go from low to high or high to low.'
      }
    ]
  },
  {
    title: 'Contribution Opportunities',
    description: 'Understand the information shown on contribution cards.',
    questions: [
      {
        id: 'what-is-opportunity',
        question: 'What is a contribution opportunity?',
        answer: 'A contribution opportunity is an open GitHub issue that someone may be able to work on. SideQuest presents the issue together with useful repository information and its own analysis so you can compare opportunities more easily.'
      },
      {
        id: 'difficulty',
        question: 'What do Beginner, Easy, Medium, and Hard mean?',
        answer: 'These are SideQuest difficulty assessments, not official GitHub difficulty labels. SideQuest can estimate difficulty by looking at signals such as issue labels, description, discussion, assignment status, and the type of work involved.'
      },
      {
        id: 'how-difficulty-calculated',
        question: 'How is difficulty calculated?',
        answer: 'SideQuest can combine several GitHub signals to estimate difficulty. For example, a clearly described documentation change with a good first issue label may receive a lower difficulty, while a complex architectural or performance change may receive a higher difficulty.'
      },
      {
        id: 'why-this-fits',
        question: 'What does “Why this fits” mean?',
        answer: 'Why this fits is a SideQuest explanation of why an opportunity may be approachable or relevant. It can use information such as labels, assignment status, issue clarity, project activity, and the type of contribution to give you a quick explanation.'
      },
      {
        id: 'unassigned',
        question: 'What does Unassigned mean?',
        answer: 'Unassigned means that GitHub currently does not show an assignee for the issue. This can mean that nobody has officially taken responsibility for the issue yet, although it does not guarantee that nobody is already working on it.'
      },
      {
        id: 'issue-labels',
        question: 'What do the issue labels mean?',
        answer: 'Labels are tags added to GitHub issues to help maintainers organize them. Examples include bug, documentation, enhancement, help wanted, and good first issue. SideQuest can use these labels to help classify and explain opportunities.'
      },
      {
        id: 'activity-level',
        question: 'What does repository activity mean?',
        answer: 'Activity gives you a quick idea of how recently and regularly a project has been changing. SideQuest can use signals such as recent commits, updates, and repository activity to group projects into levels such as Very active, Active, Moderate, or Low activity.'
      },
      {
        id: 'discussion-level',
        question: 'What does discussion level mean?',
        answer: 'Discussion indicates how much conversation is happening around an issue. It can be estimated using information such as the number of comments and other available issue activity. A higher discussion level can mean that an issue needs more coordination before implementation.'
      },
      {
        id: 'contribution-type',
        question: 'What is the contribution type?',
        answer: 'Contribution type describes the kind of work an issue appears to require, such as a bug fix, feature, documentation update, testing, refactor, accessibility improvement, or performance work.'
      }
    ]
  },
  {
    title: 'Saved Opportunities',
    description: 'Keep interesting opportunities available for later.',
    questions: [
      {
        id: 'how-save-works',
        question: 'How does Save work?',
        answer: 'Click the bookmark button on an opportunity card to save it. The saved opportunity is stored in your browser so you can return to the Saved page without having to find the same opportunity again.'
      },
      {
        id: 'saved-location',
        question: 'Where can I find my saved opportunities?',
        answer: 'All opportunities you save appear on the Saved page. You can open an opportunity from there just like you would from the Contributions page.'
      },
      {
        id: 'remove-saved',
        question: 'How do I remove a saved opportunity?',
        answer: 'Click the bookmark button again on the saved opportunity. It will be removed from your saved list immediately.'
      }
    ]
  },
  {
    title: 'GitHub & SideQuest',
    description: 'Understand where the information comes from.',
    questions: [
      {
        id: 'data-source',
        question: 'Where does SideQuest get its data?',
        answer: 'SideQuest uses GitHub as its source for repository and issue information. This allows the platform to work with real open-source projects instead of maintaining a separate copy of project data.'
      },
      {
        id: 'sidequest-github-changes',
        question: 'Does SideQuest change anything on GitHub?',
        answer: 'SideQuest is designed primarily for discovering and understanding opportunities. Discovering or saving an opportunity does not change the GitHub repository or issue. Any actual contribution work still happens through GitHub.'
      },
      {
        id: 'github-data-changes',
        question: 'Why can information change after I find an opportunity?',
        answer: 'GitHub repositories and issues are constantly changing. An issue can be assigned, closed, updated, or receive new comments after SideQuest displays it. Repository stars, forks, and activity can also change over time.'
      },
      {
        id: 'github-vs-sidequest',
        question: 'Which information comes directly from GitHub?',
        answer: 'Information such as issue titles, labels, comments, assignees, dates, repository stars, forks, watchers, languages, and other repository information can come directly from GitHub. SideQuest then organizes this information for easier discovery.'
      },
      {
        id: 'sidequest-analysis',
        question: 'Which information is calculated by SideQuest?',
        answer: 'SideQuest can calculate or classify information such as difficulty, contribution type, discussion level, contribution fit, and the reasons shown in “Why this fits.” These are SideQuest assessments based on available GitHub information.'
      }
    ]
  }
]

const HowTo = () => {
  const [search, setSearch] = useState('')

  const filteredSections = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return faqSections

    return faqSections
      .map(section => ({
        ...section,
        questions: section.questions.filter(item =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
        )
      }))
      .filter(section => section.questions.length > 0)
  }, [search])

  useEffect(() => {
    const hash = window.location.hash.slice(1)

    if (!hash) return

    const timer = setTimeout(() => {
      const element = document.getElementById(hash)

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="px-8 py-7">
      <HowToHeader
        search={search}
        setSearch={setSearch}
      />

      <div className="max-w-4xl mx-auto mt-8">
        {filteredSections.length > 0 ? (
          filteredSections.map(section => (
            <FAQSection
              key={section.title}
              section={section}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-gray-200 rounded-2xl">
            <div className="flex items-center justify-center size-12 bg-gray-100 rounded-xl">
              <Search className="size-5 text-gray-400" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              No matching questions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Try searching with a different word or phrase.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HowTo