document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function nextSlide() {
        // 將當前的圖片隱藏
        slides[currentSlide].classList.remove("active");
        // 計算下一張圖片的索引 (如果是最後一張，就回到第 0 張)
        currentSlide = (currentSlide + 1) % slides.length;
        // 將下一張圖片顯示出來
        slides[currentSlide].classList.add("active");
    }

    // 每 5 秒自動切換一次圖片
    setInterval(nextSlide, 5000);
});