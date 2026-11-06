# La Clínica de la PC — Sitio Web Oficial

Landing page moderna, rápida y responsive para **La Clínica de la PC**, servicio técnico informático y venta de insumos en Salta, Argentina.

---

## 🚀 Características

- **HTML5 semántico & Accesible:** Estructura limpia, jerarquía de encabezados (`h1` a `h3`), enlaces accesibles (`skip-link`), y atributos ARIA.
- **CSS3 puro (sin frameworks):** Variables CSS para colores y tipografía, diseño mobile-first, soporte automático para Modo Oscuro (`prefers-color-scheme: dark`) y reducción de movimiento (`prefers-reduced-motion`).
- **JavaScript Vanilla (ES6+):** Sin dependencias, jQuery ni frameworks. Menú móvil interactivo, sticky header reactivo, resaltado de navegación mediante `IntersectionObserver` y derivación de formularios a WhatsApp.
- **Sin backend ni build tools:** Funciona directamente abriendo `index.html` en el navegador o desplegando en hostings estáticos gratuitos.
- **SEO & Datos Estructurados:** Metadatos Open Graph, Twitter Cards y marcado JSON-LD de `ComputerRepairService` (Schema.org).

---

## 📁 Estructura del Proyecto

```
pagina-web-clinicapc/
├── index.html                 # Página principal estructurada
├── Diseño-Inicial.md          # Especificación y requerimientos del proyecto
├── README.md                  # Este documento
└── assets/
    ├── css/
    │   └── styles.css         # Tokens, reset, componentes y media queries
    ├── js/
    │   └── main.js            # Interactividad (menú, scroll, formulario WhatsApp)
    └── img/
        ├── logo.svg           # Logo vectorial recreado fielmente
        └── favicon.svg        # Ícono de pestaña con la cruz técnica
```

---

## 🛠️ Cómo Probar o Modificar

### 1. Visualización local
Simplemente haz doble clic en `index.html` para abrirlo en cualquier navegador web moderno, o usa una extensión como *Live Server* en tu editor de código.

### 2. Modificar datos de contacto o textos
- **Teléfono / WhatsApp:** Modifica el atributo `href` en los enlaces de `index.html` y la constante `WHATSAPP_PHONE` en `assets/js/main.js`.
- **Dirección y textos:** Edita directamente las secciones correspondientes en `index.html`. Cada dato no confirmado está claramente marcado con un comentario `<!-- TODO: confirmar con el cliente -->`.

### 3. Personalizar colores
En `assets/css/styles.css`, ajusta las variables en el bloque `:root`:
```css
:root {
  --color-primary: #1E7FE0;   /* Azul principal */
  --color-accent: #F0402F;    /* Rojo para llamadas a la acción (CTAs) */
  --color-bg: #F7F9FC;        /* Fondo en modo claro */
  /* ... */
}
```

---

## 🌐 Publicación / Despliegue

Al ser un sitio estático puro, puede alojarse gratis en:
- **GitHub Pages:** Sube los archivos a un repositorio y habilita Pages desde la configuración.
- **Netlify / Vercel:** Arrastra la carpeta del proyecto a su panel para publicación instantánea con HTTPS.
- Cualquier hosting web cPanel o compartido subiendo los archivos por FTP.

---

## 👤 Créditos y Datos del Negocio
- **Negocio:** La Clínica de la PC
- **Titular:** Alejandro Moisés Nebreda
- **Ubicación:** Urquiza N° 1037 (pasillo al fondo, a la derecha), Salta, Argentina.

