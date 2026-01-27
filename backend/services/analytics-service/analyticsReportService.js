// analyticsReportService.js
class AnalyticsReportService {
    // 월간 콜비 리포트 생성
    async generateColbieMonthlyReport(userId, yearMonth) {
        // Note: In a real app, this would involve a DB call to fetch statistics.
        const stats = {
            waste_rate: 15.0,
            total_purchases: 45,
            total_consumed: 38,
            total_disposed: 7,
            monthly_waste_cost: 28000
        }; // Mock statistics for implementation structure

        const wasteRatePercentage = parseFloat(stats.waste_rate);
        let colbieRating = '😊';
        let ratingMessage = '정말 잘하고 있어요!';

        if (wasteRatePercentage < 10) {
            colbieRating = '😍';
            ratingMessage = '최고예요! 정말 대단해요!';
        } else if (wasteRatePercentage < 20) {
            colbieRating = '😊';
            ratingMessage = '정말 잘하고 있어요!';
        } else if (wasteRatePercentage < 30) {
            colbieRating = '😐';
            ratingMessage = '평균적으로 잘하고 있어요';
        } else if (wasteRatePercentage < 40) {
            colbieRating = '😕';
            ratingMessage = '조금 더 신경써봐요';
        } else {
            colbieRating = '😢';
            ratingMessage = '좀 더 신경써야 할 것 같아요';
        }

        // 카테고리별 평가 (Mock)
        const categoryRatings = {
            excellent: [{ category: '유제품', performance: '92%' }],
            poor: [{ category: '채소', performance: '28% 폐기' }]
        };

        // 콜비의 조언
        const colbieAdvice = this.generateAdvice(stats, categoryRatings);

        return {
            month: yearMonth,
            colbieRating,
            ratingMessage,
            statistics: {
                totalPurchases: stats.total_purchases,
                totalConsumed: stats.total_consumed,
                totalDisposed: stats.total_disposed,
                wasteRate: `${wasteRatePercentage.toFixed(1)}%`,
                savingsAmount: stats.monthly_waste_cost
            },
            bestCategories: categoryRatings.excellent,
            needsImprovement: categoryRatings.poor,
            colbieAdvice,
            nextMonthGoal: this.generateNextMonthGoal(wasteRatePercentage)
        };
    }

    // 콜비의 조언 생성
    generateAdvice(stats, categoryRatings) {
        const advices = [];

        if (categoryRatings.poor.length > 0) {
            const poorCategory = categoryRatings.poor[0].category;
            advices.push(`💡 "${poorCategory}" 관리에 더 신경써보세요. 냉동 보관을 시도해보세요!`);
        }

        if (categoryRatings.excellent.length > 0) {
            const bestCategory = categoryRatings.excellent[0].category;
            advices.push(`👑 "${bestCategory}" 관리 정말 잘하고 있어요! 이 방식을 다른 음식에도 적용해보세요`);
        }

        if (stats.waste_rate < 20) {
            advices.push(`🎯 지금 추세면 다음 달에 더 좋은 결과를 기대할 수 있어요!`);
        }

        return advices;
    }

    // 다음 달 목표 설정
    generateNextMonthGoal(currentWasteRate) {
        const targetWasteRate = Math.max(5, currentWasteRate - 5);

        return {
            targetWasteRate: `${targetWasteRate.toFixed(1)}%`,
            message: `다음 달 목표: 음식물 쓰레기 ${targetWasteRate.toFixed(1)}%까지 줄이기!`,
            tips: [
                '1주일 단위로 식재료 체크하기',
                '신선한 음식부터 먹기',
                '냉동 보관 활용하기',
                '친구와 나눔하기'
            ]
        };
    }
}

module.exports = new AnalyticsReportService();
