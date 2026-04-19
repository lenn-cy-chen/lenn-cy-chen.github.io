// 從 React 引入 useEffect
import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

function App() {
  // 去 localStorage 找找看存檔
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('my-tiny-habits');
    // 如果有存檔，就把文字轉回陣列資料；如果沒有，就給預設值
    if (savedHabits) {
      return JSON.parse(savedHabits);
    } else {
      return [
        { id: 1, trigger: '早上喝完第一杯水後', action: '深呼吸三次', completed: false }
      ];
    }
  });

  // habits 一有變化，就幫我存
  useEffect(() => {
    localStorage.setItem('my-tiny-habits', JSON.stringify(habits));
  }, [habits]);

  const [newTrigger, setNewTrigger] = useState('');
  const [newAction, setNewAction] = useState('');

  // 新習慣加入清單的函數
  const addHabit = () => {
    // 如果輸入框是空的就不要理他
    if (newTrigger.trim() === '' || newAction.trim() === '') return;

    // 創造一個新的習慣物件
    const newHabit = {
      id: Date.now(), // 用現在的時間戳記當作不重複的 ID
      trigger: newTrigger,
      action: newAction,
      completed: false
    };

    // 把新習慣跟「舊的習慣陣列」合併在一起，存進 setHabits
    setHabits([...habits, newHabit]);

    // 新增完之後，把輸入框清空
    setNewTrigger('');
    setNewAction('');
  };

  const toggleHabit = (id) => {
    // 這裡保留原本的 toggleHabit 和彩花程式碼
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          if (!habit.completed) {
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
          return { ...habit, completed: !habit.completed };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id) => {
    // 透過 filter 過濾掉想刪除的那個 id
    setHabits(habits.filter((habit) => habit.id !== id));
  };
  

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🌱 我的微習慣追蹤器</h1>
        <p>行為 = 動機 × 能力 × 提示 (B=MAP)</p>
      </header>

      {/*  新增：輸入微習慣的表單區塊 */}
      <div className="add-habit-form">
        <input 
          type="text" 
          placeholder="📍 提示 (例：打開電腦後)" 
          value={newTrigger} 
          onChange={(e) => setNewTrigger(e.target.value)} 
          className="habit-input"
        />
        <input 
          type="text" 
          placeholder="✨ 行動 (例：寫下首要任務)" 
          value={newAction} 
          onChange={(e) => setNewAction(e.target.value)} 
          className="habit-input"
        />
        <button onClick={addHabit} className="btn-add">新增微習慣</button>
      </div>

      <div className="habit-list">
        {habits.map((habit) => (
          <div key={habit.id} className="habit-card">
            <div className="habit-info">
              <span className="trigger">📍 提示：{habit.trigger}</span>
              <h3 className="action">✨ 行動：{habit.action}</h3>
            </div>
            
            {/*新增一個 action-buttons 容器，把完成按鈕和刪除按鈕包起來 */}
            <div className="action-buttons">
              <button 
                className={habit.completed ? "btn-completed" : "btn-pending"}
                onClick={() => toggleHabit(habit.id)}
              >
                {habit.completed ? "✅ 已完成" : "等待執行"}
              </button>

              <button 
                className="btn-delete" 
                onClick={() => deleteHabit(habit.id)}
              >
                🗑️
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default App