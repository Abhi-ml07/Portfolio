// Mobile menu
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Tabs
function showTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
  animateBars();
}

// Skill bar animation
function animateBars() {
  document.querySelectorAll('.tab-content.active .skill-fill').forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0';
    requestAnimationFrame(() => {
      setTimeout(() => { bar.style.width = w; }, 50);
    });
  });
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        // animate skill bars when skills section is visible
        const bars = entry.target.querySelectorAll('.skill-fill');
        if (bars.length) animateBars();
      }, entry.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 100;
  observer.observe(el);
});

// Form submission - submit to Formspree without redirecting
function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = document.getElementById('contactForm');
  const submitBtn = document.querySelector('.form-submit');
  const originalText = submitBtn.innerHTML;
  
  // Get form data
  const formData = new FormData(form);
  
  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  // Send to Formspree via AJAX
  fetch('https://formspree.io/f/xpqkejzw', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Success
      alert('✅ Message sent successfully! Thank you for contacting me.');
      form.reset();
      
      // Reload page after 1.5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('❌ Error sending message. Please try again.');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
}

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent2)' : '';
  });
});

// Animate bars on initial load
window.addEventListener('load', () => setTimeout(animateBars, 600));
