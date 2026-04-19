import { fetchRealWeather } from './weather.js';
import { initChart } from './chartManager.js';
import { initStockManager } from './stockManager.js';
import { initThemeManager } from './themeManager.js';

initThemeManager();
initChart();
initStockManager();

const taiexBox = document.getElementById("taiex-data");
const usStockBox = document.getElementById("us-stocks-data");
const newsBox = document.getElementById("news-list"); 
const weatherBox = document.getElementById("weather-data");

const refreshBtn = document.getElementById("refresh-btn");
const spinner = document.getElementById("loading-spinner");

const mockApiData = {
    taiex: { index: "21,500.50", change: "+150.20", percent: "+0.70%", isUp: true },
    us_sp500: { index: "5,200.10", change: "-25.30", percent: "-0.48%", isUp: false },
    weather: { location: "台中市北屯區", temp: "26°C", condition: "多雲時晴", humidity: "75%" },
    news: [
        "【台股盤前】電子權值股領軍，大盤蓄勢挑戰歷史新高",
        "【全球經濟】聯準會利率決策牽動市場神經，美債殖利率波動加劇",
        "【產業動態】AI 伺服器需求持續強勁，相關供應鏈營收亮眼",
        "【美股收盤】科技股獲利了結賣壓湧現，四大指數漲跌互見"
    ]
};

function fetchMarketData() {
    const taiexColor = mockApiData.taiex.isUp ? "#ff4d4d" : "#4CAF50"; 
    taiexBox.innerHTML = `
        <div style="font-size: 32px; font-weight: bold; color: var(--text-color);">${mockApiData.taiex.index}</div>
        <div style="color: ${taiexColor}; margin-top: 10px;">${mockApiData.taiex.change} (${mockApiData.taiex.percent})</div>
    `;

    const usColor = mockApiData.us_sp500.isUp ? "#4CAF50" : "#ff4d4d"; 
    usStockBox.innerHTML = `
        <div style="font-size: 32px; font-weight: bold; color: var(--text-color);">${mockApiData.us_sp500.index}</div>
        <div style="color: ${usColor}; margin-top: 10px;">${mockApiData.us_sp500.change} (${mockApiData.us_sp500.percent})</div>
    `;

    weatherBox.innerHTML = `
        <div style="font-size: 24px; font-weight: bold; color: var(--text-color);">
            ${mockApiData.weather.location}
        </div>
        <div style="font-size: 32px; color: #f1c40f; margin: 10px 0;">
            ${mockApiData.weather.temp}
        </div>
        <div style="color: var(--text-muted); font-size: 16px;">
            ${mockApiData.weather.condition} | 濕度 ${mockApiData.weather.humidity}
        </div>
    `;

    newsBox.innerHTML = ""; 
    mockApiData.news.forEach(function(headline) {
        newsBox.innerHTML += `<li style="margin-bottom: 12px; border-bottom: 1px dashed var(--widget-border); padding-bottom: 8px; cursor: pointer; color: var(--text-color);">${headline}</li>`;
    });

    spinner.style.display = "none";
    refreshBtn.disabled = false;
    refreshBtn.innerHTML = `<span class="material-symbols-rounded" style="font-size: 20px;">sync</span> 同步最新數據`;
}

refreshBtn.addEventListener("click", function() {
    spinner.style.display = "flex";
    refreshBtn.disabled = true;
    refreshBtn.innerHTML = `<span class="material-symbols-rounded" style="font-size: 20px; animation: skeletonLoading 1s infinite;">sync</span> 努力連線中...`;

    weatherBox.innerHTML = "觀測中...";

    const skeletonBlock = `
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
    `;
    
    taiexBox.innerHTML = skeletonBlock;
    usStockBox.innerHTML = skeletonBlock;
    weatherBox.innerHTML = skeletonBlock;
    
    newsBox.innerHTML = `
        <li class="skeleton skeleton-news"></li>
        <li class="skeleton skeleton-news"></li>
        <li class="skeleton skeleton-news"></li>
    `;

    setTimeout(fetchMarketData, 1500);
    setTimeout(fetchRealWeather, 1500);
});

setTimeout(fetchMarketData, 1000);
setTimeout(fetchRealWeather, 1000);

// 滑鼠微光軌跡特效
const glowEffect = document.createElement('div');
glowEffect.classList.add('mouse-glow');
document.body.appendChild(glowEffect);

document.addEventListener('mousemove', function(e) {
    glowEffect.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
});

// 新聞視窗控制
const modal = document.getElementById("news-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

newsBox.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        const clickedTitle = e.target.textContent;
        modalTitle.textContent = clickedTitle;
        modalBody.innerHTML = `
            這是關於「<b style="color: #3498db;">${clickedTitle}</b>」的詳細報導內容。<br><br>
        `;
        modal.style.display = "flex";
    }
});

closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// 漢堡選單控制
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 動態時鐘與專屬問候語
const greetingTitle = document.getElementById("greeting-title");
const timeDisplay = document.getElementById("current-time");

function updateClock() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    
    let greeting = "";
    if (hour >= 5 && hour < 12) {
        greeting = "早安，準備迎接開盤！";
    } else if (hour >= 12 && hour < 18) {
        greeting = "午安，盤中動態持續為您關注！";
    } else {
        greeting = "夜深了，來看看美股戰況吧！";
    }
    
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const day = weekdays[now.getDay()];
    
    greetingTitle.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
            <span class="material-symbols-rounded" style="font-size: 36px; color: #3498db;">trending_up</span> 
            ${greeting}
        </div>
    `;
    timeDisplay.innerHTML = `${year}/${month}/${date} ${day} | <span style="color: #3498db; font-weight: bold;">${hour}:${minute}:${second}</span>`;
}

setInterval(updateClock, 1000);
updateClock();