// 在 toastManager.js 裡

export function showToast(message, type = 'success') {
    // 1. 先找找看畫面上有沒有容器，沒有就生一個出來
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // 2. 製作這片吐司
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // 🌟 升級：根據吐司的類型 (type)，決定要顯示哪個專業圖標！
    let iconName = 'info'; // 預設圖標
    if (type === 'success') iconName = 'check_circle';
    if (type === 'error') iconName = 'error';
    if (type === 'warning') iconName = 'warning';

    // 🌟 升級：用 innerHTML 放入圖標，並用 Flexbox 讓圖標和文字完美垂直置中
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-rounded" style="font-size: 20px;">${iconName}</span>
            <span>${message}</span>
        </div>
    `;
    
    // 3. 把吐司放進容器裡
    container.appendChild(toast);

    // 4. 設定計時器：3秒後加上離場動畫，動畫結束後把這片吐司從網頁拔除！
    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 3000);
}