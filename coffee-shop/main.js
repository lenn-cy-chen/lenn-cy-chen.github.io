document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    setInterval(nextSlide, 5000);
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }, 5000);

    // 手機版漢堡選單邏輯
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // 變換漢堡圖示為「關閉」
        const icon = hamburger.querySelector(".material-symbols-rounded");
        icon.innerText = navLinks.classList.contains("active") ? "close" : "menu";
    });

    // 點擊連結後自動收起選單(UX優化)
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.querySelector(".material-symbols-rounded").innerText = "menu";
        });
    });
});

// 捲動顯現特效
    const observerOptions = {
        threshold: 0.1 // 10%時觸發
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // 購物車按鈕互動與Toast通知
    const cartBtns = document.querySelectorAll('.add-to-cart-btn');
    const toastContainer = document.getElementById('toast-container');

    // 確認目前頁面有購物車按鈕才執行(避免在 index.html 報錯)
    if (cartBtns.length > 0 && toastContainer) {
        cartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 紀錄原本的圖示
                const originalIcon = this.innerHTML;
                
                // 變成打勾
                this.classList.add('added');
                this.innerHTML = '<span class="material-symbols-rounded">check</span>';

                // 呼叫Toast通知函數
                showToast('已將商品加入購物袋');

                // 設定1.5秒後，按鈕恢復原狀
                setTimeout(() => {
                    this.classList.remove('added');
                    this.innerHTML = originalIcon;
                }, 1500);
            });
        });
    }

    // Toast生成器函數
    function showToast(message) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = `<span class="material-symbols-rounded">task_alt</span> ${message}`;
        
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            // 等消失動畫播完後，把這個DOM元素從網頁上徹底刪除，避免吃效能
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3000);
    }