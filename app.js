document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#main-menu');
  const navLinks = document.querySelectorAll('#main-menu a');

  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    menuButton.classList.toggle('is-active', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú de navegación');
      menuButton.classList.remove('is-active');
    });
  });

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const form = document.querySelector('#contact-form');
  const formMessage = document.querySelector('#form-message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    let valid = true;

    [form.elements.name, form.elements.email, form.elements.message].forEach((field) => {
      field.setAttribute('aria-invalid', 'false');
    });

    if (name.length < 2) {
      form.elements.name.setAttribute('aria-invalid', 'true');
      valid = false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      form.elements.email.setAttribute('aria-invalid', 'true');
      valid = false;
    }
    if (message.length < 10) {
      form.elements.message.setAttribute('aria-invalid', 'true');
      valid = false;
    }

    if (!valid) {
      formMessage.textContent = 'Revisa tu nombre, correo y el detalle de la solicitud.';
      return;
    }

    formMessage.textContent = 'Gracias, ' + name + '. Hemos recibido tu solicitud y te responderemos muy pronto.';
    form.reset();
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
