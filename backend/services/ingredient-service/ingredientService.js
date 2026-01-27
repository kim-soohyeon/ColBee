// ingredientService.js
class IngredientService {
    // 식재료 등록
    async registerIngredient(ingredientData) {
        // In a real app: db.ingredients.create(ingredientData)
        console.log(`Registering ingredient: ${ingredientData.product_name}`);
        return {
            status: 'success',
            message: `콜비가 ${ingredientData.product_name}을 냉장고에 등록했어요! 😊`,
            data: ingredientData
        };
    }

    // 식재료 목록 조회
    async getIngredients(refrigeratorId) {
        // In a real app: db.ingredients.findAll({ where: { refrigerator_id: refrigeratorId } })
        return [
            { id: 1, product_name: '우유', category: 'dairy', expiry_date: '2024-01-30', status: 'active' },
            { id: 2, product_name: '두부', category: 'vegetable', expiry_date: '2024-01-23', status: 'active' }
        ];
    }

    // 식재료 상태 변경 (소비/폐기)
    async updateStatus(ingredientId, status) {
        // status: 'consumed', 'disposed'
        console.log(`Updating ingredient ${ingredientId} to status: ${status}`);
        return { success: true };
    }
}

module.exports = new IngredientService();
