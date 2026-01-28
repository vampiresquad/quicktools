/* =====================================
   QuickTools – Global JavaScript
   Author: QuickTools
   Purpose: Common helpers & UX logic
===================================== */

/* ===============================
   DOM READY
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  /* Auto update footer year */
  const yearElements = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => el.textContent = currentYear);

});

/* ===============================
   COPY TO CLIPBOARD
   (Used in tools like Password Generator, Text Repeater)
=============================== */
function copyToClipboard(text) {
  if (!navigator.clipboard) {
    alert("Clipboard not supported on this browser.");
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => {
      showToast("Copied to clipboard ✔");
    })
    .catch(() => {
      alert("Failed to copy text.");
    });
}

/* ===============================
   SIMPLE INPUT VALIDATION
=============================== */
function isEmpty(value) {
  return !value || value.trim() === "";
}

/* ===============================
   TOAST NOTIFICATION (UX IMPROVEMENT)
   Non-intrusive feedback instead of alert
=============================== */
function showToast(message) {
  let toast = document.getElementById("qt-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "qt-toast";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#0f172a";
    toast.style.color = "#fff";
    toast.style.padding = "10px 16px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "0.85rem";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";

    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2000);
}

/* ===============================
   SMOOTH SCROLL FOR INTERNAL LINKS
=============================== */
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href^='#']");
  if (!link) return;

  e.preventDefault();
  const target = document.querySelector(link.getAttribute("href"));
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
});

/* ===============================
   FUTURE EXTENSIONS (PLANNED)
=============================== */
/*
  - Dark / Light Theme Switcher
  - Google Analytics / GA4
  - AdSense lazy-load logic
  - Shared header/footer injection
  - Appilix mobile hooks
*/

/* =====================================================
   ✅ UI / UX ENHANCEMENTS (APPENDED ONLY)
   Safe, optional, non-breaking
===================================================== */

/* Respect reduced motion preference */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Enhanced toast animation safety */
(function enhanceToastMotion() {
  if (prefersReducedMotion) {
    const toast = document.getElementById("qt-toast");
    if (toast) toast.style.transition = "none";
  }
})();

/* Button loading state helper */
function setButtonLoading(button, isLoading, text = "Processing…") {
  if (!button) return;
  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
    button.style.opacity = "0.85";
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
    button.style.opacity = "1";
  }
}

/* Keyboard focus visibility helper */
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

/* Remove 300ms tap delay feeling on mobile */
document.addEventListener("touchstart", () => {}, { passive: true });
