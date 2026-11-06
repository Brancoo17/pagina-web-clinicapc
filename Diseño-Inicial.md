# Diseño Inicial — Sitio web de "La Clínica de la PC"

> Documento de especificación para el agente de desarrollo (Antigravity IDE).
> Objetivo: construir una landing page moderna, rápida y responsive para un negocio local de servicio técnico informático.

---

## 1. Resumen del proyecto

| Campo | Detalle |
|---|---|
| **Negocio** | La Clínica de la PC |
| **Rubro** | Computación: servicio técnico (PC, impresoras, monitores) e insumos |
| **Tipo de sitio** | Landing page de una sola página (single-page) informativa |
| **Objetivo principal** | Que el visitante entienda qué servicios ofrece el negocio y lo contacte rápido (WhatsApp / teléfono) |
| **Idioma** | Español (Argentina), `lang="es-AR"` |
| **Público** | Vecinos y negocios de la zona que necesitan reparar o mantener equipos |

### Stack obligatorio

- **HTML5** semántico
- **CSS3** puro (variables CSS, Grid, Flexbox, `clamp()`, media queries)
- **JavaScript vanilla** (ES6+, sin frameworks ni librerías)
- **Sin build tools, sin npm, sin backend.** Debe funcionar abriendo `index.html` directamente o publicándolo en cualquier hosting estático (GitHub Pages, Netlify, etc.).
- Única dependencia externa permitida: Google Fonts (con fallback a fuentes del sistema).

---

## 2. Datos del negocio

> Fuente: logo y folleto provistos por el cliente. Usar estos datos tal cual, sin inventar otros.

| Dato | Valor |
|---|---|
| Nombre comercial | **La Clínica de la PC** |
| Titular (aparece en el folleto) | Alejandro Moisés Nebreda |
| Eslogan en el logo | "Servicio Técnico" |
| Rubros del folleto | Computación · Servicio técnico · Insumos |
| Equipos que atienden | P.C., Impresoras, Monitores |
| Dirección | Urquiza N° 1037 — pasillo al fondo, a la derecha |
| Celular | (387) 15-4829499 (en el logo figura como 387 4829499) |
| Email | moisesnebreda@hotmail.com |
| Ciudad / Provincia | Salta, Argentina *(inferido por el código de área 387; confirmar con el cliente)* |

### Enlaces de contacto a usar

- **Teléfono:** `tel:+543874829499`
- **WhatsApp:** `https://wa.me/5493874829499` (formato internacional para celulares de Argentina: `54` + `9` + código de área sin 0 + número sin 15)
- **WhatsApp con mensaje prellenado:** `https://wa.me/5493874829499?text=Hola%2C%20quisiera%20consultar%20por%20el%20servicio%20t%C3%A9cnico`
- **Email:** `mailto:moisesnebreda@hotmail.com`
- **Mapa:** iframe de Google Maps con la búsqueda `Urquiza 1037, Salta, Argentina` (usar la URL de embed sin API key: `https://www.google.com/maps?q=Urquiza+1037,+Salta,+Argentina&output=embed`)

### Datos pendientes (dejar como placeholder editable, NO inventar)

- Horarios de atención
- Precios o presupuestos
- Redes sociales (Instagram / Facebook)
- Fotos reales del local o del trabajo
- Testimonios reales de clientes
- Años de experiencia

Marcar cada placeholder en el código con un comentario `<!-- TODO: confirmar con el cliente -->`.

---

## 3. Identidad visual

El logo es circular: una **cruz blanca** sobre cuatro cuadrantes **azules** (guiño a una "clínica"), con el texto "SERVICIO TECNICO" en azul índigo sobre la barra horizontal, y el texto "LA CLÍNICA DE LA PC" y el teléfono en rojo/naranja bordeando el círculo.

### Paleta de colores (tokens CSS)

Los valores son aproximaciones tomadas del logo; el agente puede ajustarlos levemente para lograr contraste accesible.

```css
:root {
  /* Marca */
  --color-primary: #1E7FE0;        /* azul de los cuadrantes del logo */
  --color-primary-dark: #1558A8;
  --color-secondary: #3F4FA0;      /* índigo de "SERVICIO TECNICO" */
  --color-accent: #F0402F;         /* rojo del nombre */
  --color-accent-soft: #F26B3A;    /* naranja del teléfono */

  /* Neutros */
  --color-bg: #F7F9FC;
  --color-surface: #FFFFFF;
  --color-text: #0F1B2D;
  --color-text-muted: #55627A;
  --color-border: #E3E8F0;

  /* Gradientes */
  --gradient-hero: linear-gradient(135deg, #0B1E3F 0%, #1558A8 55%, #1E7FE0 100%);
}
```

- Incluir **modo oscuro** automático con `@media (prefers-color-scheme: dark)` redefiniendo los tokens de neutros.
- El **rojo (`--color-accent`)** se reserva para CTAs y detalles puntuales; el azul domina la interfaz.
- Verificar contraste mínimo **WCAG AA** (4.5:1 en texto normal).

