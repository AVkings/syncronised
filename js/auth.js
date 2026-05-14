/* ========================================
   SYINCRO - AUTH PAGE JAVASCRIPT
======================================== */

// Tab Switching
const tabs = document.querySelectorAll('.auth-tab');
const tabIndicator = document.querySelector('.tab-indicator');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.dataset.tab;
    
    // Update active states
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Move indicator
    if (targetTab === 'login') {
      tabIndicator.removeAttribute('data-tab');
      loginForm.classList.add('active');
      signupForm.classList.remove('active');
    } else {
      tabIndicator.setAttribute('data-tab', 'signup');
      signupForm.classList.add('active');
      loginForm.classList.remove('active');
    }
  });
});

// Login Form Submit
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // Simulate login
  window.toastManager.info('Signing in...');
  setTimeout(() => {
    window.toastManager.success('Welcome back!');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  }, 1500);
});

// Signup Form Submit
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  
  // Simulate signup
  window.toastManager.info('Creating your account...');
  setTimeout(() => {
    window.toastManager.success('Account created successfully!');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  }, 1500);
});

// Google Sign-In Handler
function handleGoogleSignIn() {
  window.toastManager.info('Redirecting to Google...');
  setTimeout(() => {
    window.toastManager.success('Signed in with Google!');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  }, 1500);
}

// Forgot Password Modal
function showForgotModal() {
  const modalContent = `
    <div class="modal-header">
      <h2 class="modal-title">Reset Password</h2>
    </div>
    <p style="color: var(--text-secondary); margin-bottom: 24px;">
      Enter your email address and we'll send you a link to reset your password.
    </p>
    <form id="forgot-form" style="display: flex; flex-direction: column; gap: 20px;">
      <div class="form-group">
        <label class="form-label" for="reset-email">Email</label>
        <input 
          type="email" 
          id="reset-email" 
          class="form-input" 
          placeholder="you@example.com"
          required
        >
      </div>
      <button type="submit" class="btn btn-primary btn-full">
        Send Reset Link
      </button>
    </form>
  `;
  
  window.modalManager.open(modalContent);
  
  // Handle form submit
  setTimeout(() => {
    const form = document.getElementById('forgot-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        window.modalManager.close();
        window.toastManager.success('Reset link sent! Check your email.');
      });
    }
  }, 100);
}

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
  new window.SyincroUtils.ParticleManager('.particles-container');
});
