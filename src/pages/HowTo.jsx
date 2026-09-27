import React, {useEffect, useMemo, useState} from 'react'
import {Check, Copy, FileCode2, Search, Terminal} from 'lucide-react'
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

const setupGuides = [
  {
    name: 'JavaScript',
    short: 'JS',
    file: 'package.json',
    command: 'npm install',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'npm install',
      'npm run dev'
    ],
    note: 'For a Node.js or frontend JavaScript project, install the dependencies first and then use the project’s documented development script.'
  },
  {
    name: 'TypeScript',
    short: 'TS',
    file: 'package.json',
    command: 'npm install',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'npm install',
      'npm run dev'
    ],
    note: 'TypeScript projects commonly use npm for dependency management. Check package.json for the exact available scripts.'
  },
  {
    name: 'Python',
    short: 'PY',
    file: 'requirements.txt',
    command: 'pip install -r requirements.txt',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'python -m venv .venv',
      '.venv\\Scripts\\activate',
      'pip install -r requirements.txt',
      'python main.py'
    ],
    note: 'The final command depends on the repository. Look for README instructions or an entry file such as main.py, app.py, or manage.py.'
  },
  {
    name: 'Java',
    short: 'JAVA',
    file: 'pom.xml',
    command: 'mvn install',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'mvn install',
      'mvn spring-boot:run'
    ],
    note: 'Maven is common in Java projects. Some projects use Gradle instead, so check for pom.xml or build.gradle.'
  },
  {
    name: 'C',
    short: 'C',
    file: 'main.c',
    command: 'gcc main.c -o app',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'gcc main.c -o app',
      '.\\app'
    ],
    note: 'The exact compile command depends on the project structure and build system. Larger projects may use Make or CMake.'
  },
  {
    name: 'C++',
    short: 'C++',
    file: 'main.cpp',
    command: 'g++ main.cpp -o app',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'g++ main.cpp -o app',
      '.\\app'
    ],
    note: 'For larger C++ projects, check whether the repository uses CMake, Make, or another build system instead of compiling one file directly.'
  },
  {
    name: 'C#',
    short: 'C#',
    file: 'Project.csproj',
    command: 'dotnet restore',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'dotnet restore',
      'dotnet build',
      'dotnet run'
    ],
    note: 'The .NET CLI handles dependency restoration, building, and running for many C# projects.'
  },
  {
    name: 'Go',
    short: 'GO',
    file: 'go.mod',
    command: 'go mod download',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'go mod download',
      'go build',
      'go run .'
    ],
    note: 'Go projects normally declare their module in go.mod. Check the repository README for project-specific commands.'
  },
  {
    name: 'Rust',
    short: 'RS',
    file: 'Cargo.toml',
    command: 'cargo build',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'cargo build',
      'cargo run'
    ],
    note: 'Cargo manages dependencies and builds Rust projects. Cargo.toml identifies a Cargo-based project.'
  },
  {
    name: 'PHP',
    short: 'PHP',
    file: 'composer.json',
    command: 'composer install',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'composer install',
      'php -S localhost:8000'
    ],
    note: 'Many PHP projects use Composer. Framework-based projects may have their own development command.'
  },
  {
    name: 'Ruby',
    short: 'RB',
    file: 'Gemfile',
    command: 'bundle install',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'bundle install',
      'bundle exec ruby app.rb'
    ],
    note: 'Ruby projects commonly use Bundler for dependencies. Rails applications normally use bin/rails server instead.'
  },
  {
    name: 'Kotlin',
    short: 'KT',
    file: 'build.gradle.kts',
    command: './gradlew build',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      './gradlew build',
      './gradlew run'
    ],
    note: 'Kotlin projects commonly use Gradle. Android projects should be opened and run through Android Studio.'
  },
  {
    name: 'Swift',
    short: 'SWIFT',
    file: 'Package.swift',
    command: 'swift build',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'swift build',
      'swift run'
    ],
    note: 'Swift Package Manager projects use Package.swift. iOS applications may instead require opening the project in Xcode.'
  },
  {
    name: 'Dart',
    short: 'DART',
    file: 'pubspec.yaml',
    command: 'dart pub get',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'dart pub get',
      'dart run'
    ],
    note: 'Flutter projects also use pubspec.yaml but normally run through Flutter commands such as flutter pub get and flutter run.'
  },
  {
    name: 'R',
    short: 'R',
    file: 'DESCRIPTION',
    command: 'R',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'R',
      'source("main.R")'
    ],
    note: 'R projects can use different dependency and project-management systems. Check the repository documentation before running scripts.'
  },
  {
    name: 'Shell',
    short: 'SH',
    file: 'script.sh',
    command: 'chmod +x script.sh',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'chmod +x script.sh',
      './script.sh'
    ],
    note: 'Shell scripts are platform-dependent. Read the repository instructions before executing scripts you downloaded.'
  },
  {
    name: 'HTML / CSS',
    short: 'WEB',
    file: 'index.html',
    command: 'Open index.html',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'code .',
      'Open index.html',
      'Use Live Server if required'
    ],
    note: 'Simple HTML and CSS projects may not need a package manager. Larger frontend projects may use a JavaScript build tool instead.'
  },
  {
    name: 'SQL',
    short: 'SQL',
    file: 'schema.sql',
    command: 'Run with your database client',
    code: [
      'git clone <repository-url>',
      'cd <project-folder>',
      'Open your database client',
      'Connect to the required database',
      'Run schema.sql'
    ],
    note: 'SQL repositories depend on the database engine being used, such as PostgreSQL, MySQL, or SQLite. Follow the project README for the correct setup.'
  }
]

