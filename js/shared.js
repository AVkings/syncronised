/* ========================================
   SYINCRO - SHARED JAVASCRIPT
   Theme System + Utilities
======================================== */

// Theme Management
class ThemeManager {
  constructor() {
    this.themes = ['light', 'iconic', 'dark'];
    this.currentTheme = localStorage.getItem('syincro-theme') || 'iconic';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupToggle();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem('syincro-theme', theme);
    
    // Update toggle UI
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.setAttribute('data-active', theme);
    }
  }

  nextTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.applyTheme(this.themes[nextIndex]);
  }

  setupToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.nextTheme());
    }
  }
}

// Toast Notifications
class ToastManager {
  constructor() {
    this.container = null;
    this.ensureContainer();
  }

  ensureContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
      this.container = container;
    } else {
      this.container = container;
    }
  }

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ'
    };

    toast.innerHTML = `
      <span style="font-size: 18px;">${icons[type]}</span>
      <span>${message}</span>
    `;

    this.container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Remove after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  success(message) {
    this.show(message, 'success');
  }

  error(message) {
    this.show(message, 'error');
  }

  info(message) {
    this.show(message, 'info');
  }
}

// Modal Management
class ModalManager {
  constructor() {
    this.overlay = null;
    this.modal = null;
  }

  open(content, size = 'default') {
    // Create overlay if not exists
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'modal-overlay';
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });
      document.body.appendChild(this.overlay);
    }

    // Create modal
    this.modal = document.createElement('div');
    this.modal.className = `modal ${size === 'large' ? 'message-modal' : ''}`;
    this.modal.innerHTML = content;

    // Add close button if not present
    if (!this.modal.querySelector('.modal-close')) {
      const header = this.modal.querySelector('.modal-header');
      if (header) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '✕';
        closeBtn.addEventListener('click', () => this.close());
        header.appendChild(closeBtn);
      }
    }

    this.overlay.appendChild(this.modal);

    // Animate in
    requestAnimationFrame(() => {
      this.overlay.classList.add('active');
    });

    // Setup close buttons
    this.modal.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });
  }

  close() {
    if (this.overlay) {
      this.overlay.classList.remove('active');
      setTimeout(() => {
        if (this.overlay && this.modal) {
          this.modal.remove();
        }
      }, 300);
    }
  }
}

// Particles Background
class ParticleManager {
  constructor(containerSelector = '.particles-container') {
    this.container = document.querySelector(containerSelector);
    if (this.container) {
      this.createParticles();
    }
  }

  createParticles(count = 20) {
    if (!this.container) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 8 + 4;
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 10 + 10;

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      `;

      this.container.appendChild(particle);
    }
  }
}

// Stagger Animation Helper
function staggerAnimate(selector, delay = 0.1) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${delay * index}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.classList.add('animate-slide-up');
    }, 10);
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
  window.toastManager = new ToastManager();
  window.modalManager = new ModalManager();
  
  // Initialize particles if container exists
  if (document.querySelector('.particles-container')) {
    window.particleManager = new ParticleManager();
  }
});

// Export for use in other files
window.SyincroUtils = {
  ThemeManager,
  ToastManager,
  ModalManager,
  ParticleManager,
  staggerAnimate
};
