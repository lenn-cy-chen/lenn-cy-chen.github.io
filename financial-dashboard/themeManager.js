export function initThemeManager() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('appTheme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<span class="material-symbols-rounded">light_mode</span>'; // 換成太陽圖標
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
     if (body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<span class="material-symbols-rounded">light_mode</span>';
        localStorage.setItem('appTheme', 'light');
        } else {
        themeToggle.innerHTML = '<span class="material-symbols-rounded">dark_mode</span>'; // 換成月亮圖標
        localStorage.setItem('appTheme', 'dark');

}
    });
}