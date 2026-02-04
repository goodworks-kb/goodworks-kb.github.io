import { Link } from 'react-router-dom'
import { Language } from '../lib/language'
import { getTranslation } from '../lib/language'

interface FooterProps {
  language: Language
}

export default function Footer({ language }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/assets/logo-square-black.png" alt="Good Works KB - Professional Web Design and Development Services" width="50" height="50" loading="lazy" />
          </div>
          <p>&copy; 2026 Good Works KB. <span>{getTranslation('footerRights', language)}</span></p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/privacy" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', margin: '0 1rem' }}>
              {getTranslation('footerPrivacy', language)}
            </Link>
            <Link to="/terms" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', margin: '0 1rem' }}>
              {getTranslation('footerTerms', language)}
            </Link>
          </div>
          <p className="footer-version">v0.2.0</p>
        </div>
      </div>
    </footer>
  )
}
