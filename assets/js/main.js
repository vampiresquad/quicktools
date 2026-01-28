/* =====================================
   QuickTools – Global JavaScript
   Author: QuickTools
   Purpose: Common helpers & UX logic
===================================== */

/* ===============================
   DOM READY & INITIALIZATION
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  /* 1. Auto update footer year */
  const yearElements = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => el.textContent = currentYear);

  /* 2. Highlight Active Menu Item (New) */
  highlightActiveMenuItem();

  /* 3. Secure External Links (New) */
  secureExternalLinks();
});

/* ===============================
   HELPER: Highlight Active Menu
   (Shows user which page they are on)
=============================== */
function highlightActiveMenuItem() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href");
    
    // Match exact path or root path
    if ((currentPath.includes(linkHref) && linkHref !== "/") || 
        (currentPath === "/" && linkHref === "index.html") ||
        (currentPath.endsWith("/") && linkHref === "index.html")) {
      
      link.style.color = "#38bdf8"; // Cyber Blue
      link.style.fontWeight = "600";
      link.style.textDecoration = "underline";
      link.style.textUnderlineOffset = "4px";
    }
  });
}

/* ===============================
   HELPER: Secure External Links
   (Prevents tabnabbing attacks)
=============================== */
function secureExternalLinks() {
  const links = document.querySelectorAll('a[target="_blank"]');
  links.forEach(link => {
    link.setAttribute("rel", "noopener noreferrer");
  });
}

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
   TOAST NOTIFICATION (UX IMPROVED)
   Updated style to match Cyber/Dark Theme
=============================== */
function showToast(message) {
  let toast = document.getElementById("qt-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "qt-toast";
    
    // Styles
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    
    // Glassmorphism Look
    toast.style.background = "rgba(15, 23, 42, 0.9)"; // Dark semi-transparent
    toast.style.backdropFilter = "blur(8px)";
    toast.style.border = "1px solid rgba(56, 189, 248, 0.3)"; // Blue glow border
    toast.style.color = "#fff";
    toast.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
    
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "12px";
    toast.style.fontSize = "0.9rem";
    toast.style.fontWeight = "500";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateX(-50%) translateY(0)";

  // Auto hide
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(10px)";
  }, 2500);
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

/* =====================================================
   ✅ UI / UX ENHANCEMENTS
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
    button.style.cursor = "wait";
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
    button.style.opacity = "1";
    button.style.cursor = "pointer";
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
