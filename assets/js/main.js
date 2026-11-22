/* H4ckd4ne — interactions minimales, sans dépendance. */
(function () {
  "use strict";

  var doc = document;
  var header = doc.querySelector(".site-header");
  var toggle = doc.querySelector(".nav-toggle");
  var nav = doc.getElementById("nav");

  /* En-tête : ombre au défilement */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });

    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  /* Année du pied de page */
  var year = doc.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
