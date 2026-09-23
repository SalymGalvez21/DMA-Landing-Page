const menuButton = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (menuButton && menu) {
    function closeMenu() {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú principal");
        menu.classList.remove("is-open");
    }

    menuButton.addEventListener("click", function () {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
        const willOpen = !isOpen;

        menuButton.setAttribute("aria-expanded", String(willOpen));

        menuButton.setAttribute(
            "aria-label",
            willOpen ? "Cerrar menú principal" : "Abrir menú principal"
        );

        menu.classList.toggle("is-open", willOpen);
    });

    menu.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
            closeMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
            menuButton.focus();
        }
    });
}

/* Header fijo: sombra al desplazarse */

const header = document.querySelector("[data-header]");

if (header) {
    function updateHeader() {
        header.classList.toggle("is-scrolled", window.scrollY > 10);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
}

/* Enlace activo según la sección visible */

const navLinks = document.querySelectorAll(".main-nav__link");

const sections = Array.from(navLinks)
    .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach(function (link) {
                    const isCurrent = link.getAttribute("href") === "#" + entry.target.id;
                    link.classList.toggle("is-active", isCurrent);
                });
            });
        },
        { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });
}