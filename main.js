const timeBox = document.getElementById("time-display");
const greetingBox = document.getElementById("greeting-message"); 

function updateTime() {
    const now = new Date();
    timeBox.textContent = "現在時間：" + now.toLocaleTimeString(); 

    const hour = now.getHours(); 

    if (hour >= 6 && hour < 12) {
        greetingBox.textContent = "早安！準備好迎接晨間早報與大盤解析了嗎？";
    } 
    else if (hour >= 12 && hour < 18) {
        greetingBox.textContent = "午安！喝杯水，繼續打磨你的前端技術吧！";
    } 
    else {
        greetingBox.textContent = "晚安！沉澱一下今天的程式碼，為明早的每日總結儲備精力。";
    }
}

updateTime();
setInterval(updateTime, 1000);

// 夜間模式切換邏輯
const themeBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text"); 

themeBtn.addEventListener("click", function() {
    // 切換 body 的 dark-theme class
    document.body.classList.toggle("dark-theme");
    
    // 動態換 Material Icons 的名稱與文字
    if (document.body.classList.contains("dark-theme")) {
        themeIcon.innerText = "light_mode"; // 🌙 -> ☀️
        themeText.innerText = "切換白天";
    } else {
        themeIcon.innerText = "dark_mode";  // ☀️ -> 🌙
        themeText.innerText = "切換夜間";
    }
});

// 打字機特效邏輯
const textToType = "專注於打造流暢網頁體驗的前端開發者。";
const typeBox = document.getElementById("typing-text");
let charIndex = 0; // 記錄目前打到第幾個字

function typeEffect() {
    if (charIndex < textToType.length) {
        typeBox.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 150); 
    }
}

// 網頁打開後，等 0.5 秒再開始打字
setTimeout(typeEffect, 500);

// 頭像彩蛋特效 (Confetti)
const profilePic = document.getElementById("profile-pic");

profilePic.addEventListener("click", () => {
    // 呼叫 canvas-confetti 
    confetti({
        particleCount: 100,  // 彩花數量
        spread: 80,          // 噴射的廣度
        origin: { y: 0.5 },  // 發射的起始高度 (0.5 大約在螢幕中間)
        colors: ['#3498db', '#f1c40f', '#2ecc71', '#ff7a7a'],
        disableForReducedMotion: true // 無障礙設計：使用者的系統設定「減少動態效果」，就不噴發
    });
});