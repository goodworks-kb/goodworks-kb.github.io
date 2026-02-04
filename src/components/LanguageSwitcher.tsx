import { useState, useEffect, useRef } from 'react'
import { Language, SUPPORTED_LANGS } from '../lib/language'

interface LanguageSwitcherProps {
  language: Language
  setLanguage: (lang: Language) => void
}

const langNames: Record<Language, { short: string; native: string }> = {
  en: { short: 'EN', native: 'English' },
  ko: { short: '한', native: '한국어' },
  es: { short: 'ES', native: 'Español' },
}

export default function LanguageSwitcher({ language, setLanguage }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <li className="language-switcher-container">
      <button
        ref={buttonRef}
        className="language-switcher-btn"
        aria-label="Select language"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span className="lang-current">{langNames[language].short}</span>
      </button>
      <ul ref={dropdownRef} className={`language-dropdown ${isOpen ? 'open' : ''}`} role="menu">
        {SUPPORTED_LANGS.map((lang) => (
          <li key={lang} role="none">
            <button
              className={`language-option ${lang === language ? 'active' : ''}`}
              role="menuitem"
              aria-label={`Switch to ${langNames[lang].native}`}
              onClick={() => handleLanguageChange(lang)}
            >
              <span className="lang-code">{langNames[lang].short}</span>
              <span className="lang-name">{langNames[lang].native}</span>
              {lang === language && <span className="lang-check">✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </li>
  )
}
