// notificationMessageService.js
class NotificationMessageService {
    // 카테고리와 상태에 따른 맞춤형 메시지
    generateCustomMessage(ingredient, daysRemaining) {
        const baseMessages = {
            'dairy': {
                urgent: '라떼나 요거트는 어떨까요? 지금이 최고예요!',
                warning: '우유는 신선할수록 맛있어요. 마셔보세요!',
                safe: '아직은 충분한 시간이 있어요 😊'
            },
            'vegetable': {
                urgent: '샐러드나 볶음으로 바로 사용하기 좋은 때예요!',
                warning: '신선함이 떨어지기 전에 써보세요',
                safe: '냉장실에서 천천히 신선함을 즐기세요'
            },
            'meat': {
                urgent: '구이, 조림, 스튜로 지금이 최고야!',
                warning: '냉동실로 옮기거나 조리하는 게 좋아요',
                safe: '냉동 보관하면 더 오래 보관할 수 있어요'
            },
            'frozen': {
                urgent: '해동해서 바로 조리하면 맛있어요',
                warning: '충분한 시간이 있으니 천천히 해도 돼요',
                safe: '냉동 음식은 시간 여유가 있어요 ❄️'
            }
        };

        const category = ingredient.category || 'processed';
        const state = daysRemaining > 7 ? 'safe' :
            daysRemaining >= 3 ? 'warning' : 'urgent';

        const categoryMessages = baseMessages[category] || baseMessages['processed'];
        return categoryMessages[state];
    }

    // 푸시 알림 제목과 본문
    generatePushNotification(ingredient, notificationType) {
        const daysRemaining = this.calculateDaysRemaining(ingredient.expiry_date);
        const suggestion = this.generateCustomMessage(ingredient, daysRemaining);

        const notifications = {
            'warning_7d': {
                title: '🟢 유통기한 알림',
                body: `${ingredient.product_name}이 있네요. 차근차근 써도 괜찮아요 😊`,
                bigText: suggestion,
                icon: '😊'
            },
            'warning_3d': {
                title: '🟡 유통기한 주의',
                body: `${ingredient.product_name} 3일 남았어요!`,
                bigText: suggestion,
                icon: '😐'
            },
            'warning_1d': {
                title: '🔴 유통기한 긴급!',
                body: `${ingredient.product_name} 내일이 유통기한입니다!`,
                bigText: suggestion,
                icon: '😰'
            },
            'urgent_0d': {
                title: '❌ 유통기한 오늘!',
                body: `${ingredient.product_name}이 오늘 유통기한입니다!`,
                bigText: suggestion,
                icon: '😰'
            }
        };

        return notifications[notificationType] || notifications['warning_3d'];
    }

    calculateDaysRemaining(expiryDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        expiryDate.setHours(0, 0, 0, 0);

        const diffTime = expiryDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}

module.exports = new NotificationMessageService();
