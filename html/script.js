/* ==========================================================================
   jvfigueiro.com - Global JavaScript
   ========================================================================== */

const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const themeToggleBtn = document.getElementById('themeToggleBtn');
const htmlElement = document.documentElement;

if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('i');

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    };

    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    setTheme(getPreferredTheme());

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
            setTheme(getPreferredTheme());
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        const textToType = typewriterElement.getAttribute('data-text');
        let index = 0;

        typewriterElement.textContent = '';

        function typeWriter() {
            if (index < textToType.length) {
                typewriterElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(typeWriter, 40); // Velocidade (40ms)
            }
        }
        
        typeWriter();
    }

    document.body.classList.add('page-loaded');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealTargets = document.querySelectorAll(
            '.content-section, .project-card, .project-list-item, .retrofit-category, .service-category, .card, .timeline-item'
        );

        revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealTargets.forEach(el => revealObserver.observe(el));
    } else {
        document.querySelectorAll('.content-section, .project-card, .project-list-item, .retrofit-category, .service-category, .card')
            .forEach(el => el.classList.add('is-visible'));
    }

    const avatarContainer = document.querySelector('.profile-avatar-container');
    if (avatarContainer && !prefersReducedMotion && window.innerWidth >= 992) {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY * 0.08;
            avatarContainer.style.transform = `translateY(${offset}px)`;
        }, { passive: true });
    }
});