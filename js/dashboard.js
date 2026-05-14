/* ========================================
   SYINCRO - DASHBOARD JAVASCRIPT
======================================== */

// Sample Messages Data
const messagesData = [
  {
    id: 1,
    platform: 'whatsapp',
    sender: 'John Smith',
    avatar: 'JS',
    subject: 'Project Update',
    preview: 'Hey! Just wanted to check in on the project status. Are we still on track for...',
    time: '2 min ago',
    unread: true,
    flagged: false
  },
  {
    id: 2,
    platform: 'gmail',
    sender: 'Sarah Johnson',
    avatar: 'SJ',
    subject: 'Meeting Reminder: Q4 Planning',
    preview: 'This is a friendly reminder about our Q4 planning meeting scheduled for tomorrow at...',
    time: '15 min ago',
    unread: true,
    flagged: false
  },
  {
    id: 3,
    platform: 'slack',
    sender: 'Design Team',
    avatar: 'DT',
    subject: '#general - New mockups ready',
    preview: 'The new mockups for the homepage redesign are ready for review. Please check...',
    time: '1 hour ago',
    unread: false,
    flagged: false
  },
  {
    id: 4,
    platform: 'telegram',
    sender: 'Crypto Alerts',
    avatar: 'CA',
    subject: '🚨 URGENT: Claim your free Bitcoin now!',
    preview: 'Click here immediately to claim your FREE 0.5 BTC! This offer expires in 10 minutes...',
    time: '2 hours ago',
    unread: true,
    flagged: true
  },
  {
    id: 5,
    platform: 'sms',
    sender: '+1 (555) 123-4567',
    avatar: '📱',
    subject: '',
    preview: 'Your verification code is: 847291. Do not share this code with anyone.',
    time: '3 hours ago',
    unread: false,
    flagged: false
  },
  {
    id: 6,
    platform: 'instagram',
    sender: 'marketing_pro',
    avatar: 'MP',
    subject: 'Collaboration opportunity',
    preview: 'Hi! I love your content and would like to discuss a potential brand collaboration...',
    time: '5 hours ago',
    unread: false,
    flagged: false
  },
  {
    id: 7,
    platform: 'discord',
    sender: 'Dev Community',
    avatar: 'DC',
    subject: '#help - Need assistance with API',
    preview: 'Anyone here who can help me understand how to implement rate limiting in the...',
    time: 'Yesterday',
    unread: false,
    flagged: false
  },
  {
    id: 8,
    platform: 'facebook',
    sender: 'Marketplace Alert',
    avatar: 'FB',
    subject: 'New message about your listing',
    preview: 'Hi, is this item still available? I\'m interested in purchasing. Can we arrange...',
    time: 'Yesterday',
    unread: true,
    flagged: false
  },
  {
    id: 9,
    platform: 'gmail',
    sender: 'Security Alert',
    avatar: '🔒',
    subject: '⚠️ Suspicious login attempt detected',
    preview: 'We detected a login attempt from an unrecognized device in Nigeria. If this...',
    time: '2 days ago',
    unread: true,
    flagged: true
  },
  {
    id: 10,
    platform: 'whatsapp',
    sender: 'Mom',
    avatar: '❤️',
    subject: '',
    preview: 'Don\'t forget dinner this Sunday! Your father is making his famous lasagna 😊',
    time: '2 days ago',
    unread: false,
    flagged: false
  },
  {
    id: 11,
    platform: 'telegram',
    sender: 'Investment Group',
    avatar: 'IG',
    subject: '💰 DOUBLE YOUR MONEY GUARANTEED',
    preview: 'Join our exclusive investment group! We guarantee 500% returns in just 30 days...',
    time: '3 days ago',
    unread: true,
    flagged: true
  },
  {
    id: 12,
    platform: 'slack',
    sender: 'HR Team',
    avatar: 'HR',
    subject: '#announcements - Holiday Schedule',
    preview: 'Please note the upcoming holiday schedule. The office will be closed on...',
    time: '1 week ago',
    unread: false,
    flagged: false
  }
];

