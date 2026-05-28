/* --- Theme Toggle ------------------------------------------ */
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const STORAGE_KEY = "nd-theme";

  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia("(prefers-color-scheme: light)").matches)
      return "light";
    return "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "light" ? "#FAFBFD" : "#0A0B0F");
    }
  }

  applyTheme(getInitialTheme());

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? "light" : "dark");
      }
    });
})();


/* --- Year Injector ----------------------------------------- */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});


/* --- Scroll Progress Bar ----------------------------------- */
(function () {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  let ticking = false;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + "%";
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    },
    { passive: true },
  );
})();


/* --- Scroll Reveal ----------------------------------------- */
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );

    els.forEach((el) => observer.observe(el));
  } else {
    els.forEach((el) => el.classList.add("visible"));
  }
})();


/* --- Header Scroll Effect ---------------------------------- */
(function () {
  const header = document.getElementById("site-header");
  if (!header) return;

  let ticking = false;

  function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 20);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    },
    { passive: true },
  );
})();


/* --- Card Spotlight + 3D Tilt ------------------------------ */
(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  const tiltEls = document.querySelectorAll("[data-tilt]");
  if (!tiltEls.length) return;

  const MAX_TILT = 6; // degrees
  const PERSPECTIVE = 1000; // px

  tiltEls.forEach((card) => {
    const spotlight = card.querySelector(".card-spotlight");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      /* Tilt calculation */
      const rotateX = ((y - centerY) / centerY) * -MAX_TILT;
      const rotateY = ((x - centerX) / centerX) * MAX_TILT;

      card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;

      /* Spotlight position */
      if (spotlight) {
        card.style.setProperty("--mouse-x", x + "px");
        card.style.setProperty("--mouse-y", y + "px");
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();


/* --- Hide Scroll Hint on Scroll ---------------------------- */
(function () {
  const hint = document.querySelector(".hero-scroll-hint");
  if (!hint) return;

  let hidden = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!hidden && window.scrollY > 100) {
        hint.style.opacity = "0";
        hint.style.transition = "opacity 0.6s ease";
        hidden = true;
      }
    },
    { passive: true },
  );
})();
