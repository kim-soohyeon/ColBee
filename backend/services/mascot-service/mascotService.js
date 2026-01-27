// mascotService.js
class MascotService {
  // 식재료 상태에 따른 콜비 표정 결정
  getColbieStatus(daysRemaining, ingredientStatus) {
    if (ingredientStatus === 'disposed' || ingredientStatus === 'consumed') {
      return {
        state: 'inactive',
        emotion: 'neutral',
        color: '#999999',
        message: ''
      };
    }

    if (daysRemaining > 7) {
      return {
        state: 'safe',
        emotion: '😊',
        color: '#4CAF50', // 초록색
        message: '완벽해요! 너무 걱정하지 마세요',
        soundTone: 'bright', // 밝은 음성
        animation: 'flutter_wings_light' // 가볍게 날개 파닥
      };
    }

    if (daysRemaining >= 3 && daysRemaining <= 7) {
      return {
        state: 'warning',
        emotion: '😐',
        color: '#FFC107', // 노란색
        message: '이제 서둘러야 해요. 며칠 남지 않았어요',
        soundTone: 'normal',
        animation: 'flutter_wings_medium' // 중간 속도
      };
    }

    if (daysRemaining >= 0 && daysRemaining < 3) {
      return {
        state: 'urgent',
        emotion: '😰',
        color: '#FF5252', // 빨간색
        message: '급해요! 지금 바로 써야 해요',
        soundTone: 'urgent',
        animation: 'flutter_wings_fast' // 빠르게 흔들림
      };
    }

    if (daysRemaining < 0) {
      return {
        state: 'expired',
        emotion: '😢',
        color: '#666666', // 회색
        message: '안타깝지만 이제 안 돼요. 안전을 위해 폐기하세요',
        soundTone: 'sad',
        animation: 'fade_down' // 서서히 내려감
      };
    }
  }

  // 냉장고 전체 상태 계산
  async getRefrigeratorStatus(userId, refrigeratorId) {
    // Note: In a real app, this would involve a DB call to fetch ingredients.
    // For now, this is implementing the logic structure from readme.md.
    const ingredients = []; // Placeholder for Ingredient.findAll results

    let overallStatus = 'safe';
    let statusCounts = {
      safe: 0,
      warning: 0,
      urgent: 0,
      expired: 0
    };

    for (const ingredient of ingredients) {
      const daysRemaining = this.calculateDaysRemaining(ingredient.expiry_date);
      const status = this.getColbieStatus(daysRemaining, ingredient.status);
      statusCounts[status.state]++;

      // 가장 긴급한 상태로 업데이트
      if (status.state === 'urgent' || status.state === 'expired') {
        overallStatus = 'urgent';
      } else if (status.state === 'warning' && overallStatus === 'safe') {
        overallStatus = 'warning';
      }
    }

    return {
      overallStatus,
      statusCounts,
      colbieEmotion: this.getColbieStatus(1, 'active')[overallStatus].emotion,
      color: this.getColbieStatus(1, 'active')[overallStatus].color,
      message: this.generateOverallMessage(statusCounts)
    };
  }

  // 전체 냉장고 상태 메시지 생성
  generateOverallMessage(statusCounts) {
    if (statusCounts.urgent > 0) {
      return `긴급! ${statusCounts.urgent}개가 방금 유통기한이 다 됐어요!`;
    }
    if (statusCounts.warning > 0) {
      return `주의! ${statusCounts.warning}개가 곧 유통기한이에요`;
    }
    if (statusCounts.safe === 0) {
      return '냉장고가 비어있네요! 장을 봐야 할 때인가요?';
    }
    return `모든 게 좋아요! ${statusCounts.safe}개 모두 안전해요`;
  }

  calculateDaysRemaining(expiryDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);
    
    const diffTime = expiryDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

module.exports = new MascotService();
