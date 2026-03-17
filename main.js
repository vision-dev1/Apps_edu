// Codes By Visionnn
document.addEventListener('DOMContentLoaded', () => {

  /* ─── Contact Form Handling ─── */
  const form = document.querySelector('form');
  if (form) {
    // Ensure the contact section has an anchor id
    form.closest('section')?.setAttribute('id', 'contact');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll('input, textarea');
      let valid = true;

      inputs.forEach(inp => {
        if (!inp.value.trim()) {
          valid = false;
          inp.classList.add('border-red-400');
          inp.addEventListener('input', () => inp.classList.remove('border-red-400'), { once: true });
        }
      });

      if (!valid) return;

      // Success feedback
      const btn  = form.querySelector('button');
      const orig = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.classList.add('bg-green-600');
      form.reset();
      setTimeout(() => {
        btn.textContent = orig;
        btn.classList.remove('bg-green-600');
      }, 3000);
    });
  }

  /* ─── Newsletter ─── */
  const nlBtn   = document.querySelector('footer .flex.gap-2 button');
  const nlInput = document.querySelector('footer .flex.gap-2 input');
  if (nlBtn && nlInput) {
    nlBtn.addEventListener('click', () => {
      if (!nlInput.value.trim() || !nlInput.value.includes('@')) {
        nlInput.classList.add('ring-2', 'ring-red-400');
        nlInput.addEventListener('input', () => nlInput.classList.remove('ring-2', 'ring-red-400'), { once: true });
        return;
      }
      const orig = nlBtn.textContent;
      nlBtn.textContent = '✓';
      nlBtn.classList.add('bg-green-600');
      nlInput.value = '';
      setTimeout(() => {
        nlBtn.textContent = orig;
        nlBtn.classList.remove('bg-green-600');
      }, 2500);
    });
  }

  /* ─── FAQ Accordion (Country Pages) ─── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    const icon     = item.querySelector('.faq-icon');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

      // Close all others
      document.querySelectorAll('.faq-item').forEach(other => {
        const otherA = other.querySelector('.faq-answer');
        const otherI = other.querySelector('.faq-icon');
        if (otherA) { otherA.style.maxHeight = '0px'; otherA.style.opacity = '0'; }
        if (otherI) otherI.style.transform = 'rotate(0deg)';
        other.classList.remove('faq-open');
      });

      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity   = '1';
        if (icon) icon.style.transform = 'rotate(180deg)';
        item.classList.add('faq-open');
      }
    });
  });

  /* ─── Back-to-Top Button ─── */
  const btt       = document.createElement('button');
  btt.id          = 'back-to-top';
  btt.innerHTML   = '<span class="material-symbols-outlined">arrow_upward</span>';
  btt.className   = 'fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all';
  btt.style.opacity       = '0';
  btt.style.pointerEvents = 'none';
  btt.style.transition    = 'opacity 0.3s';
  document.body.appendChild(btt);

  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btt.style.opacity       = '1';
      btt.style.pointerEvents = 'auto';
    } else {
      btt.style.opacity       = '0';
      btt.style.pointerEvents = 'none';
    }
  });
});
