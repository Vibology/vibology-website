// ============================================
// Vibology Theme
// Main JavaScript (Refactored)
// ============================================

(function() {
  'use strict';

  // --------------------------------------------
  // Dark Mode Toggle
  // --------------------------------------------

  function initDarkMode() {
    const theme = localStorage.getItem('theme') || 'auto';

    function applyTheme(themeValue) {
      if (themeValue === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      } else {
        document.documentElement.setAttribute('data-theme', themeValue);
      }
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (localStorage.getItem('theme') === 'auto') {
        applyTheme('auto');
      }
    });

    // Theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const currentTheme = localStorage.getItem('theme') || 'auto';
        const themes = ['light', 'dark', 'auto'];
        const currentIndex = themes.indexOf(currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];

        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
      });
    }
  }

  // --------------------------------------------
  // Helper: Toggle Dropdown
  // --------------------------------------------

  function toggleDropdown(li, container) {
    const isOpen = li.classList.contains('dropdown-open');

    // Close all other dropdowns in container
    container.querySelectorAll('.has-dropdown.dropdown-open').forEach(item => {
      if (item !== li) {
        item.classList.remove('dropdown-open');
        item.querySelector('a').setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle current dropdown
    li.classList.toggle('dropdown-open');
    li.querySelector('a').setAttribute('aria-expanded', !isOpen);
  }

  // --------------------------------------------
  // Mobile Menu Toggle
  // --------------------------------------------

  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
      });

      // Close menu on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
          menuToggle.setAttribute('aria-expanded', 'false');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      });

      // Close menu when clicking outside
      mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
          menuToggle.setAttribute('aria-expanded', 'false');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      });

      // Mobile dropdown toggles
      const dropdownToggles = mobileMenu.querySelectorAll('.has-dropdown > a');
      dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
          e.preventDefault();
          toggleDropdown(this.parentElement, mobileMenu);
        });
      });
    }
  }

  // --------------------------------------------
  // Dynamic Dropdown Navigation
  // --------------------------------------------

  function initDropdowns() {
    // Navigation HTML is already built by nav-init.hbs
    // Just attach event listeners to make dropdowns interactive

    const desktopNav = document.querySelector('.primary-nav > ul');
    const mobileNav = document.querySelector('.mobile-nav > ul');

    if (!desktopNav) return;

    // Desktop dropdowns - prevent navigation on toggle click
    desktopNav.querySelectorAll('.has-dropdown > a').forEach(toggle => {
      toggle.addEventListener('click', e => e.preventDefault());
    });

    // Mobile dropdowns - toggle visibility
    if (mobileNav) {
      mobileNav.querySelectorAll('.has-dropdown > a').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
          e.preventDefault();
          toggleDropdown(this.parentElement, mobileNav);
        });
      });
    }
  }

  // --------------------------------------------
  // Sticky Header
  // --------------------------------------------

  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Add/remove scrolled class
      if (scrollTop > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }

      // Hide/show header on scroll (for sticky-hide variant)
      if (header.classList.contains('sticky-hide')) {
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }
      }

      lastScrollTop = scrollTop;
    });
  }

  // --------------------------------------------
  // Copy Link (Share Buttons)
  // --------------------------------------------

  function initShareButtons() {
    const copyButtons = document.querySelectorAll('.share-copy');

    copyButtons.forEach(button => {
      button.addEventListener('click', async function() {
        const url = this.getAttribute('data-url');
        const textSpan = this.querySelector('.share-copy-text');
        const originalText = textSpan.textContent;

        try {
          await navigator.clipboard.writeText(url);
          this.classList.add('copied');
          textSpan.textContent = 'Copied!';

          setTimeout(() => {
            this.classList.remove('copied');
            textSpan.textContent = originalText;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }

  // --------------------------------------------
  // Scroll Progress Bar
  // --------------------------------------------

  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    const progressContainer = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', function() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

      progressBar.style.width = scrollPercent + '%';

      if (scrollTop > 100) {
        progressContainer.classList.add('visible');
      } else {
        progressContainer.classList.remove('visible');
      }
    });
  }

  // --------------------------------------------
  // Back to Top Button
  // --------------------------------------------

  function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------
  // Table of Contents
  // --------------------------------------------

  function initTableOfContents() {
    const toc = document.querySelector('.table-of-contents');
    if (!toc) return;

    const postContent = document.querySelector('.post-content');
    if (!postContent) return;

    const headings = postContent.querySelectorAll('h2, h3, h4');
    if (headings.length === 0) {
      toc.style.display = 'none';
      return;
    }

    // Generate TOC
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id;

      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = heading.textContent;
      link.addEventListener('click', function(e) {
        e.preventDefault();
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, null, `#${id}`);
      });

      li.appendChild(link);
      tocList.appendChild(li);
    });

    toc.appendChild(tocList);

    // Highlight active heading with Intersection Observer (more efficient than scroll listener)
    const tocLinks = toc.querySelectorAll('a');
    const observerOptions = {
      rootMargin: '-100px 0px -66%',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, observerOptions);

    headings.forEach(heading => observer.observe(heading));
  }

  // --------------------------------------------
  // GLightbox Initialization (replaces custom lightbox)
  // --------------------------------------------

  function initLightbox() {
    if (typeof GLightbox !== 'undefined') {
      const lightbox = GLightbox({
        selector: '.post-content img',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
      });
    }
  }

  // --------------------------------------------
  // Featured Slider (Custom Implementation)
  // --------------------------------------------

  function initFeaturedSlider() {
    const slider = document.querySelector('.featured-slider');
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slider-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval = null;
    const autoplayDelay = 7000;

    // Initialize
    function init() {
      applyTagColors();
      applyDotGradient();
      startAutoplay();

      // Event listeners
      if (prevBtn) prevBtn.addEventListener('click', prev);
      if (nextBtn) nextBtn.addEventListener('click', next);

      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const index = parseInt(dot.dataset.index, 10);
          goTo(index);
        });
      });

      // Pause autoplay on hover
      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);

      // Keyboard navigation
      slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      });
    }

    // Go to specific slide
    function goTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      // Update slides
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
      });

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
      });

      currentIndex = index;
    }

    function next() {
      goTo(currentIndex + 1);
    }

    function prev() {
      goTo(currentIndex - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayInterval = setInterval(next, autoplayDelay);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    // Apply gradient colors to pagination dots
    function applyDotGradient() {
      const totalDots = dots.length;
      if (totalDots <= 1) return;

      // Match the iridescent gradient: cyan → lavender → pearl
      const stops = [
        { pos: 0.00, r: 157, g: 216, b: 247 }, // #9DD8F7 cyan
        { pos: 0.50, r: 184, g: 165, b: 229 }, // #B8A5E5 lavender
        { pos: 1.00, r: 232, g: 245, b: 255 }, // #E8F5FF pearl
      ];

      dots.forEach((dot, index) => {
        const position = index / (totalDots - 1);

        // Find the two surrounding stops and interpolate
        let lower = stops[0], upper = stops[stops.length - 1];
        for (let i = 0; i < stops.length - 1; i++) {
          if (position >= stops[i].pos && position <= stops[i + 1].pos) {
            lower = stops[i];
            upper = stops[i + 1];
            break;
          }
        }

        const range = upper.pos - lower.pos;
        const t = range === 0 ? 0 : (position - lower.pos) / range;
        const r = Math.round(lower.r + (upper.r - lower.r) * t);
        const g = Math.round(lower.g + (upper.g - lower.g) * t);
        const b = Math.round(lower.b + (upper.b - lower.b) * t);
        dot.style.setProperty('--bullet-color', `rgb(${r}, ${g}, ${b})`);
      });
    }

    // Apply colors to tags in slider
    function applyTagColors() {
      const tags = slider.querySelectorAll('.tag');
      tags.forEach(tag => {
        const tagName = tag.textContent.trim();
        let hash = 0;
        for (let i = 0; i < tagName.length; i++) {
          hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = Math.abs(hash % 360);
        const saturation = 70 + (Math.abs(hash) % 25);
        const lightness = 60 + (Math.abs(hash >> 8) % 20);
        tag.style.setProperty('--tag-dot-color', `hsl(${hue}, ${saturation}%, ${lightness}%)`);
      });
    }

    init();
  }

  // --------------------------------------------
  // Tag Color Generator
  // --------------------------------------------

  function initTagColors() {
    // Generate a consistent color from a string
    function stringToColor(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      // Convert to HSL with good saturation and lightness for dark theme
      const hue = Math.abs(hash % 360);
      const saturation = 70 + (Math.abs(hash) % 25); // 70-95% (brighter, more saturated)
      const lightness = 60 + (Math.abs(hash >> 8) % 20); // 60-80% (brighter)

      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    // Apply colors to the ::before pseudo-element (dot) of all tags across the site
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
      const tagName = tag.textContent.trim();
      const color = stringToColor(tagName);
      tag.style.setProperty('--tag-dot-color', color);
    });
  }

  // --------------------------------------------
  // Newsletter Popup (Simplified)
  // --------------------------------------------

  function initNewsletterPopup() {
    const popup = document.getElementById('newsletterPopup');
    if (!popup) return;

    const closeBtn = popup.querySelector('.newsletter-popup-close');
    const overlay = popup.querySelector('.newsletter-popup-overlay');
    const dontShowCheckbox = document.getElementById('dontShowAgain');
    const form = popup.querySelector('.newsletter-popup-form');
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button[type="submit"]');
    const message = form.querySelector('.newsletter-popup-message');

    const COOKIE_NAME = 'newsletter_popup_dismissed';
    const COOKIE_DAYS = 30;

    // Check if popup should be shown
    if (getCookie(COOKIE_NAME)) {
      return;
    }

    let popupShown = false;
    const scrollThreshold = 0.5; // Show after 50% scroll

    function showPopup() {
      if (popupShown) return;
      popupShown = true;
      popup.classList.add('active');
      popup.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closePopup() {
      popup.classList.remove('active');
      popup.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (dontShowCheckbox && dontShowCheckbox.checked) {
        setCookie(COOKIE_NAME, 'true', COOKIE_DAYS);
      }
    }

    // Single trigger: scroll threshold only
    window.addEventListener('scroll', function() {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent >= scrollThreshold && !popupShown) {
        showPopup();
      }
    });

    // Close handlers
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
      }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = input.value.trim();
      if (!email) return;

      form.classList.add('loading');
      button.disabled = true;
      message.style.display = 'none';

      fetch('/members/api/send-magic-link/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          emailType: 'subscribe'
        })
      })
      .then(response => response.json())
      .then(() => {
        form.classList.remove('loading');
        button.disabled = false;
        message.style.display = 'block';
        message.className = 'newsletter-popup-message success';
        message.textContent = 'Success! Check your email to confirm your subscription.';
        input.value = '';

        setTimeout(() => {
          closePopup();
          setCookie(COOKIE_NAME, 'true', COOKIE_DAYS);
        }, 3000);
      })
      .catch(() => {
        form.classList.remove('loading');
        button.disabled = false;
        message.style.display = 'block';
        message.className = 'newsletter-popup-message error';
        message.textContent = 'Oops! Something went wrong. Please try again.';
      });
    });

    // Cookie helpers
    function setCookie(name, value, days) {
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
    }

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  }

  // --------------------------------------------
  // Initialize All
  // --------------------------------------------

  function init() {
    initDarkMode();
    initMobileMenu();
    initDropdowns();
    initStickyHeader();
    initShareButtons();
    initScrollProgress();
    initBackToTop();
    initTableOfContents();
    initLightbox();
    initFeaturedSlider();
    initTagColors();
    initNewsletterPopup();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
