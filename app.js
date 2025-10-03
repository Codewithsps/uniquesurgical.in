
      // -- Helper to safely query elements (returns null if not found)
      const $ = (id) => document.getElementById(id);

      // Elements (may be null)
      const menuToggle = $("menu-toggle");
      const megaMenu = $("mega-menu");
      const hamburgerIcon = $("hamburger-icon");
      const closeIcon = $("close-icon");

      const dropdownBtn = $("dropdown-btn");
      const dropdownMenu = $("dropdown-menu");

      const themeToggleBtn = $("theme-toggle");
      const lightIcon = $("theme-toggle-light-icon"); // sun (shown when dark)
      const darkIcon = $("theme-toggle-dark-icon");   // moon (shown when light)

      // ---------- Mobile menu toggle ----------
      if (menuToggle && megaMenu) {
        menuToggle.addEventListener("click", () => {
          megaMenu.classList.toggle("hidden");
          hamburgerIcon?.classList.toggle("hidden");
          closeIcon?.classList.toggle("hidden");
          // update aria-expanded
          const expanded = menuToggle.getAttribute("aria-expanded") === "true";
          menuToggle.setAttribute("aria-expanded", (!expanded).toString());
        });
      }

      // ---------- Dropdown open/close with animation ----------
      const openDropdown = () => {
        if (!dropdownMenu) return;
        dropdownMenu.classList.remove("hidden");
        // ensure the transition runs
        requestAnimationFrame(() => {
          dropdownMenu.classList.remove("opacity-0", "scale-95");
          dropdownMenu.classList.add("opacity-100", "scale-100");
        });
      };
      const closeDropdown = () => {
        if (!dropdownMenu) return;
        dropdownMenu.classList.remove("opacity-100", "scale-100");
        dropdownMenu.classList.add("opacity-0", "scale-95");
        // wait for transition to complete then hide
        setTimeout(() => dropdownMenu.classList.add("hidden"), 200);
      };

      if (dropdownBtn) {
        dropdownBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const isOpen = dropdownBtn.getAttribute("aria-expanded") === "true";
          dropdownBtn.setAttribute("aria-expanded", (!isOpen).toString());
          if (isOpen) closeDropdown();
          else openDropdown();
        });
      }

      // Close dropdown when clicking outside or pressing Esc
      document.addEventListener("click", (ev) => {
        if (!dropdownBtn || !dropdownMenu) return;
        if (!dropdownBtn.contains(ev.target) && !dropdownMenu.contains(ev.target)) {
          dropdownBtn.setAttribute("aria-expanded", "false");
          closeDropdown();
        }
      });
      document.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") {
          if (dropdownBtn) dropdownBtn.setAttribute("aria-expanded", "false");
          closeDropdown();
        }
      });

      // ---------- Dark mode toggle (defensive, and logical icons) ----------
      // Behavior: when site is LIGHT → show *moon* icon (darkIcon) so user can switch to dark.
      // When site is DARK → show *sun* icon (lightIcon) so user can switch to light.
      (function initThemeToggle() {
        if (!themeToggleBtn || !lightIcon || !darkIcon) {
          // missing elements — nothing to do
          return;
        }

        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        const saved = localStorage.getItem("color-theme"); // 'dark' or 'light' or null
        const isDark = (saved === "dark") || (saved === null && prefersDark);

        if (isDark) {
          document.documentElement.classList.add("dark");
          lightIcon.classList.remove("hidden"); // show sun to switch to light
          darkIcon.classList.add("hidden");
        } else {
          document.documentElement.classList.remove("dark");
          lightIcon.classList.add("hidden");
          darkIcon.classList.remove("hidden"); // show moon to switch to dark
        }

        themeToggleBtn.addEventListener("click", () => {
          const nowDark = document.documentElement.classList.toggle("dark");
          localStorage.setItem("color-theme", nowDark ? "dark" : "light");
          if (nowDark) {
            lightIcon.classList.remove("hidden");
            darkIcon.classList.add("hidden");
          } else {
            lightIcon.classList.add("hidden");
            darkIcon.classList.remove("hidden");
          }
        });
      })();
   // JS to Rotate Messages

  document.addEventListener("DOMContentLoaded", () => {
    const bubble = document.getElementById("whatsapp-bubble");
    const bubbleText = document.getElementById("bubble-text");

   const messages = [
  "💬 Surgical instruments & solutions.",
  "✅ Certified quality. Reliable service.",
  "👉 Connect on WhatsApp now."
];

    let i = 0;

    // Show bubble initially
    bubble.classList.remove("hidden");

    setInterval(() => {
      bubbleText.textContent = messages[i];
      i = (i + 1) % messages.length;
    }, 3000); // change every 3 seconds
  });

const images = [
    "https://cdn.pixabay.com/photo/2021/06/08/11/27/mushrooms-6320451_1280.jpg",
    "https://cdn.pixabay.com/photo/2025/09/07/16/17/ornamental-gourds-9820797_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/03/31/07/25/pumpkin-2190584_1280.jpg"
  ];

  let index = 0;
  const sliderImage = document.getElementById("slider-image");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  function showImage(i) {
    index = (i + images.length) % images.length;

    // Fade out
    sliderImage.classList.add("opacity-0");

    setTimeout(() => {
      sliderImage.src = images[index];
      // Fade in after image loads
      sliderImage.onload = () => {
        sliderImage.classList.remove("opacity-0");
      };
    }, 300); // match half of transition time
  }

  prevBtn.addEventListener("click", () => {
    showImage(index - 1);
    resetAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    showImage(index + 1);
    resetAutoSlide();
  });

  // Auto slide every 3s
  let autoSlide = setInterval(() => {
    showImage(index + 1);
  }, 3000);

  // Reset auto slide if user clicks
  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      showImage(index + 1);
    }, 3000);
  }

