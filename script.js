// Fixed countdown timer for Whakatane Home Makers Club website

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
  // Check if countdown elements exist before starting countdown
  if (daysEl && hoursEl && minutesEl) {
    // Start countdown
    updateCountdown();
    // Update every second for more dynamic countdown
    setInterval(updateCountdown, 1000);
  } else {
    console.error("Countdown elements not found");
  }
  
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
  // Double check that DOM elements exist to prevent errors
  if (!daysEl || !hoursEl || !minutesEl) return;
  
  const now = new Date().getTime();
  const distance = eventDate - now;
  
  // If event has passed
  if (distance < 0) {
    if (countdownEl) {
      countdownEl.innerHTML = '<h3>Event has started!</h3>';
    }
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
    setTimeout(() => item.classList.remove('pulse'), 500);
  });
}

// Event listeners setup
function setupEventListeners() {
  // RSVP button opens the modal
  if (rsvpBtn) {
    rsvpBtn.addEventListener('click', () => {
      if (rsvpModal) {
        rsvpModal.style.display = 'flex';
        setTimeout(() => {
          rsvpModal.classList.add('show');
        }, 10);
      }
    });
  }
  
  // Close button closes the modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (rsvpModal) {
        rsvpModal.classList.remove('show');
        setTimeout(() => {
          rsvpModal.style.display = 'none';
        }, 300);
      }
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (rsvpModal && e.target === rsvpModal) {
      rsvpModal.classList.remove('show');
      setTimeout(() => {
        rsvpModal.style.display = 'none';
      }, 300);
    }
  });
}

// Add smooth scrolling to all links
function addSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Handle image loading errors
function handleImageErrors() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.src = 'images/placeholder.jpg';
      this.alt = 'Image not available';
    });
  });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', init);

// Backup initialization in case DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(init, 1);
}
