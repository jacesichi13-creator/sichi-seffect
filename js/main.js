// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Simple audio player for tracklist
const player = document.getElementById('player');
let currentBtn = null;

document.querySelectorAll('.track').forEach(track => {
  const btn = track.querySelector('.play-btn');
  const src = track.getAttribute('data-src');

  btn.addEventListener('click', () => {
    // If clicking the same track, toggle play/pause
    if (player.src.includes(src)) {
      if (player.paused) {
        player.play();
        btn.textContent = '⏸';
      } else {
        player.pause();
        btn.textContent = '▶';
      }
    } else {
      // Reset previous button
      if (currentBtn) currentBtn.textContent = '▶';
      // Load and play new track
      player.src = src;
      player.play().catch(() => {
        // Autoplay might be blocked; show paused state
        btn.textContent = '▶';
      });
      btn.textContent = '⏸';
      currentBtn = btn;
    }
  });
});

// Marquee pause on hover
const marquee = document.querySelector('.marquee-track');
if (marquee) {
  marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
  marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
}

// Optional: dampen parallax on mobile (performance)
const isMobile = matchMedia('(max-width: 560px)').matches;
if (isMobile) {
  document.querySelectorAll('.parallax').forEach(el => {
    el.style.backgroundAttachment = 'scroll';
  });
}
