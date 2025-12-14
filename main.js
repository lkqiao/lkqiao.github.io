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

document.querySelectorAll(".song-card").forEach((card) => {
  card.addEventListener("click", () => {
    const url = card.dataset.url;
    if (url) window.open(url, "_blank");
  });
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

(function addPhotoCaptions() {
  const cards = document.querySelectorAll(".photo-track .photo-card");
  cards.forEach((card) => {
    const img = card.querySelector("img");
    if (!img) return;

    const text = img.dataset.desc?.trim() || img.alt?.trim();
    if (!text) return;

    // Avoid duplicates if re-run
    if (card.querySelector(".photo-caption")) return;

    const bubble = document.createElement("div");
    bubble.className = "photo-caption";
    bubble.textContent = text;
    card.appendChild(bubble);

    // Mobile support
    let hideTimer;
    ["click", "touchstart"].forEach((ev) => {
      card.addEventListener(ev, () => {
        card.classList.add("show-caption");
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          card.classList.remove("show-caption");
        }, 2000); // auto-hide after 2s
      }, { passive: true });
    });
  });
})();

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
      li.style.animationDelay = `${0.2 + i * 0.03}s`;
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

// ==== EMAIL LINK ====
document.getElementById("emailLink").addEventListener("click", function (e) {
  e.preventDefault();
  
  const email = "lkqiao@stanford.edu";
  const subject = "";
  const body = "";

  function openEmail(email, subject, body) {
    // Try Gmail
    let gmailWin = window.open(
      `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank"
    );

    if (!gmailWin) {
      // Gmail failed, try Outlook
      let outlookWin = window.open(
        `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        "_blank"
      );

      if (!outlookWin) {
        // Outlook failed, fall back to mailto
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    }
  }

  openEmail(email, subject, body);
});

// ==== TAG FILTER ====
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('projectCards');
  if (!grid) return;

  const cards  = Array.from(grid.querySelectorAll('.project-card'));
  const chipsBox   = document.getElementById('tagChips');
  const dropdown   = document.getElementById('tagDropdown');
  const toggleBtn  = document.getElementById('tagToggle');
  const inputBox   = document.getElementById('tagInput');

  const selected = new Set();

  function tagsForCard(card) {
    const explicit = Array.from(card.querySelectorAll('.project-card__tags .tag'))
      .map(el => el.textContent.trim());
    const data = (card.getAttribute('data-tags') || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    // unique merge
    return Array.from(new Set([...explicit, ...data]));
  }

  // Collect all unique tags across cards
  const allTags = Array.from(new Set(cards.flatMap(tagsForCard)))
    .sort((a,b) => a.localeCompare(b));

  // Build dropdown
  dropdown.innerHTML = '';
  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tag-option';
    btn.setAttribute('role', 'option');
    btn.setAttribute('aria-selected', 'false');
    btn.dataset.tag = tag;
    btn.innerHTML = `<span>${tag}</span><span class="check">✓</span>`;
    dropdown.appendChild(btn);
  });

  function openDropdown() {
    dropdown.hidden = false;
    inputBox.setAttribute('aria-expanded', 'true');
    document.addEventListener('click', outsideClose, { once: true });
  }
  function closeDropdown() {
    dropdown.hidden = true;
    inputBox.setAttribute('aria-expanded', 'false');
  }
  function outsideClose(e) {
    if (!dropdown.contains(e.target) && e.target !== toggleBtn) closeDropdown();
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.hidden ? openDropdown() : closeDropdown();
  });

  // Add a chip
  function addChip(tag) {
    if (selected.has(tag)) return;
    selected.add(tag);

    const chip = document.createElement('span');
    chip.className = 'tag-chip';
    chip.dataset.tag = tag;
    chip.innerHTML = `${tag} <button class="chip-x" aria-label="Remove ${tag}" title="Remove">×</button>`;
    chipsBox.appendChild(chip);

    chip.querySelector('.chip-x').addEventListener('click', () => {
      removeChip(tag);
    });

    const opt = dropdown.querySelector(`.tag-option[data-tag="${CSS.escape(tag)}"]`);
    if (opt) opt.setAttribute('aria-selected', 'true');

    filterCards();
  }

  // Remove a chip
  function removeChip(tag) {
    if (!selected.has(tag)) return;
    selected.delete(tag);

    const chip = chipsBox.querySelector(`.tag-chip[data-tag="${CSS.escape(tag)}"]`);
    if (chip) chip.remove();

    const opt = dropdown.querySelector(`.tag-option[data-tag="${CSS.escape(tag)}"]`);
    if (opt) opt.setAttribute('aria-selected', 'false');

    filterCards();
  }

  // Click in dropdown
  dropdown.addEventListener('click', (e) => {
    const btn = e.target.closest('.tag-option');
    if (!btn) return;
    const tag = btn.dataset.tag;
    if (selected.has(tag)) {
      removeChip(tag);
    } else {
      addChip(tag);
    }
  });

  // Core filtering (AND logic)
  function filterCards() {
    if (selected.size === 0) {
      cards.forEach(card => card.style.display = '');
      return;
    }
    cards.forEach(card => {
      const cardTags = new Set(tagsForCard(card));
      const show = Array.from(selected).every(t => cardTags.has(t));
      card.style.display = show ? '' : 'none';
    });
  }
});

// ==== TYPING ANIMATION ====
(function () {
  const REARM_DELAY_MS = 5000;  
  const SPEED_FALLBACK = 0.1;  

  function startTyping(el) {
    const speed = Number(el.dataset.speed) || SPEED_FALLBACK;

    const full = (el.dataset.fulltext && el.dataset.fulltext.length)
      ? el.dataset.fulltext
      : (el.textContent || '').replace(/\s+/g, ' ').trim();

    el.dataset.fulltext = full;

    el.textContent = '';
    const out = document.createElement('span');
    out.className = 'typing-text';
    el.appendChild(out);

    const caret = document.createElement('span');
    caret.className = 'caret';
    caret.setAttribute('aria-hidden', 'true');
    el.appendChild(caret);

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      out.textContent = full;
      caret.classList.add('done');
      return;
    }

    let i = 0;
    function tick() {
      if (i < full.length) {
        out.textContent += full[i++];
        el._typingTimer = setTimeout(tick, speed);
      }
    }
    tick();
  }

  function stopTyping(el) {
    if (el._typingTimer) {
      clearTimeout(el._typingTimer);
      el._typingTimer = null;
    }
  }

  function initAll() {
    const nodes = document.querySelectorAll('.typing');
    if (!nodes.length) return;

    nodes.forEach(el => {
      if (el.dataset.processed === '1') return;
      el.dataset.processed = '1';
      el.dataset.shouldReset = '0';
      startTyping(el);
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting) {
          if (el._offTimer) {
            clearTimeout(el._offTimer);
            el._offTimer = null;
          }
          if (el.dataset.shouldReset === '1') {
            el.dataset.shouldReset = '0';
            stopTyping(el);
            el.innerHTML = '';
            startTyping(el);
          }
        } else {
          if (entry.intersectionRatio === 0) {
            if (el._offTimer) {
              clearTimeout(el._offTimer);
              el._offTimer = null;
            }
            el._offTimer = setTimeout(() => {
              el._offTimer = null;
              el.dataset.shouldReset = '1';
            }, REARM_DELAY_MS);
          }
        }
      });
    }, { root: null, threshold: 0 });

    nodes.forEach(el => io.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }
})();

// Initialize state on page load
// updateCarousel();
