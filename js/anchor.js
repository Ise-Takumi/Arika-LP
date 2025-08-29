const backToTopBtn = document.querySelector(".backToTop");

// トップへ戻るボタンの表示制御
if (backToTopBtn) {
  const showBackToTop = () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  };

  window.addEventListener("scroll", showBackToTop);
  showBackToTop(); // 初期表示時にも実行

  // クリック時のスムーズスクロール
  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// アンカーリンクのスムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);
    
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

function getBackgroundColor(el) {
    return window.getComputedStyle(el).backgroundColor;
  }

  function isLightColor(rgb) {
    const match = rgb.match(/\d+/g).map(Number);
    const brightness = match[0] * 0.299 + match[1] * 0.587 + match[2] * 0.114;
    return brightness > 186;
  }

  const target = document.getElementById("target");
  const bgColor = getBackgroundColor(target.parentElement);
  
  if (isLightColor(bgColor)) {
    target.style.color = "black";
  } else {
    target.style.color = "white";
  }