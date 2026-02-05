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


    document.addEventListener('DOMContentLoaded', () => {
        const docSection = document.getElementById('doctors');
        
        // Setup Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.doc-card');
                    
                    // Trigger animations one by one
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.remove('opacity-0', 'translate-y-10');
                        }, index * 100); // 100ms delay for each card
                    });
                    
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of section is visible

        if(docSection) {
            observer.observe(docSection);
        }
    });

        // Data for the popups
    const serviceDetails = {
        'siddha': {
            title: "Siddha Medicine",
            desc: "Our Siddha approach focuses on the 'Mukkuttram' (Three humors). We use specific herbal formulations to restore balance to your Vatha, Pitha, and Kapha doshas.",
            treatments: [
                "Nadi Pariksha (Pulse Diagnosis)",
                "Varma Therapy for pain relief",
                "Thokkanam (Physical manipulation)",
                "Customized herbal diet plans"
            ]
        },
        'general': {
            title: "General Medicine",
            desc: "Primary care for acute and chronic illnesses. We focus on early diagnosis and holistic management to prevent complications.",
            treatments: [
                "Viral Fever & Infection management",
                "Thyroid disorders",
                "Hypertension (Blood Pressure) care",
                "Respiratory issues & Asthma"
            ]
        },
        'paediatrics': {
            title: "Paediatrics",
            desc: "Gentle, non-invasive care for your little ones. We focus on boosting immunity naturally and tracking developmental milestones.",
            treatments: [
                "Immunity boosting protocols",
                "Growth & Development monitoring",
                "Pediatric nutrition counseling",
                "Common cold & allergy management"
            ]
        },
        'diabetology': {
            title: "Diabetology",
            desc: "Comprehensive diabetes care that goes beyond just insulin. We combine modern diagnostics with lifestyle modifications.",
            treatments: [
                "HbA1c & Sugar level monitoring",
                "Diabetic foot care",
                "Dietary chart customization",
                "Prevention of diabetic neuropathy"
            ]
        }
    };

    function openModal(serviceKey) {
        const modal = document.getElementById('serviceModal');
        const data = serviceDetails[serviceKey];
        const listContainer = document.getElementById('modalList');

        // Populate Data
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalDesc').innerText = data.desc;
        
        // Clear and Populate List
        listContainer.innerHTML = ''; 
        data.treatments.forEach(item => {
            const li = document.createElement('li');
            li.className = "flex items-center gap-2";
            li.innerHTML = `<i class="ph-fill ph-check-circle text-gold-500"></i> ${item}`;
            listContainer.appendChild(li);
        });

        // Show Modal
        modal.classList.remove('hidden');
        // Small timeout to allow display:block to apply before opacity transition
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('div[class*="transform"]').classList.remove('scale-95', 'opacity-0');
            modal.querySelector('div[class*="transform"]').classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    function closeModal() {
        const modal = document.getElementById('serviceModal');
        
        // Add fade out classes
        modal.classList.add('opacity-0');
        modal.querySelector('div[class*="transform"]').classList.remove('scale-100', 'opacity-100');
        modal.querySelector('div[class*="transform"]').classList.add('scale-95', 'opacity-0');

        // Wait for transition to finish before hiding
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }