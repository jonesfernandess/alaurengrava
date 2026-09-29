// Barra superior, botão flutuante, link ativo e animação de entrada
const topbar = document.querySelector('.topbar');
const fab = document.querySelector('.fab');
const hero = document.querySelector('.hero');

const onScroll = () => {
  const y = window.scrollY;
  topbar.classList.toggle('is-scrolled', y > 20);
  fab.classList.toggle('is-visible', y > hero.offsetHeight * 0.6);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const links = [...document.querySelectorAll('.topbar__nav a')];
const sections = links.map((a) => document.querySelector(a.getAttribute('href')));

if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));

  const targets = document.querySelectorAll('.title, .sobre__text p, .card, .chevrons li, .plan, .contato__info');
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    reveal.observe(el);
  });
}
