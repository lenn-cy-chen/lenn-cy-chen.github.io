async function fetchRealWeather() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=24.18&longitude=120.68&current_weather=true');
        
        const data = await response.json();
        
        const currentTemp = data.current_weather.temperature;
        const weatherCode = data.current_weather.weathercode;
        
        let conditionText = "晴朗 / 多雲 🌤️";
        if (weatherCode >= 50 && weatherCode <= 69) conditionText = "雨天 🌧️";
        if (weatherCode >= 70) conditionText = "氣候惡劣 ⚡";

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
        console.log("天氣連線失敗", error);
        document.getElementById("weather-data").innerHTML = "<span style='color: #ff4d4d;'>天氣訊號中斷 📡</span>";
    }
}

export { fetchRealWeather };