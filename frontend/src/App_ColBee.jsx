import React, { useState, useEffect } from 'react';
import Mascot from './components/Mascot';
import './App.css';
import './index.css';

/**
 * ColBee - 혼자 사는 사람을 위한 냉장고 관리 앱
 * Main App Component
 */

function App() {
  const [view, setView] = useState('home');
  const [ingredients, setIngredients] = useState([
    { 
      id: 1, 
      name: '우유', 
      category: 'dairy',
      expiryDate: '2024-01-30',
      daysRemaining: 10,
      status: 'safe'
    },
    { 
      id: 2, 
      name: '두부', 
      category: 'tofu',
      expiryDate: '2024-01-23',
      daysRemaining: 3,
      status: 'warning'
    },
    { 
      id: 3, 
      name: '깻잎', 
      category: 'vegetable',
      expiryDate: '2024-01-21',
      daysRemaining: 1,
      status: 'urgent'
    },
    { 
      id: 4, 
      name: '치즈', 
      category: 'dairy',
      expiryDate: '2024-02-10',
      daysRemaining: 21,
      status: 'safe'
    },
    { 
      id: 5, 
      name: '요거트', 
      category: 'dairy',
      expiryDate: '2024-02-05',
      daysRemaining: 16,
      status: 'safe'
    },
  ]);

  // 냉장고 전체 상태 계산
  const getRefrigeratorStatus = () => {
    const safeCount = ingredients.filter(i => i.status === 'safe').length;
    const warningCount = ingredients.filter(i => i.status === 'warning').length;
    const urgentCount = ingredients.filter(i => i.status === 'urgent').length;
    const expiredCount = ingredients.filter(i => i.status === 'expired').length;

    // 가장 긴급한 상태 반환
    if (urgentCount > 0 || expiredCount > 0) return 'urgent';
    if (warningCount > 0) return 'warning';
    return 'safe';
  };

  const refrigeratorStatus = getRefrigeratorStatus();
  const statusCounts = {
    safe: ingredients.filter(i => i.status === 'safe').length,
    warning: ingredients.filter(i => i.status === 'warning').length,
    urgent: ingredients.filter(i => i.status === 'urgent').length,
    expired: ingredients.filter(i => i.status === 'expired').length
  };

  // 식재료 추가
  const handleAddIngredient = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newIng = {
      id: Date.now(),
      name: formData.get('name'),
      category: formData.get('category'),
      expiryDate: formData.get('date'),
      daysRemaining: calculateDaysRemaining(formData.get('date')),
      status: 'safe'
    };

    setIngredients([...ingredients, newIng]);
    
    // 콜비 알림 메시지
    showColbieNotification(`콜비가 ${newIng.name}을 냉장고에 등록했어요! 😊`);
    
    e.target.reset();
    setView('list');
  };

  // 일수 계산
  const calculateDaysRemaining = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const expiryDate = new Date(dateString);
    expiryDate.setHours(0, 0, 0, 0);
    
    const diffTime = expiryDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // 콜비 알림
  const showColbieNotification = (message) => {
    alert(message);
  };

  // 식재료 삭제
  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  // 식재료 상태 업데이트
  const handleMarkAsConsumed = (id) => {
    const updatedIngredients = ingredients.map(ing => 
      ing.id === id ? { ...ing, status: 'consumed' } : ing
    );
    setIngredients(updatedIngredients.filter(ing => ing.status !== 'consumed'));
    showColbieNotification('좋아요! 음식물 쓰레기를 줄여주셨어요 🌱');
  };

  // 화면 렌더링
  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeView statusCounts={statusCounts} onNavigate={setView} />;
      
      case 'list':
        return (
          <IngredientListView 
            ingredients={ingredients} 
            onDelete={handleDeleteIngredient}
            onConsume={handleMarkAsConsumed}
            onNavigate={setView}
          />
        );
      
      case 'register':
        return (
          <RegisterView 
            onSubmit={handleAddIngredient}
            onNavigate={setView}
          />
        );
      
      case 'shop':
        return <ShoppingListView ingredients={ingredients} />;
      
      case 'stats':
        return <StatsView ingredients={ingredients} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="container">
      {/* 헤더 */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">🐝 ColBee</h1>
          <p className="app-subtitle">버리지 않는 냉장고</p>
        </div>
      </header>

      {/* 마스코트 */}
      {view !== 'register' && (
        <Mascot 
          status={refrigeratorStatus}
          safeCount={statusCounts.safe}
          warningCount={statusCounts.warning}
          urgentCount={statusCounts.urgent}
          expiredCount={statusCounts.expired}
        />
      )}

      {/* 메인 콘텐츠 */}
      <main className="main-content">
        {renderView()}
      </main>

      {/* 하단 네비게이션 */}
      <nav className="footer-nav">
        <button 
          className={`nav-item ${view === 'home' || view === 'register' ? 'active' : ''}`} 
          onClick={() => setView('home')}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">홈</span>
        </button>
        <button 
          className={`nav-item ${view === 'list' ? 'active' : ''}`} 
          onClick={() => setView('list')}
        >
          <span className="nav-icon">🥗</span>
          <span className="nav-label">냉장고</span>
        </button>
        <button 
          className={`nav-item ${view === 'shop' ? 'active' : ''}`} 
          onClick={() => setView('shop')}
        >
          <span className="nav-icon">🛒</span>
          <span className="nav-label">장보기</span>
        </button>
        <button 
          className={`nav-item ${view === 'stats' ? 'active' : ''}`} 
          onClick={() => setView('stats')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">리포트</span>
        </button>
      </nav>
    </div>
  );
}

