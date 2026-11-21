(() => {
  function closeMenus() {
    document.querySelectorAll('.menu-disclosure[open]').forEach(menu => {
      menu.open = false;
    });
  }

  // Opening, closing and keyboard activation work through the native summary.
  // Dismiss an open menu when its link is followed or the visitor clicks away.
  document.addEventListener('click', event => {
    if (!event.target.closest('.menu-disclosure')) closeMenus();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const menu = document.querySelector('.menu-disclosure[open]');
    if (menu) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  window.matchMedia('(max-width: 850px)').addEventListener('change', closeMenus);
  window.addEventListener('hashchange', closeMenus);
  window.addEventListener('pageshow', closeMenus);
})();
