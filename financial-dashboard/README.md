# 🌅 晨間財經儀表板 (Morning Financial Dashboard)

這是一個專為現代投資人打造的個人化晨間資訊中心。結合了在地天氣、國際財經新聞與台美股市場動態，並以現代化的玻璃擬態 (Glassmorphism) 風格呈現，提供最流暢的每日開盤前閱覽體驗。

🔗 **[點此觀看 Live Demo](https://lenn-cy-chen.github.io/financial-dashboard/index.html)**

## ✨ 核心亮點功能 (Features)

- 🌦️ **在地化天氣預報**：串接氣象 API，精準掌握台中市北屯區即時天氣與氣溫。
- 📈 **台美股連動追蹤**：支援大盤指數 (如 TAIEX) 與自選股清單，一眼看清市場趨勢。
- 🖱️ **自選股拖曳排序**：直覺的 Drag & Drop 互動設計，可自由安排股票觀察優先順序。
- 🌗 **無縫日夜模式切換**：內建淺色晨光與深色午夜模式，並利用 `localStorage` 記憶使用者偏好。
- 🍞 **自訂吐司通知系統**：封裝 Toast Notification 模組，提供新增、刪除、錯誤等即時視覺回饋。

## 🛠️ 技術棧 (Tech Stack)

- **HTML5 / CSS3**：CSS Variables, Flexbox, CSS Animations, Glassmorphism UI。
- **Vanilla JavaScript (ES6+)**：
  - **模組化開發** (ES Modules) 分離 UI 與邏輯 (`main.js`, `themeManager.js`, `toastManager.js` 等)。
  - **非同步處理** (`async/await`, Fetch API) 串接第三方數據。
  - **DOM 操作與事件代理**，實現流暢的拖曳與動態渲染。
- **Version Control**：Git / GitHub Pages 部署。

## 💡 學習與成長

在此專案中，我獨立從零規劃架構，不僅解決了複雜的 RWD 跑版問題，更將原本龐大的 JavaScript 程式碼進行了企業級的模組化重構，大幅提升了程式碼的可維護性與擴充性。
