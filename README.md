# Zahan

Personal portfolio and marketing site — static HTML with a dark, glassmorphism-style UI, smooth scrolling, and dedicated inner pages.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home — hero, about, services, portfolio, testimonials, education, skills, blog preview, contact |
| `about.html` | About profile and story |
| `contact.html` | Contact form and details |
| `services.html` | Services listing |
| `service-details.html` | Single service layout |
| `projects.html` | Projects listing |
| `project-details.html` | Single project / case study |
| `blog.html` | Blog listing with pagination |
| `blog-details.html` | Single post layout |

## Stack

- **HTML5**, **Bootstrap 5** (bundle for components / grid)
- **CSS**: compiled `assets/css/style.css`; **SCSS** sources under `assets/scss/`
- **JS**: jQuery, GSAP / ScrollSmoother, Swiper, WOW.js, Jarallax, and custom logic in `assets/js/main.js`
- **Contact form**: posts to `assets/mail.php` (configure for your host / mailer)

## Local preview

Open `index.html` in a browser, or serve the folder with any static server (for example VS Code Live Server) so asset paths and PHP (if used) behave as on a real host.

## Styles (SCSS)

Design tokens and theme colors live mainly in `assets/scss/utils/_colors.scss` and related partials. After editing SCSS, compile to `assets/css/style.css` using your Sass toolchain (CLI, VS Code extension, etc.). This repo includes an up-to-date `style.css` for use without a build step.

## License / credits

Template and assets are used per your agreement with the original theme author (e.g. Beepcoder). Update this section if you apply a specific license to your fork.
