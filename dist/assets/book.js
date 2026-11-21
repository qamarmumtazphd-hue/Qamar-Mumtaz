/* Start the hero book's decorative animation only once it is visible. */
(() => {
  const book = document.querySelector('[data-book]');
  if (!book) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) {
    book.classList.add('book-open');
    return;
  }
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      book.classList.add('book-open');
      observer.disconnect();
    }
  }, { threshold: 0.22 });
  observer.observe(book);
})();
