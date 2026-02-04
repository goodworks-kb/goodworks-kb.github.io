import { useEffect } from 'react'
import { Language } from '../lib/language'
import { getTranslation } from '../lib/language'
import ContactForm from '../components/ContactForm'

interface HomeProps {
  language: Language
}

export default function Home({ language }: HomeProps) {
  useEffect(() => {
    // Handle hash navigation when component mounts (e.g., coming from another page)
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1) // Remove the #
      if (hash) {
        // Wait for DOM to be ready
        requestAnimationFrame(() => {
          setTimeout(() => {
            const element = document.getElementById(hash)
            if (element) {
              const offsetTop = element.offsetTop - 80
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
              })
            }
          }, 100)
        })
      }
    }

    // Check for hash on mount
    handleHashNavigation()

    // Also listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation)

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const hash = target.getAttribute('href')?.substring(1)
        if (hash) {
          const element = document.getElementById(hash)
          if (element) {
            const offsetTop = element.offsetTop - 80
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [])

  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          target.style.opacity = '1'
          target.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    const serviceCards = document.querySelectorAll('.service-card')
    const aboutContent = document.querySelector('.about-text')
    const founderCards = document.querySelectorAll('.founder-card')

    serviceCards.forEach((card) => {
      const el = card as HTMLElement
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(el)
    })

    if (aboutContent) {
      const el = aboutContent as HTMLElement
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(el)
    }

    founderCards.forEach((card) => {
      const el = card as HTMLElement
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-animation">
              <img
                src="/assets/animation-monitor.gif"
                alt="Web development and design animation showcasing modern web experiences"
                className="hero-gif"
              />
            </div>
            <div className="hero-text">
              <h1
                className="hero-title"
                dangerouslySetInnerHTML={{ __html: getTranslation('heroTitle', language) }}
              />
              <p className="hero-subtitle">{getTranslation('heroSubtitle', language)}</p>
              <p className="hero-motto">{getTranslation('heroMotto', language)}</p>
              <div className="hero-buttons">
                <a href="#contact" className="btn btn-primary" onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById('contact')
                  if (element) {
                    const offsetTop = element.offsetTop - 80
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
                  }
                }}>
                  {getTranslation('heroGetStarted', language)}
                </a>
                <a href="#services" className="btn btn-secondary" onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById('services')
                  if (element) {
                    const offsetTop = element.offsetTop - 80
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
                  }
                }}>
                  {getTranslation('heroOurServices', language)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">{getTranslation('aboutTitle', language)}</h2>
              <p className="about-description">{getTranslation('aboutDescription1', language)}</p>
              <p className="about-description">{getTranslation('aboutDescription2', language)}</p>
            </div>

            <div className="principles-section">
              <h3 className="principles-header">{getTranslation('principlesHeader', language)}</h3>
              <p className="principles-subtitle">{getTranslation('principlesSubtitle', language)}</p>
              <div className="principles-content">
                <p>{getTranslation('principlesContent1', language)}</p>
                <p>{getTranslation('principlesContent2', language)}</p>
                <p>{getTranslation('principlesContent3', language)}</p>
              </div>
            </div>

            <div className="founders-section">
              <h3 className="founders-title">{getTranslation('foundersTitle', language)}</h3>
              <div className="founders-grid">
                <div className="founder-card">
                  <div className="founder-image">
                    <img
                      src="/assets/headshot-rk.PNG"
                      alt="Richard Kim, CEO and Co-founder of Good Works KB"
                      width="200"
                      height="200"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="founder-name">Richard Kim</h4>
                  <p className="founder-title">{getTranslation('founderCEO', language)}</p>
                  <p className="founder-bio">{getTranslation('richardBio', language)}</p>
                  <ul className="founder-priors">
                    <li>
                      <span className="prior-company">Major Metropolitan District Attorney's Office</span>
                      <span className="prior-title">{getTranslation('priorCISO', language)}</span>
                    </li>
                    <li>
                      <span className="prior-company">Major International Bank</span>
                      <span className="prior-title">{getTranslation('priorDeputyCISO', language)}</span>
                    </li>
                    <li>
                      <span className="prior-company">
                        <a href="https://www.onepeloton.com/" target="_blank" rel="noopener noreferrer">
                          <img src="/assets/favicon-peloton.png" alt="Peloton" className="prior-favicon" width="16" height="16" />
                        </a>
                        <a href="https://www.onepeloton.com/" target="_blank" rel="noopener noreferrer">Peloton</a>
                      </span>
                      <span className="prior-title">{getTranslation('priorSeniorRisk', language)}</span>
                    </li>
                  </ul>
                </div>
                <div className="founder-card">
                  <div className="founder-image">
                    <img
                      src="/assets/headshot-bk.PNG"
                      alt="Brian Kim, CTO and Co-founder of Good Works KB"
                      width="200"
                      height="200"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="founder-name">Brian Kim</h4>
                  <p className="founder-title">{getTranslation('founderCTO', language)}</p>
                  <p className="founder-bio">{getTranslation('brianBio', language)}</p>
                  <ul className="founder-priors">
                    <li>
                      <span className="prior-company">
                        <a href="https://delphoslabs.com" target="_blank" rel="noopener noreferrer">
                          <img src="/assets/favicon-delphoslabs.png" alt="Delphos Labs" className="prior-favicon" width="16" height="16" />
                        </a>
                        <a href="https://delphoslabs.com" target="_blank" rel="noopener noreferrer">Delphos Labs</a>
                      </span>
                    </li>
                    <li>
                      <span className="prior-company">
                        <a href="https://paperspace.com" target="_blank" rel="noopener noreferrer">
                          <img src="/assets/favicon-paperspace.png" alt="Paperspace" className="prior-favicon" width="16" height="16" />
                        </a>
                        <a href="https://paperspace.com" target="_blank" rel="noopener noreferrer">Paperspace</a>
                      </span>
                      <span className="prior-note">{getTranslation('priorAcquired', language)}</span>
                    </li>
                    <li>
                      <span className="prior-company">
                        <a href="https://securityscorecard.com" target="_blank" rel="noopener noreferrer">
                          <img src="/assets/favicon-securityscorecard.png" alt="Security Scorecard" className="prior-favicon" width="16" height="16" />
                        </a>
                        <a href="https://securityscorecard.com" target="_blank" rel="noopener noreferrer">Security Scorecard</a>
                      </span>
                    </li>
                    <li>
                      <span className="prior-company">
                        <a href="https://tigera.io" target="_blank" rel="noopener noreferrer">
                          <img src="/assets/favicon-tigera.png" alt="Tigera" className="prior-favicon" width="16" height="16" />
                        </a>
                        <a href="https://tigera.io" target="_blank" rel="noopener noreferrer">Tigera</a>
                      </span>
                    </li>
                    <li>
                      <span className="prior-company">
                        <a href="https://synack.com" target="_blank" rel="noopener noreferrer">
                          <img src="/assets/favicon-synack.png" alt="Synack" className="prior-favicon" width="16" height="16" />
                        </a>
                        <a href="https://synack.com" target="_blank" rel="noopener noreferrer">Synack</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">{getTranslation('servicesTitle', language)}</h2>
          <p className="section-subtitle">{getTranslation('servicesSubtitle', language)}</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>{getTranslation('serviceCustomDesign', language)}</h3>
              <p>{getTranslation('serviceCustomDesignDesc', language)}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>{getTranslation('serviceFastOptimized', language)}</h3>
              <p>{getTranslation('serviceFastOptimizedDesc', language)}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>{getTranslation('serviceMaintenance', language)}</h3>
              <p>{getTranslation('serviceMaintenanceDesc', language)}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>{getTranslation('serviceMobile', language)}</h3>
              <p>{getTranslation('serviceMobileDesc', language)}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🛒</div>
              <h3>{getTranslation('serviceEcommerce', language)}</h3>
              <p>{getTranslation('serviceEcommerceDesc', language)}</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>{getTranslation('serviceAnalytics', language)}</h3>
              <p>{getTranslation('serviceAnalyticsDesc', language)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm language={language} />
    </>
  )
}
