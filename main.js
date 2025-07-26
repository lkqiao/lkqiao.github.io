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
const body = document.body;

body.classList.add('has-right-sidebar');

if (sidebar.classList.contains('collapsed')) {
  body.classList.add('collapsed');
}

window.addEventListener('DOMContentLoaded', () => {
  const isCollapsed = sidebar.classList.contains('collapsed');
  const icon = toggleBtn.querySelector('img');
  icon.src = isCollapsed ? 'assets/icons/plus-menu.svg' : 'assets/icons/minus-menu.svg';
  icon.alt = isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar';
});

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  body.classList.toggle('collapsed');
  const isCollapsed = sidebar.classList.contains('collapsed');
  const icon = toggleBtn.querySelector('img');
  icon.src = isCollapsed ? 'assets/icons/plus-menu.svg' : 'assets/icons/minus-menu.svg';
  icon.alt = isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar';
});

// ==== SPOTIFY-STYLE CAROUSEL ====
const carousel = document.getElementById("carousel");
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");
const dotContainer = document.getElementById("dotIndicators");
const cards = carousel.querySelectorAll(".song-card");

let currentIndex = 0;

// Generate dot indicators
cards.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dotContainer.appendChild(dot);
});

const dots = dotContainer.querySelectorAll(".dot");

// Scroll + update dots on arrow click
scrollLeftBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

scrollRightBtn.addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth;
  carousel.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth"
  });

  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add("active");
  }
}

// ==== PHOTO GALLERY ====
const photoGallery = document.getElementById("photoGallery");
const galleryScrollLeft = document.getElementById("galleryScrollLeft");
const galleryScrollRight = document.getElementById("galleryScrollRight");

galleryScrollLeft.addEventListener("click", () => {
  photoGallery.scrollBy({ left: -240, behavior: "smooth" });
});

galleryScrollRight.addEventListener("click", () => {
  photoGallery.scrollBy({ left: 150, behavior: "smooth" });
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
      li.style.animationDelay = `${0.2 + i * 0.08}s`;
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

// Initialize state on page load
updateCarousel();
