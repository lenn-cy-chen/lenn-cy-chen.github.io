// --- 5. 互動式發光大盤走勢圖 (Chart.js) ---
export function initChart() {
    const ctx = document.getElementById('marketChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(52, 152, 219, 0.5)');
    gradient.addColorStop(1, 'rgba(52, 152, 219, 0.0)');

    // 召喚圖表！存入 window 變數隨時呼叫
    window.marketChart = new Chart(ctx, {
        type: 'line', 
        data: {
            labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '13:30'],
            datasets: [{
                label: '指數點位',
                data: [21400, 21450, 21380, 21490, 21510, 21500],
                borderColor: '#3498db', 
                backgroundColor: gradient, 
                borderWidth: 2,
                tension: 0.4, 
                fill: true, 
                pointBackgroundColor: '#1e1e1e', 
                pointBorderColor: '#3498db', 
                pointHoverRadius: 6 
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false } 
            },
            scales: {
                // 🌟 修正：改用「中性灰色」，這樣不管是深色還是淺色背景都能看得清楚！
                x: { grid: { color: 'rgba(136, 136, 136, 0.2)' }, ticks: { color: '#888' } },
                y: { grid: { color: 'rgba(136, 136, 136, 0.2)' }, ticks: { color: '#888' } }
            },
            interaction: {
                intersect: false,
                mode: 'index', 
            }
        }
    });
}

// --- 7. 元件連動：切換圖表數據 ---
window.updateChart = function(stockSymbol) {
    const basePrice = Math.random() * 500 + 50; 
    const newData = Array.from({length: 6}, () => basePrice + (Math.random() * 20 - 10));
    
    const isUp = newData[5] > newData[0];
    const newColor = isUp ? '#ff4d4d' : '#4CAF50'; 
    
    window.marketChart.data.datasets[0].data = newData; 
    window.marketChart.data.datasets[0].borderColor = newColor; 
    window.marketChart.data.datasets[0].pointBorderColor = newColor; 
    
    window.marketChart.update();

    // 🌟 修正：換上 Material Icon，並保持原本 HTML h2 標籤設定好的 flex 排版
    document.querySelector('.chart-widget h2').innerHTML = `<span class="material-symbols-rounded">stacked_line_chart</span> ${stockSymbol} 今日走勢`;
};

// --- 8. 復原大盤走勢圖 ---
window.restoreMarketChart = function(marketName, themeColor) {
    const marketData = [21400, 21450, 21380, 21490, 21510, 21500]; 
    
    window.marketChart.data.datasets[0].data = marketData;
    window.marketChart.data.datasets[0].borderColor = themeColor; 
    window.marketChart.data.datasets[0].pointBorderColor = themeColor; 
    
    window.marketChart.update();

    // 🌟 修正：換上 Material Icon
    document.querySelector('.chart-widget h2').innerHTML = `<span class="material-symbols-rounded">stacked_line_chart</span> ${marketName} 今日走勢`;
};