const backToTopBtn = document.querySelector(".backToTop");

// トップへ戻るボタンの表示制御と位置調整
if (backToTopBtn) {
  const showBackToTop = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const footer = document.querySelector(".footer");
    
    // ボタンの表示制御
    backToTopBtn.style.display = scrollY > 300 ? "block" : "none";
    
    // footerに重ならないように位置調整
    if (footer && scrollY > 300) {
      const footerTop = footer.offsetTop;
      const footerHeight = footer.offsetHeight;
      const buttonHeight = backToTopBtn.offsetHeight;
      const margin = 20; // 余白
      
      // footerの上部に到達した場合
      if (scrollY + windowHeight + buttonHeight - margin > footerTop) {
        const newBottom = (scrollY - footerTop) + 2 * footerHeight + buttonHeight + 3 * margin;
        backToTopBtn.style.bottom = `${newBottom}px`;
      } else {
        // 通常位置
        backToTopBtn.style.bottom = "20px";
      }
    } else {
      // 通常位置
      backToTopBtn.style.bottom = "20px";
    }
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
  if (target) {
    const bgColor = getBackgroundColor(target.parentElement);

    if (isLightColor(bgColor)) {
      target.style.color = "black";
    } else {
      target.style.color = "white";
    }
  }
  
