let isDarkMode = false;
let appreciationCount = 0;

const THEME_CLASS = 'dark-theme';
const STORAGE_KEY = 'portfolio_theme';
const PROJECT_STORAGE_KEY = 'portfolio_featured_projects';

const PROJECT_CANDIDATES = [
    {
        id: 'ai_ml_internship_finland',
        title: 'AI/ML Internship Project (Finland Focus)',
        tag: 'Machine Learning',
        description: 'End-to-end churn risk prediction pipeline with training, evaluation metrics, and reusable inference scripts.',
        url: 'https://github.com/Seyipeters/Portfolio/tree/main/ai-ml-internship-finland'
    },
    {
        id: 'sql_data_warehouse_project',
        title: 'SQL Data Warehouse Project',
        tag: 'Data Engineering',
        description: 'A modern SQL warehouse project with ETL workflows, data modelling, and analytics-ready structures.',
        url: 'https://github.com/Seyipeters/sql_data_warehouse_project'
    },
    {
        id: 'FinnVocabAndroid',
        title: 'FinnVocab Android App',
        tag: 'Mobile App',
        description: 'An Android app focused on helping users build practical Finnish vocabulary in everyday contexts.',
        url: 'https://github.com/Seyipeters/FinnVocabAndroid'
    },
    {
        id: 'FinnVocab_Website',
        title: 'FinnVocab Website',
        tag: 'Web App',
        description: 'Web version of FinnVocab with a practical learning flow for foreigners living in Finland.',
        url: 'https://github.com/Seyipeters/FinnVocab_Website'
    },
    {
        id: 'ny_taxi_trips_pipeline',
        title: 'NYC Taxi Trips Pipeline',
        tag: 'Cloud Data Pipeline',
        description: 'End-to-end data pipeline using Docker, Apache Beam, Terraform, Google Cloud, and analytics outputs.',
        url: 'https://github.com/Seyipeters/ny_taxi_trips_pipeline'
    },
    {
        id: 'Smart_Waste_Bin',
        title: 'Smart Waste Bin',
        tag: 'IoT',
        description: 'Arduino-based smart waste bin with ultrasonic sensing and servo automation for touch-free lid control.',
        url: 'https://github.com/Seyipeters/Smart_Waste_Bin'
    },
    {
        id: 'Niryo_Robot_vs_Human_Tic-Tac-Toe_game',
        title: 'Niryo Robot vs Human Tic-Tac-Toe',
        tag: 'Robotics + CV',
        description: 'Physical game system where a robot arm uses computer vision to play tic-tac-toe against a human.',
        url: 'https://github.com/Seyipeters/Niryo_Robot_vs_Human_Tic-Tac-Toe_game'
    },
    {
        id: 'titanic-machine-learning',
        title: 'Titanic Machine Learning',
        tag: 'Machine Learning',
        description: 'Titanic dataset preprocessing and model experimentation in a practical ML notebook workflow.',
        url: 'https://github.com/Seyipeters/titanic-machine-learning'
    },
    {
        id: 'wolt_customers_insights',
        title: 'Wolt Customer Insights',
        tag: 'Analytics',
        description: 'Data exploration and customer behavior analysis project focused on deriving actionable insights.',
        url: 'https://github.com/Seyipeters/wolt_customers_insights'
    }
];

const DEFAULT_FEATURED_PROJECT_IDS = [
    'ai_ml_internship_finland',
    'sql_data_warehouse_project',
    'FinnVocabAndroid',
    'ny_taxi_trips_pipeline'
];

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

function getSavedProjectSelection() {
    const savedSelection = localStorage.getItem(PROJECT_STORAGE_KEY);

    if (!savedSelection) {
        return [...DEFAULT_FEATURED_PROJECT_IDS];
    }

    try {
        const parsed = JSON.parse(savedSelection);
        if (!Array.isArray(parsed)) {
            return [...DEFAULT_FEATURED_PROJECT_IDS];
        }

        return parsed.filter((id) => PROJECT_CANDIDATES.some((project) => project.id === id));
    } catch {
        return [...DEFAULT_FEATURED_PROJECT_IDS];
    }
}

function saveProjectSelection(selectedIds) {
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(selectedIds));
}

function renderFeaturedProjects(selectedIds) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) {
        return;
    }

    const selectedProjects = PROJECT_CANDIDATES.filter((project) => selectedIds.includes(project.id));

    if (!selectedProjects.length) {
        projectsGrid.innerHTML = '<p class="projects-empty">No projects selected yet. Use the picker above to feature your repositories.</p>';
        return;
    }

    projectsGrid.innerHTML = selectedProjects
        .map(
            (project) => `
            <article class="project-card">
              <span class="project-tag">${project.tag}</span>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link">View Project</a>
            </article>
        `
        )
        .join('');
}

function renderProjectPicker(selectedIds) {
    const pickerList = document.getElementById('project-picker-list');
    if (!pickerList) {
        return;
    }

    pickerList.innerHTML = PROJECT_CANDIDATES
        .map(
            (project) => `
            <label class="picker-item">
              <input type="checkbox" value="${project.id}" ${selectedIds.includes(project.id) ? 'checked' : ''}>
              <span>${project.title}</span>
            </label>
        `
        )
        .join('');

    const checkboxes = pickerList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const nextSelection = [...pickerList.querySelectorAll('input[type="checkbox"]:checked')].map(
                (item) => item.value
            );
            saveProjectSelection(nextSelection);
            renderFeaturedProjects(nextSelection);
        });
    });
}

function initializeProjectPicker() {
    const selectedIds = getSavedProjectSelection();
    renderProjectPicker(selectedIds);
    renderFeaturedProjects(selectedIds);
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
    initializeProjectPicker();
    setupActiveNavigation();

    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    if (counterBtn) {
        counterBtn.addEventListener('click', incrementCounter);
    }
});
