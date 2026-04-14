// 1. 抓取時間盒子和新的留言板盒子
const timeBox = document.getElementById("time-display");
const greetingBox = document.getElementById("greeting-message"); 

function updateTime() {
    const now = new Date();
    timeBox.textContent = "現在時間是：" + now.toLocaleTimeString(); 

    // --- 這裡是新的魔法：取得「現在是幾點」 (0 ~ 23) ---
    const hour = now.getHours(); 

    // --- 開始進行條件判斷 ---
    if (hour >= 6 && hour < 12) {
        // 如果時間大於等於 6 點，且小於 12 點
        greetingBox.textContent = "早安！準備好迎接 7:00 的晨間早報與大盤解析了嗎？ ☕";
    } 
    else if (hour >= 12 && hour < 18) {
        // 如果時間大於等於 12 點，且小於 18 點
        greetingBox.textContent = "午安！喝杯水，繼續打磨你的前端技術吧！ 💻";
    } 
    else {
        // 其他時間 (晚上到凌晨)
        greetingBox.textContent = "晚安！夜深了，沉澱一下今天的程式碼，為明早 7:00 的每日總結儲備精力！ 🌙";
    }
}

// 網頁打開先執行一次，並設定每秒更新
updateTime();
setInterval(updateTime, 1000);

// --- 夜間模式切換邏輯 ---
// 1. 抓取我們剛剛在 HTML 做的開關按鈕
const themeBtn = document.getElementById("theme-toggle");

// 2. 派一個監聽員盯著按鈕，當發生 "click" (點擊) 事件時，就執行大括號裡的任務
themeBtn.addEventListener("click", function() {
    // toggle 的意思是「切換」：如果 body 沒有 dark-theme 就加上去，有的話就拿掉！
    document.body.classList.toggle("dark-theme");
    
    // 順便變個魔術，讓按鈕的文字跟著改變
    if (document.body.classList.contains("dark-theme")) {
        themeBtn.textContent = "切換白天模式 ☀️";
    } else {
        themeBtn.textContent = "切換夜間模式 🌙";
    }
});

// --- 打字機特效邏輯 ---
const textToType = "專注於打造流暢網頁體驗的前端開發者。";
const typeBox = document.getElementById("typing-text");
let charIndex = 0; // 記錄目前打到第幾個字

function typeEffect() {
    // 如果還沒打完，就繼續打
    if (charIndex < textToType.length) {
        // 把下一個字串接上去
        typeBox.textContent += textToType.charAt(charIndex);
        charIndex++;
        // 呼叫自己，設定 150 毫秒後再打下一個字 (可以自己改數字調整速度！)
        setTimeout(typeEffect, 150); 
    }
}

// 網頁打開後，稍微等個 0.5 秒再開始打字，視覺上會更自然
setTimeout(typeEffect, 500);