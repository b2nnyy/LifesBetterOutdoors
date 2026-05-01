/* ==========================================================================
   LifesBetterOutdoors — main.js
   Handles: header scroll state, mobile menu, scroll-fade reveal,
            gallery filters + lightbox, form validation
   ========================================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------
     Header scroll state
  ------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -------------------------------------------------
     Mobile menu toggle
  ------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (navToggle && mobileMenu) {
    const closeMenu = () => {
      navToggle.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    navToggle.addEventListener('click', () => {
      const open = !navToggle.classList.contains('is-open');
      navToggle.classList.toggle('is-open', open);
      mobileMenu.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 880) closeMenu();
    });
  }

  /* -------------------------------------------------
     Scroll fade-in (subtle reveal)
  ------------------------------------------------- */
  const reveal = () => {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  };
  reveal();

  /* -------------------------------------------------
     Gallery: filters + lightbox
  ------------------------------------------------- */
  const galleryGrid = document.querySelector('[data-gallery]');
  if (galleryGrid) {
    const filters = document.querySelectorAll('.gallery-filter');
    const items = galleryGrid.querySelectorAll('.gallery-item');

    // Filtering
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter;
        filters.forEach(f => f.classList.remove('is-active'));
        btn.classList.add('is-active');
        items.forEach(it => {
          const match = cat === 'all' || it.dataset.category === cat;
          it.classList.toggle('is-hidden', !match);
        });
      });
    });

    // Lightbox
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
      const figure = lightbox.querySelector('.lightbox-figure');
      const captionTitle = lightbox.querySelector('.lightbox-caption .title');
      const captionMeta = lightbox.querySelector('.lightbox-caption .meta');
      const btnPrev = lightbox.querySelector('.lightbox-prev');
      const btnNext = lightbox.querySelector('.lightbox-next');
      const btnClose = lightbox.querySelector('.lightbox-close');
      let currentIndex = 0;

      const visibleItems = () => Array.from(items).filter(it => !it.classList.contains('is-hidden'));

      const renderItem = (i) => {
        const list = visibleItems();
        if (!list.length) return;
        currentIndex = (i + list.length) % list.length;
        const it = list[currentIndex];
        const tag = it.dataset.tag || '';
        const title = it.dataset.title || 'Project';
        const cat = it.dataset.category || '';

        // Replace photo placeholder inside lightbox
        const photoHtml = it.querySelector('.photo')?.outerHTML || '';
        // Keep figure intact, replace its photo content
        const existing = figure.querySelector('.photo');
        if (existing) existing.outerHTML = photoHtml;
        else figure.insertAdjacentHTML('afterbegin', photoHtml);

        if (captionTitle) captionTitle.textContent = title;
        if (captionMeta) captionMeta.textContent = cat ? cat.replace(/-/g, ' ') : tag;
      };

      const open = (i) => {
        renderItem(i);
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };
      const close = () => {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      };

      items.forEach((it, idx) => {
        it.addEventListener('click', () => {
          // Use the index of the visible list, not the master index
          const list = visibleItems();
          const visIndex = list.indexOf(it);
          open(visIndex >= 0 ? visIndex : 0);
        });
      });

      btnPrev?.addEventListener('click', () => renderItem(currentIndex - 1));
      btnNext?.addEventListener('click', () => renderItem(currentIndex + 1));
      btnClose?.addEventListener('click', close);
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) close();
      });
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') renderItem(currentIndex - 1);
        if (e.key === 'ArrowRight') renderItem(currentIndex + 1);
      });
    }
  }

  /* -------------------------------------------------
     Quote form: client-side validation + UX
     (Form action wired to FORMSPREE / Netlify Forms placeholder)
  ------------------------------------------------- */
  const form = document.querySelector('[data-quote-form]');
  if (form) {
    const success = form.querySelector('.form-success');
    const setError = (field, msg) => {
      const wrapper = field.closest('.field');
      if (!wrapper) return;
      wrapper.classList.add('field-error');
      let err = wrapper.querySelector('.err');
      if (!err) {
        err = document.createElement('span');
        err.className = 'err';
        wrapper.appendChild(err);
      }
      err.textContent = msg;
    };
    const clearError = (field) => {
      const wrapper = field.closest('.field');
      if (!wrapper) return;
      wrapper.classList.remove('field-error');
      const err = wrapper.querySelector('.err');
      if (err) err.textContent = '';
    };

    form.querySelectorAll('input, select, textarea').forEach(f => {
      f.addEventListener('input', () => clearError(f));
      f.addEventListener('change', () => clearError(f));
    });

    form.addEventListener('submit', (e) => {
      let valid = true;

      const name = form.querySelector('[name="name"]');
      if (name && !name.value.trim()) { setError(name, 'Please enter your name.'); valid = false; }

      const email = form.querySelector('[name="email"]');
      if (email) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        if (!ok) { setError(email, 'Please enter a valid email.'); valid = false; }
      }

      const phone = form.querySelector('[name="phone"]');
      if (phone && phone.value.trim()) {
        const digits = phone.value.replace(/\D/g, '');
        if (digits.length < 7) { setError(phone, 'Please enter a valid phone number.'); valid = false; }
      }

      const message = form.querySelector('[name="message"]');
      if (message && message.value.trim().length < 10) {
        setError(message, 'Tell us a bit more about your project (10+ characters).');
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
        const firstError = form.querySelector('.field-error input, .field-error select, .field-error textarea');
        firstError?.focus();
        return;
      }

      // If the form is configured with a real action (Formspree / Netlify),
      // it will submit normally. If it's still on the placeholder action,
      // intercept and show the success message in-page so it can be tested.
      const action = (form.getAttribute('action') || '').trim();
      const isPlaceholder = action === '' || action === '#' || action.includes('YOUR_FORMSPREE_ID');
      if (isPlaceholder) {
        e.preventDefault();
        if (success) {
          success.classList.add('is-visible');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          form.reset();
        }
      }
    });
  }

  /* -------------------------------------------------
     Set active nav link by current path
  ------------------------------------------------- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a => {
    const target = a.getAttribute('data-nav');
    if (
      target === path ||
      (target === 'index.html' && (path === '' || path === '/' || path === 'index.html'))
    ) {
      a.classList.add('is-active');
    }
  });

  /* -------------------------------------------------
     Update footer year
  ------------------------------------------------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------------------------
     Sign out (client session only)
  ------------------------------------------------- */
  document.querySelectorAll('[data-sign-out]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      try {
        sessionStorage.removeItem('lbo_auth_v1');
      } catch (err) {}
      location.href = 'login.html';
    });
  });
})();
