# 프로젝트 이름
GHOST HOUSE👻

## 📖 목차
1. [프로젝트 소개](#프로젝트-소개)
2. [팀소개](#팀소개)
3. [프로젝트 계기](#프로젝트-계기)
4. [필수 기능](#필수-기능)
5. [도전 기능](#도전-기능)
6. [개발기간](#개발기간)
7. [기술스택](#기술스택)
8. [서비스 구조](#서비스-구조)
9. [와이어프레임](#와이어프레임)
10. [ui/ux](#uiux)
12. [ERD](#ERD)
13. [프로젝트 파일 구조](#프로젝트-파일-구조)
14. [코드](#코드)
15. [Trouble Shooting](#trouble-shooting)

## 👨‍🏫 프로젝트 소개
우리 집 근처에도 흉가가?!!
</br>
본인이 알고 있는 흉가를 소개하고 공유하는 웹사이트입니다.

## 👥 팀소개
| 박우석 | 김진실 | 권현준 | 강민정 | 주호빈 | 서지안 |
|--------|--------|--------|--------|--------|--------|
|FE/UL |FE/UL/VL |FE/UL |FE/UL |FE/UL |TL |
|점메추 |디테일장인 |준스탠드 |사랑해3조 |끝까지간다 |부상투혼 |
| - 마이 페이지</br>- 내 정보 수정</br>- 게시물 삭제 | - 메인 페이지</br>- 디테일 페이지</br>- 라우터 |- 로그인</br>- 회원가입</br>- zustand |- 새 글쓰기</br>- 게시글 수정</br>- 라우터 |- 디테일 페이지</br>- 검색</br>- 댓글 |- 발표 |

## 프로젝트 계기
지도 API를 활용한 기발한 아이디어가 없을까? 하는 생각에서 시작되었습니다.
</br>
흉가를 직접 방문하여 위치를 지정 후 게시물을 올릴 수 있는 사이트를 기획, 구현하였습니다.

## 필수 기능
1. 지도 API
   - 지도상에 Marker를 표시하고 활용
   - 카카오 지도 api 활용
2. 전역 상태 관리 라이브러리
   - (서버 상태) TanStack Query
   - (클라이언트 상태) Zustand
3. Supabase를 활용한 CRUD
   - 게시물 작성, 수정, 삭제
   - 마이페이지: 내 게시물 보기, 프로필 수정
4. react-router-dom을 활용한 라우팅 처리
   - useNavigate
   - Navigate 컴포넌트
   - 중첩라우팅, Outlet
   - Link 태그
   - useParams
  
## 도전 기능
1. Custom Hook을 이용한 비즈니스 로직 재사용
2. Supabase Authentication을 사용하여 로그인, 회원가입 기능 구현

## ⏲️ 개발기간
- 2024.11.29(금) ~ 2024.12.05(목)

## 📚️ 기술스택
<div>
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white" />
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
<img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=CSS&logoColor=white" />
<img src="https://img.shields.io/badge/StyledComponent-FF4785?style=flat-square&logo=StyledComponent&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/>
<img src="https://img.shields.io/badge/Github-181717?style=flat-square&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=Slack&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/>
<img src="https://img.shields.io/badge/reactquery-FF4154?style=flat-square&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white"/>
<img src="https://img.shields.io/badge/kakao-FFCD00?style=flat-square&logo=kakao&logoColor=white"/>
</div>

## 서비스 구조
![image](https://github.com/user-attachments/assets/914b4164-4693-45a5-aab7-56339ecb7980)

## 와이어프레임
![image](https://github.com/user-attachments/assets/d24f1421-24d8-4e2a-bb67-a5cfe002a34b)

## ux/ui
![image](https://github.com/user-attachments/assets/31cbe969-dfcd-407b-9bfe-735c029d0fd5)

## ERD
![image](https://github.com/user-attachments/assets/be477538-1d2f-46eb-9371-616a60a8298b)

## 프로젝트 파일 구조
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

## 코드
1. zustand 로그인한 유저 전역관리
   
![image](https://github.com/user-attachments/assets/45de80ce-b020-4560-8303-d053daddbb66)

2. 지도 api를 활용하여 수파베이스 위도, 경도를 map으로 그려주기
![image](https://github.com/user-attachments/assets/647328f5-a086-43ae-9a10-b1cb714e8b84)

3. 수파베이스 업데이트 기능, 지역 상태 관리를 통해 프로필 업데이트
![image](https://github.com/user-attachments/assets/8e3674ff-abfb-44bc-b8f4-a4e0e3ba583f)

4. 검색 기능 구현
   
![image](https://github.com/user-attachments/assets/b3a66d5a-458e-4f5c-b608-cfa0241d5a4d)

## trouble shooting
1. 라우터 설정 문제: 마이페이지에서 새로고침하면 홈으로 가는 현상
- 해결: 유저가 초기값에 null이라서 초반에 랜더링 될 때 유저가 없기 때문에 퍼블릭 라우트로 이동, 문제 발생
isLoaded를 사용해서 ProtectedRoute에 적용

![image](https://github.com/user-attachments/assets/0893778b-589e-4143-b1f8-07fca217c9dd)
![image](https://github.com/user-attachments/assets/084e5dc5-ad4b-467c-81ff-fbe9f646d6b9)

2. privateGet(...).defaultMutationOptions is not a function at SignIn (SignIn.jsx:120:20)
- 해결: useMutation의 설정 방식 확인
</br>
최신 버전의 TanStack Query에서는 mutation.mutate의 두 번째 인자로 옵션을 전달할 수 없으므로 이를 확인해야 합니다.
</br>
mutationFn을 설정하고, onSuccess, onError 같은 콜백을 직접 지정하였다.

![image](https://github.com/user-attachments/assets/6a95d9f2-6f86-42d6-a6a5-81ebd598733c)

