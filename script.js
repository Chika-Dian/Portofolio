document.addEventListener('DOMContentLoaded', () => {
   
    const chikaDianText = document.querySelector('.hero-content h1');

  
    chikaDianText.style.opacity = 0;
    chikaDianText.style.transform = 'translateY(20px)';

  
    setTimeout(() => {
        chikaDianText.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        chikaDianText.style.opacity = 1;
        chikaDianText.style.transform = 'translateY(0)';
    }, 500); 

    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up'); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

  
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href'); 
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const header = document.querySelector('header');
                const headerOffset = header.offsetHeight + 10; 

                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Carousel Sertifikat ---
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselDotsContainer = document.querySelector('.carousel-dots');

    let counter = 0;
    let slideWidth; 

    function updateSlideWidthAndPosition() {
        if (carouselImages.length > 0) {
            slideWidth = carouselImages[0].clientWidth;
            carouselSlide.style.transition = 'none'; 
            carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
        }
    }

    window.addEventListener('resize', updateSlideWidthAndPosition);

    function createDots() {
        carouselDotsContainer.innerHTML = ''; 
        carouselImages.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', () => {
                counter = index;
                slideCarousel();
                updateDots();
            });
            carouselDotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === counter);
        });
    }

    nextBtn.addEventListener('click', () => {
        carouselSlide.style.transition = 'transform 0.5s ease-in-out'; 
        if (counter >= carouselImages.length - 1) {
            counter = 0; 
        } else {
            counter++;
        }
        slideCarousel();
        updateDots();
    });

    prevBtn.addEventListener('click', () => {
        carouselSlide.style.transition = 'transform 0.5s ease-in-out'; 
        if (counter <= 0) {
            counter = carouselImages.length - 1; 
        } else {
            counter--;
        }
        slideCarousel();
        updateDots();
    });

    function slideCarousel() {
        slideWidth = carouselImages[0].clientWidth; 
        carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
    }

    setTimeout(() => {
        createDots();
        updateDots(); 
        updateSlideWidthAndPosition(); 
    }, 100); 
    
    // --- Header Scroll Logic (hide on scroll down, show on scroll up) ---
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY; 

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        if (window.scrollY === 0) {
            header.classList.remove('header-hidden');
        }

        lastScrollY = window.scrollY; 
    });

    // New: Handle Contact Form Submission (for mailto:)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Mengambil nilai dari input
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Membuat body email
            const subject = `Message from Portfolio by ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

            // Mengatur action form dengan parameter subject dan body
            // Ganti 'chikhancyani@gmail.com' dengan alamat Gmail Anda yang sebenarnya
            this.action = `mailto:chikhancyani@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            
        });
    }

    
});