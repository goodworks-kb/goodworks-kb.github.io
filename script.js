// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling - Supabase Edge Function Integration
const SUPABASE_URL = "https://vdswtxjgqdizoarkusuh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkc3d0eGpncWRpem9hcmt1c3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MDE2NDYsImV4cCI6MjA4NTM3NzY0Nn0.UAHfyDRvOGT84j7jLGDNawXts90oJMZgiIiuGTgLbfs";

// Initialize Supabase client (avoiding naming conflict with global supabase)
let supabaseClient = null;
const getSupabaseClient = () => {
    if (!supabaseClient) {
        if (typeof window.supabase === 'undefined') {
            throw new Error('Supabase library not loaded');
        }
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
};

const contactForm = document.getElementById('contact');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const status = document.getElementById('status');
            const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'en';
            const langTranslations = typeof translations !== 'undefined' ? translations[currentLang] : null;
            status.textContent = langTranslations?.contactSending || "Sending...";

        const fd = new FormData(form);
        const payload = Object.fromEntries(fd.entries());

        // Skip submission if honeypot field is filled (spam detection)
        if (payload.hp) {
            status.textContent = "";
            return;
        }

        payload.form_name = "contact";
        payload.page_url = location.href;
        payload.referrer = document.referrer;
        payload.utm = Object.fromEntries(new URLSearchParams(location.search));

        try {
            const client = getSupabaseClient();
            const { data, error } = await client.functions.invoke('submit-form', {
                body: payload
            });

            if (error) throw error;
            if (!data || !data.ok) throw new Error(data?.error || "Failed");
            
            const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'en';
            const langTranslations = typeof translations !== 'undefined' ? translations[currentLang] : null;
            status.textContent = langTranslations?.contactSuccess || "Received. We'll get back to you soon.";
            form.reset();
        } catch (err) {
            console.error(err);
            const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'en';
            const langTranslations = typeof translations !== 'undefined' ? translations[currentLang] : null;
            status.textContent = langTranslations?.contactError || "Failed to send. Try again.";
        }
    });
}

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const aboutContent = document.querySelector('.about-text');
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(20px)';
        aboutContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(aboutContent);
    }
    
    const founderCards = document.querySelectorAll('.founder-card');
    founderCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