// Platform Colors
const platformColors = {
  whatsapp: '#25D366',
  gmail: '#EA4335',
  sms: '#3B82F6',
  slack: '#4A154B',
  telegram: '#0088CC',
  instagram: '#E4405F',
  discord: '#5865F2',
  facebook: '#1877F2'
};

// Current filter state
let currentFilter = 'all';

// Render Messages
function renderMessages(filter = 'all') {
  const container = document.getElementById('messagesList');
  
  let filteredMessages = messagesData;
  if (filter !== 'all') {
    if (filter === 'flagged') {
      filteredMessages = messagesData.filter(m => m.flagged);
    } else {
      filteredMessages = messagesData.filter(m => m.platform === filter);
    }
  }

  if (filteredMessages.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <h3 class="empty-title">No messages</h3>
        <p class="empty-subtitle">No messages found for this filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredMessages.map((msg, index) => {
    const platformColor = platformColors[msg.platform] || '#2563EB';
    const scamBadge = msg.flagged ? `
      <div class="scam-badge" onclick="showScamReason(${msg.id})" title="Why is this flagged?">
        ⚠️ Potential Scam
      </div>
    ` : '';
    
    const unreadDot = msg.unread ? '<div class="unread-indicator"></div>' : '';

    return `
      <div class="message-card glass-card ${msg.flagged ? 'flagged' : ''}" 
           style="--platform-color: ${platformColor}"
           onclick="openMessageModal(${msg.id})"
           data-index="${index}">
        <div class="message-header">
          <div class="sender-avatar">${msg.avatar}</div>
          <div class="sender-info">
            <div class="sender-name">${msg.sender}</div>
            <div class="sender-platform">
              <span class="platform-badge ${msg.platform}">${msg.platform}</span>
            </div>
          </div>
          <div class="message-time">${msg.time}</div>
        </div>
        <div class="message-body">
          <div class="message-preview">
            ${msg.subject ? `<strong>${msg.subject}</strong> - ` : ''}${msg.preview}
          </div>
          ${scamBadge}
          ${unreadDot}
        </div>
      </div>
    `;
  }).join('');

  // Add stagger animation
  setTimeout(() => {
    const cards = container.querySelectorAll('.message-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      setTimeout(() => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 50);
    });
  }, 10);
}

// Open Message Modal
function openMessageModal(messageId) {
  const msg = messagesData.find(m => m.id === messageId);
  if (!msg) return;

  const platformColor = platformColors[msg.platform] || '#2563EB';
  
  const modalContent = `
    <div class="message-modal-content">
      <div class="modal-message-header">
        <div class="modal-sender-avatar" style="background: ${platformColor}20; color: ${platformColor}">${msg.avatar}</div>
        <div class="modal-sender-info">
          <div class="modal-sender-name">${msg.sender}</div>
          <div class="modal-message-meta">
            <span class="platform-badge ${msg.platform}">${msg.platform}</span>
            • ${msg.time}
          </div>
        </div>
      </div>
      
      <div class="modal-message-body">
        ${msg.subject ? `<p style="font-weight: 600; margin-bottom: 12px;">${msg.subject}</p>` : ''}
        <p>${msg.preview}</p>
        <p style="margin-top: 12px; color: var(--text-secondary);">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
      
      <div class="ai-suggestions">
        <div class="ai-suggestions-title">🤖 AI Suggested Replies</div>
        <div class="suggestion-card" onclick="copyReply(this)">
          <p class="suggestion-text">Thanks for reaching out! I'll get back to you shortly with more details.</p>
        </div>
        <div class="suggestion-card" onclick="copyReply(this)">
          <p class="suggestion-text">Sounds good! Let me know if you need anything else from my end.</p>
        </div>
        <div class="suggestion-card" onclick="copyReply(this)">
          <p class="suggestion-text">I appreciate you following up. Can we schedule a quick call to discuss?</p>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="markAsSafe(${msg.id})">
          ✓ Mark Safe
        </button>
        <button class="btn btn-secondary" onclick="addToTasks(${msg.id})">
          + Add to Tasks
        </button>
        <button class="btn btn-ghost" onclick="window.modalManager.close()">
          Close
        </button>
      </div>
    </div>
  `;

  window.modalManager.open(modalContent, 'large');
}