### Tipografía

- **Títulos:** `Sora` o `Poppins` (600–700)
- **Texto:** `Inter` (400–500)
- Fallback: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- Escala fluida con `clamp()`, por ejemplo `font-size: clamp(2rem, 5vw, 3.5rem)` para el H1.

### Estilo general ("moderno")

- Mucho espacio en blanco, layout limpio, tarjetas con bordes redondeados (`border-radius: 16–20px`) y sombras suaves.
- Hero con gradiente azul oscuro y el logo bien visible.
- Iconos en **SVG inline** (sin librerías de iconos). Estilo de línea, consistente.
- Detalle de marca: usar la **cruz del logo** como motivo gráfico sutil (por ejemplo, patrón decorativo de fondo en baja opacidad o separadores de sección).
- Microinteracciones: hover en tarjetas (elevación + leve desplazamiento), botones con transición suave.
- Animaciones de entrada al hacer scroll con `IntersectionObserver` (fade + slide-up). Respetar `prefers-reduced-motion`.

---

## 4. Estructura de la página

Una sola página con navegación por anclas (`#inicio`, `#servicios`, etc.) y `scroll-behavior: smooth`.

### 4.1 Header / Navbar (sticky)

- Logo (imagen) + nombre "La Clínica de la PC".
- Links: Inicio · Servicios · Cómo trabajamos · Contacto.
- Botón CTA a la derecha: **"WhatsApp"**.
- Menú hamburguesa en móvil (JS, accesible: `aria-expanded`, cierre con `Esc` y al hacer clic en un link).
- Fondo translúcido con `backdrop-filter: blur()` y sombra al hacer scroll (clase agregada por JS).

### 4.2 Hero (`#inicio`)

- H1: **"Tu PC en buenas manos"** *(o similar, a criterio del agente)*.
- Subtítulo: "Servicio técnico de computadoras, impresoras y monitores. Venta de insumos."
- Dos botones: **"Consultar por WhatsApp"** (primario) y **"Ver servicios"** (secundario).
- Elemento visual: el logo grande o una ilustración SVG de PC/monitor con la cruz de la marca.
- Fila de "badges" de confianza (solo con datos reales): `Servicio técnico` · `Insumos` · `Atención personalizada`.

### 4.3 Servicios (`#servicios`)

Grilla de tarjetas (1 columna en móvil, 2 en tablet, 3–4 en desktop). Cada tarjeta: icono SVG + título + descripción corta.

**Servicios que figuran en el folleto (obligatorios):**

1. **Servicio técnico de PC**: diagnóstico y reparación de computadoras de escritorio y notebooks.
2. **Impresoras**: reparación y mantenimiento de impresoras.
3. **Monitores**: reparación y revisión de monitores.
4. **Insumos**: venta de insumos informáticos.
5. **Computación en general**: asesoramiento y soluciones para el hogar y el comercio.

**Servicios sugeridos (marcar como "a confirmar con el cliente" en un comentario; incluir solo si el cliente lo valida):**

- Mantenimiento preventivo y limpieza
- Instalación de sistema operativo y programas
- Ampliación de memoria / cambio de disco
- Eliminación de virus y optimización
- Armado de PC a medida

### 4.4 Cómo trabajamos (`#proceso`)

Línea de tiempo o pasos numerados (usar la metáfora de "clínica"):

1. **Consulta**: nos contás qué le pasa a tu equipo.
2. **Diagnóstico**: revisamos el equipo y te explicamos el problema.
3. **Reparación**: lo resolvemos.
4. **Entrega**: probamos que todo funcione y te lo devolvemos.

> Mantener los textos genéricos y no prometer plazos ni garantías que el cliente no confirmó.

### 4.5 Por qué elegirnos (opcional, breve)

3 puntos con icono, basados solo en datos reales: atención personalizada, local en el centro de la ciudad *(confirmar)*, servicio + insumos en un mismo lugar.

### 4.6 Contacto y ubicación (`#contacto`)

Layout en dos columnas (apilado en móvil):

- **Columna 1:** tarjetas con dirección, celular, email y horarios (placeholder). Botones grandes: **"Escribir por WhatsApp"** y **"Llamar"**.
- **Columna 2:** mapa de Google Maps embebido (`loading="lazy"`, `title` descriptivo).
- Nota de ubicación: "Pasillo al fondo, a la derecha" (tal como figura en el folleto).

**Formulario de contacto (opcional, sin backend):**
Campos: nombre, tipo de equipo (select: PC / Impresora / Monitor / Otro), mensaje. Al enviar, JS construye el texto y abre `wa.me` con el mensaje prellenado. Validar los campos antes de abrir.

### 4.7 Footer

- Logo pequeño, nombre, dirección, contacto.
- Año actual generado con JS (`new Date().getFullYear()`).
- Texto: "© {año} La Clínica de la PC. Todos los derechos reservados."

### 4.8 Elementos flotantes

