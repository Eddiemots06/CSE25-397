/* ============================================================
   ACE GEAR TENNIS — main.js
   ============================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. Navbar scroll effect ── */
  const navbar = document.querySelector('.ace-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ── 2. Mobile nav toggle ── */
  const toggler  = document.querySelector('.nav-toggler');
  const mobileNav = document.querySelector('.nav-mobile');
  if (toggler && mobileNav) {
    toggler.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggler.setAttribute('aria-expanded', isOpen);
      toggler.textContent = isOpen ? '✕' : '☰';
    });
    document.addEventListener('click', (e) => {
      if (navbar && !navbar.contains(e.target)) {
        mobileNav.classList.remove('open');
        toggler.textContent = '☰';
      }
    });
  }

  /* ── 3. Active nav link (based on filename) ── */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 4. Scroll fade-up animations ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 90);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });
    fadeEls.forEach(el => io.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 5. Cart counter (mock) ── */
  let cartCount = 2;
  const cartDot = document.querySelector('.cart-dot');
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      cartCount++;
      if (cartDot) cartDot.textContent = cartCount;
      const orig = this.textContent;
      this.textContent = '✓ Added';
      this.classList.replace('btn-primary-ace', 'btn-dark-ace');
      setTimeout(() => {
        this.textContent = orig;
        this.classList.replace('btn-dark-ace', 'btn-primary-ace');
      }, 1800);
    });
  });

  /* ── 6. Price range slider (Rackets page) ── */
  const priceSlider = document.getElementById('priceRange');
  const priceLabel  = document.getElementById('priceLabel');
  if (priceSlider && priceLabel) {
    priceSlider.addEventListener('input', () => {
      priceLabel.textContent = '$' + priceSlider.value;
    });
  }

  /* ── 7. Filter & Sort (Rackets page) ── */
  const applyBtn = document.getElementById('applyFilters');
  if (applyBtn) {
    applyBtn.addEventListener('click', applyFilters);
  }

  function applyFilters() {
    const checkedLevels = Array.from(
      document.querySelectorAll('.level-filter:checked')
    ).map(c => c.value);

    const maxPrice = priceSlider ? parseInt(priceSlider.value) : 9999;

    document.querySelectorAll('.product-col').forEach(col => {
      const level = col.dataset.level || '';
      const price = parseFloat(col.dataset.price) || 0;
      const levelOk = checkedLevels.length === 0 || checkedLevels.includes(level);
      const priceOk = price <= maxPrice;
      col.style.display = (levelOk && priceOk) ? '' : 'none';
    });

    // Update count
    const visible = document.querySelectorAll('.product-col:not([style*="none"])').length;
    const countEl = document.getElementById('productCount');
    if (countEl) countEl.textContent = visible;
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const grid = document.getElementById('productGrid');
      if (!grid) return;
      const cols = Array.from(grid.querySelectorAll('.product-col'));
      cols.sort((a, b) => {
        const pa = parseFloat(a.dataset.price) || 0;
        const pb = parseFloat(b.dataset.price) || 0;
        if (sortSelect.value === 'price-asc')  return pa - pb;
        if (sortSelect.value === 'price-desc') return pb - pa;
        if (sortSelect.value === 'rating')     return parseFloat(b.dataset.rating||0) - parseFloat(a.dataset.rating||0);
        return parseFloat(a.dataset.order||0) - parseFloat(b.dataset.order||0);
      });
      cols.forEach(c => grid.appendChild(c));
    });
  }

  /* ── 8. Compare page ── */
  const compareSlots   = document.querySelectorAll('.compare-slot');
  const modalOverlay   = document.getElementById('compareModal');
  const modalClose     = document.getElementById('cmodalClose');
  const modalSearch    = document.getElementById('cmodalSearch');
  const modalList      = document.getElementById('cmodalList');
  const compareBody    = document.getElementById('compareBody');
  const recommendCard  = document.getElementById('recommendCard');

  const RACKETS = [
    { id:1, name:'Elite 500 Series',  price:'P2290.99', level:'Professional', emoji:'🎾',
      specs:{ Weight:'285g', Pattern:'18×20', Head:'98 sq in', Material:'HM Graphite', Balance:'Head light', Power:'7/10', Control:'9/10' },
      rating:5 },
    { id:2, name:'Pro X Blade',        price:'P1490.99', level:'Professional', emoji:'🎾',
      specs:{ Weight:'300g', Pattern:'16×19', Head:'100 sq in', Material:'Graphite',    Balance:'Even',       Power:'8.5/10', Control:'7.5/10' },
      rating:5 },
    { id:3, name:'Speed Blade Pro',    price:'P1890.00', level:'Intermediate', emoji:'🎾',
      specs:{ Weight:'295g', Pattern:'16×19', Head:'102 sq in', Material:'HM Graphite', Balance:'Even',       Power:'8/10',   Control:'8/10'   },
      rating:4 },
    { id:4, name:'Ace Club Junior',    price:'P890.99',  level:'Beginner',     emoji:'🎾',
      specs:{ Weight:'255g', Pattern:'16×18', Head:'105 sq in', Material:'Graphite',    Balance:'Head heavy', Power:'7.5/10', Control:'6/10'   },
      rating:4 },
    { id:5, name:'Control Master',     price:'P1750.00', level:'Intermediate', emoji:'🎾',
      specs:{ Weight:'290g', Pattern:'18×19', Head:'100 sq in', Material:'Graphite',    Balance:'Head light', Power:'7/10',   Control:'8.5/10' },
      rating:4 },
    { id:6, name:'Ace Starter',        price:'P690.99',  level:'Beginner',     emoji:'🎾',
      specs:{ Weight:'260g', Pattern:'16×18', Head:'107 sq in', Material:'Aluminium',   Balance:'Head heavy', Power:'6/10',   Control:'5/10'   },
      rating:3 },
  ];

  let selected = [RACKETS[0], RACKETS[1], null];
  let activeSlot = null;

  function buildModalList(q) {
    if (!modalList) return;
    modalList.innerHTML = '';
    RACKETS.filter(r => r.name.toLowerCase().includes((q||'').toLowerCase()))
      .forEach(r => {
        const item = document.createElement('div');
        item.className = 'cmodal-item';
        item.innerHTML = `<span style="font-size:22px;">${r.emoji}</span>
          <span class="cmodal-item-name">${r.name}</span>
          <span class="cmodal-item-price">${r.price}</span>`;
        item.addEventListener('click', () => {
          selected[activeSlot] = r;
          renderCompare();
          if (modalOverlay) modalOverlay.classList.remove('open');
        });
        modalList.appendChild(item);
      });
  }

  function renderCompare() {
    if (!compareSlots.length) return;
    const ATTRS = ['Weight','Pattern','Head','Material','Balance','Power','Control'];

    compareSlots.forEach((slot, i) => {
      const r = selected[i];
      if (r) {
        slot.classList.add('filled');
        slot.innerHTML = `
          <div class="d-flex align-items-start gap-3">
            <div style="width:44px;height:44px;border-radius:10px;background:var(--teal);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;">${r.emoji}</div>
            <div style="flex:1;">
              <div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--charcoal);margin-bottom:2px;">${r.name}</div>
              <div style="font-size:16px;color:var(--teal);font-weight:500;margin-bottom:6px;">${r.price}</div>
              <span class="badge-ace badge-teal" style="font-size:9px;">${r.level}</span>
            </div>
            <button class="btn-ace btn-red-ace btn-sm-ace" onclick="clearCompareSlot(${i})">Remove</button>
          </div>`;
        slot.onclick = null;
      } else {
        slot.classList.remove('filled');
        slot.innerHTML = `
          <div class="compare-slot-plus">+</div>
          <div class="compare-slot-label">Add a racket</div>
          <div class="compare-slot-hint">Select from catalogue</div>`;
        slot.onclick = () => {
          activeSlot = i;
          if (modalOverlay) { modalOverlay.classList.add('open'); buildModalList(''); }
        };
      }
    });

    if (compareBody) {
      compareBody.innerHTML = '';
      ATTRS.forEach(attr => {
        const vals = selected.map(r => r ? (r.specs[attr] || '—') : '—');
        // determine winner (basic: highest numeric value wins; for strings just highlight unique)
        const tr = document.createElement('tr');
        let cells = `<td>${attr}</td>`;
        vals.forEach(v => {
          cells += `<td>${v}</td>`;
        });
        tr.innerHTML = cells;
        compareBody.appendChild(tr);
      });
    }

    if (recommendCard) {
      const filled = selected.filter(Boolean);
      recommendCard.style.display = filled.length >= 2 ? '' : 'none';
      if (filled.length >= 2) {
        // pick the one with highest price as "premium pick"
        const pick = filled.reduce((a, b) => parseFloat(a.price.replace('$','')) >= parseFloat(b.price.replace('$','')) ? a : b);
        const nameEl = document.getElementById('recName');
        const priceEl = document.getElementById('recPrice');
        if (nameEl)  nameEl.textContent  = pick.name;
        if (priceEl) priceEl.textContent = pick.price;
      }
    }
  }

  window.clearCompareSlot = function(i) {
    selected[i] = null;
    renderCompare();
  };

  if (compareSlots.length) {
    compareSlots.forEach((slot, i) => {
      if (!selected[i]) {
        slot.onclick = () => {
          activeSlot = i;
          if (modalOverlay) { modalOverlay.classList.add('open'); buildModalList(''); }
        };
      }
    });
    renderCompare();
  }

  if (modalClose)  modalClose.addEventListener('click',  () => modalOverlay.classList.remove('open'));
  if (modalSearch) modalSearch.addEventListener('input',  e => buildModalList(e.target.value));
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });
  }

  /* ── 9. Guide — TOC active on scroll ── */
  const tocLinks   = document.querySelectorAll('.toc-link[data-target]');
  if (tocLinks.length) {
    const sections = Array.from(tocLinks)
      .map(l => document.getElementById(l.dataset.target))
      .filter(Boolean);

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
      });
      tocLinks.forEach(l => l.classList.toggle('active', l.dataset.target === current));
    });
  }

  /* ── 10. Contact form validation & thank-you ── */
  const contactForm   = document.getElementById('contactForm');
  const thankyouPanel = document.getElementById('thankyouPanel');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.form-err').forEach(el => el.classList.remove('show'));
      contactForm.querySelectorAll('.form-control-ace').forEach(el => el.classList.remove('is-error'));

      // Validate required fields
      const required = contactForm.querySelectorAll('[required]');
      required.forEach(field => {
        const errEl = document.getElementById(field.id + 'Err');
        if (!field.value.trim()) {
          field.classList.add('is-error');
          if (errEl) errEl.classList.add('show');
          valid = false;
        }
      });

      // Email format
      const emailField = document.getElementById('email');
      const emailErr   = document.getElementById('emailErr');
      if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
          emailField.classList.add('is-error');
          if (emailErr) { emailErr.textContent = 'Please enter a valid email address.'; emailErr.classList.add('show'); }
          valid = false;
        }
      }

      if (valid) {
        contactForm.style.display = 'none';
        if (thankyouPanel) thankyouPanel.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Live clear on input
    contactForm.querySelectorAll('.form-control-ace').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('is-error');
        const errEl = document.getElementById(field.id + 'Err');
        if (errEl) errEl.classList.remove('show');
      });
    });
  }

});
