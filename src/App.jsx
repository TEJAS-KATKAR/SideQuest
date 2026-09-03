import {Routes, Route, useLocation} from 'react-router-dom'
import {useEffect} from 'react'

import MainLayout from './components/Layout/MainLayout'

import Home from './pages/Home'
import Explore from './pages/Explore'
import Contributions from './pages/Contributions'
import ContributionDetails from './pages/ContributionDetails'
import Saved from './pages/Saved'
import HowTo from './pages/HowTo'
import Settings from './pages/Settings'
import RepositoryDetails from './pages/RepositoryDetails'

const ScrollToTop = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/repository/:owner/:repo" element={<RepositoryDetails />} />
          <Route path="/contributions/:owner/:repo/:issueNumber" element={<ContributionDetails />} />
          <Route path="/contributions" element={<Contributions />} />
server.js          <Route path="/saved" element={<Saved />} />
          <Route path="/howto" element={<HowTo />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App