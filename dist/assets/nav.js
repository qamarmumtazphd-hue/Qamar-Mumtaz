(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  if (!button || !nav) return;
  const small = window.matchMedia('(max-width: 850px)');
  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    nav.hidden = small.matches && !open;
  }
  function adapt() { button.hidden = !small.matches; setOpen(false); }
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && small.matches && !nav.hidden) { setOpen(false); button.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (small.matches && !nav.hidden && !nav.contains(e.target) && !button.contains(e.target)) setOpen(false);
  });
  small.addEventListener('change', adapt);
  adapt();
})();
