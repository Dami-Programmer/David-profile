const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------
// Typing effect for the role line.
// The first role is already in the HTML, so the page reads fine
// without JavaScript or when the visitor prefers reduced motion.
// ---------------------------------------------------------------
const texts = ["Front-end Developer", "Web Developer"];
const typingSpeed = 55;
const eraseSpeed = 35;
const delayBetween = 2600;

let textIndex = 0;
let charIndex = 0;
const textElement = document.getElementById("text");

function type() {
  if (charIndex < texts[textIndex].length) {
    textElement.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetween);
  }
}

function erase() {
  if (charIndex > 0) {
    textElement.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, eraseSpeed);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, typingSpeed);
  }
}

if (!reduceMotion && textElement) {
  // start from the full first role, then erase it and begin the loop
  charIndex = texts[0].length;
  setTimeout(erase, delayBetween);
}

// ---------------------------------------------------------------
// Contact popup (two buttons open the same popup)
// ---------------------------------------------------------------
const triggers = [
  document.getElementById("triggerPopup"),
  document.getElementById("triggerPopup2"),
].filter(Boolean);
const popupOverlay = document.getElementById("popupOverlay");
const popupContent = document.getElementById("popupContent");
const closeBtn = document.getElementById("closePopup");
let lastTrigger = null;

function animate(opts) {
  // anime.js loads with "defer"; fall back to plain CSS if it is not ready
  if (!reduceMotion && window.anime) return anime(opts);
  return null;
}

function openPopup(trigger) {
  lastTrigger = trigger;
  popupOverlay.classList.add("active");
  popupContent.classList.add("active");
  popupOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");

  animate({
    targets: popupContent,
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 600,
    easing: "easeOutElastic(1, .8)",
  });
  animate({
    targets: popupOverlay,
    opacity: [0, 1],
    duration: 400,
    easing: "easeOutQuad",
  });
  animate({
    targets: ".contact-item",
    translateY: [30, 0],
    opacity: [0, 1],
    delay: window.anime ? anime.stagger(120) : 0,
    duration: 600,
    easing: "easeOutQuad",
  });

  closeBtn.focus();
}

function finishClose() {
  popupOverlay.classList.remove("active");
  popupContent.classList.remove("active");
  popupOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  if (lastTrigger) lastTrigger.focus();
}

function closePopup() {
  if (!popupOverlay.classList.contains("active")) return;
  const exit = animate({
    targets: popupContent,
    scale: [1, 0.8],
    opacity: [1, 0],
    duration: 350,
    easing: "easeInQuad",
  });
  const fade = animate({
    targets: popupOverlay,
    opacity: [1, 0],
    duration: 300,
    easing: "easeInQuad",
    complete: finishClose,
  });
  if (!exit && !fade) finishClose();
}

triggers.forEach((t) => t.addEventListener("click", () => openPopup(t)));
closeBtn.addEventListener("click", closePopup);

popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) closePopup();
});

// Escape closes; Tab stays inside the popup while it is open
document.addEventListener("keydown", (e) => {
  if (!popupOverlay.classList.contains("active")) return;
  if (e.key === "Escape") {
    closePopup();
    return;
  }
  if (e.key === "Tab") {
    const focusable = popupOverlay.querySelectorAll("a[href], button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});


// ---------------------------------------------------------------
// Download buttons: show "Downloading..." for a moment after a click
// ---------------------------------------------------------------
document.querySelectorAll("a.btn[download]").forEach((btn) => {
  const label = btn.querySelector("span");
  if (!label) return;
  const original = label.textContent;
  btn.addEventListener("click", () => {
    btn.classList.add("is-downloading");
    label.textContent = "Downloading...";
    setTimeout(() => {
      btn.classList.remove("is-downloading");
      label.textContent = original;
    }, 1800);
  });
});


// ---------------------------------------------------------------
// Light / dark theme
// Follows the visitor's device until they press the toggle; then
// their choice is remembered on this browser.
// ---------------------------------------------------------------
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const BG = { light: "#f6f5f1", dark: "#0f100e" };

  const current = () => root.getAttribute("data-theme") || (media.matches ? "dark" : "light");

  function paint() {
    const theme = current();
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", BG[theme]));
  }

  btn.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    paint();
  });

  if (media.addEventListener) {
    media.addEventListener("change", () => {
      let saved = null;
      try {
        saved = localStorage.getItem("theme");
      } catch (e) {}
      if (!saved) paint();
    });
  }
  paint();
})();
