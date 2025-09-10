const video = document.querySelector("video");
const overlay = document.querySelector(".overlay-content");

// Make sure overlay is hidden at start
if (overlay) {
  overlay.style.opacity = 0;
  overlay.style.transition = "opacity 1.5s ease"; // smooth fade-in
}

video.addEventListener("ended", () => {
  console.log("Video has ended.");

  // Option 1: Freeze on last frame
  video.pause();

  // Option 2: Hide video (uncomment if you want)
  // video.style.display = "none";

  // Show overlay smoothly
  if (overlay) {
    overlay.style.opacity = 1;
  }
});
