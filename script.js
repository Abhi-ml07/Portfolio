// Form Submission Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const formData = new FormData(this);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    this.reset();
  });
}

// Update input names to work with FormData
document.addEventListener('DOMContentLoaded', function () {
  const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  inputs.forEach((input, index) => {
    if (!input.name) {
      if (input.placeholder === 'Your Name') input.name = 'name';
      else if (input.placeholder === 'Your Email') input.name = 'email';
      else if (input.placeholder === 'Subject') input.name = 'subject';
      else if (input.placeholder === 'Your Message') input.name = 'message';
    }
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all project cards and achievement items
document.querySelectorAll('.project-card, .achievement-item, .skill-category').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.classList.toggle('active');
}

// Highlight active nav link based on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});
