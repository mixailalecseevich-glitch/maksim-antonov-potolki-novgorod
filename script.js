const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  mobileNav.hidden = !open;
});
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
}));
const note = document.querySelector('#cookie-note');
let acknowledged = false;
try { acknowledged = localStorage.getItem('cookie-note-dismissed') === 'yes'; } catch (_) {}
if (note && !acknowledged) note.hidden = false;
document.querySelector('#cookie-ok')?.addEventListener('click', () => {
  if (note) note.hidden = true;
  try { localStorage.setItem('cookie-note-dismissed', 'yes'); } catch (_) {}
});
