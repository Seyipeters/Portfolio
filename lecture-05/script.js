// script.js - simple interactivity for portfolio
// console messages, variables, functions, events, and state

console.log('Script loaded');

// state variables
let isDarkMode = false;      // theme state
let clickCount = 0;          // counter state

// useful constants
const THEME_CLASS = 'dark-theme';
const STORAGE_KEY = 'portfolio_theme';

function applyTheme() {
    document.body.classList.toggle(THEME_CLASS, isDarkMode);
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
    console.log('Theme toggled, dark mode is now', isDarkMode);
}

function incrementCounter() {
    clickCount += 1;
    console.log('Button clicked', clickCount, 'times');
}

function updateLastUpdated() {
    const lastUpdated = document.getElementById('last-updated');
    if (!lastUpdated) return;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    lastUpdated.innerText = `Last updated: ${year}-${month}-${day}`;
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');
    const themeBtn = document.getElementById('theme-toggle');
    const counterBtn = document.getElementById('click-counter');

    loadThemePreference();
    updateLastUpdated();

    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    if (counterBtn) {
        counterBtn.addEventListener('click', incrementCounter);
    }
});
