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