- **Botón flotante de WhatsApp** (abajo a la derecha) visible en toda la página, con SVG del ícono y un sutil efecto de pulso (desactivado con `prefers-reduced-motion`).
- Botón "volver arriba" que aparece tras cierto scroll (opcional).

---

## 5. Estructura de archivos

```
clinica-de-la-pc/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    └── img/
        ├── logo.png          ← logo provisto por el cliente
        ├── favicon.svg       ← derivado de la cruz del logo
        └── og-image.jpg      ← imagen para compartir en redes (1200×630)
```

> El logo original llegó como foto de una pantalla (con reflejos y marco). Si es posible, usarlo recortado; de lo contrario, **recrear una versión vectorial (SVG)** del logo: círculo con cruz blanca y cuatro cuadrantes azules. Pedirle al cliente el archivo original en alta resolución.

---

## 6. Requisitos técnicos

### HTML

- Etiquetas semánticas: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Un solo `<h1>`; jerarquía de títulos correcta.
- `alt` descriptivo en imágenes; iconos decorativos con `aria-hidden="true"`.
- Meta viewport, `theme-color` y `color-scheme`.

### CSS

- Enfoque **mobile-first**. Breakpoints sugeridos: `640px`, `768px`, `1024px`, `1280px`.
- Variables CSS para colores, espaciados, radios y sombras.
- Nada de `!important`; nombres de clases claros (BEM simplificado, por ejemplo `.card`, `.card__title`).
- `:focus-visible` con estilo visible en todos los elementos interactivos.

### JavaScript

- Código modular y comentado, en un solo `main.js`, dentro de un `DOMContentLoaded`.
- Funciones esperadas: menú móvil, sombra del header al hacer scroll, animaciones de revelado con `IntersectionObserver`, resaltado del link activo según la sección visible, formulario → WhatsApp, año del footer, botón volver arriba.
- Sin dependencias, sin `jQuery`.

### SEO

- `<title>`: "La Clínica de la PC | Servicio técnico de computadoras, impresoras y monitores en Salta" *(confirmar ciudad)*.
- `meta description` (150–160 caracteres), Open Graph y Twitter Card.
- Datos estructurados **JSON-LD** de tipo `LocalBusiness` (nombre, dirección, teléfono, email, rubro).

Ejemplo base:

```json
{
  "@context": "https://schema.org",
  "@type": "ComputerRepairService",
  "name": "La Clínica de la PC",
  "telephone": "+5493874829499",
  "email": "moisesnebreda@hotmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Urquiza 1037",
    "addressLocality": "Salta",
    "addressCountry": "AR"
  }
}
```

### Accesibilidad

- Navegación completa por teclado, enlace "Saltar al contenido".
- Contraste AA, tamaños táctiles mínimos de 44×44 px.
- Respetar `prefers-reduced-motion` y `prefers-color-scheme`.

### Rendimiento

- Objetivo Lighthouse: **90+ en las 4 categorías**.
- Imágenes optimizadas (WebP/SVG), `loading="lazy"` en lo que esté bajo el pliegue, dimensiones `width`/`height` declaradas.
- Peso total de la página menor a 500 KB (sin contar el mapa).
- `<link rel="preconnect">` para Google Fonts y `font-display: swap`.

---

## 7. Tono y textos

- Español rioplatense, cercano y profesional (voseo: "contanos", "escribinos").
- Frases cortas, sin tecnicismos innecesarios, enfocadas en resolver problemas del cliente.
- No prometer garantías, plazos ni precios sin confirmación del cliente.

---

## 8. Criterios de aceptación

- [ ] Se visualiza correctamente en móvil (360 px), tablet y desktop.
- [ ] Todos los botones de WhatsApp, teléfono y email funcionan con los datos correctos.
- [ ] El mapa carga la dirección correcta.
- [ ] El menú móvil funciona con mouse, toque y teclado.
- [ ] No hay errores en la consola del navegador.
- [ ] El HTML valida sin errores graves (W3C Validator).
- [ ] Lighthouse 90+ en Rendimiento, Accesibilidad, Buenas prácticas y SEO.
- [ ] Todos los datos no confirmados están marcados con `TODO`.

---

## 9. Plan de trabajo sugerido para el agente

1. Crear la estructura de carpetas y el `index.html` con el esqueleto semántico y el contenido real.
2. Definir los tokens de diseño y estilos base en `styles.css` (reset, tipografía, utilidades).
3. Maquetar cada sección en orden: header → hero → servicios → proceso → contacto → footer.
4. Agregar interacciones en `main.js`.
5. Optimizar SEO, accesibilidad y rendimiento.
6. Probar en distintos tamaños de pantalla y revisar los criterios de aceptación.
7. Redactar un `README.md` breve con instrucciones para editar textos/colores y publicar el sitio.

---

## 10. Fuera de alcance (por ahora)

- Tienda online o carrito de compras.
- Panel de administración o base de datos.
- Sistema de turnos o seguimiento de reparaciones.
- Blog.

*(Se podrían evaluar en una segunda etapa si el cliente lo requiere.)*
