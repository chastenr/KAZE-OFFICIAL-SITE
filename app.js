// ------------------------------
// SPA Page Loader
// ------------------------------
function loadPage(page) {
  const app = document.getElementById("app");

  // Fade-out before loading new content
  app.classList.add("fade-out");

  setTimeout(() => {
    fetch(`/pages/${page}.html`)
      .then((res) => {
        if (!res.ok) throw new Error("Page not found");
        return res.text();
      })
      .then((html) => {
        app.innerHTML = html;

        // Page-specific init
        if (page === "home") initHome();
        if (page === "products") {
          // load model-viewer, then run product carousel init
          loadModelViewerOnce(() => {
            // optional: further JS to interact with the viewer can go here
            initProductCarousel();
          });
        }
        // Fade-in new content
        app.classList.remove("fade-out");
        app.classList.add("fade-in");
        setTimeout(() => app.classList.remove("fade-in"), 500);
      })
      .catch((err) => {
        console.error("Error loading page:", err);
        app.innerHTML =
          "<p style='color:red; text-align:center;'>⚠️ Failed to load page.</p>";
        app.classList.remove("fade-out");
      });
  }, 300);
}

// ------------------------------
// Home Page Animation + Video Logic
// ------------------------------
function initHome() {
  const title = document.getElementById("kaze");
  const overlay = document.querySelector(".center-content");
  const texts = ["カゼ", "KAZE"];
  let i = 0;

  if (!overlay || !title) return;

  // Fade-in overlay
  overlay.style.opacity = 0;
  setTimeout(() => {
    overlay.style.opacity = 1;
  }, 500);

  // Text swap animation
  function changeText() {
    title.classList.remove("glow");
    title.style.opacity = 0;

    setTimeout(() => {
      title.innerText = texts[i];
      title.classList.add("glow");
      title.style.opacity = 1;
      i = (i + 1) % texts.length;
    }, 1000);
  }

  changeText();
  setInterval(changeText, 5000);

  // 🔹 Video background → fallback color after end
  const video = document.getElementById("bg-video");
  const container = document.querySelector(".video-container");

  if (video && container) {
    video.addEventListener(
      "ended",
      () => {
        video.style.display = "none"; // hide video
        container.style.background = "#111"; // or use fallback image
      },
      { once: true } // only fire once
    );
  }
}

// ------------------------------
// Product Carousel
// ------------------------------
function initProductCarousel() {
  const track = document.querySelector(".carousel-track");
  if (!track) return;

  const slides = Array.from(track.children);
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  if (!nextBtn || !prevBtn) return;

  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 5000);
}

// ------------------------------
// Mobile Hamburger Menu (SPA-safe)
// ------------------------------
document.addEventListener("click", (e) => {
  const navLinks = document.querySelector(".nav-links");
  if (!navLinks) return;

  // Toggle menu when hamburger clicked
  if (e.target.matches(".menu-toggle")) {
    navLinks.classList.toggle("show");
  }

  // Close menu when a nav link is clicked
  if (e.target.closest(".nav-links a")) {
    navLinks.classList.remove("show");
  }
});

// ------------------------------
// SPA Routing
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // SPA routing with page.js
  page("/", () => loadPage("home"));
  page("/about", () => loadPage("about"));
  page("/accs", () => loadPage("accs"));
  page("/products", () => loadPage("products"));
  page("/product-info", () => loadPage("product-info"));

  // Redirect if user hits /index.html
  if (location.pathname === "/index.html") page.redirect("/");

  page();
});



// Lazy load model-viewer for product page (only once)
function loadModelViewerOnce(callback) {
  if (window._modelViewerLoaded) {
    if (callback) callback();
    return;
  }

  // Use module build (modern browsers)
  const s = document.createElement("script");
  s.type = "module";
  s.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
  s.onload = () => {
    window._modelViewerLoaded = true;
    console.log("model-viewer loaded");
    if (callback) callback();
  };
  s.onerror = () => {
    console.error("Failed to load model-viewer script.");
    if (callback) callback();
  };
  document.head.appendChild(s);
}