const ProjectSetup = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(setupGuides[0])
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(selectedLanguage.code.join('\n'))
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="mt-8">
      <div className="mb-3">
        <h2 className="text-[19px] font-bold text-gray-900">
          Get a Project Running
        </h2>

        <p className="mt-1 text-[13px] text-gray-500">
          Found a project on SideQuest? Use these steps to bring it onto your machine and start working on it.
        </p>
      </div>

      <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex flex-col min-w-0 md:flex-row min-h-140">

          <div className="w-full md:w-[32%] shrink-0 border-b md:border-b-0 md:border-r border-gray-200 bg-[#fafbff]">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
                Choose your stack
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Select a language to see a starting setup.
              </p>
            </div>

            <div className="p-2 grid grid-cols-2 md:grid-cols-1 gap-1 max-h-82.5 md:max-h-127.5 overflow-y-auto">
              {setupGuides.map(language => {
                const active = selectedLanguage.name === language.name

                return (
                  <button
                    key={language.name}
                    onClick={() => {
                      setSelectedLanguage(language)
                      setCopied(false)
                    }}
                    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-left transition-colors ${
                      active
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className={`flex items-center justify-center size-7 rounded-md text-[9px] font-bold shrink-0 ${
                      active
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {language.short}
                    </span>

                    <span className="text-xs font-medium truncate">
                      {language.name}
                    </span>

                    {active && (
                      <Check className="size-3.5 ml-auto shrink-0 text-indigo-600" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex-1 min-w-0 bg-[#1e1e1e]">
            <div className="flex items-center justify-between h-10 px-3 bg-[#252526] border-b border-[#333]">
              <div className="flex items-center min-w-0 gap-2">
                <FileCode2 className="size-4 text-blue-400 shrink-0" />

                <span className="text-[11px] text-gray-300 truncate">
                  {selectedLanguage.file}
                </span>
              </div>

              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] text-gray-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 h-8 px-3 bg-[#2d2d2d] border-b border-[#3a3a3a]">
              <span className="text-[10px] text-gray-300">
                {selectedLanguage.file}
              </span>
            </div>

            <div className="px-3 py-4 overflow-x-auto">
              <div className="min-w-max font-mono text-[11px] leading-6">
                {selectedLanguage.code.map((line, index) => (
                  <div key={`${selectedLanguage.name}-${index}`} className="flex">
                    <span className="w-8 pr-3 text-right text-[#6e7681] select-none">
                      {index + 1}
                    </span>

                    <span className="text-[#d4d4d4] whitespace-pre">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-3 mb-3 rounded-lg overflow-hidden border border-[#3a3a3a] bg-[#181818]">
              <div className="flex items-center gap-2 h-8 px-3 border-b border-[#333]">
                <Terminal className="size-3.5 text-gray-400" />

                <span className="text-[10px] text-gray-400">
                  TERMINAL
                </span>
              </div>

              <div className="px-3 py-3 font-mono text-[10px] leading-5 overflow-x-auto">
                <div className="text-gray-500">
                  ~/project
                </div>

                <div className="text-green-400 whitespace-nowrap">
                  $ {selectedLanguage.command}
                </div>

                <div className="mt-1 text-gray-500">
                  Follow the repository README for project-specific setup.
                </div>
              </div>
            </div>

            <div className="px-3 pb-4">
              <div className="px-3 py-2.5 rounded-lg bg-[#252526] border border-[#3a3a3a]">
                <p className="text-[10px] font-medium text-gray-300">
                  Note
                </p>

                <p className="mt-1 text-[10px] leading-4 text-gray-500">
                  {selectedLanguage.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ContributionGuide = () => {
  const [copied, setCopied] = useState(false)

  const code = [
    'git clone <your-fork-url>',
    'cd <project-folder>',
    '',
    'git checkout -b fix-issue-123',
    '',
    '# make your changes',
    '',
    '# run the project tests',
    '',
    'git add .',
    'git commit -m "Fix issue #123"',
    'git push origin fix-issue-123'
  ]

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code.join('\n'))
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="mt-8">
      <div className="mb-3">
        <h2 className="text-[19px] font-bold text-gray-900">
          Contribution Guide
        </h2>

        <p className="mt-1 text-[13px] text-gray-500">
          Follow the same Git and GitHub workflow to turn an opportunity into a real contribution.
        </p>
      </div>

      <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex flex-col min-w-0 md:flex-row min-h-140">
          <div className="w-full md:w-[32%] shrink-0 border-b md:border-b-0 md:border-r border-gray-200 bg-[#fafbff]">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
                Contribution workflow
              </p>

              <p className="mt-1 text-xs text-gray-400">
                The Git steps are the same regardless of the language.
              </p>
            </div>

            <div className="p-3">
              {[
                ['01', 'Fork the repository', 'Create your own GitHub copy of the project.'],
                ['02', 'Clone your fork', 'Download your fork to your computer.'],
                ['03', 'Create a branch', 'Keep your contribution separate from main.'],
                ['04', 'Make changes', 'Work on the issue you selected.'],
                ['05', 'Test your changes', 'Make sure your changes work correctly.'],
                ['06', 'Commit & push', 'Save your work and send the branch to GitHub.'],
                ['07', 'Open a Pull Request', 'Ask the maintainers to review your contribution.']
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-3 px-2 py-2.5">
                  <span className="flex items-center justify-center size-7 rounded-md bg-indigo-50 text-[9px] font-bold text-indigo-600 shrink-0">
                    {number}
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800">
                      {title}
                    </p>

                    <p className="mt-0.5 text-[10px] leading-4 text-gray-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0 bg-[#1e1e1e]">
            <div className="flex items-center justify-between h-10 px-3 bg-[#252526] border-b border-[#333]">
              <div className="flex items-center min-w-0 gap-2">
                <FileCode2 className="size-4 text-blue-400 shrink-0" />

                <span className="text-[11px] text-gray-300 truncate">
                  contribution.sh
                </span>
              </div>

              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] text-gray-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 h-8 px-3 bg-[#2d2d2d] border-b border-[#3a3a3a]">
              <span className="text-[10px] text-gray-300">
                contribution.sh
              </span>
            </div>

            <div className="px-3 py-4 overflow-x-auto">
              <div className="min-w-max font-mono text-[11px] leading-6">
                {code.map((line, index) => (
                  <div key={index} className="flex">
                    <span className="w-8 pr-3 text-right text-[#6e7681] select-none">
                      {index + 1}
                    </span>

                    <span className="text-[#d4d4d4] whitespace-pre">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-3 mb-3 rounded-lg overflow-hidden border border-[#3a3a3a] bg-[#181818]">
              <div className="flex items-center gap-2 h-8 px-3 border-b border-[#333]">
                <Terminal className="size-3.5 text-gray-400" />

                <span className="text-[10px] text-gray-400">
                  TERMINAL
                </span>
              </div>

              <div className="px-3 py-3 font-mono text-[10px] leading-5 overflow-x-auto">
                <div className="text-gray-500">
                  ~/project
                </div>

                <div className="text-green-400 whitespace-nowrap">
                  $ git push origin fix-issue-123
                </div>

                <div className="mt-1 text-gray-500">
                  Branch pushed successfully. Open GitHub to create your Pull Request.
                </div>
              </div>
            </div>

            <div className="px-3 pb-4">
              <div className="px-3 py-2.5 rounded-lg bg-[#252526] border border-[#3a3a3a]">
                <p className="text-[10px] font-medium text-gray-300">
                  Remember
                </p>

                <p className="mt-1 text-[10px] leading-4 text-gray-500">
                  Always read the repository README and contribution guidelines before making changes. The project may require specific setup, testing, formatting, or branch rules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const HowTo = () => {
  const [search, setSearch] = useState('')
  const [initialQuestion, setInitialQuestion] = useState(null)

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

    setInitialQuestion(hash)

    const timer = setTimeout(() => {
      const element = document.getElementById(hash)

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <HowToHeader
        search={search}
        setSearch={setSearch}
      />

      <div className="max-w-4xl min-w-0 mx-auto mt-8">
        {filteredSections.length > 0 ? (
          <>
            {filteredSections.map(section => (
              <React.Fragment key={section.title}>
                <FAQSection
                  section={section}
                  initialOpenId={
                    section.title === 'Explore Repositories'
                      ? initialQuestion
                      : null
                  }
                />

                {section.title === 'Explore Repositories' && (
                  <ProjectSetup />
                )}

                {section.title === 'Contribution Opportunities' && (
                  <ContributionGuide />
                )}
              </React.Fragment>
            ))}
          </>
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