//-------------------------------------------------
//-------------------------------------------------
// Get config, set title/branding/footer, and apply accent colors
const isInPages = window.location.pathname.includes('/pages/');
const CONFIG_URL = isInPages ? '../data/config.json' : './data/config.json';

fetch(CONFIG_URL)
    .then(res => res.json())
    .then(config => {
        const baseName = config.name || "CP-Folio";
        const pageTitle = document.body?.dataset?.pageTitle || "CP-Folio";
        document.title = `${pageTitle} | ${baseName}`;

        const footer = document.getElementById('footer-text');
        const titleName = document.getElementById("username_ind");
        if (titleName) {
            titleName.textContent = `${baseName} | CP-Folio`;
        }
        if (footer) {
            footer.textContent = `© ${new Date().getFullYear()} ${baseName}`;
        }

        // Apply user accent color if provided
        if (config.color) {
            const root = document.documentElement;
            root.style.setProperty('--accent', config.color);
            root.style.setProperty('--accent-2', config.color);
        }
    })
    .catch(() => {
        const footer = document.getElementById('footer-text');
        if (footer) {
            footer.textContent = `© ${new Date().getFullYear()} CP-Folio`;
        }
    });
//-------------------------------------------------
//-------------------------------------------------

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (siteNav.classList.contains('is-open')) {
                siteNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}
