// Smooth scroll navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                let targetId = '';
                const text = this.textContent.trim().toLowerCase();
                
                if (text === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                } else if (text === 'about us') {
                    targetId = 'about';
                } else if (text === 'catalog') {
                    targetId = 'catalog';
                } else if (text === 'sale') {
                    targetId = 'sale';
                } else if (text === 'reviews') {
                    targetId = 'reviews';
                } else if (text === 'contact us') {
                    targetId = 'contact';
                }
                
                if (targetId) {
                    const section = document.getElementById(targetId);
                    if (section) {
                        const offset = 80;
                        const elementPosition = section.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const text = link.textContent.trim().toLowerCase();
            
            if ((current === 'about' && text === 'about us') ||
                (current === 'catalog' && text === 'catalog') ||
                (current === 'sale' && text === 'sale') ||
                (current === 'reviews' && text === 'reviews') ||
                (current === 'contact' && text === 'contact us') ||
                (current === '' && text === 'home')) {
                link.classList.add('active');
            }
        });
    });
    
    // Sale thumbnails switching
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const mainImage = document.querySelector('.sale-main-image img');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const img = this.querySelector('img');
                if (img) {
                    mainImage.src = img.src;
                }
            });
        });
    }
    
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = 'rgba(12, 12, 12, 0.1)';
                }
            });
            
            if (isValid) {
                alert('Thank you for your message! We will contact you soon.');
                this.reset();
            }
        });
    }
});