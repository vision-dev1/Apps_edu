/**
 * APPS Educational Network — Navigation Module
 * Mobile menu, smooth scrolling, active-nav highlighting, link wiring
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Smooth Scrolling (CSS-level) ─── */
  document.documentElement.style.scrollBehavior = 'smooth';

  /* ─── Mobile Menu Toggle ─── */
  const menuBtn = document.querySelector('header button.lg\\:hidden');
  const nav     = document.querySelector('header nav');
  let mobileNav = null;

  if (menuBtn && nav) {
    mobileNav = document.createElement('div');
    mobileNav.id        = 'mobile-nav';
    mobileNav.className = 'fixed inset-0 z-[100] bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 transition-all duration-300';
    mobileNav.style.opacity       = '0';
    mobileNav.style.pointerEvents = 'none';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'absolute top-6 right-6 p-2';
    closeBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">close</span>';
    closeBtn.addEventListener('click', closeMobileNav);
    mobileNav.appendChild(closeBtn);

    // Clone desktop nav links
    nav.querySelectorAll('a').forEach(link => {
      const a = link.cloneNode(true);
      a.className = 'text-2xl font-bold hover:text-primary transition-colors';
      a.addEventListener('click', closeMobileNav);
      mobileNav.appendChild(a);
    });

    // CTA inside mobile nav
    const mobileCTA       = document.createElement('a');
    mobileCTA.href        = '#contact';
    mobileCTA.className   = 'bg-primary text-white px-8 py-3 rounded-xl font-bold text-lg mt-4';
    mobileCTA.textContent = 'Book Free Consultation';
    mobileCTA.addEventListener('click', closeMobileNav);
    mobileNav.appendChild(mobileCTA);

    document.body.appendChild(mobileNav);

    menuBtn.addEventListener('click', () => {
      mobileNav.style.opacity       = '1';
      mobileNav.style.pointerEvents = 'auto';
      document.body.style.overflow  = 'hidden';
    });
  }

  function closeMobileNav() {
    if (mobileNav) {
      mobileNav.style.opacity       = '0';
      mobileNav.style.pointerEvents = 'none';
      document.body.style.overflow  = '';
    }
  }

  /* ─── Hero CTA Buttons ─── */
  const heroBtns = document.querySelectorAll('section:first-of-type .flex.flex-wrap button');
  if (heroBtns.length >= 2) {
    // "Get Free Counseling" → contact form
    heroBtns[0].addEventListener('click', () => {
      const contact = document.querySelector('form');
      if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    // "Explore Destinations" → #destinations
    heroBtns[1].addEventListener('click', () => {
      const dest = document.getElementById('destinations');
      if (dest) dest.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ─── "Book Free Consultation" header button ─── */
  const headerCTA = document.querySelector('header .hidden.sm\\:flex');
  if (headerCTA) {
    headerCTA.addEventListener('click', () => {
      const contact = document.querySelector('form');
      if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ─── "Book My Free Consultation" large CTA ─── */
  const bigCTA = document.querySelector('section .bg-primary button');
  if (bigCTA) {
    bigCTA.addEventListener('click', () => {
      const contact = document.querySelector('form');
      if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ─── Destination "Learn More" Links ─── */
  const countryMap = {
    'Australia':      'australia.html',
    'USA':            'usa.html',
    'United Kingdom': 'uk.html',
    'Canada':         'canada.html',
    'Europe':         'europe.html',
    'South Korea':    'south-korea.html',
  };

  document.querySelectorAll('#destinations .grid a').forEach(link => {
    const card  = link.closest('.bg-white, .dark\\:bg-slate-800');
    if (!card) return;
    const title = card.querySelector('h4');
    if (!title) return;
    const country = title.textContent.trim();
    const page    = countryMap[country];
    if (page) {
      link.href = page;
    }
  });

  // Make entire destination cards clickable
  document.querySelectorAll('#destinations .grid > div').forEach(card => {
    const title = card.querySelector('h4');
    if (!title) return;
    const country = title.textContent.trim();
    const page    = countryMap[country];
    if (page) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        // Don't double-navigate if they clicked the link itself
        if (e.target.closest('a')) return;
        window.location.href = page;
      });
    }
  });

  /* ─── "View All Countries" button ─── */
  const viewAllBtn = document.querySelector('#destinations button');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      const dest = document.getElementById('destinations');
      if (dest) dest.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ─── Footer "Study Abroad" Links ─── */
  const footerStudyLinks = document.querySelectorAll('footer ul');
  if (footerStudyLinks.length >= 2) {
    const studyList = footerStudyLinks[1]; // second ul
    const footerMap = {
      'Study in Australia':    'australia.html',
      'Study in USA':          'usa.html',
      'Study in UK':           'uk.html',
      'Study in Canada':       'canada.html',
      'Study in South Korea':  'south-korea.html',
    };
    studyList.querySelectorAll('a').forEach(a => {
      const text = a.textContent.trim();
      if (footerMap[text]) {
        a.href = footerMap[text];
      }
    });
  }

  /* ─── Footer Quick Links ─── */
  const quickLinks = document.querySelectorAll('footer ul:first-of-type a');
  const qlMap = {
    'About Our Agency':   '#about',
    'Our Success Stories': '#success-stories',
    'Contact Support':    '#contact',
  };
  quickLinks.forEach(a => {
    const t = a.textContent.trim();
    if (qlMap[t]) a.href = qlMap[t];
  });

  /* ─── Active Nav Highlighting ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('text-primary');
      if (link.getAttribute('href') === '#' + current) link.classList.add('text-primary');
    });
  });
});
