
document.addEventListener('DOMContentLoaded', function () {

    const burgerBtn = document.querySelector('.burger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', function() {
            burgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    
    allAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;
            
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                e.preventDefault();
                
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const sectionTop = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });

                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });

                document.querySelectorAll('.nav-link').forEach(navLink => {
                    if (navLink.getAttribute('href') === href) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    updateActiveLink();

    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const mainImage = document.querySelector('.sale-main-image img');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                thumbnails.forEach(t => t.classList.remove('active'));

                this.classList.add('active');

                const newSrc = this.querySelector('img').src;

                mainImage.style.opacity = '0';
                mainImage.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity = '1';
                    mainImage.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }

    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const phoneInput = this.querySelector('input[type="tel"]');
            const commentInput = this.querySelector('textarea');
            
            let isValid = true;

            this.querySelectorAll('.error-message').forEach(el => el.remove());
            this.querySelectorAll('.contact-input, .contact-textarea').forEach(el => {
                el.classList.remove('error');
            });

            if (nameInput && nameInput.value.trim().length < 2) {
                showError(nameInput, 'Please enter your name (min 2 characters)');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && !emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }

            const phoneRegex = /^\+?[\d\s()-]{10,}$/;
            if (phoneInput && !phoneRegex.test(phoneInput.value.trim())) {
                showError(phoneInput, 'Please enter a valid phone number');
                isValid = false;
            }

            if (commentInput && commentInput.value.trim().length < 10) {
                showError(commentInput, 'Please enter a message (min 10 characters)');
                isValid = false;
            }
            
            if (isValid) {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you! Your message has been sent.';
                contactForm.appendChild(successMessage);

                contactForm.reset();

                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
        
        function showError(input, message) {
            input.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
    }

    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                window.scrollTo({
                    top: aboutSection.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });

        scrollIndicator.style.cursor = 'pointer';
    }

    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.product-card, .review-card').forEach(card => {
        observer.observe(card);
    });
    
});