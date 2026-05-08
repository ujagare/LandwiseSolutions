// Function to initialize hero slider with video backgrounds
function initHomeSlider() {
    if (typeof Swiper !== 'undefined' && document.querySelector('.hero-slider')) {
        // Get all video elements
        const videoElements = document.querySelectorAll('.slide-video');

        videoElements.forEach(video => {
            // Try to load video
            video.load();

            // Handle video errors (file not found, etc.)
            video.addEventListener('error', function(e) {
                // Hide the video if there's an error
                this.style.display = 'none';
            });

            // Add event listener to play video when it can
            video.addEventListener('canplaythrough', function() {
                // Video is available
                this.style.opacity = '1';

                // Only play if this is the active slide
                if (video.closest('.swiper-slide').classList.contains('swiper-slide-active')) {
                    video.play().catch(e => {});
                }
            });
        });

        const heroSwiper = new Swiper('.hero-slider', {
            loop: true,
            speed: 1500, // Slower transition for smoother effect
            effect: 'fade', // Use fade effect for smoother transitions
            fadeEffect: {
                crossFade: true // Enable cross-fade effect
            },
            autoplay: {
                delay: 8000, // Longer delay to show more of each video
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init: function() {
                    // Play the first slide's video
                    const activeSlide = document.querySelector('.swiper-slide-active');
                    if (activeSlide) {
                        const video = activeSlide.querySelector('.slide-video');
                        if (video) {
                            video.play();
                        }
                    }
                },
                slideChangeTransitionStart: function () {
                    // Pause all videos
                    videoElements.forEach(video => {
                        // Only try to pause if the video is actually playing
                        try {
                            if (!video.paused) {
                                video.pause();
                            }
                        } catch (e) {
                            // Silently handle video errors
                        }
                    });

                    // Reset text animations
                    const slides = document.querySelectorAll('.swiper-slide');
                    slides.forEach(slide => {
                        const subtitle = slide.querySelector('.slide-subtitle');
                        const title = slide.querySelector('.slide-title');
                        const description = slide.querySelector('.slide-description');
                        const button = slide.querySelector('.slide-button');

                        if (subtitle) subtitle.style.opacity = '0';
                        if (title) title.style.opacity = '0';
                        if (description) description.style.opacity = '0';
                        if (button) button.style.opacity = '0';
                    });
                },
                slideChangeTransitionEnd: function () {
                    // Play the current slide's video if available
                    const activeSlide = document.querySelector('.swiper-slide-active');
                    if (activeSlide) {
                        const video = activeSlide.querySelector('.slide-video');
                        if (video && video.readyState >= 2) { // Only if video is loaded
                            try {
                                video.currentTime = 0; // Reset to beginning
                                video.play().catch(e => {});
                            } catch (e) {
                                // Silently handle video errors
                            }
                        }

                        // Force the text animations to show
                        const subtitle = activeSlide.querySelector('.slide-subtitle');
                        const title = activeSlide.querySelector('.slide-title');
                        const description = activeSlide.querySelector('.slide-description');
                        const button = activeSlide.querySelector('.slide-button');

                        // Add a small delay to ensure the slide transition is complete
                        setTimeout(() => {
                            if (subtitle) subtitle.style.opacity = '1';
                            if (title) title.style.opacity = '1';
                            if (description) description.style.opacity = '1';
                            if (button) button.style.opacity = '1';
                        }, 100);
                    }
                }
            }
        });

        // Add zoom effect to videos or images
        const addZoomEffect = () => {
            const activeSlide = document.querySelector('.swiper-slide-active');
            if (!activeSlide) return;

            // Try to zoom the video first
            const activeVideo = activeSlide.querySelector('.slide-video');
            const activeImage = activeSlide.querySelector('.slide-image img');

            // Target element to zoom (video if available, otherwise image)
            let targetElement = null;

            if (activeVideo && activeVideo.readyState >= 2 && activeVideo.style.opacity !== '0') {
                // Video is available and loaded
                targetElement = activeVideo;
            } else if (activeImage) {
                // Fallback to image
                targetElement = activeImage;
            }

            // Apply zoom effect if we have a target and GSAP is available
            if (targetElement && typeof gsap !== 'undefined') {
                gsap.fromTo(targetElement,
                    { scale: 1 },
                    {
                        scale: 1.1,
                        duration: 8, // Match with autoplay delay
                        ease: 'power1.inOut'
                    }
                );
            }
        };

        // Add zoom effect on init and after each transition
        setTimeout(addZoomEffect, 500); // Delay initial zoom to ensure elements are ready
        heroSwiper.on('slideChangeTransitionEnd', addZoomEffect);
    }
}

// Function to initialize testimonials slider
function initTestimonialsSlider() {
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-slider')) {
        const testimonialsSwiper = new Swiper('.testimonials-slider', {
            loop: true,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.testimonials-slider .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonials-slider .swiper-button-next',
                prevEl: '.testimonials-slider .swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            breakpoints: {
                768: {
                    slidesPerView: 1
                }
            }
        });
    }
}

// Function to initialize mobile navigation
function initMobileNav() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const body = document.body;

    function closeMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    function openMenu() {
        mobileMenuBtn.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        body.classList.add('menu-open');
    }

    if (mobileMenuBtn && mobileMenuOverlay) {
        // Toggle menu when clicking hamburger button
        mobileMenuBtn.addEventListener('click', () => {
            if (mobileMenuOverlay.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking X button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMenu);
        }

        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        mobileMenuOverlay.addEventListener('click', (e) => {
            // Only close if clicking directly on the overlay (not on its children)
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                closeMenu();
            }
        });
    }
}

// Function to initialize form submissions
function initForms() {
    // Form Submission for Quick Enquiry form on homepage
    const enquiryForm = document.querySelector('#enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = enquiryForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(enquiryForm.action, {
                    method: enquiryForm.method,
                    body: new FormData(enquiryForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Form submitted successfully, redirect to thank you page
                    window.location.href = 'thank-you.html';
                } else {
                    // Handle server errors
                    const data = await response.json();
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        alert(data.errors.map(error => error.message).join(', '));
                    } else {
                        alert('Oops! There was a problem submitting your form. Please try again.');
                    }

                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                alert('Failed to send message. Please try again later.');

                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Function to initialize animations
function initAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
    });
}

// Function to initialize smooth scroll
function initSmoothScroll() {
    // Try to initialize smooth scroll if available
    try {
        // Check if the smooth-scroll library is loaded
        if (typeof window.SmoothScroll !== 'undefined') {
            // Create new instance
            new window.SmoothScroll('a[href^="#"]:not([href="#"])', {
                speed: 800,
                speedAsDuration: true,
                offset: 80, // Offset for header height
                easing: 'easeInOutCubic',
                updateURL: false
            });
        } else {
            // Fallback to native scroll with offset
            document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    } catch (error) {
        // If any error occurs, use the native smooth scrolling as fallback
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Initialize everything on page load
function initPage() {
    // Initialize AOS first
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            disable: 'mobile'
        });
    }

    // Then initialize all other components
    initMobileNav();
    initForms();
    initAnimations();
    initSmoothScroll();

    // Initialize sliders if they exist on the page
    if (document.querySelector('.hero-slider')) {
        initHomeSlider();
    }

    if (document.querySelector('.testimonials-slider')) {
        initTestimonialsSlider();
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize the page if Barba.js is not active yet
    // This prevents double initialization
    if (!window.barba || !window.barba.initialized) {
        initPage();
    }
}); // Close DOMContentLoaded event listener
