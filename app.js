function loadPage(page) {
  const app = document.getElementById("app");

  // Show placeholder while waiting
  app.innerHTML = "<p style='text-align:center; color:white;'>Loading...</p>";

  fetch(`/pages/${page}.html`)
    .then((res) => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then((html) => {
      app.innerHTML = html;

      // Run init only if home.html
      if (page === "home") {
        initHome();
      }
    })
    .catch((err) => {
      console.error("Error loading page:", err);
      app.innerHTML =
        "<p style='color:red; text-align:center;'>⚠️ Failed to load page.</p>";
    });
}

function initHome() {
  const video = document.querySelector("video");
  const overlay = document.querySelector(".center-content");
  const title = document.getElementById("kaze");
  const texts = ["カゼ", "KAZE"];
  let i = 0;

  if (!video || !overlay || !title) return;

  // Hide overlay initially
  overlay.style.opacity = 0;

  // When video ends → freeze & fade in overlay
  video.addEventListener("ended", () => {
    video.pause();
    overlay.style.opacity = 1;
  });

  // 🔹 Glow + text cycle
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

// 🔹 Setup routes
document.addEventListener("DOMContentLoaded", () => {
  // Define routes
  page("/", () => loadPage("home"));
  page("/about", () => loadPage("about"));
  page("/accs", () => loadPage("accs"));

  // Redirect /index.html → /
  if (location.pathname === "/index.html") {
    page.redirect("/");
  }

  // Start router
  page();

  // ✅ Load current page instantly (fallback to home)
  const currentPath = location.pathname === "/" ? "/home" : location.pathname;
  if (currentPath.includes("about")) loadPage("about");
  else if (currentPath.includes("accs")) loadPage("accs");
  else loadPage("home"); // default to home
});
