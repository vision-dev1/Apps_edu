// Codes By Visionnn
document.addEventListener('DOMContentLoaded', () => {

  /* ─── Tag Elements for Reveal ─── */
  const revealSelectors = [
    '#about .max-w-3xl',
    '#services .text-center',
    '#services .grid > div',
    '#destinations .space-y-4',
    '#destinations .grid > div',
    'section:has(.lg\\:grid-cols-5) .text-center:not(.group)',
    'section:has(.lg\\:grid-cols-5) .group',
    'section:has(.md\\:grid-cols-3):nth-of-type(5) .grid > div',
    'section .bg-primary.rounded-\\[2rem\\]',
    'form',
  ];

  revealSelectors.forEach(sel => {
    try {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
      });
    } catch (_) { /* selector not supported / not found */ }
  });

  /* ─── IntersectionObserver ─── */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el =>
    observer.observe(el)
  );

  /* ─── Stagger Delays on Grid Children ─── */
  document.querySelectorAll('#services .grid > div, #destinations .grid > div').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });
});
