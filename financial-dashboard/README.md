# 📈 晨間財經儀表板 (Morning Finance Dashboard)

> 一個專為投資人打造的現代化前端數據儀表板。結合了極致的 UI/UX 體驗與乾淨的模組化底層架構，提供即時大盤走勢、自選股追蹤與在地氣象資訊。

[👉 點此觀看 Live Demo](#) _(稍後部署完把網址貼這裡)_

## ✨ 核心特色亮點 (Key Features)

### 🎨 現代化 UI/UX 設計

- **玻璃擬物化 (Glassmorphism)**：使用 CSS `backdrop-filter` 打造帶有景深的毛玻璃質感。
- **骨架屏載入 (Skeleton Loading)**：徹底拋棄死板的「讀取中」文字，以微光掃過的動態骨架降低使用者等待焦慮。
- **沉浸式主題切換 (Dark/Light Mode)**：利用 CSS Variables 統一管理色彩，結合 LocalStorage 實現平滑過渡且具備狀態持久化的日夜模式。
- **互動微光特效**：手刻滑鼠軌跡跟隨的漸層光暈，提升整體科技感。

### ⚙️ 進階前端互動

- **自選股拖曳排序 (Drag & Drop)**：透過 HTML5 原生 Drag API，實作滑順的自選股清單重新排序功能。
- **動態吐司通知 (Toast Notification)**：捨棄原生 `alert`，實作從畫面邊緣滑入/滑出的專業狀態通知系統。
- **主從連動圖表**：底層自選股清單可反向控制上方的 Chart.js 圖表，即時切換數據呈現。

### 📊 真實資料與狀態流

- **API 非同步串接**：使用 `async/await` 串接 Open-Meteo API 獲取台中地區即時天氣。
- **狀態持久化**：自選股的 CRUD (新增/讀取/刪除/排序) 皆同步寫入 LocalStorage，確保資料跨網頁生命週期不遺失。

## 🏗️ 系統架構 (Architecture)

為了確保專案的可維護性與擴充性，本專案捨棄傳統的「義大利麵條」寫法，全面採用 **ES6 Modules** 進行關注點分離：

- `main.js`：總指揮官 (Entry Point)，負責統籌與啟動各子模組。
- `weather.js`：專職負責外部 API 非同步請求。
- `themeManager.js`：處理 CSS 變數切換與主題狀態記憶。
- `chartManager.js`：封裝 Chart.js 的初始化與更新邏輯。
- `stockManager.js`：管理自選股陣列狀態、DOM 渲染與拖曳事件。
- `toastManager.js`：負責全域通知的動態節點生成與計時銷毀。

## 💻 技術棧 (Tech Stack)

- **HTML5 / CSS3** (CSS Variables, Flexbox, Keyframe Animations)
- **Vanilla JavaScript (ES6+)** (Modules, Event Delegation, Closures, Drag API)
- **Chart.js** (資料視覺化)
- **Open-Meteo API** (氣象資料)
