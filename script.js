document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. HERO SLIDER LOGIC
       ========================================= */
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slide-dot');
    
    // Only run slider code if slides exist on the page
    if(slides.length > 0) {
        const totalSlides = slides.length;
        let currentSlide = 0;
        let slideInterval;

        // Function to switch slides
        function showSlide(index) {
            // Reset all slides to hidden state
            slides.forEach((slide) => {
                slide.classList.remove('opacity-100', 'z-20', 'pointer-events-auto');
                slide.classList.add('opacity-0', 'z-10', 'pointer-events-none');
            });

            // Reset all dots to inactive state
            dots.forEach((dot) => {
                dot.classList.remove('bg-medical-900');
                dot.classList.add('bg-gray-300');
            });

            // Set active slide and dot
            slides[index].classList.remove('opacity-0', 'z-10', 'pointer-events-none');
            slides[index].classList.add('opacity-100', 'z-20', 'pointer-events-auto');
            
            if(dots[index]) {
                dots[index].classList.remove('bg-gray-300');
                dots[index].classList.add('bg-medical-900');
            }
            
            currentSlide = index;
        }

        // Auto-play function
        function nextSlide() {
            let next = (currentSlide + 1) % totalSlides;
            showSlide(next);
        }

        // Start the Auto-play timer
        function startTimer() {
            if(slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000); // 5 Seconds
        }

        // Add Click Events to Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval); 
                showSlide(index);
                startTimer(); 
            });
        });

        // Initialize Slider
        startTimer();
    }


    /* =========================================
       2. MOBILE MENU TOGGLE LOGIC
       ========================================= */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        const icon = mobileBtn.querySelector('i');

        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            } else {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                if(icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });
    }


    /* =========================================
       3. SCROLL TO TOP BUTTON LOGIC
       ========================================= */
    const scrollBtn = document.getElementById('scrollToTopBtn');

    if(scrollBtn) {
        // Show button when scrolled down 300px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.remove('translate-y-20', 'opacity-0');
            } else {
                scrollBtn.classList.add('translate-y-20', 'opacity-0');
            }
        });

        // Smooth scroll to top when clicked
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});



/* =========================================
   PRELOADER LOGIC
   ========================================= */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        // Minimum display time of 1.5 seconds so users see the logo
        setTimeout(() => {
            // 1. Fade Out opacity
            preloader.classList.add('opacity-0');
            
            // 2. Remove from DOM after transition finishes
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000); // Matches the duration-1000 class
        }, 1500);
    }
});