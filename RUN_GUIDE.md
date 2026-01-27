# ColBee 프로젝트 실행 가이드

이 가이드는 콜비 프로젝트를 로컬 환경에서 실행하는 방법을 안내합니다.

## 시스템 요구 사항
- Node.js (v16 이상 권장)
- npm 또는 yarn

## 실행 순서

### 1. 의존성 설치
먼저 프론트엔드 디렉토리에서 필요한 패키지를 설치합니다.

```bash
cd frontend
npm install
```

### 2. 프론트엔드 실행
개발 서버를 실행하여 웹 앱을 확인합니다.

```bash
npm run dev
```
기본적으로 `http://localhost:5173`에서 실행됩니다.

### 3. 백엔드 서비스 (참고)
백엔드 로직은 현재 `backend/services/` 디렉토리에 마이크로서비스 구조로 구현되어 있습니다. 
각 서비스 폴더에는 핵심 비즈니스 로직인 `.js` 파일들이 포함되어 있으며, 실제 서버를 구동하기 위해서는 각 서비스별로 `express`와 같은 프레임워크 설정 및 의존성 설치가 필요합니다.

- `mascot-service/mascotService.js`: 콜비 상태 로직
- `notification-service/notificationMessageService.js`: 알림 메시지 로직
- `analytics-service/analyticsReportService.js`: 통계 리포트 로직

## 폴더 구조
- `frontend/`: React 기반 웹 어플리케이션
- `backend/services/`: 핵심 마이크로서비스 로직
- `database/`: 데이터베이스 스키마 정의
- `docs/`: 프로젝트 관련 문서
