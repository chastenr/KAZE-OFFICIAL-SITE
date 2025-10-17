// ------------------------------
// SPA Page Loader
// ------------------------------
function loadPage(page) {
  const app = document.getElementById("app");

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
          loadModelViewerOnce(() => {
            initProductCarousel();
          });
        }

        // Fade-in new content
        app.classList.remove("fade-out");
        app.classList.add("fade-in");
        setTimeout(() => app.classList.remove("fade-in"), 500);

        // Re-attach mobile offcanvas link listeners
        setupOffcanvasLinks();
      })
      .catch((err) => {
        console.error("Error loading page:", err);
        app.innerHTML = "<p style='color:red; text-align:center;'>⚠️ Failed to load page.</p>";
        app.classList.remove("fade-out");
      });
  }, 300);
}

// ------------------------------
// Mobile Offcanvas SPA-safe
// ------------------------------
function setupOffcanvasLinks() {
  const mobileNav = document.getElementById("mobileNav");
  if (!mobileNav) return;

  const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(mobileNav);
  const links = mobileNav.querySelectorAll("a.nav-link");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      bsOffcanvas.hide(); // Close offcanvas when link clicked
    });
  });
}

// ------------------------------
// Home Page Animation + Video
// ------------------------------
function initHome() {
  const title = document.getElementById("kaze");
  const overlay = document.querySelector(".center-content");
  const texts = ["カゼ", "KAZE"];
  let i = 0;

  if (!overlay || !title) return;

  overlay.style.opacity = 0;
  setTimeout(() => {
    overlay.style.opacity = 1;
  }, 500);

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

  const video = document.getElementById("bg-video");
  const container = document.querySelector(".video-container");

  if (video && container) {
    video.addEventListener(
      "ended",
      () => {
        video.style.display = "none";
        container.style.background = "#111";
      },
      { once: true }
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

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 5000);
}

// ------------------------------
// SPA Routing
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  setupOffcanvasLinks(); // Attach first time

  page("/", () => loadPage("home"));
  page("/about", () => loadPage("about"));
  page("/accs", () => loadPage("accs"));
  page("/products", () => loadPage("products"));
  page("/product-info", () => loadPage("product-info"));

  if (location.pathname === "/index.html") page.redirect("/");

  page();
});

// ------------------------------
// Lazy load model-viewer for product page
// ------------------------------
function loadModelViewerOnce(callback) {
  if (window._modelViewerLoaded) {
    if (callback) callback();
    return;
  }

  const s = document.createElement("script");
  s.type = "module";
  s.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
  s.onload = () => {
    window._modelViewerLoaded = true;
    if (callback) callback();
  };
  s.onerror = () => {
    console.error("Failed to load model-viewer script.");
    if (callback) callback();
  };
  document.head.appendChild(s);
}
