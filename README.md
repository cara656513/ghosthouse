Ghosthouse :집:
Ghosthouse는 React와 Zustand를 활용하여 설계되었습니다.
:열린_파일_폴더: 프로젝트 구조
```
Ghosthouse/
├── node_modules/               # 프로젝트 의존성 모듈
├── public/                     # 정적 파일 (HTML, 이미지, 아이콘 등)
├── src/                        # 소스 코드의 메인 디렉토리
│   ├── api/                    # API 요청 및 유틸리티 함수
│   ├── assets/                 # 프로젝트 전반에서 사용하는 정적 리소스
│   ├── components/             # 재사용 가능한 UI 컴포넌트 모음
│   │   ├── header/             # 헤더 관련 컴포넌트 (e.g., 로그인/비로그인 뷰)
│   │   ├── home/               # Home 페이지 컴포넌트
│   │   ├── mypage/             # 마이페이지 관련 컴포넌트
│   │   ├── newpost/            # 새 게시글 작성 관련 컴포넌트
│   │   ├── postDetail/         # 게시글 상세 보기 관련 컴포넌트
│   │   ├── SignIn/             # 로그인 페이지 컴포넌트
│   │   ├── SignUp/             # 회원가입 페이지 컴포넌트
│   │   └── Layout.jsx          # 공통 레이아웃 컴포넌트
│   │
│   ├── hooks/                  # 커스텀 훅 모음
│   │   ├── mypage/             # 마이페이지 관련 커스텀 훅
│   │   ├── posts/              # 게시글 관련 커스텀 훅
│   │
│   ├── pages/                  # 주요 페이지 컴포넌트
│   │   ├── DetailPage.jsx      # 게시글 상세 페이지
│   │   ├── HomePage.jsx        # 메인 홈 페이지
│   │   ├── MyPage.jsx          # 마이페이지
│   │   ├── NewPostPage.jsx     # 새 게시글 작성 페이지
│   │   ├── ProfilePage.jsx     # 사용자 프로필 페이지
│   │   ├── SearchPage.jsx      # 검색 페이지
│   │   ├── SignInPage.jsx      # 로그인 페이지
│   │   ├── SignUpPage.jsx      # 회원가입 페이지
│   │   └── UpdatePostPage.jsx  # 게시글 수정 페이지
│   │
│   ├── shared/                 # 공용 모듈 및 컴포넌트
│   │   └── Router.jsx          # React Router 설정
│   │
│   ├── stores/                 # 상태 관리 (Zustand 스토어)
│   │   ├── authStore.js        # 인증 관련 상태 관리
│   │   ├── userStore.js        # 사용자 정보 상태 관리
│   │   └── useUserStore.js     # 사용자 상태 관리 훅
│   │
│   ├── styles/                 # 스타일 파일 (Global, 페이지 스타일 등)
│   │   ├── AuthStyle.jsx       # 인증 관련 스타일
│   │   └── GlobalStyle.jsx     # 글로벌 스타일 정의
│   │
│   ├── utils/                  # 유틸리티 함수 모음
│   │   ├── supabaseClient.js   # Supabase 클라이언트 설정
│   │   ├── toastcontainer.js   # 알림 기능 설정
│   │   └── validation.js       # 입력값 검증 함수
│   │
│   ├── zustand/                # Zustand 관련 스토어 관리 디렉토리
│   │   ├── authStore.js        # 사용자 인증 상태 관리
│   │   ├── userStore.js        # 사용자 상태 관리
│   │   └── bearStore.js        # 테스트용 스토어
│   │
│   ├── App.css                 # 글로벌 CSS 파일
│   ├── App.jsx                 # 최상위 컴포넌트
│   ├── index.css               # 초기화 및 기본 스타일 정의
│   ├── index.html              # HTML 템플릿
│   ├── index.jsx               # ReactDOM 렌더링 엔트리
│   ├── .env.local              # 환경 변수 파일
│   ├── .gitignore              # Git에 포함하지 않을 파일 목록
│   ├── .prettierrc             # Prettier 코드 스타일 설정
│   ├── eslint.config.js        # ESLint 설정 파일
│   ├── package.json            # 프로젝트 설정 및 의존성
│   └── package-lock.json       # 고정된 의존성 버전 관리
```

---

🛠 주요 기능
Authentication: Zustand로 관리되는 사용자 인증 상태.
Post Management: 게시글 작성, 수정, 삭제 및 검색 기능.
Responsive Design: 모바일과 데스크톱 환경을 고려한 UI.
Reusable Components: 모듈화된 UI 컴포넌트 설계.
Supabase Integration: 백엔드와의 데이터 통신.

---

🌟 사용 기술 스택
Frontend: React, Zustand, Styled-Components
Backend: Supabase (REST API)
Routing: React Router
Styling: CSS-in-JS (Styled-Components)
State Management: Zustand
