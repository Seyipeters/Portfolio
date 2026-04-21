let isDarkMode = false;
let appreciationCount = 0;

const THEME_CLASS = 'dark-theme';
const STORAGE_KEY = 'portfolio_theme';

function updateThemeButton() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) {
        return;
    }

    themeBtn.textContent = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
    themeBtn.setAttribute('aria-pressed', String(isDarkMode));
}

function applyTheme() {
    document.body.classList.toggle(THEME_CLASS, isDarkMode);
    updateThemeButton();
}

function saveThemePreference() {
    localStorage.setItem(STORAGE_KEY, isDarkMode ? 'dark' : 'light');
}

function loadThemePreference() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark') {
        isDarkMode = true;
    } else if (saved === 'light') {
        isDarkMode = false;
    }
    applyTheme();
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    applyTheme();
    saveThemePreference();
}

function incrementCounter() {
    appreciationCount += 1;
    const counterMessage = document.getElementById('counter-message');

    if (!counterMessage) {
        return;
    }

    if (appreciationCount === 1) {
        counterMessage.textContent = 'Thanks for the appreciation.';
        return;
    }

    counterMessage.textContent = `Appreciation clicks: ${appreciationCount}`;
}

function updateLastUpdated() {
    const lastUpdated = document.getElementById('last-updated');
    if (!lastUpdated) {
        return;
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    lastUpdated.innerText = `Last updated: ${year}-${month}-${day}`;
}

function setupActiveNavigation() {
    const sections = document.querySelectorAll('main section[id], footer[id]');
    const navLinks = document.querySelectorAll('.site-nav ul a');

    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const currentId = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    const isActive = link.getAttribute('href') === `#${currentId}`;
                    link.classList.toggle('active', isActive);
                });
            });
        },
        {
            threshold: 0.35,
            rootMargin: '-20% 0px -55% 0px'
        }
    );

    sections.forEach((section) => observer.observe(section));
}

window.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const counterBtn = document.getElementById('click-counter');

    loadThemePreference();
    updateLastUpdated();
    setupActiveNavigation();

    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    if (counterBtn) {
        counterBtn.addEventListener('click', incrementCounter);
    }
});
