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
    const loadDataBtn = document.getElementById('load-data-btn');

    loadThemePreference();
    updateLastUpdated();

    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    if (counterBtn) {
        counterBtn.addEventListener('click', incrementCounter);
    }
    if (loadDataBtn) {
        loadDataBtn.addEventListener('click', loadExternalData);
    }
});

// ===== EXTERNAL DATA DEMO FUNCTIONS =====

// Why do we use async/await?
// Async/await makes asynchronous code look and behave more like synchronous code,
// making it easier to read, understand, and maintain. It allows us to wait for
// promises to resolve without blocking the entire application.

// Why do we check response.ok?
// response.ok checks if the HTTP status code is in the 200-299 range (success).
// It's important because a fetch() call doesn't reject on HTTP error status codes
// (like 404 or 500). We need to check response.ok to ensure the server returned
// successful data before trying to process it.

// Why do we use try/catch?
// try/catch blocks handle errors that may occur during API calls or data processing.
// Errors can come from network failures, JSON parsing errors, or other unexpected issues.
// Using try/catch prevents the application from crashing and allows us to show
// a user-friendly error message instead.

async function loadExternalData() {
    const dataContainer = document.getElementById('data-container');
    const API_URL = 'https://jsonplaceholder.typicode.com/users/1';

    // Show loading message
    dataContainer.innerHTML = '<div class="loading-message">Loading…</div>';
    dataContainer.setAttribute('aria-live', 'polite');

    try {
        // Fetch data from the API using async/await
        const response = await fetch(API_URL);

        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const user = await response.json();

        // Display the fetched data
        displayUserData(user);
    } catch (error) {
        // Handle any errors that occur during fetch or processing
        console.error('Error loading data:', error);
        dataContainer.innerHTML = '<div class="error-message">Error loading data</div>';
    }
}

function displayUserData(user) {
    const dataContainer = document.getElementById('data-container');

    // Create HTML to display the fetched data
    const userHTML = `
        <div class="user-data">
            <div class="user-field">
                <strong>Name</strong>
                <p>${user.name}</p>
            </div>
            <div class="user-field">
                <strong>Email</strong>
                <p>${user.email}</p>
            </div>
            <div class="user-field">
                <strong>Company</strong>
                <p>${user.company.name}</p>
            </div>
        </div>
    `;

    // Update the DOM with the data
    dataContainer.innerHTML = userHTML;
}