// Show Scam Reason
function showScamReason(messageId) {
  const reasons = [
    'Contains suspicious links requesting immediate action',
    'Promises unrealistic financial returns',
    'Mimics official security alerts but from unknown sender',
    'Uses urgent language to pressure quick decisions'
  ];
  
  const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
  
  const modalContent = `
    <div class="modal-header">
      <h2 class="modal-title">⚠️ Why This Was Flagged</h2>
    </div>
    <p style="color: var(--text-secondary); line-height: 1.8;">
      Our AI detected potential scam indicators in this message:
    </p>
    <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin: 16px 0;">
      <p style="color: var(--scam); font-weight: 600;">${randomReason}</p>
    </div>
    <p style="color: var(--text-secondary); font-size: 14px;">
      💡 Tip: Never click suspicious links or share personal information with unknown senders.
    </p>
  `;
  
  window.modalManager.open(modalContent);
}

// Copy Reply
function copyReply(element) {
  const text = element.querySelector('.suggestion-text').textContent;
  navigator.clipboard.writeText(text).then(() => {
    window.toastManager.success('Reply copied to clipboard!');
  });
}

// Mark as Safe
function markAsSafe(messageId) {
  const msg = messagesData.find(m => m.id === messageId);
  if (msg) {
    msg.flagged = false;
    window.modalManager.close();
    renderMessages(currentFilter);
    window.toastManager.success('Message marked as safe');
  }
}

// Add to Tasks
function addToTasks(messageId) {
  window.modalManager.close();
  window.toastManager.success('Added to your tasks!');
}

// Filter Handling
function setupFilters() {
  // Sidebar nav items
  const navItems = document.querySelectorAll('.sidebar .nav-item[data-filter]');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const filter = item.dataset.filter;
      setFilter(filter);
      
      // Update active state
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Filter chips
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      setFilter(filter);
      
      // Update active state
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
}

function setFilter(filter) {
  currentFilter = filter;
  renderMessages(filter);
}

// Search Functionality
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (query.trim() === '') {
      renderMessages(currentFilter);
      return;
    }
    
    const filtered = messagesData.filter(msg => 
      msg.sender.toLowerCase().includes(query) ||
      msg.preview.toLowerCase().includes(query) ||
      msg.subject?.toLowerCase().includes(query)
    );
    
    const container = document.getElementById('messagesList');
    container.innerHTML = filtered.map(msg => {
      const platformColor = platformColors[msg.platform] || '#2563EB';
      return `
        <div class="message-card glass-card" style="--platform-color: ${platformColor}" onclick="openMessageModal(${msg.id})">
          <div class="message-header">
            <div class="sender-avatar">${msg.avatar}</div>
            <div class="sender-info">
              <div class="sender-name">${msg.sender}</div>
              <div class="sender-platform">
                <span class="platform-badge ${msg.platform}">${msg.platform}</span>
              </div>
            </div>
            <div class="message-time">${msg.time}</div>
          </div>
          <div class="message-body">
            <div class="message-preview">${msg.preview}</div>
          </div>
        </div>
      `;
    }).join('');
  });
}

// Sidebar Toggle
function setupSidebarToggle() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mainContent = document.getElementById('mainContent');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');

  // Desktop toggle
  sidebarToggle.addEventListener('click', () => {
    if (window.innerWidth > 1024) {
      sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('expanded');
    }
  });

  // Mobile menu
  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar on outside click (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
      if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderMessages();
  setupFilters();
  setupSearch();
  setupSidebarToggle();
});
