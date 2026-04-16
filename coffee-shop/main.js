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

// coffee-shop/main.js 擴充

document.addEventListener("DOMContentLoaded", () => {
    // --- 原有的輪播圖邏輯 (保留) ---
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }, 5000);

    // --- 🌟 新增：手機版漢堡選單邏輯 ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // 變換漢堡圖示為「關閉」
        const icon = hamburger.querySelector(".material-symbols-rounded");
        icon.innerText = navLinks.classList.contains("active") ? "close" : "menu";
    });

    // 點擊連結後自動收起選單 (UX 優化)
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.querySelector(".material-symbols-rounded").innerText = "menu";
        });
    });
});

// --- 🌟 新增：捲動顯現特效 (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1 // 當元素出現 10% 時觸發
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // --- 🌟 新增：購物車按鈕互動與 Toast 通知 ---
    const cartBtns = document.querySelectorAll('.add-to-cart-btn');
    const toastContainer = document.getElementById('toast-container');

    // 確認目前頁面有購物車按鈕才執行 (避免在 index.html 報錯)
    if (cartBtns.length > 0 && toastContainer) {
        cartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 1. 紀錄原本的圖示 (袋子)
                const originalIcon = this.innerHTML;
                
                // 2. 改變按鈕樣式與圖示 (變成打勾)
                this.classList.add('added');
                this.innerHTML = '<span class="material-symbols-rounded">check</span>';

                // 3. 呼叫 Toast 通知函數
                showToast('已將商品加入購物袋');

                // 4. 設定 1.5 秒後，按鈕恢復原狀
                setTimeout(() => {
                    this.classList.remove('added');
                    this.innerHTML = originalIcon;
                }, 1500);
            });
        });
    }

    // 🌟 Toast 生成器函數
    function showToast(message) {
        // 創造一個新的 div 元素
        const toast = document.createElement('div');
        toast.classList.add('toast');
        // 塞入圖示與文字
        toast.innerHTML = `<span class="material-symbols-rounded">task_alt</span> ${message}`;
        
        // 把 toast 丟進右下角的容器裡
        toastContainer.appendChild(toast);

        // 設定 3 秒後觸發消失動畫
        setTimeout(() => {
            toast.classList.add('fade-out');
            // 等消失動畫播完後，把這個 DOM 元素從網頁上徹底刪除，避免吃效能
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3000);
    }