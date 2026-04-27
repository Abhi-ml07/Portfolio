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

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = 'aFWopoFZ58dwpwlLG'; 
const EMAILJS_SERVICE_ID = 'service_2t0nogf'; 
const EMAILJS_TEMPLATE_ID = 'template_fkwwh45'; 

// Flag to prevent multiple submissions
let isSubmitting = false;

// Initialize EmailJS when library loads
function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
      limitRate: { id: 'app', throttle: 300 }
    });
    console.log('✅ EmailJS initialized');
    return true;
  }
  return false;
}

// Try to initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEmailJS);
} else {
  initEmailJS();
}

// Also try on window load
window.addEventListener('load', () => {
  if (!initEmailJS()) {
    // Try again if not available yet
    setTimeout(initEmailJS, 500);
  }
});

// Form submission
function handleForm(e) {
  e.preventDefault();
  
  // Check if emailjs is available
  if (typeof emailjs === 'undefined') {
    alert('❌ Email service not available. Please reload the page.');
    return;
  }
  
  // Prevent multiple submissions
  if (isSubmitting) return;
  isSubmitting = true;
  
  const submitBtn = document.querySelector('.form-submit');
  const originalText = submitBtn.innerHTML;
  
  try {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate
    if (!name || !email || !message) {
      alert('❌ Please fill Name, Email, and Message');
      isSubmitting = false;
      return;
    }
    
    // Show loading
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Prepare template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject || '(No Subject)',
      message: message,
      to_email: 'mandal.abhishek2045@gmail.com'
    };
    
    console.log('📧 Sending email...', templateParams);
    
    // Send email
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log('✅ Email sent!', response);
        alert('✅ Message sent! I will reply soon.');
        document.getElementById('contactForm').reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        isSubmitting = false;
      })
      .catch((error) => {
        console.error('❌ Send error:', error);
        alert('❌ Error: ' + (error.text || error.message || 'Failed to send'));
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        isSubmitting = false;
      });
  } catch (error) {
    console.error('❌ Exception:', error);
    alert('❌ Error: ' + error.message);
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    isSubmitting = false;
  }
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
