// Portfolio JavaScript - All interactive functionality

// Typing animation
class TypingAnimation {
    constructor(elementId, text, speed = 100) {
        this.element = document.getElementById(elementId);
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.isTyping = true;
    }

    start() {
        if (this.isTyping && this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.start(), this.speed);
        } else {
            this.isTyping = false;
            // Hide cursor after typing is complete
            setTimeout(() => {
                const cursor = document.getElementById('cursor');
                if (cursor) cursor.style.display = 'none';
            }, 1000);
        }
    }
}

// Particles animation
class ParticlesAnimation {
    constructor(containerId, particleCount = 50) {
        this.container = document.getElementById(containerId);
        this.particleCount = particleCount;
        this.particles = [];
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        return particle;
    }

    init() {
        if (!this.container) return;
        
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.createParticle();
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }
}

// Skill bars animation
class SkillBarsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.observer = null;
    }

    animateSkill(skillBar) {
        const level = skillBar.getAttribute('data-level');
        skillBar.style.width = level + '%';
    }

    init() {
        // Create intersection observer for skill bars
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkill(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        // Observe all skill bars
        this.skillBars.forEach(skillBar => {
            this.observer.observe(skillBar);
        });
    }
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form validation and submission
class ContactForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.nameField = document.getElementById('name');
        this.emailField = document.getElementById('email');
        this.messageField = document.getElementById('message');
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateForm() {
        const name = this.nameField.value.trim();
        const email = this.emailField.value.trim();
        const message = this.messageField.value.trim();

        if (!name) {
            this.showError('Please enter your name');
            this.nameField.focus();
            return false;
        }

        if (!email || !this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            this.emailField.focus();
            return false;
        }

        if (!message) {
            this.showError('Please enter your message');
            this.messageField.focus();
            return false;
        }

        return true;
    }

    showError(message) {
        // Create a simple alert for now - can be enhanced with custom modals
        alert(message);
    }

    showSuccess() {
        alert('Thank you for your message! I will get back to you soon.');
    }

    resetForm() {
        this.form.reset();
    }

    handleSubmit(event) {
        event.preventDefault();
        
        if (this.validateForm()) {
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            this.showSuccess();
            this.resetForm();
        }
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
}

// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.animatedElements = document.querySelectorAll('.glass-card, .timeline-item, .certification-card');
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Set initial state and observe elements
        this.animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            this.observer.observe(element);
        });
    }
}

// Navbar scroll effect (if you want to add a fixed navbar later)
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollY = window.scrollY;
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (this.navbar) {
            if (currentScrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }

        this.lastScrollY = currentScrollY;
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }
}

// Cursor glow effect
class CursorGlow {
    constructor() {
        this.cursor = null;
        this.mouseX = 0;
        this.mouseY = 0;
    }

    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-glow';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(97, 218, 251, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(this.cursor);
    }

    updatePosition() {
        if (this.cursor) {
            this.cursor.style.left = this.mouseX - 10 + 'px';
            this.cursor.style.top = this.mouseY - 10 + 'px';
        }
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.updatePosition();
    }

    handleMouseEnter() {
        if (this.cursor) {
            this.cursor.style.transform = 'scale(1.5)';
        }
    }

    handleMouseLeave() {
        if (this.cursor) {
            this.cursor.style.transform = 'scale(1)';
        }
    }

    init() {
        // Only enable on desktop
        if (window.innerWidth > 768) {
            this.createCursor();
            
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            
            // Add hover effects for interactive elements
            const interactiveElements = document.querySelectorAll('button, a, .glass-card');
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => this.handleMouseEnter());
                element.addEventListener('mouseleave', () => this.handleMouseLeave());
            });
        }
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.ticking = false;
    }

    throttle(func, delay) {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                func();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    const typingText = 'Frontend Developer | Building futuristic apps with clean code and creative design';
    const typing = new TypingAnimation('typed-text', typingText, 100);
    typing.start();

    // Initialize particles
    const particles = new ParticlesAnimation('particles', 50);
    particles.init();

    // Initialize skill bars animation
    const skillBars = new SkillBarsAnimation();
    skillBars.init();

    // Initialize contact form
    const contactForm = new ContactForm('contact-form');
    contactForm.init();

    // Initialize scroll animations
    const scrollAnimations = new ScrollAnimations();
    scrollAnimations.init();

    // Initialize cursor glow effect
    const cursorGlow = new CursorGlow();
    cursorGlow.init();

    // Initialize navbar scroll effect
    const navbarScroll = new NavbarScroll();
    navbarScroll.init();

    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Handle resize events
    const performanceOptimizer = new PerformanceOptimizer();
    const handleResize = performanceOptimizer.debounce(() => {
        // Reinitialize particles on resize
        particles.init();
    }, 250);

    window.addEventListener('resize', handleResize);
});

// Export functions for global access
window.scrollToSection = scrollToSection;