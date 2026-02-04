import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import { Language } from '../lib/language'
import { getTranslation } from '../lib/language'

interface NavbarProps {
  language: Language
  setLanguage: (lang: Language) => void
}

export default function Navbar({ language, setLanguage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
    e.preventDefault()
    handleNavClick()
    
    // If we're not on the home page, navigate there first, then scroll
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation and DOM to be ready, then scroll
      requestAnimationFrame(() => {
        setTimeout(() => {
          const element = document.getElementById(anchorId)
          if (element) {
            // Scroll to top first, then to element (ensures we're on home page)
            window.scrollTo({ top: 0, behavior: 'instant' })
            setTimeout(() => {
              const offsetTop = element.offsetTop - 80
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
              })
            }, 50)
          }
        }, 200)
      })
      return
    }
    
    // Scroll to anchor on current page
    const element = document.getElementById(anchorId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo" aria-label="Good Works KB Home">
            <img src="/assets/logo-wide.png" alt="Good Works KB - Professional Web Design and Development Services" className="logo-wide-img" width="200" height="50" />
          </Link>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <a href="#services" onClick={(e) => handleAnchorClick(e, 'services')}>
                {getTranslation('navServices', language)}
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleAnchorClick(e, 'about')}>
                {getTranslation('navAbout', language)}
              </a>
            </li>
            <li>
              <Link to="/blog" onClick={handleNavClick}>
                {getTranslation('navBlog', language)}
              </Link>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')}>
                {getTranslation('navContact', language)}
              </a>
            </li>
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
          </ul>
          <button 
            className="nav-toggle" 
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}
