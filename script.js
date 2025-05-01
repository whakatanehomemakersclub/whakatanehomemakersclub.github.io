// Modern JavaScript for Whakatane Home Makers Club Landing Page

// DOM elements
const eventCard = document.querySelector('.event-card');
const rsvpBtn = document.querySelector('.rsvp-btn');
const rsvpModal = document.getElementById('rsvpModal');
const contactModal = document.getElementById('contactModal');
const contactUsBtn = document.querySelector('.contact-us-btn');
const closeBtn = document.querySelector('.close-btn');
const contactCloseBtn = document.querySelector('.contact-close-btn');
const rsvpForm = document.getElementById('rsvpForm');
const contactForm = document.getElementById('contactForm');
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
  observer.observe(eventCard);
  
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
    setTimeout(() => item.classList.remove('pulse'), 500);
  });
}

// Set up event listeners
function setupEventListeners() {
  // RSVP Modal open
  rsvpBtn.addEventListener('click', () => {
    openModal(rsvpModal);
  });
  
  // Contact Modal open
  contactUsBtn.addEventListener('click', () => {
    openModal(contactModal);
  });
  
  // Modal close buttons
  closeBtn.addEventListener('click', () => closeModal(rsvpModal));
  contactCloseBtn.addEventListener('click', () => closeModal(contactModal));
  
  // Close if clicked outside modal
  window.addEventListener('click', (e) => {
    if (e.target === rsvpModal) {
      closeModal(rsvpModal);
    }
    if (e.target === contactModal) {
      closeModal(contactModal);
    }
  });
  
  // Handle form submissions
  rsvpForm.addEventListener('submit', handleRsvpSubmit);
  contactForm.addEventListener('submit', handleContactSubmit);
}

// Open modal function
function openModal(modal) {
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

// Close modal function
function closeModal(modal) {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Handle RSVP form submission
function handleRsvpSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const attending = document.querySelector('input[name="attendance"]:checked').value;
  
  // In a real application, you would send this data to a server
  // For now, we'll just show a thank you message
  rsvpForm.innerHTML = `
    <div class="thank-you">
      <h3>Thank you, ${name}!</h3>
      <p>${attending === 'yes' ? 
        'We look forward to seeing you at the event.' : 
        'We\'re sorry you can\'t make it. We hope to see you at future events!'}</p>
      <p>A confirmation has been sent to ${email}.</p>
    </div>
  `;
  
  // Close modal after 3 seconds
  setTimeout(() => closeModal(rsvpModal), 3000);
}

// Handle Contact form submission
function handleContactSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const interest = document.getElementById('contactInterest').value;
  
  // In a real application, you would send this data to a server
  contactForm.innerHTML = `
    <div class="thank-you">
      <h3>Thank you, ${name}!</h3>
      <p>We've received your message and will get back to you shortly at ${email}.</p>
      <p>We appreciate your interest in our ${interest} activities!</p>
    </div>
  `;
  
  // Close modal after 3 seconds
  setTimeout(() => closeModal(contactModal), 3000);
}

// Add smooth scrolling to all links
function addSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Handle image loading errors
function handleImageErrors() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.onerror = function() {
      console.log(`Failed to load image: ${img.src}`);
      // Set a default background color to show something is there
      img.style.backgroundColor = '#f0e6dc';
      // Add a text placeholder
      const altText = img.alt || 'Image';
      img.style.display = 'flex';
      img.style.alignItems = 'center';
      img.style.justifyContent = 'center';
      img.style.fontFamily = 'var(--font-body)';
      img.style.fontSize = '0.9rem';
      img.style.padding = '20px';
      img.style.color = '#5a4a42';
      img.style.textAlign = 'center';
      
      // Create a text node with the alt text
      const text = document.createTextNode(altText);
      img.parentNode.insertBefore(text, img.nextSibling);
    };
  });
}

// Initialize everything once DOM is loaded
document.addEventListener('DOMContentLoaded', init);
