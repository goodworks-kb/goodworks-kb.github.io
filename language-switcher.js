/**
 * Language Switcher for Good Works KB
 * Handles language detection, switching, and translation application
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'gwkb_language';
    const DEFAULT_LANG = 'en';
    const SUPPORTED_LANGS = ['en', 'ko', 'es'];

    /**
     * Get current language from storage or browser preference
     */
    function getCurrentLanguage() {
        // Check localStorage first
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED_LANGS.includes(stored)) {
                return stored;
            }
        } catch (e) {
            // localStorage not available
        }

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang) {
            const langCode = browserLang.split('-')[0].toLowerCase();
            if (SUPPORTED_LANGS.includes(langCode)) {
                return langCode;
            }
        }

        // Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && SUPPORTED_LANGS.includes(urlLang)) {
            return urlLang;
        }

        return DEFAULT_LANG;
    }

    /**
     * Save language preference
     */
    function saveLanguage(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            // localStorage not available
        }
    }

    /**
     * Set language and apply translations
     */
    function setLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) {
            lang = DEFAULT_LANG;
        }

        saveLanguage(lang);
        document.documentElement.lang = lang;
        
        // Apply translations if translations object is available
        if (typeof translations !== 'undefined') {
            applyTranslations(lang);
        }

        // Update URL without reload (optional)
        const url = new URL(window.location);
        if (lang === DEFAULT_LANG) {
            url.searchParams.delete('lang');
        } else {
            url.searchParams.set('lang', lang);
        }
        window.history.replaceState({}, '', url);

        // Update language switcher UI (only if it exists)
        const switcher = document.getElementById('language-switcher');
        if (switcher) {
            updateLanguageSwitcher(lang);
        }
    }

    /**
     * Apply translations to elements with data-i18n attribute
     */
    function applyTranslations(lang) {
        const langTranslations = translations[lang] || translations[DEFAULT_LANG];
        
        // Find all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = langTranslations[key];
            
            if (translation !== undefined) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    // For form inputs, set placeholder
                    element.placeholder = translation;
                } else if (element.hasAttribute('data-i18n-html')) {
                    // Allow HTML in translation
                    element.innerHTML = translation;
                } else {
                    // Regular text content
                    element.textContent = translation;
                }
            }
        });

        // Update meta tags
        updateMetaTags(lang);
    }

    /**
     * Update meta tags for SEO
     */
    function updateMetaTags(lang) {
        const langTranslations = translations[lang] || translations[DEFAULT_LANG];
        const langMap = {
            'en': 'en_US',
            'ko': 'ko_KR',
            'es': 'es_ES'
        };

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update og:locale if meta tag exists
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale && langMap[lang]) {
            ogLocale.setAttribute('content', langMap[lang]);
        }

        // Update hreflang tags
        updateHreflangTags();
    }

    /**
     * Update hreflang tags for SEO
     */
    function updateHreflangTags() {
        const currentPath = window.location.pathname;
        const baseUrl = window.location.origin;
        
        // Remove existing hreflang tags
        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(tag => tag.remove());

        // Add hreflang tags for each supported language
        SUPPORTED_LANGS.forEach(lang => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            link.href = `${baseUrl}${currentPath}${lang === DEFAULT_LANG ? '' : `?lang=${lang}`}`;
            document.head.appendChild(link);
        });

        // Add x-default
        const defaultLink = document.createElement('link');
        defaultLink.rel = 'alternate';
        defaultLink.hreflang = 'x-default';
        defaultLink.href = `${baseUrl}${currentPath}`;
        document.head.appendChild(defaultLink);
    }

    /**
     * Create language switcher UI with dropdown
     */
    function createLanguageSwitcher() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) {
            console.warn('Language switcher: nav-menu not found');
            return;
        }

        // Check if switcher already exists
        if (document.getElementById('language-switcher')) {
            return;
        }

        const currentLang = getCurrentLanguage();
        
        // Language names mapping
        const langNames = {
            'en': { short: 'EN', full: 'English', native: 'English' },
            'ko': { short: '한', full: 'Korean', native: '한국어' },
            'es': { short: 'ES', full: 'Spanish', native: 'Español' }
        };

        // Create dropdown container
        const switcher = document.createElement('li');
        switcher.id = 'language-switcher';
        switcher.className = 'language-switcher-container';

        // Create button with icon
        const button = document.createElement('button');
        button.className = 'language-switcher-btn';
        button.setAttribute('aria-label', 'Select language');
        button.setAttribute('aria-haspopup', 'true');
        button.setAttribute('aria-expanded', 'false');
        
        // Add globe icon SVG
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span class="lang-current">${langNames[currentLang].short}</span>
        `;

        // Create dropdown menu
        const dropdown = document.createElement('ul');
        dropdown.className = 'language-dropdown';
        dropdown.setAttribute('role', 'menu');

        // Create menu items
        SUPPORTED_LANGS.forEach(lang => {
            const item = document.createElement('li');
            item.setAttribute('role', 'none');
            
            const link = document.createElement('button');
            link.className = `language-option ${lang === currentLang ? 'active' : ''}`;
            link.setAttribute('role', 'menuitem');
            link.setAttribute('data-lang', lang);
            link.setAttribute('aria-label', `Switch to ${langNames[lang].native}`);
            
            link.innerHTML = `
                <span class="lang-code">${langNames[lang].short}</span>
                <span class="lang-name">${langNames[lang].native}</span>
                ${lang === currentLang ? '<span class="lang-check">✓</span>' : ''}
            `;
            
            link.addEventListener('click', (e) => {
                e.stopPropagation();
                setLanguage(lang);
                closeDropdown();
            });
            
            item.appendChild(link);
            dropdown.appendChild(item);
        });

        // Toggle dropdown on button click
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('open');
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!switcher.contains(e.target)) {
                closeDropdown();
            }
        });

        // Close dropdown when mobile menu closes
        if (navMenu) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        if (!navMenu.classList.contains('active')) {
                            closeDropdown();
                        }
                    }
                });
            });
            observer.observe(navMenu, { attributes: true });
        }

        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dropdown.classList.contains('open')) {
                closeDropdown();
                button.focus();
            }
        });

        function openDropdown() {
            dropdown.classList.add('open');
            button.setAttribute('aria-expanded', 'true');
        }

        function closeDropdown() {
            dropdown.classList.remove('open');
            button.setAttribute('aria-expanded', 'false');
        }

        switcher.appendChild(button);
        switcher.appendChild(dropdown);

        // Insert as last item in nav menu
        navMenu.appendChild(switcher);
        
        // Update the switcher with current language after creation
        updateLanguageSwitcher(currentLang);
    }

    /**
     * Update language switcher active state
     */
    function updateLanguageSwitcher(lang) {
        const langNames = {
            'en': { short: 'EN', full: 'English', native: 'English' },
            'ko': { short: '한', full: 'Korean', native: '한국어' },
            'es': { short: 'ES', full: 'Spanish', native: 'Español' }
        };

        // Update button text
        const button = document.querySelector('.language-switcher-btn');
        if (button) {
            const currentSpan = button.querySelector('.lang-current');
            if (currentSpan) {
                currentSpan.textContent = langNames[lang].short;
            }
        }

        // Update active state in dropdown
        document.querySelectorAll('.language-option').forEach(option => {
            const optionLang = option.getAttribute('data-lang');
            if (optionLang === lang) {
                option.classList.add('active');
                // Add checkmark if not present
                if (!option.querySelector('.lang-check')) {
                    const check = document.createElement('span');
                    check.className = 'lang-check';
                    check.textContent = '✓';
                    option.appendChild(check);
                }
            } else {
                option.classList.remove('active');
                const check = option.querySelector('.lang-check');
                if (check) {
                    check.remove();
                }
            }
        });
    }

    /**
     * Initialize language system
     */
    function init() {
        // Create language switcher first, then set language
        function initializeLanguage() {
            // Try to create switcher - retry if nav-menu not found
            let attempts = 0;
            const maxAttempts = 10;
            
            function tryCreateSwitcher() {
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu) {
                    createLanguageSwitcher();
                    
                    // Then set the language (which will update the switcher)
                    const currentLang = getCurrentLanguage();
                    setLanguage(currentLang);
                } else if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(tryCreateSwitcher, 100);
                } else {
                    console.error('Language switcher: Could not find nav-menu after', maxAttempts, 'attempts');
                }
            }
            
            tryCreateSwitcher();
        }
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeLanguage);
        } else {
            // Use setTimeout to ensure nav-menu is available
            setTimeout(initializeLanguage, 0);
        }
    }

    // Export for global access
    window.setLanguage = setLanguage;
    window.getCurrentLanguage = getCurrentLanguage;

    // Initialize on load
    init();
})();
