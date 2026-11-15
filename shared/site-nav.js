(function () {
  document.documentElement.classList.add("site-nav-enabled");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let pendingNavigation = false;

  function navigate(url) {
    const destination = new URL(url, window.location.href);
    if (destination.origin !== window.location.origin || reducedMotion.matches) {
      window.location.assign(destination.href);
      return;
    }

    if (pendingNavigation) return;
    pendingNavigation = true;
    document.body.classList.add("site-nav-leaving");
    window.setTimeout(function () {
      window.location.assign(destination.href);
    }, 300);
  }

  window.siteNav = Object.freeze({ navigate: navigate });

  document.addEventListener("click", function (event) {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a[href]");
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self")
    ) {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search &&
      destination.hash
    ) {
      return;
    }

    event.preventDefault();
    navigate(destination.href);
  });

  function addModuleNavigation() {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const pageFolder = pathParts[pathParts.length - 2];
    const currentPage = {
      earth: "Earth",
      moon: "Moon",
      mars: "Mars"
    }[pageFolder];
    if (!currentPage || document.querySelector(".site-nav-menu")) return true;

    const headerTools = document.querySelector(
      ".header-tools, .header-actions, .topbar-actions"
    );
    if (!headerTools) return false;

    const menu = document.createElement("details");
    menu.className = "site-nav-menu";

    const trigger = document.createElement("summary");
    trigger.className = "site-nav-trigger";
    trigger.setAttribute("aria-label", "Explore site pages");

    const label = document.createElement("span");
    label.className = "site-nav-label";
    label.textContent = "PAGES";
    trigger.append(label);

    const caret = document.createElement("span");
    caret.className = "site-nav-caret";
    caret.setAttribute("aria-hidden", "true");
    caret.textContent = "⌄";
    trigger.append(caret);
    menu.append(trigger);

    const links = document.createElement("nav");
    links.className = "site-nav-links";
    links.setAttribute("aria-label", "Site pages");

    [
      ["Solar System", "../index.html", null],
      ["Earth", "../earth/index.html", "Earth"],
      ["Moon", "../moon/index.html", "Moon"],
      ["Mars", "../mars/index.html", "Mars"]
    ].forEach(function (page) {
      const link = document.createElement("a");
      link.className = "site-nav-link";
      link.href = page[1];
      link.textContent = page[0];
      if (page[2] === currentPage) {
        link.classList.add("site-nav-active");
        link.setAttribute("aria-current", "page");
      }
      links.append(link);
    });

    menu.append(links);
    headerTools.append(menu);
    return true;
  }

  function ensureModuleNavigation() {
    if (addModuleNavigation()) return;

    const observer = new MutationObserver(function () {
      if (addModuleNavigation()) {
        observer.disconnect();
        window.clearTimeout(timeout);
      }
    });
    const timeout = window.setTimeout(function () {
      observer.disconnect();
      if (!document.querySelector(".site-nav-menu")) {
        console.error("Site navigation could not find this module's header controls.");
      }
    }, 5000);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function showPage() {
    document.body.classList.remove("site-nav-leaving");
    document.body.classList.add("site-nav-ready");
  }

  function revealPage() {
    window.requestAnimationFrame(showPage);
    window.setTimeout(showPage, 50);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      ensureModuleNavigation();
      revealPage();
    }, { once: true });
  } else {
    ensureModuleNavigation();
    revealPage();
  }

  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      document.body.classList.remove("site-nav-leaving");
      document.body.classList.add("site-nav-ready");
      pendingNavigation = false;
    }
  });
})();
