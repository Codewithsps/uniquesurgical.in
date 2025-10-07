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
const darkIcon = $("theme-toggle-dark-icon"); // moon (shown when light)

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

// ---------- Dark mode toggle (only if user clicks) ----------

(function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const lightIcon = document.getElementById("theme-toggle-light-icon");
  const darkIcon = document.getElementById("theme-toggle-dark-icon");

  if (!themeToggleBtn || !lightIcon || !darkIcon) return;

  const savedTheme = localStorage.getItem("color-theme"); // 'dark' | 'light' | null

  // --- Apply theme ---
  function applyTheme(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
    lightIcon.classList.toggle("hidden", !isDark); // show sun in dark mode
    darkIcon.classList.toggle("hidden", isDark);   // show moon in light mode
  }

  // Default: Light mode (no dark unless user clicked)
  applyTheme(savedTheme === "dark");

  // --- When user clicks, toggle + save preference ---
  themeToggleBtn.addEventListener("click", () => {
    const isNowDark = !document.documentElement.classList.contains("dark");
    applyTheme(isNowDark);
    localStorage.setItem("color-theme", isNowDark ? "dark" : "light");
  });
})();

// JS to Rotate Messages

document.addEventListener("DOMContentLoaded", () => {
  const bubble = document.getElementById("whatsapp-bubble");
  const bubbleText = document.getElementById("bubble-text");

  const messages = [
    "💬 Surgical instruments & solutions.",
    "✅ Certified quality. Reliable service.",
    "👉 Connect on WhatsApp now.",
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
  "https://cdn.pixabay.com/photo/2020/03/03/12/15/mask-4898571_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/08/22/10/37/ai-generated-8988975_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/09/13/18/24/ai-generated-9045654_1280.jpg",
];

let index = 0;
const sliderImage = document.getElementById("slider-image");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Preload images to prevent black flicker
images.forEach((src) => {
  const img = new Image();
  img.src = src;
});

function showImage(i) {
  index = (i + images.length) % images.length;

  // Fade out current image smoothly
  sliderImage.style.transition = "opacity 0.6s ease";
  sliderImage.style.opacity = "0";

  // Change image only after fade-out finishes
  setTimeout(() => {
    sliderImage.src = images[index];
  }, 300);

  // Fade back in after the new image loads
  sliderImage.onload = () => {
    sliderImage.style.opacity = "1";
  };
}

prevBtn.addEventListener("click", () => {
  showImage(index - 1);
  resetAutoSlide();
});

nextBtn.addEventListener("click", () => {
  showImage(index + 1);
  resetAutoSlide();
});

// Auto slide every 3 seconds
let autoSlide = setInterval(() => {
  showImage(index + 1);
}, 3000);

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    showImage(index + 1);
  }, 3000);
}

//JS Filter Logic

const checkboxes = document.querySelectorAll(".filter-checkbox");
const products = document.querySelectorAll(".product-card");

checkboxes.forEach((cb) => {
  cb.addEventListener("change", () => {
    const selected = Array.from(checkboxes)
      .filter((x) => x.checked)
      .map((x) => x.value);

    products.forEach((product) => {
      const category = product.dataset.category;
      const type = product.dataset.type;
      if (
        selected.length === 0 ||
        selected.includes(category) ||
        selected.includes(type)
      ) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});

// Mobile filter accordion
const filterToggle = document.getElementById("filterToggle");
const mobileFilters = document.getElementById("mobileFilters");
const filterArrow = document.getElementById("filterArrow");
filterToggle.addEventListener("click", () => {
  mobileFilters.classList.toggle("hidden");
  filterArrow.classList.toggle("rotate-180");
});




// Modal Logic Product Inquiry
function openModal(productName) {
  document.getElementById("inquiryModal").classList.remove("hidden");
  document.getElementById("productName").innerText = "Product: " + productName;
}

function closeModal() {
  document.getElementById("inquiryModal").classList.add("hidden");
}

//Swiper JS

var swiper = new Swiper(".testimonialSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },
});



