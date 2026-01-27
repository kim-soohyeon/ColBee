import React from 'react';

const Mascot = ({ status = 'safe' }) => {
    const statusConfig = {
        safe: { emoji: '😊', label: '완벽해요!', class: 'status-safe' },
        warning: { emoji: '😐', label: '서둘러요!', class: 'status-warning' },
        urgent: { emoji: '😰', label: '빨리요!!', class: 'status-urgent' },
        expired: { emoji: '😢', label: '아... 늦었어요', class: 'status-expired' },
    };

    const config = statusConfig[status] || statusConfig.safe;

    return (
        <div className="mascot-container">
            <div className={`mascot-emoji ${status}`}>
                {config.emoji}
            </div>
            <div className={`status-badge ${config.class}`}>
                {config.label}
            </div>
        </div>
    );
};

export default Mascot;
