import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CONSENT_COOKIE_NAME = 'gwkb_consent'
const CONSENT_STORAGE_KEY = 'gwkb_consent'
const POLICY_VERSION = '1.0'
const GA_MEASUREMENT_ID = 'G-PC28GD5SSR'

interface ConsentData {
  analytics: boolean
  timestamp: string
  version: string
}

function getCookie(name: string): string | null {
  const nameEQ = name + '='
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim()
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length)
    }
  }
  return null
}

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

function readConsent(): ConsentData | null {
  const cookieValue = getCookie(CONSENT_COOKIE_NAME)
  if (cookieValue) {
    try {
      return JSON.parse(decodeURIComponent(cookieValue))
    } catch (e) {
      deleteCookie(CONSENT_COOKIE_NAME)
    }
  }

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    // localStorage not available
  }

  return null
}

function writeConsent(analytics: boolean): void {
  const consent: ConsentData = {
    analytics,
    timestamp: new Date().toISOString(),
    version: POLICY_VERSION,
  }

  const consentString = JSON.stringify(consent)
  setCookie(CONSENT_COOKIE_NAME, consentString, 365)

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, consentString)
  } catch (e) {
    // localStorage not available
  }
}

function loadAnalytics(): void {
  if ((window as any).dataLayer && (window as any).gtag) {
    return
  }

  ;(window as any).dataLayer = (window as any).dataLayer || []
  function gtag(...args: any[]) {
    ;(window as any).dataLayer.push(args)
  }
  ;(window as any).gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

function removeAnalytics(): void {
  const scripts = document.querySelectorAll('script[src*="googletagmanager.com"]')
  scripts.forEach((script) => script.remove())

  if ((window as any).dataLayer) {
    ;(window as any).dataLayer = []
  }

  delete (window as any).gtag
}

export default function ConsentBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = readConsent()

    if (consent) {
      if (consent.analytics === true) {
        loadAnalytics()
      }
    } else {
      setIsVisible(true)
    }

    // Expose reset function globally
    ;(window as any).resetConsent = () => {
      deleteCookie(CONSENT_COOKIE_NAME)
      try {
        localStorage.removeItem(CONSENT_STORAGE_KEY)
      } catch (e) {
        // localStorage not available
      }
      removeAnalytics()
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    writeConsent(true)
    loadAnalytics()
    setIsVisible(false)
  }

  const handleDecline = () => {
    writeConsent(false)
    removeAnalytics()
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="consent-bar" role="region" aria-label="Cookie consent">
      <div className="consent-bar-content">
        <p className="consent-message">
          We use cookies only to understand how our site is used. No ads. No cross-site tracking.
        </p>
        <div className="consent-actions">
          <button
            id="consent-accept"
            className="consent-btn consent-btn-accept"
            aria-label="Accept cookies"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            id="consent-decline"
            className="consent-btn consent-btn-decline"
            aria-label="Decline cookies"
            onClick={handleDecline}
          >
            Decline
          </button>
          <Link to="/privacy" id="consent-learn-more" className="consent-link" aria-label="Learn more about our cookie policy">
            Learn more
          </Link>
        </div>
      </div>
    </div>
  )
}
