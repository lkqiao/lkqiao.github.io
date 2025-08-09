// ==== DARK MODE TOGGLE ====
const toggle = document.getElementById('darkModeToggle');
const icon = document.getElementById('darkModeIcon');

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  icon.src = 'assets/icons/sun.svg';
  icon.alt = 'Switch to Light Mode';
}

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  icon.src = isDark ? 'assets/icons/sun.svg' : 'assets/icons/moon.svg';
  icon.alt = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  localStorage.setItem('darkMode', isDark);
});

// ==== RIGHT SIDEBAR TOGGLE ====
const toggleBtn = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('rightSidebar');
const backdrop = document.querySelector('.sidebar-backdrop');
const body = document.body;

body.classList.add('has-right-sidebar'); // layout flag

// Initialize collapsed state
if (sidebar.classList.contains('collapsed')) {
  body.classList.add('collapsed');
} else {
  body.classList.add('sidebar-open'); // show backdrop if not collapsed
}

window.addEventListener('DOMContentLoaded', () => {
  const isCollapsed = sidebar.classList.contains('collapsed');
  const icon = toggleBtn.querySelector('img');
  icon.src = isCollapsed ? 'assets/icons/plus-menu.svg' : 'assets/icons/minus-menu.svg';
  icon.alt = isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar';
});

function updateSidebarState() {
  const isCollapsed = sidebar.classList.contains('collapsed');
  const icon = toggleBtn.querySelector('img');
  icon.src = isCollapsed ? 'assets/icons/plus-menu.svg' : 'assets/icons/minus-menu.svg';
  icon.alt = isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar';

  if (isCollapsed) {
    body.classList.add('collapsed');
    body.classList.remove('sidebar-open');
  } else {
    body.classList.remove('collapsed');
    body.classList.add('sidebar-open');
  }
}

// Toggle sidebar on button click
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  updateSidebarState();
});

// Close sidebar on backdrop click
if (backdrop) {
  backdrop.addEventListener('click', () => {
    sidebar.classList.add('collapsed');
    updateSidebarState();
  });
}

// ==== SPOTIFY-STYLE CAROUSEL ====
const carousel = document.getElementById("carousel");
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");

scrollLeftBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: -240, behavior: "smooth" });
});

scrollRightBtn.addEventListener("click", () => {
  carousel.scrollBy({ left: 240, behavior: "smooth" });
});

// ==== PHOTO GALLERY ====
const photoGallery = document.getElementById("photoGallery");
const galleryScrollLeft = document.getElementById("galleryScrollLeft");
const galleryScrollRight = document.getElementById("galleryScrollRight");

galleryScrollLeft.addEventListener("click", () => {
  photoGallery.scrollBy({ left: -240, behavior: "smooth" });
});

galleryScrollRight.addEventListener("click", () => {
  photoGallery.scrollBy({ left: 240, behavior: "smooth" });
});

// ==== EXPERIENCE SECTION TOGGLE ====
function toggleExperience(header) {
  const item = header.closest('.experience-item');
  const details = item.querySelector('.experience-details');
  const bullets = details.querySelectorAll('li');
  const isExpanding = !item.classList.contains('active');

  if (isExpanding) {
    item.classList.add('active');

    // Reset li styles
    bullets.forEach((li) => {
      li.style.animation = 'none';
      li.offsetHeight;
    });

    // Fade in bullets with stagger
    bullets.forEach((li, i) => {
      li.style.animation = 'bulletFadeIn 0.4s ease-out forwards';
      li.style.animationDelay = `${0.2 + i * 0.05}s`;
    });

  } else {
    // Fade out the container as a whole
    details.style.opacity = '0';
    details.style.maxHeight = '0px';
    details.style.paddingBottom = '0px';

    // Remove .active after transition completes
    setTimeout(() => {
      item.classList.remove('active');

      // Reset everything
      details.style.opacity = '';
      details.style.maxHeight = '';
      details.style.paddingBottom = '';
      bullets.forEach((li) => {
        li.style.opacity = 0;
        li.style.animation = '';
        li.style.animationDelay = '';
      });
    }, 150); // match transition timing
  }
}

// ==== VIDEO GALLERY ====
const videoGallery = document.getElementById("videoGallery");
const videoTrack = document.querySelector(".video-track");
const videoCards = document.querySelectorAll(".video-track .video-card");
const videoScrollLeft = document.getElementById("videoScrollLeft");
const videoScrollRight = document.getElementById("videoScrollRight");

