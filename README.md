# JNU Festival 2025

전남대학교 2025 대동제에서 필요한 정보를 한 곳에서 확인할 수 있도록 만든 모바일 중심 축제 정보 웹 서비스입니다.

기존에는 공연 일정, 학생 부스, 푸드트럭, 편의시설 등의 정보가 여러 카드뉴스와 안내물에 나뉘어 있어 현장에서 필요한 정보를 빠르게 찾기 어려웠습니다.

축제를 준비하는 과정에서 직접 느낀 이 불편을 줄이기 위해, 지도와 부스 정보, 행사 일정, 공지사항을 하나의 서비스로 통합했습니다.

> 2025 전남대학교 대동제 PRASINO '龍飛鳳舞'  
> 2025.09.29 - 2025.09.30

---

## Overview

- **형태**: 개인 프로젝트
- **역할**: 기획 · UI 구성 · Frontend 개발 · 배포
- **주요 환경**: 모바일 웹 / PWA
- **Frontend**: React, Vite
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Map**: Kakao Maps JavaScript API
- **PWA**: vite-plugin-pwa
- **Analytics**: Vercel Analytics

---

## Why I Built This

대학 축제에는 공연, 학생 부스, 이벤트, 편의시설 등 많은 정보가 동시에 제공됩니다.

하지만 기존에는 각 정보가 카드뉴스나 개별 안내물에 흩어져 있어, 축제 현장에서 특정 부스의 위치나 공연 시간을 확인하려면 여러 게시물을 다시 찾아야 했습니다.

그래서 사용자가 현장에서 가장 자주 확인하는 정보를 기준으로 기능을 나누고,

- 어디에 있는지 → **지도**
- 어떤 부스가 있는지 → **부스 안내**
- 지금 무엇을 하는지 → **타임테이블**
- 어떤 프로그램이 있는지 → **콘텐츠**
- 변경된 내용이 있는지 → **공지사항**

을 한 서비스 안에서 바로 확인할 수 있도록 구성했습니다.

---

## Features

### 1. 축제 지도

Kakao Maps JavaScript API를 사용해 축제장 내 부스와 주요 시설의 위치를 지도에서 확인할 수 있습니다.

- 부스 및 시설 위치 마커 표시
- 카테고리별 필터
- 지도 확대 수준에 따른 마커 표시 조정
- 마커 선택 시 해당 카테고리의 부스 목록 연동
- 브라우저 Geolocation API를 이용한 현재 위치 이동

지도와 목록을 분리하지 않고 연결해, 사용자가 위치를 확인한 뒤 바로 관련 부스 정보를 볼 수 있도록 구성했습니다.

---

### 2. 부스 안내

축제 부스를 카테고리별로 탐색할 수 있습니다.

- 부스 카테고리 필터
- 학생 부스의 주간 / 야간 운영 위치 구분
- 운영 시간 및 위치 표시
- 음식 / 소개팅 / 기타 등 세부 그룹 분류
- 부스 이미지 상세 보기
- 여러 이미지가 있는 경우 이미지 탐색 기능

---

### 3. 행사 콘텐츠

축제 기간 동안 진행되는 프로그램을 일정별로 확인할 수 있으며, 각 콘텐츠의 상세 페이지로 이동할 수 있습니다.

---

### 4. 타임테이블

축제 1일차와 2일차의 공연 및 행사 일정을 구분해 제공합니다.

공연 시작 시간과 프로그램 순서를 모바일 화면에서 빠르게 확인할 수 있도록 시간 중심의 목록 UI로 구성했습니다.

---

### 5. 공지사항

축제 진행 중 필요한 안내사항을 별도 페이지에서 확인할 수 있도록 구성했습니다.

---

### 6. PWA

`vite-plugin-pwa`를 이용해 모바일 환경에서 별도의 네이티브 앱 없이 웹 서비스를 앱과 유사한 형태로 사용할 수 있도록 구성했습니다.

- `standalone` display mode
- 모바일 홈 화면 설치 지원
- PWA manifest 구성
- Service Worker 자동 업데이트

