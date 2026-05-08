document.addEventListener("DOMContentLoaded", function() {
    console.log('Simplified transitions.js loaded');

    // Add error handling
    window.addEventListener('error', function(event) {
        console.error('Global error caught:', event.error);
    });

    // Simple function to reinitialize scripts
    function reinitializeScripts() {
        console.log('Reinitializing scripts...');

        // Reinitialize AOS
        if (typeof AOS !== 'undefined') {
            console.log('Reinitializing AOS...');
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }
    }

    // Handle direct navigation instead of using Barba.js
    document.addEventListener('click', function(e) {
        // Find closest anchor tag
        const link = e.target.closest('a');

        // If no link was clicked or it doesn't have an href attribute, do nothing
        if (!link || !link.getAttribute('href')) {
            return;
        }

        const href = link.getAttribute('href');

        // If it's a link to a section on the same page
        if (href.startsWith('#')) {
            // Let the browser handle it normally
            return;
        }

        // If it's a link to another HTML page (about.html, contact.html, or location pages)
        if (href.endsWith('.html')) {
            // Let the browser handle it normally - no prevention
            console.log('Navigating to:', href);
        }
    });

    // Simple function to remove overlays except CTA overlay
    function removeOverlays() {
        console.log('Removing overlays except CTA overlay...');

        // Add a style tag to disable all overlays except CTA overlay
        const styleTag = document.createElement('style');
        styleTag.textContent = `
            .transition-overlay,
            .nature-elements,
            .nature-element,
            [class*="overlay"]:not(.mobile-menu-overlay.active):not(.cta-overlay) {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
                z-index: -9999 !important;
            }
        `;
        document.head.appendChild(styleTag);
    }

    // Remove overlays
    removeOverlays();

    // Initialize scripts
    reinitializeScripts();

    // Add class to indicate JavaScript is loaded
    document.body.classList.add('js-loaded');
});
