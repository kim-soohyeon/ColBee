import React, { useState } from 'react';
import Mascot from './components/Mascot';
import './index.css';

function App() {
  const [view, setView] = useState('home'); // home, list, register, shop, stats
  const [refrigeratorStatus, setRefrigeratorStatus] = useState('safe');
  const [ingredients, setIngredients] = useState([
    { id: 1, name: '우유', date: '2024-01-30', status: 'safe', emoji: '😊' },
    { id: 2, name: '두부', date: '2024-01-23', status: 'warning', emoji: '😐' },
    { id: 3, name: '깻잎', date: '2024-01-21', status: 'urgent', emoji: '😰' },
  ]);

  const addIngredient = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const date = e.target.date.value;
    const newIng = {
      id: Date.now(),
      name,
      date,
      status: 'safe',
      emoji: '😊'
    };
    setIngredients([...ingredients, newIng]);
    alert(`콜비가 ${name}을 냉장고에 등록했어요! 😊`);
    setView('list');
  };

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <div className="card">
            <h2>📊 현황 요약</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ background: '#E8F5E9', padding: '1rem', borderRadius: '12px' }}>
                <h3 style={{ margin: 0, color: 'var(--color-safe)' }}>15</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>안전</p>
              </div>
              <div style={{ background: '#FFF8E1', padding: '1rem', borderRadius: '12px' }}>
                <h3 style={{ margin: 0, color: 'var(--color-warning)' }}>3</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>주의</p>
              </div>
              <div style={{ background: '#FFEBEE', padding: '1rem', borderRadius: '12px' }}>
                <h3 style={{ margin: 0, color: 'var(--color-urgent)' }}>0</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>긴급</p>
              </div>
              <div style={{ background: '#F5F5F5', padding: '1rem', borderRadius: '12px' }}>
                <h3 style={{ margin: 0, color: '#999' }}>0</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>만료</p>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => setView('register')}>+ 식재료 추가</button>
          </div>
        );
      case 'list':
        return (
          <div className="card">
            <h2>내 냉장고 🥗</h2>
            <div className="ingredient-list">
              {ingredients.map(ing => (
                <div key={ing.id} className="list-item">
                  <span>{ing.emoji} {ing.name}</span>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>{ing.date} 까지</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'register':
        return (
          <div className="card">
            <h2>식재료 등록 📝</h2>
            <form onSubmit={addIngredient}>
              <div className="form-group">
                <label>제품명</label>
                <input name="name" placeholder="예: 우유, 사과" required />
              </div>
              <div className="form-group">
                <label>유통기한</label>
                <input name="date" type="date" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>등록하기</button>
              <button type="button" className="btn" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setView('home')}>취소</button>
            </form>
          </div>
        );
      case 'shop':
        return (
          <div className="card">
            <h2>장보기 리스트 🛒</h2>
            <div className="ingredient-list">
              <div className="list-item">
                <span>🟡 요거트 (추천)</span>
                <input type="checkbox" />
              </div>
              <div className="list-item">
                <span>🟡 계란 (추천)</span>
                <input type="checkbox" />
              </div>
              <div className="list-item">
                <span>☐ 김 (나의 리스트)</span>
                <input type="checkbox" />
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => alert('장보기가 완료되었습니다!')}>구매 완료</button>
          </div>
        );
      case 'stats':
        return (
          <div className="card">
            <h2>월간 보고서 📊</h2>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <span style={{ fontSize: '3rem' }}>😊</span>
              <h3>"정말 잘하고 있어요!"</h3>
            </div>
            <div className="ingredient-list">
              <div className="list-item"><span>총 구매</span> <span>45개</span></div>
              <div className="list-item"><span>소비</span> <span>38개 (84%)</span></div>
              <div className="list-item"><span>폐기</span> <span style={{ color: 'var(--color-urgent)' }}>7개 (16%)</span></div>
              <div className="list-item"><span>절약액</span> <span style={{ color: 'var(--color-safe)' }}>₩28,000</span></div>
            </div>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#F9F9F9', borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>💡 <b>콜비의 조언:</b> "채소" 관리에 더 신경써보세요. 냉동 보관을 시도해보면 폐기율을 더 줄일 수 있어요!</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <header style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#2C3E50', color: 'white' }}>
        <h1 style={{ color: 'white', margin: 0 }}>ColBee</h1>
      </header>

      {view !== 'register' && <Mascot status={refrigeratorStatus} />}

      <main style={{ flex: 1, overflowY: 'auto' }}>
        {renderView()}
      </main>

      <nav className="footer-nav">
        <button className={`nav-item ${view === 'home' || view === 'register' ? 'active' : ''}`} onClick={() => { setView('home'); setRefrigeratorStatus('safe'); }}>
          <span className="nav-icon">🏠</span>
          <span>홈</span>
        </button>
        <button className={`nav-item ${view === 'list' ? 'active' : ''}`} onClick={() => { setView('list'); setRefrigeratorStatus('warning'); }}>
          <span className="nav-icon">🥗</span>
          <span>냉장고</span>
        </button>
        <button className={`nav-item ${view === 'shop' ? 'active' : ''}`} onClick={() => { setView('shop'); setRefrigeratorStatus('safe'); }}>
          <span className="nav-icon">🛒</span>
          <span>장보기</span>
        </button>
        <button className={`nav-item ${view === 'stats' ? 'active' : ''}`} onClick={() => { setView('stats'); setRefrigeratorStatus('safe'); }}>
          <span className="nav-icon">📊</span>
          <span>리포트</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
