(() => {
  const scenes = [...document.querySelectorAll('.scene')];
  const navLinks = [...document.querySelectorAll('.chapter-nav a')];
  const progress = document.querySelector('.progress > i');

  const setActive = (id) => {
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.intersectionRatio > .42) setActive(entry.target.id);
      }
    });
  }, { threshold: [0.12, 0.42, 0.7] });
  scenes.forEach(s => observer.observe(s));

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const ratio = max > 0 ? scrollY / max : 0;
    if (progress) progress.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const activeIndex = () => {
    const y = innerHeight * .43;
    let best = 0;
    scenes.forEach((s, i) => {
      if (s.getBoundingClientRect().top <= y) best = i;
    });
    return best;
  };
  const go = delta => {
    const i = Math.max(0, Math.min(scenes.length - 1, activeIndex() + delta));
    scenes[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  document.querySelector('[data-prev]')?.addEventListener('click', () => go(-1));
  document.querySelector('[data-next]')?.addEventListener('click', () => go(1));
  document.querySelector('[data-fullscreen]')?.addEventListener('click', async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  });
  document.querySelector('[data-print]')?.addEventListener('click', () => print());

  addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(1); }
    if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1); }
    if (e.key.toLowerCase() === 'f') document.querySelector('[data-fullscreen]')?.click();
    if (e.key === 'Escape') document.querySelector('.figure-zoom.open .figure-zoom-close')?.click();
  });

  const zoom = document.createElement('div');
  zoom.className = 'figure-zoom';
  zoom.setAttribute('role', 'dialog');
  zoom.setAttribute('aria-modal', 'true');
  zoom.setAttribute('aria-label', '放大的模型结构图');
  zoom.innerHTML = '<button class="figure-zoom-close" type="button" aria-label="关闭放大图">×</button><div class="figure-zoom-stage"></div>';
  document.body.appendChild(zoom);
  const stage = zoom.querySelector('.figure-zoom-stage');
  const closeZoom = () => {
    zoom.classList.remove('open');
    document.body.classList.remove('zoom-open');
    stage.replaceChildren();
  };
  zoom.querySelector('.figure-zoom-close').addEventListener('click', closeZoom);
  zoom.addEventListener('click', e => { if (e.target === zoom) closeZoom(); });
  document.querySelectorAll('.figure > svg, .wide-figure > svg').forEach(svg => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'zoom-trigger';
    button.textContent = '放大图 ↗';
    button.setAttribute('aria-label', '全屏放大当前模型图');
    button.addEventListener('click', () => {
      const clone = svg.cloneNode(true);
      clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
      stage.replaceChildren(clone);
      zoom.classList.add('open');
      document.body.classList.add('zoom-open');
      zoom.scrollTo(0, 0);
      zoom.querySelector('.figure-zoom-close').focus();
    });
    svg.parentElement.appendChild(button);
  });
})();
