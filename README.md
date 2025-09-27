# 2025학년도 전남대학교 대동제 PWA

이 프로젝트는 2025학년도 전남대학교 대동제를 위한 Progressive Web App (PWA)입니다.
오프라인 지도, 부스 정보, 타임테이블 등을 제공합니다.

## 기술 스택

-   **프론트엔드:** React
-   **번들러/개발 환경:** Vite
-   **PWA 관리:** Workbox
-   **라우팅:** React Router DOM
-   **지도 API:** 카카오맵 JavaScript API

## 시작하는 방법

1.  저장소를 클론합니다.
    ```bash
    git clone [GitHub 저장소 URL]
    cd festival-pwa-2025
    ```
2.  의존성을 설치합니다.
    ```bash
    npm install # 또는 yarn install
    ```
3.  `.env` 파일을 생성하고 환경 변수를 설정합니다. (`.env.example` 참조)
    ```
    # .env
    VITE_KAKAO_MAP_API_KEY=당신의_카카오맵_API_키
    ```
4.  개발 서버를 시작합니다.
    ```bash
    npm run dev # 또는 yarn dev
    ```

## 스크립트

-   `npm run dev`: 개발 서버 시작
-   `npm run build`: 프로덕션 빌드 생성
-   `npm run preview`: 빌드된 파일 미리보기

## Git 워크플로우

-   `main` 브랜치는 항상 안정적인 버전을 유지합니다.
-   새로운 기능 개발 시 `main` 브랜치에서 `feature/기능명` 브랜치를 생성하여 작업합니다.
-   작업 완료 후 Pull Request (PR)를 생성하여 코드 리뷰를 요청하고 `main` 브랜치에 병합합니다.