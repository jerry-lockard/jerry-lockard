// Load components
document.addEventListener('DOMContentLoaded', async () => {
    // Load navigation
    const navContainer = document.getElementById('main-nav');
    if (navContainer) {
        const navResponse = await fetch('/src/components/nav.html');
        const navContent = await navResponse.text();
        navContainer.innerHTML = navContent;
        initializeNavigation();
    }

    // Load footer
    const footerContainer = document.getElementById('main-footer');
    if (footerContainer) {
        const footerResponse = await fetch('/src/components/footer.html');
        const footerContent = await footerResponse.text();
        footerContainer.innerHTML = footerContent;
    }

    // Initialize other features
    initializeTheme();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Add hover effect to nav links
        navLinksItems.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                const icon = e.currentTarget.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateY(-3px)';
                    setTimeout(() => {
                        icon.style.transform = 'translateY(0)';
                    }, 200);
                }
            });
        });
    }

    // Update active nav link
    updateActiveNavLink();
}

// Theme toggle functionality
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    updateThemeIcon(savedTheme === 'dark');

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon(isDark);

            // Add theme transition animation
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
}

function updateThemeIcon(isDark) {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        
        // Add icon rotation animation
        themeIcon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeIcon.style.transform = '';
        }, 200);
    }
}

// Animation functionality
function initializeAnimations() {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Add stagger effect to child elements
                const children = entry.target.querySelectorAll('.stagger');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                });

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

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const icon = e.currentTarget.querySelector('.project-image i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 200);
            }
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Active navigation highlight
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        const isActive = link.getAttribute('href') === currentPath;
        link.classList.toggle('active', isActive);
        
        if (isActive) {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 200);
            }
        }
    });
}

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

            // Close mobile menu if open
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            if (mobileMenuBtn && navLinks) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    }
});
