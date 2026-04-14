// 🌟 引入吐司通知模組
import { showToast } from './toastManager.js';

let myStocks = JSON.parse(localStorage.getItem("savedStocks")) || [];

export function initStockManager() {
    const stockInput = document.getElementById("stock-input");
    const addStockBtn = document.getElementById("add-stock-btn");

    addStockBtn.addEventListener("click", function() {
        const stockSymbol = stockInput.value.trim().toUpperCase();
        
        if (stockSymbol === "") {
            showToast("請輸入股票代號！", "error");
            return;
        }

        if (myStocks.includes(stockSymbol)) {
            showToast(`「${stockSymbol}」已經在清單中囉！`, "warning");
            return;
        }

        myStocks.push(stockSymbol);
        localStorage.setItem("savedStocks", JSON.stringify(myStocks));
        
        stockInput.value = "";
        renderStocks();
        showToast(`成功新增 ${stockSymbol}！`, "success");
    });

    stockInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addStockBtn.click();
        }
    });

    renderStocks();
}

function renderStocks() {
    const customStockList = document.getElementById("custom-stock-list");
    customStockList.innerHTML = "";

    if (myStocks.length === 0) {
        // 🌟 UX 升級：給空狀態加上專業的圖標與對齊
        customStockList.innerHTML = `
            <li class="empty-tip" style="display: flex; justify-content: center; align-items: center; gap: 8px;">
                <span class="material-symbols-rounded" style="font-size: 20px;">playlist_add</span> 
                目前無自選股，請從上方輸入新增
            </li>`;
        return;
    }

    myStocks.forEach(function(stock, index) {
        const li = document.createElement("li");
        
        li.style.background = "var(--input-bg)";
        li.style.border = "1px solid var(--widget-border)";
        li.style.padding = "15px";
        li.style.borderRadius = "8px";
        li.style.marginBottom = "10px";
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.transition = "all 0.3s ease";
        li.style.cursor = "grab"; // 提示使用者這裡可以抓取

        // 滑鼠移過去的互動發光
        li.onmouseenter = () => li.style.border = "1px solid rgba(46, 204, 113, 0.5)";
        li.onmouseleave = () => li.style.border = "1px solid var(--widget-border)";

        // ----------------------------------------------------
        // 🌟 Drag & Drop 拖曳排序核心邏輯
        // ----------------------------------------------------
        li.draggable = true; 
        li.dataset.index = index; 

        li.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', index); 
            setTimeout(() => li.style.opacity = '0.4', 0); 
        });

        li.addEventListener('dragend', function() {
            li.style.opacity = '1';
        });

        li.addEventListener('dragover', function(e) {
            e.preventDefault();
            li.style.borderTop = "3px solid #3498db"; 
        });

        li.addEventListener('dragleave', function() {
            li.style.borderTop = "";
        });

        li.addEventListener('drop', function(e) {
            e.preventDefault();
            li.style.borderTop = "";
            
            const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
            const targetIndex = index; 

            if (draggedIndex !== targetIndex) {
                const [draggedStock] = myStocks.splice(draggedIndex, 1);
                myStocks.splice(targetIndex, 0, draggedStock);
                
                localStorage.setItem("savedStocks", JSON.stringify(myStocks));
                renderStocks();
            }
        });

        // ----------------------------------------------------
        // 🌟 UX 升級：加入拖曳圖標 (drag_indicator) 與按鈕圖標 (monitoring)
        // ----------------------------------------------------
        li.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="material-symbols-rounded" style="color: var(--text-muted); font-size: 20px;">drag_indicator</span>
                <span style="font-size: 18px; font-weight: bold; color: var(--text-color);">${stock}</span>
            </div>
            <div style="display: flex; align-items: center;">
                <button onclick="updateChart('${stock}')" style="background:transparent; border:none; color:#3498db; cursor:pointer; font-weight:bold; margin-right: 15px; padding: 0; display: flex; align-items: center; gap: 4px;">
                    <span class="material-symbols-rounded" style="font-size: 18px;">monitoring</span> 看走勢
                </button>
                <button onclick="removeStock(${index})" style="background:transparent; border:none; color:#ff4d4d; cursor:pointer; display:flex; align-items:center; padding: 0;">
                    <span class="material-symbols-rounded" style="font-size: 22px;">close</span>
                </button>
            </div>
        `;

        customStockList.appendChild(li);
    });
}

// 刪除股票的功能，也要換成吐司通知
window.removeStock = function(index) {
    const removedStock = myStocks[index];
    myStocks.splice(index, 1);
    localStorage.setItem("savedStocks", JSON.stringify(myStocks));
    renderStocks();
    showToast(`已移除 ${removedStock}`, "warning");
};