const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function setMenu(open) {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  mobileNav.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}
menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });

const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const top = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!top) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + top.target.id));
  }, {rootMargin: '-20% 0px -55% 0px', threshold: [0, .25, .5]});
  sections.forEach(section => observer.observe(section));
}

const dialog = document.querySelector('#image-dialog');
const dialogImage = dialog?.querySelector('img');
const dialogCaption = dialog?.querySelector('p');
document.querySelectorAll('.work-open').forEach(button => button.addEventListener('click', () => {
  if (!dialog || !dialogImage || !dialogCaption) return;
  dialogImage.src = button.dataset.full;
  dialogImage.alt = button.querySelector('img')?.alt || 'Фотография работы';
  dialogCaption.textContent = button.dataset.caption || '';
  dialog.showModal();
}));
dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const note = document.querySelector('#cookie-note');
let acknowledged = false;
try { acknowledged = localStorage.getItem('cookie-note-dismissed') === 'yes'; } catch (_) {}
if (note && !acknowledged) note.hidden = false;
document.querySelector('#cookie-ok')?.addEventListener('click', () => {
  if (note) note.hidden = true;
  try { localStorage.setItem('cookie-note-dismissed', 'yes'); } catch (_) {}
});
