/* H4ckd4ne — interactions minimales, sans dépendance. */
(function () {
  "use strict";

  var doc = document;
  var sidebar = doc.getElementById("sidebar");
  var toggle = doc.querySelector(".topbar__toggle");
  var scrim = doc.querySelector(".scrim");

  function setOpen(open) {
    if (!sidebar) return;
    sidebar.classList.toggle("is-open", open);
    if (scrim) scrim.classList.toggle("is-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
    doc.body.classList.toggle("is-locked", open);
    if (open) {
      var first = sidebar.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setOpen(!sidebar.classList.contains("is-open"));
    });
  }

  if (scrim) {
    scrim.addEventListener("click", function () {
      setOpen(false);
      if (toggle) toggle.focus();
    });
  }

  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("is-open")) {
      setOpen(false);
      if (toggle) toggle.focus();
    }
  });

  if (sidebar) {
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a") && window.matchMedia("(max-width: 1023px)").matches) {
        setOpen(false);
      }
    });
  }

  /* Index actif au défilement (pages avec ancres) */
  var links = Array.prototype.slice.call(
    doc.querySelectorAll('.side-nav a[href^="#"]')
  );

  if (links.length) {
    var targets = links.map(function (a) {
      return doc.querySelector(a.getAttribute("href"));
    });

    var setActive = function (index) {
      links.forEach(function (a, i) {
        if (i === index) {
          a.setAttribute("aria-current", "true");
        } else {
          a.removeAttribute("aria-current");
        }
      });
    };

    var onScroll = function () {
      var y = window.scrollY + 160;
      var index = 0;
      for (var i = 0; i < targets.length; i++) {
        if (targets[i] && targets[i].offsetTop <= y) index = i;
      }
      setActive(index);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    links.forEach(function (a, i) {
      a.addEventListener("click", function () {
        setActive(i);
      });
    });
  }

  /* Année du pied de page */
  var year = doc.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
