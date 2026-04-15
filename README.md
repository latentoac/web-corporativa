# Web corporativa de Latento AC
![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Decap CMS](https://img.shields.io/badge/Decap%20CMS-FF0082?style=for-the-badge&logo=decapcms&logoColor=white)
![Tally](https://img.shields.io/badge/Tally-6A5CFF?style=for-the-badge&logo=typeform&logoColor=white)
![Private Repo](https://img.shields.io/badge/Repository-Private-black?style=for-the-badge&logo=github)
![Copyright](https://img.shields.io/badge/License-All%20Rights%20Reserved-red?style=for-the-badge&logo=copyright)

Repositorio privado del código fuente de la nueva web corporativa de **Latento AC**, desarrollada con Astro y desplegada en Netlify. La web actúa como punto central de la presencia digital de Latento: presentación del gabinete, servicios, becas, blog y fichas informativas de talleres. 

> ⚠️ Este repositorio es privado y el código es propietario. No se concede ninguna licencia de uso, copia o distribución sin autorización expresa de Latento AC.

---

## Tecnologías principales

- **Astro** como framework de frontend para generar un sitio estático muy rápido y seguro. 
- **Netlify** como plataforma de despliegue (builds, previews, HTTPS, CDN).
- **Decap CMS** para la edición de contenidos (páginas, blog y fichas de talleres) mediante una interfaz visual en `/admin`.
- **Tally.so** como motor externo de formularios incrustados (contacto, solicitudes de becas y otros formularios específicos). 
- Integración con la **tienda de talleres** existente (WordPress) como pasarela de pago y gestión de plazas.

---

## Funcionalidades clave

- Páginas de presentación del gabinete y del equipo.
- Listado y detalle de servicios profesionales.
- Información sobre becas y formularios de solicitud integrados con Tally.
- Blog gestionado desde Decap CMS (noticias, contenidos y artículos especializados). 
- Fichas informativas de talleres, con categoría, descripción, fechas, precios orientativos y botón de inscripción hacia la tienda o formularios específicos. 

---

## Estructura general del proyecto

La estructura concreta puede variar, pero a alto nivel:

- `src/` – Páginas y componentes Astro.
- `public/` – Activos estáticos (imágenes, fuentes, etc.).
- `netlify.toml` – Configuración de build y deploy en Netlify.
- `config/` o `admin/` – Configuración de Decap CMS (colecciones de contenidos).
- `forms/` (opcional) – Referencias y configuración de formularios Tally (IDs, URLs de incrustación). 

---

## Desarrollo local

> Esta sección se ajustará cuando el proyecto esté inicializado con Astro.

Pasos habituales de desarrollo:

1. Clonar el repositorio (acceso restringido).
2. Instalar dependencias:

   ```bash
   npm install