// ==========================================
// 홈 화면 컴포넌트
// ==========================================
function HomeView({ statusCounts, onNavigate }) {
  return (
    <div className="view-container">
      <div className="card">
        <h2 className="card-title">📊 냉장고 현황</h2>
        
        <div className="status-grid">
          <div className="status-card safe">
            <div className="status-icon">🟢</div>
            <div className="status-number">{statusCounts.safe}</div>
            <div className="status-label">안전</div>
          </div>
          
          <div className="status-card warning">
            <div className="status-icon">🟡</div>
            <div className="status-number">{statusCounts.warning}</div>
            <div className="status-label">주의</div>
          </div>
          
          <div className="status-card urgent">
            <div className="status-icon">🔴</div>
            <div className="status-number">{statusCounts.urgent}</div>
            <div className="status-label">긴급</div>
          </div>
          
          <div className="status-card expired">
            <div className="status-icon">⚫</div>
            <div className="status-number">{statusCounts.expired}</div>
            <div className="status-label">만료</div>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-large"
          onClick={() => onNavigate('register')}
        >
          + 식재료 추가
        </button>

        <div className="info-box">
          <p>💡 <strong>팁:</strong> 오늘의 식재료를 추가하고 콜비와 함께 효율적으로 관리해보세요!</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 식재료 목록 화면 컴포넌트
// ==========================================
function IngredientListView({ ingredients, onDelete, onConsume, onNavigate }) {
  const groupedByStatus = {
    safe: ingredients.filter(i => i.status === 'safe'),
    warning: ingredients.filter(i => i.status === 'warning'),
    urgent: ingredients.filter(i => i.status === 'urgent'),
    expired: ingredients.filter(i => i.status === 'expired')
  };

  const renderIngredientCard = (ing, status) => {
    const statusConfig = {
      safe: { color: '#4CAF50', icon: '🟢', message: '안전해요' },
      warning: { color: '#FFC107', icon: '🟡', message: '주의!' },
      urgent: { color: '#FF5252', icon: '🔴', message: '긴급!' },
      expired: { color: '#999', icon: '⚫', message: '만료됨' }
    };

    const config = statusConfig[status];

    return (
      <div key={ing.id} className="ingredient-card" style={{ borderLeftColor: config.color }}>
        <div className="ingredient-info">
          <div className="ingredient-header">
            <span className="ingredient-name">{ing.name}</span>
            <span className="ingredient-status" style={{ backgroundColor: config.color }}>
              {config.icon} {config.message}
            </span>
          </div>
          <div className="ingredient-details">
            <span className="ingredient-category">카테고리: {ing.category}</span>
            <span className="ingredient-days">D-{ing.daysRemaining}</span>
          </div>
        </div>
        <div className="ingredient-actions">
          <button 
            className="btn-small btn-consume"
            onClick={() => onConsume(ing.id)}
            title="소비함"
          >
            ✓
          </button>
          <button 
            className="btn-small btn-delete"
            onClick={() => onDelete(ing.id)}
            title="삭제"
          >
            ✕
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="view-container">
      <div className="card">
        <h2 className="card-title">내 냉장고 🥗</h2>

        {groupedByStatus.safe.length > 0 && (
          <div className="ingredient-group">
            <h3 className="group-title safe">🟢 안전 ({groupedByStatus.safe.length})</h3>
            <div className="ingredient-list">
              {groupedByStatus.safe.map(ing => renderIngredientCard(ing, 'safe'))}
            </div>
          </div>
        )}

        {groupedByStatus.warning.length > 0 && (
          <div className="ingredient-group">
            <h3 className="group-title warning">🟡 주의 ({groupedByStatus.warning.length})</h3>
            <div className="ingredient-list">
              {groupedByStatus.warning.map(ing => renderIngredientCard(ing, 'warning'))}
            </div>
          </div>
        )}

        {groupedByStatus.urgent.length > 0 && (
          <div className="ingredient-group">
            <h3 className="group-title urgent">🔴 긴급 ({groupedByStatus.urgent.length})</h3>
            <div className="ingredient-list">
              {groupedByStatus.urgent.map(ing => renderIngredientCard(ing, 'urgent'))}
            </div>
          </div>
        )}

        {groupedByStatus.expired.length > 0 && (
          <div className="ingredient-group">
            <h3 className="group-title expired">⚫ 만료됨 ({groupedByStatus.expired.length})</h3>
            <div className="ingredient-list">
              {groupedByStatus.expired.map(ing => renderIngredientCard(ing, 'expired'))}
            </div>
          </div>
        )}

        {ingredients.length === 0 && (
          <div className="empty-state">
            <p className="empty-icon">🧊</p>
            <p className="empty-text">냉장고가 비어있어요!</p>
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('register')}
            >
              식재료 추가하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 식재료 등록 화면 컴포넌트
// ==========================================
function RegisterView({ onSubmit, onNavigate }) {
  return (
    <div className="view-container">
      <div className="card">
        <h2 className="card-title">식재료 등록 📝</h2>
        
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">제품명 *</label>
            <input 
              id="name"
              name="name"
              type="text"
              placeholder="예: 우유, 계란, 사과"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">카테고리 *</label>
            <select id="category" name="category" required>
              <option value="">선택하세요</option>
              <option value="dairy">유제품</option>
              <option value="vegetable">채소</option>
              <option value="fruit">과일</option>
              <option value="meat">육류</option>
              <option value="fish">생선</option>
              <option value="tofu">두부</option>
              <option value="processed">가공식품</option>
              <option value="frozen">냉동식품</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">유통기한 *</label>
            <input 
              id="date"
              name="date"
              type="date"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-large">
              등록하기
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-large"
              onClick={() => onNavigate('home')}
            >
              취소
            </button>
          </div>
        </form>

        <div className="info-box">
          <p>💡 <strong>팁:</strong> 바코드를 스캔하거나 직접 입력하여 식재료를 등록할 수 있어요!</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 장보기 리스트 화면 컴포넌트
// ==========================================
function ShoppingListView({ ingredients }) {
  const warningItems = ingredients.filter(i => i.status === 'warning');
  const urgentItems = ingredients.filter(i => i.status === 'urgent');
  const recommendedItems = [...warningItems, ...urgentItems];

  return (
    <div className="view-container">
      <div className="card">
        <h2 className="card-title">장보기 리스트 🛒</h2>

        {recommendedItems.length > 0 && (
          <div className="shopping-section">
            <h3 className="section-title">📌 콜비가 추천</h3>
            <div className="shopping-list">
              {recommendedItems.map(item => (
                <div key={item.id} className="shopping-item">
                  <input type="checkbox" id={`item-${item.id}`} />
                  <label htmlFor={`item-${item.id}`}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-reason">{item.daysRemaining}일 남음</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="shopping-section">
          <h3 className="section-title">👤 자주 구매하는 항목</h3>
          <div className="shopping-list">
            <div className="shopping-item">
              <input type="checkbox" id="item-milk" />
              <label htmlFor="item-milk">
                <span className="item-name">우유</span>
              </label>
            </div>
            <div className="shopping-item">
              <input type="checkbox" id="item-egg" />
              <label htmlFor="item-egg">
                <span className="item-name">계란</span>
              </label>
            </div>
            <div className="shopping-item">
              <input type="checkbox" id="item-nori" />
              <label htmlFor="item-nori">
                <span className="item-name">김</span>
              </label>
            </div>
          </div>
        </div>

        <button className="btn btn-primary btn-large">
          구매 완료 ✓
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 통계 리포트 화면 컴포넌트
// ==========================================
function StatsView({ ingredients }) {
  const consumed = 38;
  const disposed = 7;
  const total = consumed + disposed;
  const wasteRate = total > 0 ? ((disposed / total) * 100).toFixed(1) : 0;
  const savings = 28000;

  return (
    <div className="view-container">
      <div className="card">
        <h2 className="card-title">월간 보고서 📊</h2>

        <div className="stats-header">
          <div className="stats-emoji">😊</div>
          <div className="stats-message">
            <h3>"정말 잘하고 있어요!"</h3>
            <p>쓰레기율 16% (우수!)</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">총 구매</div>
            <div className="stat-value">45</div>
            <div className="stat-unit">개</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">소비</div>
            <div className="stat-value">38</div>
            <div className="stat-unit">개 (84%)</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">폐기</div>
            <div className="stat-value">7</div>
            <div className="stat-unit">개 (16%)</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">절약액</div>
            <div className="stat-value">₩28K</div>
            <div className="stat-unit">절감</div>
          </div>
        </div>

        <div className="colbie-advice">
          <p>
            💡 <strong>콜비의 조언:</strong><br/>
            "채소" 관리에 더 신경써보세요. 냉동 보관을 시도해보면 폐기율을 더 줄일 수 있어요!
          </p>
        </div>

        <div className="next-goal">
          <h3>🎯 다음 달 목표</h3>
          <p>음식물 쓰레기율 10%까지 줄이기!</p>
          <ul className="goal-tips">
            <li>1주일 단위로 식재료 체크하기</li>
            <li>신선한 음식부터 먹기</li>
            <li>냉동 보관 활용하기</li>
            <li>친구와 나눔하기</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
