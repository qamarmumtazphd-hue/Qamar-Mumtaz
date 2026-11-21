(() => {
  const art = document.querySelector('.book-art');
  if (!art) return;

  const video = art.querySelector('video');
  const source = art.querySelector('picture source');
  const still = art.querySelector('img');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  let finished = false;

  function showOpenBook() {
    if (finished) return;
    finished = true;
    observer?.disconnect();
    motion.removeEventListener('change', onMotionChange);
    source.remove();
    video.pause();
    // Leave the last video frame up until the original photograph is ready.
    still.decode().catch(() => {}).then(() => {
      art.classList.remove('is-opening');
      video.removeAttribute('src');
      video.load();
    });
  }

  function onMotionChange(event) {
    if (event.matches) showOpenBook();
  }

  function openBook() {
    observer.disconnect();
    if (motion.matches || finished) {
      showOpenBook();
      return;
    }
    const finalFrame = new Image();
    finalFrame.src = still.src;
    video.addEventListener('playing', () => {
      if (!finished) art.classList.add('is-opening');
    }, { once: true });
    video.addEventListener('ended', showOpenBook, { once: true });
    video.addEventListener('error', showOpenBook, { once: true });
    video.src = video.dataset.src;
    video.muted = true;
    video.play().catch(showOpenBook);
  }

  if (motion.matches || !window.IntersectionObserver ||
      !video.canPlayType('video/mp4') || navigator.connection?.saveData) {
    showOpenBook();
    return;
  }

  motion.addEventListener('change', onMotionChange);
  observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .3)) {
      openBook();
    }
  }, { threshold: .3 });
  observer.observe(art);
})();
