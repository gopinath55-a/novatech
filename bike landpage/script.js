// ---------- Navbar background on scroll ----------
const navbar = document.getElementById('navbar');

function updateNavbar() {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

updateNavbar();
window.addEventListener('scroll', updateNavbar);

// ---------- Mobile hamburger menu ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Scroll reveal for sections ----------
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

// ---------- Test ride booking ----------
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');
const bikeSelect = document.getElementById('bike');

if (bookingForm) {
  const selectedBike = new URLSearchParams(window.location.search).get('bike');
  if (selectedBike && [...bikeSelect.options].some((option) => option.value === selectedBike)) {
    bikeSelect.value = selectedBike;
  }

  const dateInput = document.getElementById('date');
  dateInput.min = new Date().toISOString().split('T')[0];

  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    bookingForm.reset();
    bookingSuccess.classList.add('show');
    bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}


function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// ---------- Collection-card 3D tilt ----------
const bikeStages = document.querySelectorAll('.bike-3d-stage');

bikeStages.forEach((stage) => {
  const card = stage.closest('.bike-3d');
  if (!card) return;
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.setProperty('--ry', `${clamp(x * 14, -8, 8)}deg`);
    stage.style.setProperty('--rx', `${clamp(y * -8, -5, 5)}deg`);
    stage.style.setProperty('--tx', `${x * 7}px`);
    stage.style.setProperty('--ty', `${y * 5}px`);
  });
  card.addEventListener('pointerleave', () => {
    stage.style.setProperty('--tx', '0px');
    stage.style.setProperty('--ty', '0px');
    updateBikeCards();
  });
});
