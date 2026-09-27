import React from 'react'
import {ArrowRight, BookOpen, Bookmark, Check, Compass, GitBranch, Search, Target} from 'lucide-react'
import {Link} from 'react-router-dom'

const Moreinit = () => {
  return (
    <section className="w-full bg-[#f6f8ff] px-5 sm:px-7 lg:px-8 py-16 lg:py-2">
      <div className="max-w-7xl mx-auto">

        {/* Intro */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-4">
            <span className="w-7 h-px bg-indigo-600" />
            WHY SIDEQUEST
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Open source is easier when you know where to start.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
            Finding a project to contribute to can be harder than writing the code itself. SideQuest brings repositories, issues, contribution details, and learning resources together so you can spend less time searching and more time contributing.
          </p>
        </div>

        {/* Main workflow */}
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-stretch mb-20 lg:mb-24">

          {/* Left */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-6 mb-8">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">THE SIDEQUEST FLOW</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  From searching to contributing.
                </h3>
              </div>

              <div className="hidden sm:flex w-11 h-11 rounded-xl bg-indigo-50 items-center justify-center shrink-0">
                <GitBranch className="w-5 h-5 text-indigo-600" />
              </div>
            </div>

            <div className="space-y-7">
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                  01
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Discover projects</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Explore real GitHub repositories and narrow them down using languages, technologies, topics, and other useful filters.
                  </p>
                </div>
              </div>

              <div className="w-px h-5 bg-gray-200 ml-4" />

              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                  02
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Find an opportunity</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Browse open issues and use contribution-focused information to find work that matches your experience and interests.
                  </p>
                </div>
              </div>

              <div className="w-px h-5 bg-gray-200 ml-4" />

              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                  03
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Understand before you contribute</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Read repository and issue details, understand what needs to be done, then continue to GitHub when you're ready.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-2xl bg-[#172554] p-6 sm:p-8 lg:p-10 text-white">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-7">
              <Target className="w-5 h-5 text-indigo-200" />
            </div>

            <p className="text-sm font-medium text-indigo-200 mb-2">BUILT AROUND THE JOURNEY</p>

            <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-5">
              Less searching. More meaningful contribution.
            </h3>

            <p className="text-sm sm:text-base text-indigo-100/80 leading-relaxed mb-8">
              SideQuest is designed to remove the friction between wanting to contribute to open source and actually finding something worth working on.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                <span className="text-sm text-indigo-50">Real repository and issue data from GitHub</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                <span className="text-sm text-indigo-50">Contribution-focused search and filtering</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                <span className="text-sm text-indigo-50">Dedicated repository and issue details</span>
              </div>

              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                <span className="text-sm text-indigo-50">Guidance for getting started with open source</span>
              </div>
            </div>
          </div>
        </div>

        {/* What SideQuest helps with */}
        <div className="mb-20 lg:mb-24">
          <div className="mb-10">
            <p className="text-sm font-semibold text-indigo-600 mb-3">WHAT YOU CAN DO</p>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Everything you need to explore open source.
            </h3>

            <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
              SideQuest keeps the important parts of the discovery process in one place without getting in the way.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-5">
                <Compass className="w-5 h-5 text-indigo-600" />
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">Explore repositories</h4>

              <p className="text-sm text-gray-600 leading-relaxed">
                Discover open-source projects and narrow your search using relevant repository information.
              </p>

              <Link to="/explore" className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Explore projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-5">
                <Search className="w-5 h-5 text-indigo-600" />
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">Find contribution issues</h4>

              <p className="text-sm text-gray-600 leading-relaxed">
                Search through open issues and use contribution-specific filters to find relevant opportunities.
              </p>

              <Link to="/contributions" className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Find issues
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-5">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">Learn the process</h4>

              <p className="text-sm text-gray-600 leading-relaxed">
                Follow the built-in guidance to understand how to approach repositories and make your first contribution.
              </p>

              <Link to="/howto" className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Learn how
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-5">
                <GitBranch className="w-5 h-5 text-indigo-600" />
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">Understand repositories</h4>

              <p className="text-sm text-gray-600 leading-relaxed">
                See repository information, activity, topics, README content, and other details before deciding where to contribute.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-5">
                <Target className="w-5 h-5 text-indigo-600" />
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">Understand issues</h4>

              <p className="text-sm text-gray-600 leading-relaxed">
                Open contribution details to understand the issue, its context, and the information available before contributing.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-5">
                <Bookmark className="w-5 h-5 text-indigo-600" />
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">Save for later</h4>

              <p className="text-sm text-gray-600 leading-relaxed">
                Keep repositories and contribution opportunities you want to revisit instead of searching for them again.
              </p>

              <Link to="/saved" className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                View saved
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

        {/* Final CTA */}
        <div className="border-t border-gray-200 pt-12 lg:pt-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-indigo-600 mb-3">YOUR NEXT CONTRIBUTION STARTS HERE</p>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Ready to find your next open-source project?
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Explore repositories, find an issue that interests you, and take the next step toward contributing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link to="/explore" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
                Explore repositories
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link to="/contributions" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors">
                Find contributions
                <GitBranch className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Moreinit