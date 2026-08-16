import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Explore from './pages/Explore'
import Contributions from './pages/Contributions'
import Saved from './pages/Saved'
import HowTo from './pages/HowTo'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/contributions" element={<Contributions />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/howto" element={<HowTo />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default App