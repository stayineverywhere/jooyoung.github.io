document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const choicePopup = document.getElementById("choice-popup");
  const infoPopup = document.getElementById("info-popup");
  const popupBody = document.getElementById("popup-body");
  const viewPopupBtn = document.getElementById("view-popup");
  const viewWebBtn = document.getElementById("view-web");
  const closeBtns = document.querySelectorAll(".close-btn");

  let selectedContent = "";

  const contentMap = {
    skills: {
      html: "skills.html",
      content: `
        <h2>나의 스킬</h2>
        <ul>
          <li><strong>주 언어:</strong> Python, C</li>
          <li><strong>가능 언어:</strong> HTML, JavaScript</li>
          <li><strong>프로그래밍:</strong> 모바일 / 웹 프로그래밍</li>
        </ul>
      `
    },
    projects: {
      html: "projects.html",
      content: `
        <h2>프로젝트</h2>
        <ol>
          <li><a href="https://github.com/stayineverywhere/coursegraph-py" target="_blank">이수 체계도</a></li>
          <li><a href="https://github.com/stayineverywhere/dune-1.5" target="_blank">듄 게임</a></li>
          <li><a href="https://github.com/stayineverywhere/Trian2Busan.S2" target="_blank">부산행 시즌2</a></li>
          <li><a href="https://github.com/stayineverywhere/train2busan.s3" target="_blank">부산행 시즌3</a></li>
          <li><a href="https://github.com/stayineverywhere/queue_skeleton" target="_blank">Safety Queue</a></li>
        </ol>
      `
    },
    jobs: {
      html: "jobs.html",
      content: `
        <h2>희망 직무</h2>
        <ul>
          <li>한남대학교 졸업 후 대학원 진학 목표</li>
          <li>게임 개발자 또는 프론트/백엔드 개발자로 진로 고민 중</li>
        </ul>
      `
    }
  };

  cards.forEach(card => {
    card.addEventListener("click", () => {
      selectedContent = card.getAttribute("data-content");
      choicePopup.classList.remove("hidden");
    });
  });

  viewPopupBtn.addEventListener("click", () => {
    popupBody.innerHTML = contentMap[selectedContent].content;
    choicePopup.classList.add("hidden");
    infoPopup.classList.remove("hidden");
  });

  viewWebBtn.addEventListener("click", () => {
    window.location.href = contentMap[selectedContent].html;
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      choicePopup.classList.add("hidden");
      infoPopup.classList.add("hidden");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      choicePopup.classList.add("hidden");
      infoPopup.classList.add("hidden");
    }
  });
});