---

## Screenshots

> 프로젝트 화면 이미지는 추후 추가 예정입니다.

<!--
예시

| Home | Map | Booth |
| --- | --- | --- |
| ![](docs/home.png) | ![](docs/map.png) | ![](docs/booth.png) |
-->

---

## Architecture

```text
User
 │
 ▼
React Application
 │
 ├── Home
 │
 ├── Booth List
 │
 ├── Festival Content
 │
 ├── Timetable
 │
 ├── Notice
 │
 └── Map
       │
       ▼
 Kakao Maps API
       │
       ├── Festival Markers
       ├── Category Filter
       └── Current Location

Festival Data
      │
      ├── Booth Data
      ├── Category Config
      └── Location Data
```

축제 기간에 필요한 정보가 대부분 정적인 데이터라는 점을 고려해, 별도의 백엔드를 두기보다 프론트엔드 내부 데이터를 기반으로 서비스를 구성했습니다.

---

## Technical Decisions

### 모바일 사용을 기준으로 화면을 구성했습니다

축제 정보는 데스크톱보다 실제 행사 현장에서 스마트폰으로 확인할 가능성이 높다고 판단했습니다.

따라서 데스크톱 중심 페이지를 축소하는 방식이 아니라, 처음부터 모바일 화면에서 지도와 목록을 빠르게 오갈 수 있도록 구성했습니다.

### 지도와 부스 목록을 연결했습니다

지도에서 위치만 보여주는 것으로 끝내지 않고, 마커를 선택하면 관련 카테고리의 부스 목록을 함께 확인할 수 있도록 구현했습니다.

사용자가 지도 → 목록 → 다시 지도 순서로 반복해서 페이지를 이동하지 않아도 되도록 하는 것이 목적이었습니다.

### 별도의 앱 대신 PWA를 사용했습니다

행사 기간에만 사용하는 서비스를 위해 사용자가 앱스토어에서 별도 앱을 설치하도록 하는 것은 진입 장벽이 크다고 판단했습니다.

웹 링크로 바로 접속할 수 있는 장점을 유지하면서도 모바일 홈 화면에 설치해 앱처럼 사용할 수 있도록 PWA 형태를 선택했습니다.

### 축제 데이터를 애플리케이션 내부에서 관리했습니다

이 서비스는 실시간 사용자 생성 데이터보다 정해진 축제 정보를 빠르게 조회하는 것이 핵심이었습니다.

따라서 별도의 서버와 데이터베이스를 추가하지 않고, 부스·시설·위치 데이터를 구조화해 프론트엔드에서 직접 관리했습니다.

---

## Project Structure

```text
src/
├── components/
│   ├── MapComponent
│   ├── BoothList
│   ├── FilterControls
│   └── SplashScreen
│
├── config/
│   └── CategoryConfig
│
├── data/
│   └── FestivalData
│
├── pages/
│   ├── HomePage
│   ├── MapPage
│   ├── BoothListPage
│   ├── ContentSchedulePage
│   ├── ContentDetailPage
│   ├── TimetablePage
│   └── NoticePage
│
└── App.jsx
```

---

## Tech Stack

| Category | Technology |
| --- | --- |
| Frontend | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Map | Kakao Maps JavaScript API |
| PWA | vite-plugin-pwa |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## Run Locally

```bash
git clone https://github.com/SeoYeonnnnnnn/2025_jnu_festival.git
cd 2025_jnu_festival
npm install
```

`.env` 파일을 생성한 뒤 Kakao Maps API Key를 설정합니다.

```env
VITE_KAKAO_MAP_API_KEY=
```

개발 서버를 실행합니다.

```bash
npm run dev
```

프로덕션 빌드:

```bash
npm run build
```

---

## Development Note

본 프로젝트는 2025 전남대학교 대동제 운영을 위해 제작한 프로젝트입니다.

프로젝트 종료 후 취업 준비 과정에서 당시 구현 내용과 기술적 의사결정을 다시 정리하여 문서를 보완했습니다.
