// --- 全新的真實天氣 API 模組 ---
async function fetchRealWeather() {
    try {
        // 1. 發送請求：向開源氣象局請求特定座標 (經緯度 24.18, 120.68) 的當下天氣
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=24.18&longitude=120.68&current_weather=true');
        
        // 2. 拆解包裹：把伺服器回傳的資料轉成我們能懂的 JSON 格式
        const data = await response.json();
        
        // 3. 抓取關鍵數據
        const currentTemp = data.current_weather.temperature; // 真實溫度
        const weatherCode = data.current_weather.weathercode; // 天氣代碼
        
        // 4. 把冷冰冰的代碼翻譯成文字 (簡單判斷)
        let conditionText = "晴朗 / 多雲 🌤️";
        if (weatherCode >= 50 && weatherCode <= 69) conditionText = "雨天 🌧️";
        if (weatherCode >= 70) conditionText = "氣候惡劣 ⚡";

        // 5. 渲染到畫面上！
        const weatherBox = document.getElementById("weather-data");
        weatherBox.innerHTML = `
            <div style="font-size: 24px; font-weight: bold; color: white;">
                台中市北屯區
            </div>
            <div style="font-size: 32px; color: #f1c40f; margin: 10px 0; text-shadow: 0 0 10px rgba(241, 196, 15, 0.3);">
                ${currentTemp}°C
            </div>
            <div style="color: #aaa; font-size: 14px;">
                ${conditionText} | 📡 真實數據同步中
            </div>
        `;
    } catch (error) {
        // 如果網路斷線，要有備用方案
        console.log("天氣連線失敗", error);
        document.getElementById("weather-data").innerHTML = "<span style='color: #ff4d4d;'>天氣訊號中斷 📡</span>";
    }
}

export { fetchRealWeather };