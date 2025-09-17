// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// FAQ toggle
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const open = answer.style.display === "block";

    document.querySelectorAll(".faq-answer").forEach((a) => {
      a.style.display = "none";
    });

    if (!open) answer.style.display = "block";
  });
});
