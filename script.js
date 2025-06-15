document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const sections = document.querySelectorAll(".tab-content");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const target = card.getAttribute("data-target");

      sections.forEach(section => {
        section.classList.remove("active");
        section.classList.add("hidden");
      });

      const activeSection = document.getElementById(target);
      activeSection.classList.remove("hidden");
      activeSection.classList.add("active");

      // 스크롤 이동
      activeSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});
