// ==== DARK MODE TOGGLE ====
const toggle = document.getElementById('darkModeToggle');
const icon = document.getElementById('darkModeIcon');

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  icon.src = 'assets/sun.svg';
  icon.alt = 'Switch to Light Mode';
}

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  icon.src = isDark ? 'assets/sun.svg' : 'assets/moon.svg';
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
  icon.src = isCollapsed ? 'assets/plus-menu.svg' : 'assets/minus-menu.svg';
  icon.alt = isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar';
});

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  body.classList.toggle('collapsed');
  const isCollapsed = sidebar.classList.contains('collapsed');
  const icon = toggleBtn.querySelector('img');
  icon.src = isCollapsed ? 'assets/plus-menu.svg' : 'assets/minus-menu.svg';
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
  const cardWidth = cards[0].offsetWidth + 24; // 24 is your horizontal gap
  carousel.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth"
  });

  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add("active");
  }
}

// Initialize state on page load
updateCarousel();
