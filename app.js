const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }));
}
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.querySelector('#serviceSelect');
    if (select) select.value = link.dataset.service;
  });
});
const form = document.querySelector('#bookingForm');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = [
      'Hello Fluffy Clean, I would like to make an enquiry.',
      '',
      'Name: ' + data.get('name'),
      'Phone: ' + data.get('phone'),
      'Service: ' + data.get('service'),
      'Preferred date: ' + (data.get('date') || 'Not specified'),
      'Location: ' + data.get('location'),
      'Details: ' + (data.get('details') || 'Not specified'),
      '',
      'Please let me know the availability and price. Thank you.'
    ];
    const url = 'https://wa.me/2348033174796?text=' + encodeURIComponent(lines.join('\n'));
    const status = document.querySelector('.form-status');
    if (status) status.textContent = 'Opening WhatsApp with your enquiry. Please press Send in WhatsApp to submit it.';
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else { revealItems.forEach(item => item.classList.add('is-visible')); }
