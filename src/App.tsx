import { HashRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import ConsentBar from './components/ConsentBar'
import { getCurrentLanguage, saveLanguage } from './lib/language'

function App() {
  const [language, setLanguage] = useState(getCurrentLanguage())

  useEffect(() => {
    // Set HTML lang attribute
    document.documentElement.lang = language
    saveLanguage(language)
  }, [language])

  return (
    <HashRouter>
      <Layout language={language} setLanguage={setLanguage}>
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/blog" element={<BlogList language={language} />} />
          <Route path="/blog/:slug" element={<BlogPost language={language} />} />
          <Route path="/privacy" element={<Privacy language={language} />} />
          <Route path="/terms" element={<Terms language={language} />} />
        </Routes>
      </Layout>
      <ConsentBar />
    </HashRouter>
  )
}

export default App
