// 在 themeManager.js 裡

export function initThemeManager() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // 1. 網頁打開時，先去保險箱看使用者之前選了什麼模式
    const savedTheme = localStorage.getItem('appTheme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<span class="material-symbols-rounded">light_mode</span>'; // ☀️ 換成太陽圖標
    }

    // 2. 監聽點擊事件
    themeToggle.addEventListener('click', () => {
        // 切換 light-mode 這個 class
        body.classList.toggle('light-mode');
        
        // 判斷現在是什麼模式，改變圖示並存入保險箱
     if (body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<span class="material-symbols-rounded">light_mode</span>';
        localStorage.setItem('appTheme', 'light');
        } else {
        themeToggle.innerHTML = '<span class="material-symbols-rounded">dark_mode</span>'; // 🌙 換成月亮圖標
        localStorage.setItem('appTheme', 'dark');

}
    });
}