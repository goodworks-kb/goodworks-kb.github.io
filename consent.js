/**
 * GDPR Cookie Consent System
 * 
 * Privacy-first, minimal implementation for static sites.
 * No external dependencies. Vanilla JavaScript only.
 */

(function() {
    'use strict';

    // Configuration
    const CONSENT_COOKIE_NAME = 'gwkb_consent';
    const CONSENT_STORAGE_KEY = 'gwkb_consent'; // localStorage key (fallback)
    const POLICY_VERSION = '1.0'; // Increment when privacy policy changes
    const GA_MEASUREMENT_ID = 'G-PC28GD5SSR'; // Google Analytics ID
    
    // Consent bar HTML structure
    const CONSENT_BAR_HTML = `
        <div id="consent-bar" class="consent-bar" role="region" aria-label="Cookie consent">
            <div class="consent-bar-content">
                <p class="consent-message">We use cookies only to understand how our site is used. No ads. No cross-site tracking.</p>
                <div class="consent-actions">
                    <button id="consent-accept" class="consent-btn consent-btn-accept" aria-label="Accept cookies">Accept</button>
                    <button id="consent-decline" class="consent-btn consent-btn-decline" aria-label="Decline cookies">Decline</button>
                    <a href="#privacy" id="consent-learn-more" class="consent-link" aria-label="Learn more about our cookie policy">Learn more</a>
                </div>
            </div>
        </div>
    `;

    /**
     * Consent storage structure:
     * {
     *   analytics: boolean,
     *   timestamp: number (ISO timestamp),
     *   version: string (policy version)
     * }
     */

    /**
     * Read consent from storage
     * Tries cookie first, falls back to localStorage
     * Returns null if no consent found
     */
    function readConsent() {
        // Try cookie first
        const cookieValue = getCookie(CONSENT_COOKIE_NAME);
        if (cookieValue) {
            try {
                return JSON.parse(decodeURIComponent(cookieValue));
            } catch (e) {
                // Invalid cookie, clear it
                deleteCookie(CONSENT_COOKIE_NAME);
            }
        }

        // Fallback to localStorage
        try {
            const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            // localStorage not available or corrupted
        }

        return null;
    }

    /**
     * Write consent to storage
     * Stores in both cookie and localStorage for reliability
     * Consent storage is strictly necessary and allowed before user consent
     */
    function writeConsent(analytics) {
        const consent = {
            analytics: analytics,
            timestamp: new Date().toISOString(),
            version: POLICY_VERSION
        };

        const consentString = JSON.stringify(consent);

        // Store in cookie (expires in 1 year)
        setCookie(CONSENT_COOKIE_NAME, consentString, 365);

        // Also store in localStorage as backup
        try {
            localStorage.setItem(CONSENT_STORAGE_KEY, consentString);
        } catch (e) {
            // localStorage not available, cookie-only is fine
        }
    }

    /**
     * Cookie helper: Get cookie value by name
     */
    function getCookie(name) {
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length);
            }
        }
        return null;
    }

    /**
     * Cookie helper: Set cookie with expiration
     */
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    /**
     * Cookie helper: Delete cookie
     */
    function deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }

    /**
     * Load Google Analytics dynamically
     * Only called after explicit user consent
     */
    function loadAnalytics() {
        // Prevent double-loading
        if (window.dataLayer && window.gtag) {
            return;
        }

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);

        // Load GA script asynchronously
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);
    }

    /**
     * Remove Google Analytics
     * Called when consent is revoked
     */
    function removeAnalytics() {
        // Remove GA script
        const scripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
        scripts.forEach(script => script.remove());

        // Clear dataLayer
        if (window.dataLayer) {
            window.dataLayer = [];
        }

        // Remove gtag function
        delete window.gtag;
    }

    /**
     * Create and inject consent bar into DOM
     */
    function createConsentBar() {
        // Don't create if already exists
        if (document.getElementById('consent-bar')) {
            return;
        }

        // Inject HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = CONSENT_BAR_HTML;
        const consentBar = tempDiv.firstElementChild;
        document.body.appendChild(consentBar);

        // Add event listeners
        document.getElementById('consent-accept').addEventListener('click', handleAccept);
        document.getElementById('consent-decline').addEventListener('click', handleDecline);
        
        // Learn more link - scroll to privacy section or handle as needed
        const learnMoreLink = document.getElementById('consent-learn-more');
        learnMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            // If you have a privacy section, scroll to it
            const privacySection = document.getElementById('privacy') || document.querySelector('[id*="privacy"]');
            if (privacySection) {
                privacySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Otherwise, you could open a modal or navigate to a privacy page
        });

        // Inject minimal CSS if not already present
        injectConsentStyles();
    }

    /**
     * Inject minimal CSS for consent bar
     * Keeps styling self-contained
     */
    function injectConsentStyles() {
        if (document.getElementById('consent-styles')) {
            return; // Already injected
        }

        const style = document.createElement('style');
        style.id = 'consent-styles';
        style.textContent = `
            .consent-bar {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #ffffff;
                border-top: 1px solid #e0e0e0;
                padding: 1rem;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                font-size: 14px;
                line-height: 1.5;
            }
            .consent-bar.hidden {
                display: none;
            }
            .consent-bar-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 1rem;
            }
            .consent-message {
                margin: 0;
                flex: 1;
                min-width: 250px;
                color: #333;
            }
            .consent-actions {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex-wrap: wrap;
            }
            .consent-btn {
                padding: 0.5rem 1.25rem;
                border: 1px solid #333;
                background: transparent;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.2s ease;
                border-radius: 4px;
            }
            .consent-btn-accept {
                background: #000;
                color: #fff;
                border-color: #000;
            }
            .consent-btn-accept:hover {
                background: #333;
            }
            .consent-btn-decline {
                color: #333;
            }
            .consent-btn-decline:hover {
                background: #f5f5f5;
            }
            .consent-link {
                color: #666;
                text-decoration: underline;
                font-size: 14px;
            }
            .consent-link:hover {
                color: #000;
            }
            @media (max-width: 768px) {
                .consent-bar-content {
                    flex-direction: column;
                    align-items: flex-start;
                }
                .consent-actions {
                    width: 100%;
                }
                .consent-btn {
                    flex: 1;
                    min-width: 100px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Handle Accept button click
     */
    function handleAccept() {
        writeConsent(true);
        loadAnalytics();
        hideConsentBar();
    }

    /**
     * Handle Decline button click
     */
    function handleDecline() {
        writeConsent(false);
        removeAnalytics(); // Ensure analytics is not loaded
        hideConsentBar();
    }

    /**
     * Hide consent bar with smooth transition
     */
    function hideConsentBar() {
        const bar = document.getElementById('consent-bar');
        if (bar) {
            bar.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            bar.style.opacity = '0';
            bar.style.transform = 'translateY(100%)';
            setTimeout(() => {
                bar.classList.add('hidden');
            }, 300);
        }
    }

    /**
     * Initialize consent system
     * Checks for existing consent and acts accordingly
     */
    function init() {
        const consent = readConsent();

        if (consent) {
            // User has already made a choice
            if (consent.analytics === true) {
                loadAnalytics();
            }
            // Consent bar stays hidden
        } else {
            // No consent yet - show bar
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createConsentBar);
            } else {
                createConsentBar();
            }
        }
    }

    /**
     * Global function to reset consent
     * Allows users to revoke consent later
     */
    window.resetConsent = function() {
        // Clear consent storage
        deleteCookie(CONSENT_COOKIE_NAME);
        try {
            localStorage.removeItem(CONSENT_STORAGE_KEY);
        } catch (e) {
            // localStorage not available
        }

        // Remove analytics
        removeAnalytics();

        // Show consent bar again
        const bar = document.getElementById('consent-bar');
        if (bar) {
            bar.classList.remove('hidden');
            bar.style.opacity = '1';
            bar.style.transform = 'translateY(0)';
        } else {
            createConsentBar();
        }
    };

    // Initialize on load
    init();

})();
