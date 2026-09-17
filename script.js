/**
 * Portfólio – Rúbia Raquel Dantas Roque
 * Acessibilidade & Educação Especial
 */

(function () {
  'use strict';

  /* ---- Mobile hamburger menu ---- */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Back-to-top ---- */
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Subtle motion and scroll reveals ---- */
  const navbar = document.querySelector('.navbar');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateNavbar() {
    if (navbar) {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 24);
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');

    const revealSelector = [
      '.section__header',
      '.story-split__visual',
      '.story-split__content',
      '.stat-card',
      '.service-card',
      '.section-cta',
      '.differential-card',
      '.differentials-quote',
      '.edu-card',
      '.card',
      '.research-card',
      '.pub-item',
      '.a11y-item',
      '.contact-callout',
      '.contact-wrapper > *',
      '.link-card'
    ].join(',');

    const revealItems = document.querySelectorAll(revealSelector);
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: .12, rootMargin: '0px 0px -8% 0px' }
    );

    revealItems.forEach(function (item, index) {
      item.classList.add('motion-reveal');
      item.style.setProperty('--motion-delay', String((index % 4) * 70) + 'ms');
      revealObserver.observe(item);
    });
  }
  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar__link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.removeAttribute('aria-current');
              if (link.getAttribute('href') === '#' + id) {
                link.setAttribute('aria-current', 'page');
              }
            });
          }
        });
      },
      { rootMargin: '-50% 0px -45% 0px' }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---- Keyboard navigation: close menu on Escape ---- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });

})();
