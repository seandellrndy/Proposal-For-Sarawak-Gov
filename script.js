// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const navbar = document.getElementById('navbar');

    // Mobile Menu Toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scrollspy - Highlight active section in navigation
    function updateActiveNavLink() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for better UX
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Navbar Background on Scroll
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#004d00'; // Darker green
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.backgroundColor = '#006400';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }

    // Scroll Event Listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
    });

    // Initialize on page load
    updateActiveNavLink();
    updateNavbarBackground();

    // Animate cards on scroll
    function animateOnScroll() {
        const cards = document.querySelectorAll('.highlight-card, .objective-card, .benefit-card, .stakeholder-card, .timeline-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => {
            card.style.transform = 'translateY(30px)';
            card.style.opacity = '0';
            card.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            observer.observe(card);
        });
    }

    // Initialize animations
    animateOnScroll();

    // Smooth reveal for statistics
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.textContent);
                    let current = 0;
                    const increment = target / 50; // Animation speed
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        entry.target.textContent = Math.ceil(current);
                    }, 40);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            statObserver.observe(stat);
        });
    }

    // Initialize stat animations
    animateStats();

    // Budget amount animation
    function animateBudgetAmount() {
        const budgetAmount = document.querySelector('.budget-amount');
        
        if (budgetAmount) {
            const budgetObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        budgetAmount.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            budgetAmount.style.transform = 'scale(1)';
                        }, 300);
                    }
                });
            }, { threshold: 0.5 });

            budgetObserver.observe(budgetAmount);
        }
    }

    // Initialize budget animation
    animateBudgetAmount();

    // Timeline animations
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.style.opacity = '1';
                    }, index * 200); // Stagger animation
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            
            // Set initial transform based on position
            if (item.classList.contains('timeline-item:nth-child(odd)') || window.innerWidth <= 768) {
                item.style.transform = 'translateX(-50px)';
            } else {
                item.style.transform = 'translateX(50px)';
            }
            
            timelineObserver.observe(item);
        });
    }

    // Initialize timeline animations
    animateTimeline();

    // Parallax effect for header
    function parallaxHeader() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;

        if (header) {
            header.style.transform = `translateY(${parallax}px)`;
        }
    }

    // Add parallax scroll listener
    window.addEventListener('scroll', parallaxHeader);

    // Smooth fade-in for sections
    function fadeInSections() {
        const sectionTitles = document.querySelectorAll('.section-title');
        
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.5 });

        sectionTitles.forEach(title => {
            title.style.transform = 'translateY(20px)';
            title.style.opacity = '0';
            title.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
            titleObserver.observe(title);
        });
    }

    // Initialize section title animations
    fadeInSections();

    // Interactive hover effects for comparison table
    function enhanceComparisonTable() {
        const comparisonCols = document.querySelectorAll('.comparison-col');
        
        comparisonCols.forEach(col => {
            col.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            col.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize comparison table effects
    enhanceComparisonTable();

    // Add loading animation completion
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Re-initialize timeline animations on resize
        if (window.innerWidth <= 768) {
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                item.style.transform = 'translateX(0)';
            });
        }
    });

    // Form validation and interaction (if forms are added later)
    function setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Add form handling logic here
                console.log('Form submitted');
            });
        });
    }

    // Initialize form handling
    setupForms();

    // Print-friendly styles
    window.addEventListener('beforeprint', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });

    // Console message for developers
    console.log('🌱 Slag Valorisation Proposal Website Loaded Successfully');
    console.log('💚 Supporting Sarawak\'s Circular Economy Initiative');
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(function() {
    // Additional scroll handling can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical images (if any are added)
function preloadImages() {
    const imageUrls = []; // Add image URLs here if needed
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize image preloading
preloadImages();

// Analytics and tracking placeholder
function trackInteraction(action, element) {
    // Add analytics tracking here
    console.log(`Interaction: ${action} on ${element}`);
}

// Add click tracking to important elements
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
        trackInteraction('navigation_click', e.target.textContent);
    }
    
    if (e.target.closest('.benefit-card')) {
        trackInteraction('benefit_card_click', e.target.closest('.benefit-card').querySelector('h3').textContent);
    }
});

// Service Worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration would go here
        console.log('Service Worker support detected');
    });
}
