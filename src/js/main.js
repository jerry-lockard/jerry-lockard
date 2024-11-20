// Load components
document.addEventListener('DOMContentLoaded', async () => {
    // Load navigation
    const navContainer = document.getElementById('main-nav');
    if (navContainer) {
        const navResponse = await fetch('/src/components/nav.html');
        const navContent = await navResponse.text();
        navContainer.innerHTML = navContent;
    }

    // Load footer
    const footerContainer = document.getElementById('main-footer');
    if (footerContainer) {
        const footerResponse = await fetch('/src/components/footer.html');
        const footerContent = await footerResponse.text();
        footerContainer.innerHTML = footerContent;
    }
});

// Theme toggle functionality
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Initialize theme
initializeTheme();

// Add theme toggle event listener after nav is loaded
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Smooth scroll functionality
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - navHeight,
                behavior: 'smooth'
            });
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (!entry.target.classList.contains('keep-observing')) {
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('.animate-on-scroll').forEach((elem) => {
    observer.observe(elem);
});

// Active navigation highlight
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update active nav link when navigation is loaded
document.addEventListener('DOMContentLoaded', updateActiveNavLink);
