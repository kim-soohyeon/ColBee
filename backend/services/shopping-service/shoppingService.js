// shoppingService.js
class ShoppingService {
    // 장보기 리스트 추천 (유통기한 임박 및 소진된 품목 바탕으로 자동 생성)
    generateRecommendations(ingredients) {
        const recommendations = ingredients
            .filter(item => {
                const daysRemaining = this.calculateDaysRemaining(item.expiry_date);
                return daysRemaining <= 7 && item.status === 'active';
            })
            .map(item => ({
                product_name: item.product_name,
                reason: `${item.product_name} 유통기한 임박 (D-${this.calculateDaysRemaining(item.expiry_date)})`,
                is_auto_generated: true
            }));

        return recommendations;
    }

    // 장보기 품목 추가
    async addItem(userId, itemName) {
        console.log(`Adding ${itemName} to shopping list for user ${userId}`);
        return { success: true };
    }

    // 장보기 완료 처리
    async completeItem(itemId) {
        console.log(`Marking item ${itemId} as purchased`);
        return { success: true };
    }

    calculateDaysRemaining(expiryDateStr) {
        const expiryDate = new Date(expiryDateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        expiryDate.setHours(0, 0, 0, 0);

        const diffTime = expiryDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}

module.exports = new ShoppingService();
