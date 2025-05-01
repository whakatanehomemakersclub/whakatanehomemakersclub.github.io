// Modern JavaScript for Whakatane Home Makers Club Landing Page

// DOM elements
const eventCard = document.querySelector('.event-card');
const rsvpBtn = document.querySelector('.rsvp-btn');
const rsvpModal = document.getElementById('rsvpModal');
const closeBtn = document.querySelector('.close-btn');
const rsvpForm = document.getElementById('rsvpForm');
const countdownEl = document.getElementById('countdown');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');

// Event date (May 25, 2025 at 9:00 AM)
const eventDate = new Date('May 25, 2025 09:00:00').getTime();

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

// Initialize the page
function init() {
  // Start countdown
  updateCountdown();
  // Update every second for more dynamic countdown
  setInterval(updateCountdown, 1000);
  
  // Set up observers for animation
  if (eventCard) {
    observer.observe(eventCard);
  }
  
  // Set up event listeners
  setupEventListeners();
  
  // Add smooth scrolling to all links
  addSmoothScrolling();
  
  // Handle image loading errors
  handleImageErrors();
}

// Update the countdown timer
function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;
  
  // If event has passed
  if (distance < 0) {
    countdownEl.innerHTML = '<h3>Event has started!</h3>';
    return;
  }
  
  // Calculate days, hours, minutes
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  
  // Update DOM
  daysEl.textContent = days.toString().padStart(2, '0');
  hoursEl.textContent = hours.toString().padStart(2, '0');
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  
  // Add a subtle animation effect
  const countdownItems = document.querySelectorAll('.countdown-item span:first-child');
  countdownItems.forEach(item => {
    item.classList.add('pulse');
    setTimeout(() => item.classList.remove('pulse
