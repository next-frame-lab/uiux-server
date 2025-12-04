# NextFrame 🎭

NextFrame는 공연 티켓 예매 및 관리를 위한 현대적인 웹 애플리케이션입니다.

## 주요 기능

### 🎪 공연 관리
- **공연 목록 조회**: 다양한 장르와 타입의 공연을 탐색할 수 있습니다
- **인기 공연**: 인기 있는 공연을 메인 페이지에서 확인할 수 있습니다
- **공연 상세 정보**: 공연의 자세한 정보, 일정, 장소 등을 확인할 수 있습니다
- **공연 검색 및 필터링**: 장르, 타입별로 공연을 검색하고 필터링할 수 있습니다

### 🎫 예매 시스템
- **좌석 선택**: 인터랙티브한 좌석 배치도에서 원하는 좌석을 선택할 수 있습니다
- **실시간 좌석 상태**: 예약 가능, 예약 중, 예약 완료 좌석을 실시간으로 확인할 수 있습니다
- **예매 정보 확인**: 선택한 좌석과 가격 정보를 확인할 수 있습니다

### 💳 결제
- **TossPayments 통합**: 안전하고 편리한 결제 시스템을 제공합니다
- **결제 성공/실패 처리**: 결제 결과를 명확하게 안내합니다

### 👤 사용자 관리
- **Kakao 소셜 로그인**: 간편한 카카오 계정 로그인을 지원합니다
- **마이페이지**: 사용자 정보 및 예매 내역을 관리할 수 있습니다

### ⭐ 리뷰 시스템
- **공연 리뷰 작성**: 관람한 공연에 대한 리뷰를 작성할 수 있습니다
- **별점 평가**: 5점 만점의 별점으로 공연을 평가할 수 있습니다
- **리뷰 좋아요**: 다른 사용자의 리뷰에 공감을 표시할 수 있습니다
- **무한 스크롤**: 많은 리뷰를 효율적으로 탐색할 수 있습니다

## 기술 스택

### Frontend Framework
- **React 18.3.1**: 사용자 인터페이스 구축
- **TypeScript 5.8.3**: 타입 안정성 보장
- **Vite 7.0**: 빠른 빌드 및 개발 서버

### 상태 관리
- **Recoil 0.7.7**: 전역 상태 관리
- **TanStack Query 4.40.1**: 서버 상태 관리 및 데이터 페칭

### 라우팅
- **React Router DOM 7.7.0**: 클라이언트 사이드 라우팅

### UI/스타일링
- **Tailwind CSS 4.1.11**: 유틸리티 기반 CSS 프레임워크
- **Headless UI 2.2.7**: 접근성 높은 UI 컴포넌트
- **Heroicons 2.2.0**: 아이콘 라이브러리
- **Swiper 11.2.10**: 터치 슬라이더

### 외부 서비스 통합
- **TossPayments SDK 2.3.7**: 결제 처리
- **Kakao JavaScript SDK**: 소셜 로그인

### 개발 도구
- **ESLint**: 코드 품질 및 스타일 검사
- **Prettier**: 코드 포맷팅
- **Jest**: 단위 테스트
- **Testing Library**: React 컴포넌트 테스트
- **MSW (Mock Service Worker)**: API 모킹

## 프로젝트 구조

```
src/
├── api/              # API 호출 함수들
├── assets/           # 이미지, 폰트 등 정적 자산
├── components/       # 재사용 가능한 React 컴포넌트
│   ├── common/       # 공통 컴포넌트
│   ├── layout/       # 레이아웃 컴포넌트 (Header, Footer, Category)
│   ├── payment/      # 결제 관련 컴포넌트
│   ├── performance/  # 공연 관련 컴포넌트
│   ├── reservation/  # 예매 관련 컴포넌트
│   ├── swiper/       # 캐러셀/슬라이더 컴포넌트
│   └── ui/           # 기본 UI 컴포넌트
├── hooks/            # 커스텀 React 훅
├── lib/              # 외부 라이브러리 설정
├── mocks/            # MSW 모킹 설정
├── pages/            # 페이지 컴포넌트
│   ├── auth/         # 인증 관련 페이지
│   ├── common/       # 공통 페이지 (404, Error)
│   ├── login/        # 로그인 페이지
│   ├── main/         # 메인 페이지
│   ├── mypage/       # 마이페이지
│   ├── payment/      # 결제 페이지
│   ├── performance/  # 공연 목록 및 상세 페이지
│   └── reservation/  # 예매 페이지
├── recoil/           # Recoil 상태 정의
├── router/           # 라우팅 설정
├── types/            # TypeScript 타입 정의
└── utils/            # 유틸리티 함수
```

## 시작하기

### 필수 요구사항
- Node.js (최신 LTS 버전 권장)
- pnpm (패키지 매니저)

### 설치

```bash
# pnpm 설치 (미설치 시)
npm install -g pnpm

# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (http://localhost:5173)
pnpm dev

# MSW(Mock Service Worker) 활성화하여 실행
ENABLE_MSW=true pnpm dev
```

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

## 테스트 및 코드 품질

### 테스트 실행

```bash
# 워치 모드로 테스트 실행
pnpm test

# CI 환경에서 테스트 실행
pnpm test:ci
```

### 코드 검사

```bash
# ESLint로 코드 검사
pnpm lint

# Prettier로 포맷 확인
pnpm format

# TypeScript 타입 체크
pnpm typecheck
```

## 주요 페이지

- `/` - 메인 페이지 (인기 공연 목록)
- `/login` - 로그인 페이지
- `/performances` - 공연 목록 페이지
- `/performances/:id` - 공연 상세 페이지
- `/performances/:id/seats` - 좌석 선택 페이지
- `/payments` - 결제 페이지
- `/payments/success` - 결제 성공 페이지
- `/payments/fail` - 결제 실패 페이지
- `/mypage` - 마이페이지
- `/auth/kakao/callback` - Kakao 로그인 콜백

## 라이센스

이 프로젝트는 비공개(Private) 프로젝트입니다.
