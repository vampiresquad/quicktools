/* ===============================
   QuickTools Global JavaScript
   =============================== */

/* Auto update footer year */
document.addEventListener("DOMContentLoaded", () => {
  const yearElements = document.querySelectorAll(".current-year");
  const year = new Date().getFullYear();
  yearElements.forEach(el => el.textContent = year);
});

/* Copy to clipboard helper */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}

/* Simple input validation helper */
function isEmpty(value) {
  return !value || value.trim() === "";
}

/* Future ready:
   - Theme switcher
   - Analytics
   - Ads logic
   - Common navigation
*/
