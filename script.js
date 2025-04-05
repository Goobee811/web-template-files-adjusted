// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initTabs();
    
    // Initialize FAQ accordions
    initFAQs();
    
    // Initialize references collapsible
    initReferences();
    
    // Initialize product slider
    initProductSlider();
    
    // Add smooth scrolling for anchor links
    initSmoothScroll();
    
    // Add animations for page elements
    initAnimations();
});

/**
 * Initialize tabs functionality
 */
function initTabs() {
    // Get all tab links
    const tabLinks = document.querySelectorAll('.tabs a');
    
    // Add click event to each tab link
    tabLinks.forEach(function(tab) {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the tab ID from the href attribute
            const tabId = this.getAttribute('href').substring(1);
            
            // Remove active class from all tabs and content
            document.querySelectorAll('.tabs a').forEach(function(el) {
                el.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-content').forEach(function(el) {
                el.classList.remove('active');
            });
            
            // Add active class to current tab and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Update browser history for better navigation
            history.replaceState(null, null, `#${tabId}`);
        });
    });
    
    // Check if there's a hash in the URL and activate corresponding tab
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const tab = document.querySelector(`.tabs a[href="#${hash}"]`);
        if (tab) {
            tab.click();
        }
    }
    
    // Sidebar button functionality
    const sidebarBtn = document.querySelector('.sidebar-btn');
    if (sidebarBtn) {
        sidebarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target tab ID from href
            const targetId = this.getAttribute('href').substring(1);
            
            // Activate the target tab
            const targetTab = document.querySelector(`.tabs a[href="#${targetId}"]`);
            if (targetTab) {
                targetTab.click();
            }
            
            // Scroll to the tab content
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    }
}

/**
 * Initialize FAQ accordions
 */
function initFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class
            item.classList.toggle('active');
            
            // Update the toggle icon
            const toggleIcon = this.querySelector('.faq-toggle');
            if (toggleIcon) {
                toggleIcon.textContent = item.classList.contains('active') ? '−' : '+';
            }
        });
    });
}

/**
 * Initialize References collapsible section
 */
function initReferences() {
    const referenceSection = document.querySelector('.reference');
    
    if (referenceSection) {
        const referenceTitle = referenceSection.previousElementSibling;
        const referenceContent = referenceSection.innerHTML;
        
        // Create the collapsible structure
        const collapsible = document.createElement('div');
        collapsible.className = 'reference-collapsible';
        
        const header = document.createElement('div');
        header.className = 'reference-header';
        header.innerHTML = `${referenceTitle.outerHTML}<span class="reference-toggle">+</span>`;
        
        const content = document.createElement('div');
        content.className = 'reference-content';
        
        const inner = document.createElement('div');
        inner.className = 'reference-inner';
        inner.innerHTML = referenceContent;
        
        content.appendChild(inner);
        collapsible.appendChild(header);
        collapsible.appendChild(content);
        
        // Replace the original elements with the collapsible
        referenceTitle.parentNode.replaceChild(collapsible, referenceTitle);
        referenceSection.remove();
        
        // Add click event to toggle
        header.addEventListener('click', function() {
            collapsible.classList.toggle('active');
            const toggleIcon = this.querySelector('.reference-toggle');
            if (toggleIcon) {
                toggleIcon.textContent = collapsible.classList.contains('active') ? '−' : '+';
            }
        });
    }
}

/**
 * Initialize product slider
 */
function initProductSlider() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    // If there are no navigation buttons or products, return
    if (!prevBtn || !nextBtn || productCards.length === 0) {
        return;
    }
    
    // Determine how many cards to show based on screen width
    function getCardsToShow() {
        if (window.innerWidth < 576) {
            return 1;
        } else if (window.innerWidth < 992) {
            return 2;
        } else if (window.innerWidth < 1200) {
            return 3;
        } else {
            return 4;
        }
    }
    
    let currentIndex = 0;
    let cardsToShow = getCardsToShow();
    let maxIndex = Math.max(0, productCards.length - cardsToShow);
    
    // Update the slider visibility
    function updateSliderVisibility() {
        prevBtn.style.opacity = currentIndex <= 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex <= 0 ? 'none' : 'auto';
        
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }
    
    // Update the slider display
    function updateSlider() {
        productCards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + cardsToShow) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        updateSliderVisibility();
    }
    
    // Initialize the slider
    updateSlider();
    
    // Add event listeners to the navigation buttons
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Update on window resize
    window.addEventListener('resize', function() {
        cardsToShow = getCardsToShow();
        maxIndex = Math.max(0, productCards.length - cardsToShow);
        
        // Adjust currentIndex if needed
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        updateSlider();
    });
}

/**
 * Add smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not(.tabs a)');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add animations for page elements
 */
function initAnimations() {
    // Animate product cards on scroll
    const productCards = document.querySelectorAll('.product-card');
    
    // Create intersection observer for product cards
    if (productCards.length > 0) {
        const productCardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    productCardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Set initial styles and observe each card
        productCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            productCardObserver.observe(card);
        });
    }
    
    // Animate feature list items on scroll
    const featureItems = document.querySelectorAll('.feature-list li');
    
    if (featureItems.length > 0) {
        const featureObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    featureObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Set initial styles and observe each feature item
        featureItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            featureObserver.observe(item);
        });
    }
    
    // Add animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title, .subsection-title');
    
    if (sectionTitles.length > 0) {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Set initial styles and observe each title
        sectionTitles.forEach((title) => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(10px)';
            title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            titleObserver.observe(title);
        });
    }
}

/**
 * Handle mobile navigation toggling
 */
function toggleMobileNav() {
    const mainNav = document.querySelector('.main-nav');
    mainNav.classList.toggle('mobile-active');
}

/**
 * Generate and show a modal with image gallery
 * @param {string} imgSrc - Image source URL
 * @param {string} caption - Image caption
 */
function showImageModal(imgSrc, caption) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        document.body.removeChild(modal);
    };
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = caption || '';
    
    const captionText = document.createElement('div');
    captionText.className = 'modal-caption';
    captionText.textContent = caption || '';
    
    // Add elements to modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(img);
    modalContent.appendChild(captionText);
    modal.appendChild(modalContent);
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Close modal when clicking outside of content
    modal.onclick = function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

// Optional: Add this function to make gallery images clickable
function initImageGallery() {
    const galleryImages = document.querySelectorAll('.image-item img');
    
    galleryImages.forEach(function(img) {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            const caption = this.nextElementSibling ? 
                this.nextElementSibling.textContent : '';
            showImageModal(this.src, caption);
        });
    });
}

// Initialize image gallery if exists
document.addEventListener('DOMContentLoaded', function() {
    initImageGallery();
});