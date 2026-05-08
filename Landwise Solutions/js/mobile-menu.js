// Mobile Menu Handler
// This script ensures the mobile menu works consistently across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu functionality
    initMobileMenu();

    // Function to initialize mobile menu
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const body = document.body;

        // If elements don't exist, exit early
        if (!mobileMenuBtn || !mobileMenuOverlay) {
            return;
        }

        // Remove any existing event listeners (to prevent duplicates)
        const newMobileMenuBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newMobileMenuBtn, mobileMenuBtn);

        // Create a variable for the new close button
        let newMobileMenuClose = null;

        if (mobileMenuClose) {
            newMobileMenuClose = mobileMenuClose.cloneNode(true);
            mobileMenuClose.parentNode.replaceChild(newMobileMenuClose, mobileMenuClose);
        }

        // Function to close menu
        function closeMenu() {
            newMobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        }

        // Function to open menu
        function openMenu() {
            newMobileMenuBtn.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            body.classList.add('menu-open');
        }

        // Add click event to hamburger button
        newMobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (mobileMenuOverlay.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Add click event to close button
        if (newMobileMenuClose) {
            newMobileMenuClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMenu();
            });
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
});
