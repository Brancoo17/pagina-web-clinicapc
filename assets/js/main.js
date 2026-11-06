/**
 * LA CLÍNICA DE LA PC - MAIN.JS
 * Lógica e interactividad en JavaScript vanilla (sin frameworks ni dependencias)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. CONFIGURACIÓN Y CONSTANTES
  // ========================================================================
  const WHATSAPP_PHONE = '5493874829499'; // Formato internacional Argentina

  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const backToTopBtn = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const currentYearSpan = document.getElementById('current-year');
  const sections = document.querySelectorAll('section[id]');

  // ========================================================================
  // 2. AÑO DINÁMICO EN FOOTER
  // ========================================================================
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ========================================================================
  // 3. MENÚ HAMBURGUESA MÓVIL ACCESIBLE
  // ========================================================================
  if (navToggle && navMenu) {
    const toggleMenu = (isOpen) => {
      const willOpen = typeof isOpen === 'boolean' ? isOpen : !navMenu.classList.contains('is-open');
      navMenu.classList.toggle('is-open', willOpen);
      navToggle.classList.toggle('is-active', willOpen);
      navToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', willOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Cerrar al hacer clic en un enlace de navegación
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) {
          toggleMenu(false);
        }
      });
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        toggleMenu(false);
        navToggle.focus();
      }
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  // ========================================================================
  // 4. HEADER SHADOW Y BOTÓN VOLVER ARRIBA EN SCROLL
  // ========================================================================
  let lastScrollY = window.scrollY;
  let ticking = false;

  const onScroll = () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Sombra y estilo del Header
        if (header) {
          if (lastScrollY > 20) {
            header.classList.add('is-scrolled');
          } else {
            header.classList.remove('is-scrolled');
          }
        }

        // Botón Volver arriba
        if (backToTopBtn) {
          if (lastScrollY > 400) {
            backToTopBtn.classList.add('is-visible');
          } else {
            backToTopBtn.classList.remove('is-visible');
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Comprobar estado inicial

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================================================
  // 5. RESALTADO DE LINK ACTIVO SEGÚN SECCIÓN VISIBLE (IntersectionObserver)
  // ========================================================================
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ========================================================================
  // 6. FORMULARIO DE CONSULTA RÁPIDA VÍA WHATSAPP (Sin backend)
  // ========================================================================
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const typeSelect = document.getElementById('form-type');
      const msgInput = document.getElementById('form-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const type = typeSelect ? typeSelect.value.trim() : '';
      const message = msgInput ? msgInput.value.trim() : '';

      // Validación simple
      if (!name || !type || !message) {
        alert('Por favor, completá todos los campos requeridos para enviar tu mensaje.');
        return;
      }

      // Construcción del mensaje prellenado codificado para WhatsApp
      const text = `Hola, soy ${name}. Quisiera hacer una consulta por ${type}:\n\n"${message}"`;
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;

      // Abrir WhatsApp en una nueva pestaña
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }
});

