import React from 'react';
import './Mascot.css';

const Mascot = ({
    status = 'safe',
    safeCount = 0,
    warningCount = 0,
    urgentCount = 0,
    expiredCount = 0
}) => {
    const getMascotConfig = () => {
        const colors = {
            yellow: '#FFDE67',
            brown: '#4A3022',
            pink: '#FF9999',
            blue: '#A7E2FF',
            orange: '#FFB300',
            gray: '#B0BEC5'
        };

        switch (status) {
            case 'safe':
                return {
                    bodyColor: colors.yellow,
                    eyeType: 'happy-dot',
                    mouthType: 'laugh',
                    showCheeks: true,
                    message: '냉장고 상태가 아주 좋아요! 최고예요 👍',
                    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)',
                    flapClass: 'flap-slow'
                };
            case 'warning':
                return {
                    bodyColor: '#FFD54F',
                    eyeType: 'worried-dot',
                    mouthType: 'small-o',
                    showCheeks: false, // Hide cheeks when pale
                    showPaleFace: true,
                    message: '유통기한이 다가오는 재료가 있어요... 😰',
                    bgGradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFFFFF 100%)',
                    flapClass: 'flap-medium'
                };
            case 'urgent':
                return {
                    bodyColor: colors.orange,
                    eyeType: 'worried-dot',
                    mouthType: 'small-o',
                    showCheeks: true,
                    showSweat: true,
                    message: '급해요! 지금 바로 요리해 보세요! 😰',
                    bgGradient: 'linear-gradient(135deg, #FFEBEE 0%, #FFFFFF 100%)',
                    flapClass: 'flap-fast'
                };
            case 'expired':
                return {
                    bodyColor: colors.gray,
                    eyeType: 'sad-dot',
                    mouthType: 'upside-down',
                    showCheeks: false,
                    message: '이런, 아쉽지만 상한 재료는 비워주세요 😢',
                    bgGradient: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
                    flapClass: 'flap-stop'
                };
            case 'inactive':
                return {
                    bodyColor: '#ECEFF1',
                    eyeType: 'neutral-dot',
                    mouthType: 'straight',
                    showCheeks: false,
                    message: '냉장고가 비어있네요! 콜비는 쉬는 중... 💤',
                    bgGradient: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)',
                    flapClass: 'flap-stop'
                };
            default:
                return {
                    bodyColor: colors.yellow,
                    eyeType: 'happy-dot',
                    mouthType: 'laugh',
                    showCheeks: true,
                    message: '안녕하세요! 콜비가 냉장고를 지켜요!',
                    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)',
                    flapClass: 'flap-slow'
                };
        }
    };

    const config = getMascotConfig();
    const darkBrown = '#4A3022';

    return (
        <div className="mascot-container" style={{ background: config.bgGradient }}>
            <div className="mascot-wrapper">
                <div className="front-colbee-container">
                    <svg viewBox="0 0 200 200" className="front-colbee-svg">
                        <defs>
                            <clipPath id="frontBodyClip">
                                <path d="M100 40 C60 40 30 70 30 115 C30 160 60 185 100 185 C140 185 170 160 170 115 C170 70 140 40 100 40 Z" />
                            </clipPath>
                            <linearGradient id="paleGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#81D4FA" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>

                        {/* Wings */}
                        <g className={`front-wings ${config.flapClass}`}>
                            <ellipse cx="45" cy="100" rx="35" ry="25" fill="#A7E2FF" opacity="0.6" stroke="#fff" strokeWidth="2" transform="rotate(-15 45 100)" />
                            <ellipse cx="155" cy="100" rx="35" ry="25" fill="#A7E2FF" opacity="0.6" stroke="#fff" strokeWidth="2" transform="rotate(15 155 100)" />
                        </g>

                        {/* Antennae - 갈고리 모양 */}
                        <g className="front-antenna">
                            <path d="M80 60 Q70 20 50 35" fill="none" stroke={darkBrown} strokeWidth="5" strokeLinecap="round" />
                            <path d="M120 60 Q130 20 150 35" fill="none" stroke={darkBrown} strokeWidth="5" strokeLinecap="round" />
                        </g>

                        {/* Body - 찐빵 형태의 얼굴형 */}
                        <path d="M100 40 C60 40 30 70 30 115 C30 160 60 185 100 185 C140 185 170 160 170 115 C170 70 140 40 100 40 Z" fill={config.bodyColor} stroke={darkBrown} strokeWidth="2" />

                        {/* Stripes */}
                        <g clipPath="url(#frontBodyClip)">
                            <rect x="20" y="105" width="160" height="22" fill={darkBrown} />
                            <rect x="20" y="145" width="160" height="22" fill={darkBrown} />
                        </g>

                        {/* Pale Face Overlay - 주의/걱정 상황 */}
                        {config.showPaleFace && (
                            <g clipPath="url(#frontBodyClip)">
                                <rect x="30" y="40" width="140" height="80" fill="url(#paleGradient)" opacity="0.6" />
                            </g>
                        )}

                        {/* Cheeks - 발그레한 볼터치 */}
                        {config.showCheeks && (
                            <g opacity="0.4">
                                <circle cx="60" cy="115" r="10" fill="#FF9999" />
                                <circle cx="140" cy="115" r="10" fill="#FF9999" />
                            </g>
                        )}

                        {/* Eyes */}
                        <g transform="translate(100, 100)">
                            <g transform="translate(-30, 0)">{renderEye(config.eyeType, darkBrown)}</g>
                            <g transform="translate(30, 0)">{renderEye(config.eyeType, darkBrown)}</g>
                        </g>

                        {/* Sweat Drops - 긴급 상황 애니메이션 */}
                        {config.showSweat && (
                            <g className="sweat-drops">
                                <path className="sweat-drop" d="M150 70 Q155 85 150 100" fill="none" stroke="#A7E2FF" strokeWidth="4" strokeLinecap="round" />
                                <path className="sweat-drop" d="M165 80 Q170 95 165 110" fill="none" stroke="#A7E2FF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
                            </g>
                        )}

                        {/* Mouth */}
                        <g transform="translate(100, 130)">
                            {renderMouth(config.mouthType, darkBrown)}
                        </g>
                    </svg>
                </div>

                <div className="message-bubble" style={{ borderColor: config.bodyColor }}>
                    <p style={{ color: darkBrown, fontWeight: 'bold', margin: 0 }}>{config.message}</p>
                </div>

                <div className="status-counts">
                    {safeCount > 0 && <span className="count-item safe">🟢 {safeCount}</span>}
                    {warningCount > 0 && <span className="count-item warning">🟡 {warningCount}</span>}
                    {urgentCount > 0 && <span className="count-item urgent">🔴 {urgentCount}</span>}
                    {expiredCount > 0 && <span className="count-item expired">⚫ {expiredCount}</span>}
                </div>
            </div>
        </div>
    );
};

const renderEye = (type, color) => {
    switch (type) {
        case 'happy-dot':
            return <circle cx="0" cy="0" r="7" fill={color} />;
        case 'worried-dot':
            return (
                <g>
                    <path d="M -8 -10 Q 0 -15 8 -10" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
                    <circle cx="0" cy="0" r="7" fill={color} />
                </g>
            );
        case 'sad-dot':
            return <circle cx="0" cy="0" r="6" fill="#78909C" />;
        case 'neutral-dot':
            return <line x1="-8" y1="0" x2="8" y2="0" stroke={color} strokeWidth="4" strokeLinecap="round" />;
        default:
            return <circle cx="0" cy="0" r="7" fill={color} />;
    }
};

const renderMouth = (type, color) => {
    switch (type) {
        case 'laugh':
            return <path d="M -15 0 Q 0 25 15 0 Z" fill="#FF8A80" stroke={color} strokeWidth="2" />;
        case 'small-o':
            return <ellipse cx="0" cy="5" rx="7" ry="9" fill="white" stroke={color} strokeWidth="2" />;
        case 'upside-down':
            return <path d="M -10 10 Q 0 0 10 10" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />;
        default:
            return <path d="M -10 0 Q 0 10 10 0" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />;
    }
};

export default Mascot;