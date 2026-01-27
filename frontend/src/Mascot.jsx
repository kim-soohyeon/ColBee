import React, { useEffect, useState } from 'react';
import './Mascot.css';

/**
 * ColBee Mascot Component
 * 냉장고 상태에 따라 다양한 표정과 애니메이션을 표현하는 콜비 캐릭터
 * 
 * Props:
 * - status: 'safe' | 'warning' | 'urgent' | 'expired'
 * - safeCount: 안전한 식재료 개수
 * - warningCount: 주의 필요한 식재료 개수
 * - urgentCount: 긴급 식재료 개수
 * - expiredCount: 만료된 식재료 개수
 */

const Mascot = ({ 
  status = 'safe', 
  safeCount = 15,
  warningCount = 3,
  urgentCount = 0,
  expiredCount = 0
}) => {
  const [flutterAnimation, setFlutterAnimation] = useState(true);

  const getMascotConfig = () => {
    switch (status) {
      case 'safe':
        return {
          emotion: '😊',
          eyeType: 'happy', // 웃는 눈
          mouthType: 'smile', // 웃는 입
          bodyColor: '#2C3E50',
          accentColor: '#4CAF50',
          message: '완벽해요! 너무 걱정하지 마세요',
          flutterSpeed: 2000, // ms (느린 속도)
          flutterIntensity: 'light',
          soundTone: 'bright',
          bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
          wingColor: '#4CAF50'
        };
      case 'warning':
        return {
          emotion: '😐',
          eyeType: 'concerned', // 걱정하는 눈
          mouthType: 'straight', // 일자 입
          bodyColor: '#2C3E50',
          accentColor: '#FFC107',
          message: '이제 서둘러야 해요. 며칠 남지 않았어요',
          flutterSpeed: 1200,
          flutterIntensity: 'medium',
          soundTone: 'normal',
          bgGradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFE082 100%)',
          wingColor: '#FFC107'
        };
      case 'urgent':
        return {
          emotion: '😰',
          eyeType: 'worried', // 걱정하는 눈 (동공 확대)
          mouthType: 'worried', // 놀란 입
          bodyColor: '#2C3E50',
          accentColor: '#FF5252',
          message: '급해요! 지금 바로 써야 해요',
          flutterSpeed: 400,
          flutterIntensity: 'fast',
          soundTone: 'urgent',
          bgGradient: 'linear-gradient(135deg, #FFEBEE 0%, #EF9A9A 100%)',
          wingColor: '#FF5252'
        };
      case 'expired':
        return {
          emotion: '😢',
          eyeType: 'sad', // 슬픈 눈 (아래로 처진)
          mouthType: 'sad', // 슬픈 입
          bodyColor: '#2C3E50',
          accentColor: '#999999',
          message: '안타깝지만 이제 안 돼요. 안전을 위해 폐기하세요',
          flutterSpeed: 1500,
          flutterIntensity: 'none',
          soundTone: 'sad',
          bgGradient: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)',
          wingColor: '#CCCCCC'
        };
      default:
        return {
          emotion: '😊',
          eyeType: 'happy',
          mouthType: 'smile',
          bodyColor: '#2C3E50',
          accentColor: '#4CAF50',
          message: '완벽해요!',
          flutterSpeed: 2000,
          flutterIntensity: 'light',
          soundTone: 'bright',
          bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
          wingColor: '#4CAF50'
        };
    }
  };

  const config = getMascotConfig();

  return (
    <div className="mascot-container" style={{ background: config.bgGradient }}>
      <div className="mascot-wrapper">
        {/* ColBee 캐릭터 */}
        <div className="colbee">
          {/* 왼쪽 날개 */}
          <div 
            className={`wing wing-left ${status === 'urgent' ? 'flap-fast' : status === 'warning' ? 'flap-medium' : status === 'safe' ? 'flap-light' : 'no-flap'}`}
            style={{ borderColor: config.wingColor }}
          />

          {/* 오른쪽 날개 */}
          <div 
            className={`wing wing-right ${status === 'urgent' ? 'flap-fast' : status === 'warning' ? 'flap-medium' : status === 'safe' ? 'flap-light' : 'no-flap'}`}
            style={{ borderColor: config.wingColor }}
          />

          {/* 몸 (냉장고 파란색) */}
          <div 
            className="body" 
            style={{ 
              backgroundColor: config.bodyColor,
              borderColor: config.accentColor
            }}
          >
            {/* 노란색 줄무늬 (꿀벌) */}
            <div className="stripe stripe-1"></div>
            <div className="stripe stripe-2"></div>
            <div className="stripe stripe-3"></div>

            {/* 얼굴 */}
            <div className="face">
              {/* 왼쪽 눈 */}
              <div className="eye eye-left">
                {EyeComponent(config.eyeType)}
              </div>

              {/* 오른쪽 눈 */}
              <div className="eye eye-right">
                {EyeComponent(config.eyeType)}
              </div>

              {/* 입 */}
              <div className="mouth">
                {MouthComponent(config.mouthType)}
              </div>
            </div>
          </div>

          {/* 상태 배지 */}
          <div className="status-badge" style={{ backgroundColor: config.accentColor }}>
            <span className="badge-emoji">{config.emotion}</span>
          </div>
        </div>

        {/* 메시지 말풍선 */}
        <div className="message-bubble" style={{ borderColor: config.accentColor }}>
          <p style={{ color: config.accentColor, fontWeight: 'bold' }}>
            {config.message}
          </p>
        </div>

        {/* 상태 카운트 표시 */}
        <div className="status-counts">
          {safeCount > 0 && (
            <div className="count-item" style={{ backgroundColor: '#E8F5E9', color: '#4CAF50' }}>
              <span className="count-icon">🟢</span>
              <span className="count-text">{safeCount}</span>
            </div>
          )}
          {warningCount > 0 && (
            <div className="count-item" style={{ backgroundColor: '#FFF8E1', color: '#FFC107' }}>
              <span className="count-icon">🟡</span>
              <span className="count-text">{warningCount}</span>
            </div>
          )}
          {urgentCount > 0 && (
            <div className="count-item" style={{ backgroundColor: '#FFEBEE', color: '#FF5252' }}>
              <span className="count-icon">🔴</span>
              <span className="count-text">{urgentCount}</span>
            </div>
          )}
          {expiredCount > 0 && (
            <div className="count-item" style={{ backgroundColor: '#F5F5F5', color: '#999' }}>
              <span className="count-icon">⚫</span>
              <span className="count-text">{expiredCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * 눈 표정 컴포넌트
 */
const EyeComponent = (eyeType) => {
  switch (eyeType) {
    case 'happy':
      // 웃는 눈 (초승달 모양)
      return (
        <svg viewBox="0 0 24 24" className="eye-svg">
          <path d="M 4 12 Q 12 6 20 12" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="12" cy="10" r="1.5" fill="white" />
        </svg>
      );
    case 'concerned':
      // 걱정하는 눈
      return (
        <svg viewBox="0 0 24 24" className="eye-svg">
          <circle cx="12" cy="12" r="8" fill="white" />
          <circle cx="12" cy="13" r="4" fill="#2C3E50" />
        </svg>
      );
    case 'worried':
      // 걱정/겁먹은 눈 (동공 확대)
      return (
        <svg viewBox="0 0 24 24" className="eye-svg">
          <circle cx="12" cy="12" r="8" fill="white" />
          <circle cx="12" cy="12" r="6" fill="#2C3E50" />
        </svg>
      );
    case 'sad':
      // 슬픈 눈 (아래로 처진)
      return (
        <svg viewBox="0 0 24 24" className="eye-svg">
          <path d="M 4 8 Q 12 14 20 8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.5" fill="white" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="eye-svg">
          <circle cx="12" cy="12" r="8" fill="white" />
          <circle cx="12" cy="12" r="4" fill="#2C3E50" />
        </svg>
      );
  }
};

/**
 * 입 표정 컴포넌트
 */
const MouthComponent = (mouthType) => {
  switch (mouthType) {
    case 'smile':
      // 웃는 입 (U자 모양)
      return (
        <svg viewBox="0 0 24 24" className="mouth-svg">
          <path d="M 6 12 Q 12 16 18 12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'straight':
      // 일자 입 (걱정)
      return (
        <svg viewBox="0 0 24 24" className="mouth-svg">
          <path d="M 6 12 L 18 12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'worried':
      // 놀란 입 (O자 모양)
      return (
        <svg viewBox="0 0 24 24" className="mouth-svg">
          <circle cx="12" cy="12" r="3" fill="white" stroke="white" strokeWidth="2" />
        </svg>
      );
    case 'sad':
      // 슬픈 입 (역U자 모양)
      return (
        <svg viewBox="0 0 24 24" className="mouth-svg">
          <path d="M 6 14 Q 12 10 18 14" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="mouth-svg">
          <path d="M 6 12 Q 12 16 18 12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
  }
};

export default Mascot;
