import React from 'react';
import './Mascot.css';

/**
 * ColBee Mascot Component - Front Facing Version
 * Combined side-profile aesthetics with front-facing layout and dynamic speed.
 */
const Mascot = ({
    status = 'safe',
    safeCount = 0,
    warningCount = 0,
    urgentCount = 0,
    expiredCount = 0
}) => {

    const getMascotConfig = () => {
        const baseYellow = '#FFDE67';
        const darkBrown = '#4A3022';
        const lightBlue = '#A7E2FF';

        switch (status) {
            case 'safe':
                return {
                    bodyColor: baseYellow,
                    stripeColor: darkBrown,
                    eyeType: 'happy',
                    mouthType: 'smile',
                    wingColor: lightBlue,
                    message: '완벽해요! 너무 걱정하지 마세요 😊',
                    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)',
                    flapClass: 'flap-slow'
                };
            case 'warning':
                return {
                    bodyColor: '#FFD54F',
                    stripeColor: darkBrown,
                    eyeType: 'worried', // Changed for more urgency
                    mouthType: 'straight',
                    wingColor: '#B3E5FC',
                    message: '이제 서둘러야 해요. 며칠 남지 않았어요 😐',
                    bgGradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFFFFF 100%)',
                    flapClass: 'flap-medium'
                };
            case 'urgent':
                return {
                    bodyColor: '#FFB300',
                    stripeColor: darkBrown,
                    eyeType: 'concerned', // Swapped types for better feel
                    mouthType: 'worried', // Open mouth for urgent
                    wingColor: '#81D4FA',
                    message: '급해요! 지금 바로 써야 해요 😰',
                    bgGradient: 'linear-gradient(135deg, #FFEBEE 0%, #FFFFFF 100%)',
                    flapClass: 'flap-fast'
                };
            case 'expired':
                return {
                    bodyColor: '#B0BEC5',
                    stripeColor: '#546E7A',
                    eyeType: 'sad',
                    mouthType: 'sad',
                    wingColor: '#CFD8DC',
                    message: '안타깝지만 이제 안 돼요. 폐기하세요 😢',
                    bgGradient: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
                    flapClass: 'flap-stop' // Changed from no-flap to ensure base styles apply
                };
            case 'inactive':
                return {
                    bodyColor: '#ECEFF1',
                    stripeColor: '#CFD8DC',
                    eyeType: 'neutral',
                    mouthType: 'straight',
                    wingColor: '#E1F5FE',
                    message: '냉장고가 비어있네요! 콜비는 쉬는 중... 💤',
                    bgGradient: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)',
                    flapClass: 'no-flap'
                };
            default:
                return {
                    bodyColor: baseYellow,
                    stripeColor: darkBrown,
                    eyeType: 'happy',
                    mouthType: 'smile',
                    wingColor: lightBlue,
                    message: '완벽해요!',
                    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)',
                    flapClass: 'flap-slow'
                };
        }
    };

    const config = getMascotConfig();

    return (
        <div className="mascot-container" style={{ background: config.bgGradient }}>
            <div className="mascot-wrapper">
                <div className="front-colbee-container">
                    <svg viewBox="0 0 200 200" className="front-colbee-svg">
                        {/* Wings - Left & Right */}
                        <g className={`front-wings ${config.flapClass}`}>
                            <ellipse cx="40" cy="80" rx="30" ry="20" fill={config.wingColor} opacity="0.8" stroke="#fff" strokeWidth="2" transform="rotate(-30 40 80)" />
                            <ellipse cx="160" cy="80" rx="30" ry="20" fill={config.wingColor} opacity="0.8" stroke="#fff" strokeWidth="2" transform="rotate(30 160 80)" />
                        </g>

                        {/* Antennae */}
                        <g className="front-antenna">
                            <path d="M85 50 Q75 25 65 30" fill="none" stroke={config.stripeColor} strokeWidth="3" strokeLinecap="round" />
                            <circle cx="65" cy="30" r="5" fill={config.bodyColor} stroke={config.stripeColor} strokeWidth="2" />

                            <path d="M115 50 Q125 25 135 30" fill="none" stroke={config.stripeColor} strokeWidth="3" strokeLinecap="round" />
                            <circle cx="135" cy="30" r="5" fill={config.bodyColor} stroke={config.stripeColor} strokeWidth="2" />
                        </g>

                        {/* Body (Round/Oval for front view) */}
                        <circle cx="100" cy="110" r="70" fill={config.bodyColor} stroke={config.stripeColor} strokeWidth="1" />

                        {/* Stripes (Horizontal for front view) */}
                        <g clipPath="url(#frontBodyClip)">
                            <rect x="30" y="85" width="140" height="15" fill={config.stripeColor} />
                            <rect x="30" y="115" width="140" height="15" fill={config.stripeColor} />
                            <rect x="30" y="145" width="140" height="15" fill={config.stripeColor} />
                        </g>

                        {/* Face - Eyes (Two eyes for front view) */}
                        <g transform="translate(100, 100)">
                            <g transform="translate(-25, 0)">
                                {renderEye(config.eyeType, config.stripeColor, 'left')}
                            </g>
                            <g transform="translate(25, 0)">
                                {renderEye(config.eyeType, config.stripeColor, 'right')}
                            </g>
                        </g>

                        {/* Face - Mouth (Centered) */}
                        <g transform="translate(100, 130)">
                            {renderMouth(config.mouthType, config.stripeColor)}
                        </g>

                        {/* Clip Definition */}
                        <defs>
                            <clipPath id="frontBodyClip">
                                <circle cx="100" cy="110" r="70" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                {/* Message Bubble */}
                <div className="message-bubble" style={{ borderColor: config.bodyColor }}>
                    <p style={{ color: config.stripeColor, fontWeight: 'bold' }}>{config.message}</p>
                </div>

                {/* Status Counts */}
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

const renderEye = (type, color, side) => {
    switch (type) {
        case 'happy':
            return (
                <g>
                    {/* Outline for visibility against stripes */}
                    <path d="M -12 0 Q 0 -18 12 0" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
                    <path d="M -12 0 Q 0 -18 12 0" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
                </g>
            );
        case 'sad':
            return (
                <g>
                    <path d="M -12 -6 Q 0 10 12 -6" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
                    <path d="M -12 -6 Q 0 10 12 -6" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
                </g>
            );
        case 'neutral':
            return (
                <g>
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
                    <line x1="-12" y1="0" x2="12" y2="0" stroke={color} strokeWidth="5" strokeLinecap="round" />
                </g>
            );
        case 'worried':
            return (
                <g>
                    <circle cx="0" cy="0" r="11" fill="#fff" />
                    <circle cx="0" cy="0" r="10" fill={color} />
                    <circle cx="-3" cy="-3" r="3" fill="#fff" />
                </g>
            );
        case 'concerned':
            return (
                <g>
                    <circle cx="0" cy="0" r="10" fill="#fff" stroke={color} strokeWidth="3" />
                    <circle cx="0" cy="3" r="4" fill={color} />
                </g>
            );
        default:
            return <circle cx="0" cy="0" r="10" fill={color} />;
    }
};

const renderMouth = (type, color) => {
    switch (type) {
        case 'smile':
            return <path d="M -15 0 Q 0 15 15 0" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />;
        case 'straight':
            return <line x1="-12" y1="5" x2="12" y2="5" stroke={color} strokeWidth="4" strokeLinecap="round" />;
        case 'worried':
            return <circle cx="0" cy="8" r="6" fill="none" stroke={color} strokeWidth="3" />;
        case 'sad':
            return <path d="M -12 12 Q 0 -2 12 12" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />;
        default:
            return <path d="M -15 0 Q 0 15 15 0" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />;
    }
};

export default Mascot;
