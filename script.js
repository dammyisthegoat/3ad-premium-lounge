const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });
}

const tabs = document.querySelectorAll('.menu-tab');
const panels = document.querySelectorAll('.menu-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => item.classList.toggle('active', item === tab));
    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === `${target}-panel`);
    });
  });
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const form = document.querySelector('#reserveForm');
const note = document.querySelector('#reserveNote');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const message = [
      'Hello 3AD Premium Lounge, I would like to make an enquiry.',
      '',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Date: ${data.get('date')}`,
      `Guests: ${data.get('guests')}`,
      `Booking type: ${data.get('type')}`,
      `Preferred time: ${data.get('time') || 'Any time'}`,
      `Message: ${data.get('message') || 'No additional message.'}`
    ].join('\n');

    const url = `https://wa.me/2349031968046?text=${encodeURIComponent(message)}`;
    if (note) note.textContent = 'Opening WhatsApp with your enquiry...';
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
