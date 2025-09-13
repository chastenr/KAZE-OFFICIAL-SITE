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
window.onload = function() {
  const title = document.getElementById("kaze");
  const texts = ["カゼ", "KAZE", ];
  let i = 0;

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
};
