// Tab Management
let openTabs = new Set(['readme']);

function createTab(tabId) {
    const tab = document.createElement('div');
    tab.className = 'content-tab';
    tab.setAttribute('data-tab', tabId);
    
    const tabTitle = document.createElement('span');
    tabTitle.className = 'content-tab-title';
    
    // Set initial title based on tabId
    switch(tabId) {
        case 'readme':
            tabTitle.textContent = 'README.md';
            break;
        case 'experience':
            tabTitle.textContent = 'work.md';
            break;
        case 'projects':
            tabTitle.textContent = 'portfolio.md';
            break;
        case 'skills':
            tabTitle.textContent = 'technical.md';
            break;
        case 'education':
            tabTitle.textContent = 'academic.md';
            break;
        case 'contact':
            tabTitle.textContent = 'contact.md';
            break;
    }
    
    const closeButton = document.createElement('span');
    closeButton.className = 'content-tab-close';
    
    tab.appendChild(tabTitle);
    tab.appendChild(closeButton);
    
    // Add click handler for the tab
    tab.addEventListener('click', (e) => {
        if (!e.target.classList.contains('content-tab-close')) {
            switchTab(tabId);
        }
    });
    
    // Add click handler for the close button
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closeTab(tabId);
    });
    
    return tab;
}

function switchTab(tabId) {
    // Add to open tabs if not already there
    if (!openTabs.has(tabId)) {
        openTabs.add(tabId);
        const contentTab = createTab(tabId);
        document.querySelector('.content-tabs').appendChild(contentTab);
    }

    // Update active states
    document.querySelectorAll('.sidebar-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Set new active states
    document.querySelector(`.sidebar-tab[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.content-tab[data-tab="${tabId}"]`).classList.add('active');

    // Update breadcrumbs and status bar
    updateBreadcrumbs(tabId);
    updateStatusBar(tabId);
}

function closeTab(tabId) {
    if (tabId === 'readme' || openTabs.size <= 1) return; // Don't close README.md or the last tab
    
    openTabs.delete(tabId);
    const tab = document.querySelector(`.content-tab[data-tab="${tabId}"]`);
    tab.remove();
    
    // Switch to README.md when closing a tab
    switchTab('readme');
}

// Initialize tabs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for sidebar tabs
    document.querySelectorAll('.sidebar-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Add click handlers for nested items
    document.querySelectorAll('.nested-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            switchTab(targetId);
        });
    });

    // Add click handler for the initial README.md tab
    const initialReadmeTab = document.querySelector('.content-tab[data-tab="readme"]');
    if (initialReadmeTab) {
        initialReadmeTab.addEventListener('click', (e) => {
            if (!e.target.classList.contains('content-tab-close')) {
                switchTab('readme');
            }
        });
    }
});

// Update breadcrumbs
function updateBreadcrumbs(tabId) {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    const items = breadcrumbs.querySelectorAll('.breadcrumb-item');
    
    // Update last breadcrumb with current file
    const fileName = document.querySelector(`.content-tab[data-tab="${tabId}"] .content-tab-title`).textContent;
    items[1].textContent = fileName;
    
    // Add click handlers for breadcrumb navigation
    items[0].addEventListener('click', () => {
        switchTab('readme');
    });
}

// Update status bar
function updateStatusBar(tabId) {
    const statusBar = document.querySelector('.status-bar');
    const fileType = tabId === 'readme' ? 'Markdown' : 'Markdown';
    statusBar.querySelector('.status-bar-item:last-child').innerHTML = 
        `<i class="fas fa-file-code"></i> ${fileType}`;
}

// Skills category switching
document.querySelectorAll('.skills-category').forEach(category => {
    category.addEventListener('click', () => {
        // Remove active class from all categories and panels
        document.querySelectorAll('.skills-category').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked category and corresponding panel
        category.classList.add('active');
        const panelId = category.getAttribute('data-category');
        document.getElementById(panelId).classList.add('active');
    });
});

// Skills search functionality
document.querySelectorAll('.skills-search input').forEach(input => {
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const skillCards = e.target.closest('.skills-panel').querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            const skillName = card.querySelector('h4').textContent.toLowerCase();
            card.style.display = skillName.includes(searchTerm) ? 'flex' : 'none';
        });
    });
});

// Skill card hover effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 