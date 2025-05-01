// Modern JavaScript for Whakatane Home Makers Club Landing Page

// DOM elements
const eventCard = document.querySelector('.event-card');
const rsvpBtn = document.querySelector('.rsvp-btn');
const modal = document.getElementById('rsvpModal');
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
  setInterval(updateCountdown, 60000); // Update every minute
  
  // Set up observers for animation
  observer.observe(eventCard);
  
  // Set up event listeners
  setupEventListeners();
  
  // Add smooth scrolling to all links
  addSmoothScrolling();
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
}

// Set up event listeners
function setupEventListeners() {
  // Modal open
  rsvpBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  });
  
  // Modal close
  closeBtn.addEventListener('click', closeModal);
  
  // Close if clicked outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Handle form submission
  rsvpForm.addEventListener('submit', handleFormSubmit);
}

// Close the modal
function closeModal() {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Handle RSVP form submission
function handleFormSubmit(e) {
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
  setTimeout(closeModal, 3000);
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

// Additional CSS for elements added via JS
const style = document.createElement('style');
style.textContent = `
  .countdown {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
  }
  
  .countdown-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .countdown-item span:first-child {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--primary-color);
    background: var(--card-bg);
    border-radius: 8px;
    padding: 10px 15px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    min-width: 70px;
    text-align: center;
  }
  
  .countdown-item span:last-child {
    margin-top: 8px;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .modal.show {
    opacity: 1;
  }
  
  .modal-content {
    background-color: var(--card-bg);
    padding: 40px;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    position: relative;
    transform: translateY(20px);
    transition: transform 0.3s ease;
  }
  
  .modal.show .modal-content {
    transform: translateY(0);
  }
  
  .close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.8rem;
    color: var(--primary-color);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .close-btn:hover {
    color: #000;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: var(--primary-color);
  }
  
  .form-group input[type="text"],
  .form-group input[type="email"] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  .radio-group {
    margin: 10px 0;
  }
  
  .thank-you {
    text-align: center;
    padding: 20px 0;
  }
`;
document.head.appendChild(style);

// Initialize everything once DOM is loaded
document.addEventListener('DOMContentLoaded', init);