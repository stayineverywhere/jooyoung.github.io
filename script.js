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

  if (cards.length) {
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
        // 프로필 팝업도 닫기
        const profilePopup = document.getElementById("profile-popup");
        if (profilePopup) profilePopup.classList.add("hidden");
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        choicePopup.classList.add("hidden");
        infoPopup.classList.add("hidden");
        // 프로필 팝업도 닫기
        const profilePopup = document.getElementById("profile-popup");
        if (profilePopup) profilePopup.classList.add("hidden");
      }
    });
  }

  // 프로필 팝업
  const profileImg = document.getElementById("profile-image");
  const profilePopup = document.getElementById("profile-popup");
  if (profileImg && profilePopup) {
    profileImg.style.cursor = "pointer";
    profileImg.addEventListener("click", () => {
      profilePopup.classList.remove("hidden");
    });
    profilePopup.querySelector(".close-btn").addEventListener("click", () => {
      profilePopup.classList.add("hidden");
    });
    // ESC키로 닫기는 위에서 처리
  }
});

// 외부 링크 클릭 시 경고 팝업 (모든 페이지에서 동작)
document.addEventListener("click", function (e) {
  const target = e.target.closest("a");
  if (!target) return;

  const url = target.getAttribute("href");
  if (!url) return;

  const isExternal = /^https?:\/\//.test(url) && !url.includes(location.hostname);

  if (isExternal) {
    e.preventDefault();

    const confirmPopup = document.createElement("div");
    confirmPopup.style.position = "fixed";
    confirmPopup.style.top = "0";
    confirmPopup.style.left = "0";
    confirmPopup.style.width = "100vw";
    confirmPopup.style.height = "100vh";
    confirmPopup.style.background = "rgba(0,0,0,0.5)";
    confirmPopup.style.display = "flex";
    confirmPopup.style.justifyContent = "center";
    confirmPopup.style.alignItems = "center";
    confirmPopup.style.zIndex = "10000";

    confirmPopup.innerHTML = `
      <div style="
        background: white;
        padding: 2rem;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        max-width: 90%;
        font-family: 'Noto Sans KR', sans-serif;
      ">
        <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">외부 웹사이트로 이동합니다.<br>계속하시겠습니까?</p>
        <button id="confirm-yes" style="margin-right: 1rem;">예</button>
        <button id="confirm-no">아니오</button>
      </div>
    `;

    document.body.appendChild(confirmPopup);

    confirmPopup.querySelector("#confirm-yes").addEventListener("click", () => {
      window.open(url, "_blank");  // 새 탭으로 열기
      document.body.removeChild(confirmPopup);
    });

    confirmPopup.querySelector("#confirm-no").addEventListener("click", () => {
      alert("취소하셨습니다.");
      document.body.removeChild(confirmPopup);
    });
  }
});