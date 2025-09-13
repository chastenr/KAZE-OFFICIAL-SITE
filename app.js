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

        // Run init only for home page
        if (page === "home") initHome();

        // Fade-in new content
        app.classList.remove("fade-out");
        app.classList.add("fade-in");

        setTimeout(() => app.classList.remove("fade-in"), 500); // cleanup
      })
      .catch((err) => {
        console.error("Error loading page:", err);
        app.innerHTML =
          "<p style='color:red; text-align:center;'>⚠️ Failed to load page.</p>";
        app.classList.remove("fade-out");
      });
  }, 300); // matches fade-out duration
}

// ------------------------------
// Home Page Animation
// ------------------------------
function initHome() {
  const title = document.getElementById("kaze");
  const overlay = document.querySelector(".center-content");
  const texts = ["カゼ", "KAZE"];
  let i = 0;

  if (!overlay || !title) return;

  // Show overlay with fade-in
  overlay.style.opacity = 0;
  setTimeout(() => {
    overlay.style.opacity = 1;
  }, 500);

  // Glow + text cycle
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
}

// ------------------------------
// Setup SPA Routes
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    // Close menu when clicking a nav link (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

  // SPA routing with page.js
  page("/", () => loadPage("home"));
  page("/about", () => loadPage("about"));
  page("/accs", () => loadPage("accs"));

  // Redirect if user hits /index.html
  if (location.pathname === "/index.html") page.redirect("/");

  page();
});