// Ensure all YouTube iframes can receive postMessage API commands
(function ensureEnableJsApi() {
  document.querySelectorAll('#music iframe.video-frame').forEach((iframe) => {
    try {
      const url = new URL(iframe.src);
      if (!url.searchParams.has('enablejsapi')) {
        url.searchParams.set('enablejsapi', '1');
        iframe.src = url.toString();
      }
    } catch {
      // If URL() fails (rare), fallback: append param manually
      if (iframe.src && !/enablejsapi=1/.test(iframe.src)) {
        iframe.src += (iframe.src.includes('?') ? '&' : '?') + 'enablejsapi=1';
      }
    }
  });
})();

// Pause all YT iframes in the music section
function pauseAllVideos() {
  document.querySelectorAll('#music iframe').forEach((iframe) => {
    // PostMessage to YouTube player
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
      '*'
    );
  });
}

function getMetrics() {
  if (!videoCards.length) return null;
  const first = videoCards[0];
  const styles = getComputedStyle(videoTrack);
  const gap = parseFloat(styles.gap) || 0;
  const padLeft = parseFloat(styles.paddingLeft) || 0;
  const padRight = parseFloat(styles.paddingRight) || 0;
  const cardWidth = first.offsetWidth;
  return { cardWidth, gap, padLeft, padRight };
}

function getCurrentIndex() {
  const m = getMetrics();
  if (!m) return 0;
  const { cardWidth, gap, padLeft } = m;
  const slide = cardWidth + gap;
  const approx = (videoGallery.scrollLeft - padLeft + cardWidth / 2) / slide;
  return Math.max(0, Math.min(videoCards.length - 1, Math.round(approx)));
}

function scrollToIndex(idx) {
  const m = getMetrics();
  if (!m) return;
  const { cardWidth, gap, padLeft } = m;
  const slide = cardWidth + gap;
  const targetLeft = padLeft + idx * slide - (videoGallery.clientWidth - cardWidth) / 2;
  videoGallery.scrollTo({ left: targetLeft, behavior: "smooth" });
}

function step(delta) {
  const current = getCurrentIndex();
  const next = Math.max(0, Math.min(videoCards.length - 1, current + delta));
  scrollToIndex(next);
}

if (videoGallery && videoScrollLeft && videoScrollRight) {
  videoScrollLeft.addEventListener("click", () => {
    pauseAllVideos();
    step(-1);
  });

  videoScrollRight.addEventListener("click", () => {
    pauseAllVideos();
    step(1);
  });

  window.addEventListener("resize", () => {
    scrollToIndex(getCurrentIndex());
  });

  requestAnimationFrame(() => scrollToIndex(0));
}

// ==== COLORED SHADOWS FROM YT THUMBNAILS ====
(function addColoredVideoShadows() {
  const cards = document.querySelectorAll(".video-track .video-card");
  if (!cards.length) return;

  const getVideoId = (src) => {
    const m = src.match(/\/embed\/([^?]+)/);
    return m ? m[1] : null;
  };

  const averageColorFromURL = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => {
        const w = 30, h = 30;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, w, h);
        const { data } = ctx.getImageData(0, 0, w, h);

        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] === 0) continue;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        if (!count) return resolve([0, 0, 0]);
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        resolve([r, g, b]);
      };
      img.onerror = reject;
    });

  function saturateColor([r, g, b], amount = 1.8) {
    const avg = (r + g + b) / 3;
    return [
      Math.min(255, avg + (r - avg) * amount),
      Math.min(255, avg + (g - avg) * amount),
      Math.min(255, avg + (b - avg) * amount)
    ].map(Math.round);
  }

  cards.forEach(async (card) => {
    const iframe = card.querySelector(".video-frame");
    if (!iframe) return;

    const id = getVideoId(iframe.src);
    if (!id) return;

    const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

    try {
      let [r, g, b] = await averageColorFromURL(thumb);
      [r, g, b] = saturateColor([r, g, b], 2.8);
      card.style.boxShadow = `0 4px 16.5px rgba(${r}, ${g}, ${b}, 0.5)`;
    } catch {
      card.style.boxShadow = `0 4px 16.5px rgba(0,0,0,0.5)`;
    }
  });
})();

// Initialize state on page load
updateCarousel();
