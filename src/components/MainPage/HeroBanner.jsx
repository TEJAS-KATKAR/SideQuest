import gitfinal from '../../assets/gitfinal.png'
import {Search} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const trendingTopics = [
  'React',
  'JavaScript',
  'TypeScript',
  'Python',
  'Node.js',
  'AI',
  'Machine Learning',
  'Web Development',
  'Good First Issue'
]

const HeroBanner = () => {
  const navigate = useNavigate()

  const searchTopic = (topic) => {
    if (topic === 'Good First Issue') {
      navigate(`/contributions?search=${encodeURIComponent(topic)}`)
      return
    }

    navigate(`/explore?q=${encodeURIComponent(topic)}`)
  }

  return (
    <div className="flex h-auto w-full flex-col p-4 md:h-30 md:flex-row md:p-6">

      <div className="w-full flex-1 px-2 py-3 md:flex-6 md:px-12 md:py-4">
        <p className="mb-3 text-xs font-semibold tracking-wide text-indigo-600 md:text-sm">
          ✦ OPEN SOURCE DISCOVERY
        </p>

        <h1 className="text-[2.5rem] font-bold leading-[1.08] text-gray-900 md:text-4xl md:leading-tight">
          Discover.
          <span className="text-indigo-600"> Contribute.</span>
          <span className="text-purple-600"> Grow.</span>
        </h1>

        <p className="mt-4 max-w-md text-[17px] font-semibold leading-relaxed text-gray-500 md:text-[16px]">
          Find beginner-friendly open source projects and
          start your open source journey today.
        </p>

        <div className="mt-6 flex w-full max-w-2xl md:mt-7">

          <div className="flex h-14 min-w-0 flex-1 items-center rounded-l-xl border border-gray-200 bg-white px-3 shadow-sm md:h-12 md:px-4">
            <Search className="w-5 h-5 mr-3 text-gray-400 shrink-0"/>

            <input
              type="text"
              placeholder="Search repositories, topics, or languages..."
              className="w-full min-w-0 bg-transparent text-base text-gray-700 outline-none placeholder:text-gray-400 md:text-sm"
            />
          </div>

          <button
            className="h-14 shrink-0 rounded-r-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 md:h-12 md:px-7 md:font-medium"
          >
            Search
          </button>

        </div>

        <div className="-mx-2 mt-5 overflow-x-auto px-2 scrollbar-none [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0">
          <div className="flex w-max min-w-full snap-x snap-mandatory items-center gap-2 md:w-auto md:flex-wrap">

          <span className="mr-1 shrink-0 text-sm text-gray-500">
            Trending:
          </span>

          {trendingTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => searchTopic(topic)}
              className="shrink-0 snap-start rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-indigo-600 transition hover:border-indigo-200 hover:bg-indigo-50 md:py-1"
            >
              {topic}
            </button>
          ))}

          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-3">
        <img
          src={gitfinal}
          alt=""
          className="w-full py-10 object-contain mix-blend-multiply"
        />
      </div>

    </div>
  )
}

export default HeroBanner
