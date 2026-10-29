/**
 * Promise Igbo — Portfolio scripts
 * Vanilla JavaScript, no dependencies, works on GitHub Pages (static hosting).
 *
 * Sections:
 *   1. SITE_CONFIG  — your contact links live here (edit this first!)
 *   2. Config links — applies SITE_CONFIG to every [data-config-link] / [data-config-text]
 *   3. Placeholder links — friendly message instead of a broken link
 *   4. Theme toggle (dark / light, remembered in localStorage)
 *   5. Mobile navigation (hamburger menu, keyboard accessible)
 *   6. Active navigation highlighting
 *   7. Header shadow on scroll
 *   8. Scroll reveal animations (respects reduced motion)
 *   9. Footer year
 */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
   * 1. SITE_CONFIG — replace the [ADD ...] values with your real details.
   *    Anything still starting with "[ADD" is treated as a placeholder:
   *    the related buttons show a hint instead of opening a broken link.
   * ---------------------------------------------------------------------- */
  var SITE_CONFIG = {
    email: "[ADD EMAIL]",                       // e.g. "you@example.com"
    githubUrl: "[ADD GITHUB URL]",              // e.g. "https://github.com/your-username"
    linkedinUrl: "[ADD LINKEDIN URL]",          // e.g. "https://www.linkedin.com/in/your-profile"
    cvUrl: "assets/documents/Promise-Igbo-CV.pdf", // relative path — keep it relative for GitHub Pages
    location: "Nigeria",
    emailSubject: "Hello Promise — opportunity / collaboration"
  };

  var root = document.documentElement;

  /** True when a value is empty or still an "[ADD ...]" placeholder. */
  function isPlaceholder(value) {
    return !value || /^\s*\[ADD/i.test(value);
  }

  /** "https://www.linkedin.com/in/name/" -> "linkedin.com/in/name" (for display only). */
  function prettyUrl(url) {
    return url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");
  }

  /* ------------------------------------------------------------------------
   * 2. Apply SITE_CONFIG to links and text
   * ---------------------------------------------------------------------- */
  function applyConfig() {
    var links = {
      email: {
        value: SITE_CONFIG.email,
        href: "mailto:" + SITE_CONFIG.email + "?subject=" + encodeURIComponent(SITE_CONFIG.emailSubject),
        external: false,
        label: "[ADD EMAIL]"
      },
      github: { value: SITE_CONFIG.githubUrl, href: SITE_CONFIG.githubUrl, external: true, label: "[ADD GITHUB URL]" },
      linkedin: { value: SITE_CONFIG.linkedinUrl, href: SITE_CONFIG.linkedinUrl, external: true, label: "[ADD LINKEDIN URL]" },
      cv: { value: SITE_CONFIG.cvUrl, href: SITE_CONFIG.cvUrl, external: false, label: "[ADD CV]" }
    };

    document.querySelectorAll("[data-config-link]").forEach(function (el) {
      var cfg = links[el.getAttribute("data-config-link")];
      if (!cfg) return;

      if (isPlaceholder(cfg.value)) {
        el.setAttribute("href", "#");
        el.setAttribute("data-placeholder", cfg.label);
        return;
      }

      el.setAttribute("href", cfg.href);
      el.removeAttribute("data-placeholder");
      if (cfg.external) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    });

    var texts = {
      email: SITE_CONFIG.email,
      github: isPlaceholder(SITE_CONFIG.githubUrl) ? SITE_CONFIG.githubUrl : prettyUrl(SITE_CONFIG.githubUrl),
      linkedin: isPlaceholder(SITE_CONFIG.linkedinUrl) ? SITE_CONFIG.linkedinUrl : prettyUrl(SITE_CONFIG.linkedinUrl),
      location: SITE_CONFIG.location
    };

    document.querySelectorAll("[data-config-text]").forEach(function (el) {
      var value = texts[el.getAttribute("data-config-text")];
      if (value === undefined) return;
      el.textContent = value;
      el.classList.toggle("ph", isPlaceholder(value));
    });
  }

  /* ------------------------------------------------------------------------
   * 3. Placeholder links: mark them and explain on click
   * ---------------------------------------------------------------------- */
  var toast = document.getElementById("toast");
  var toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 3800);
  }

  function markPlaceholders() {
    document.querySelectorAll("a[data-placeholder]").forEach(function (el) {
      el.classList.add("is-placeholder");
      el.setAttribute("title", "Placeholder link: " + el.getAttribute("data-placeholder"));
    });
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[data-placeholder]");
    if (!link) return;
    event.preventDefault();
    showToast("This link is a placeholder (" + link.getAttribute("data-placeholder") + "). It will work once it is updated.");
  });

  /* ------------------------------------------------------------------------
   * 4. Theme toggle (initial theme is set in <head> to avoid a flash)
   * ---------------------------------------------------------------------- */
  var themeToggle = document.querySelector(".theme-toggle");

  function updateThemeButton() {
    if (!themeToggle) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", "Switch to " + next + " theme");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage may be blocked */ }
      updateThemeButton();
    });
  }

  /* ------------------------------------------------------------------------
   * 5. Mobile navigation
   * ---------------------------------------------------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");

  function setNav(open) {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    siteNav.classList.toggle("is-open", open);
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a link
    siteNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setNav(false);
    });

    // Close with Escape and return focus to the toggle
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        navToggle.focus();
      }
    });

    // Close when clicking outside the header
    document.addEventListener("click", function (event) {
      if (navToggle.getAttribute("aria-expanded") === "true" && !event.target.closest(".site-header")) {
        setNav(false);
      }
    });

    // Reset when resizing to desktop
    window.matchMedia("(min-width: 961px)").addEventListener("change", function (mq) {
      if (mq.matches) setNav(false);
    });
  }

  /* ------------------------------------------------------------------------
   * 6. Active navigation highlighting
   * ---------------------------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var linkById = {};
  navLinks.forEach(function (link) {
    linkById[link.getAttribute("href").slice(1)] = link;
  });

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link === linkById[id];
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // Sections without a nav link (hero, education) clear or keep the nearest one
        if (entry.target.id === "home") setActive(null);
        else if (linkById[entry.target.id]) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    document.querySelectorAll("main section[id]").forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ------------------------------------------------------------------------
   * 7. Header shadow once the page is scrolled
   * ---------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ------------------------------------------------------------------------
   * 8. Scroll reveal (CSS disables motion for prefers-reduced-motion users)
   * ---------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ------------------------------------------------------------------------
   * 9. Footer year
   * ---------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Init */
  applyConfig();
  markPlaceholders();
  updateThemeButton();
  onScroll();
})();
