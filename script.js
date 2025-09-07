const video = document.querySelector("video");

video.addEventListener("ended", () => {
  console.log("Video has ended.");
  // Example: Show a message
  document.querySelector(".overlay-content").style.opacity = 1;
});