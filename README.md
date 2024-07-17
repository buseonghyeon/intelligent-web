<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/50824e8a-a125-4a48-aaad-b40ea2d8ffa5">

# LLM을 활용한 맞춤형 외국어 학습 지원 시스템

### 📖 프로젝트 개요
이 저장소는 LLM(대형 언어 모델)을 활용한 맞춤형 외국어 학습 지원 시스템의 코드를 포함하고 있습니다. 이 시스템은 사용자 등록, 로그인, 이미지 생성, 채팅, 단어 생성 및 단어 관리와 같은 다양한 기능을 통합하여 사용자에게 맞춤형 학습 경험을 제공합니다.
<br/><br/>

### 🚀 프로젝트 목표
- 사용자 맞춤형 학습 자료 제공
- 학습 성과 추적
- 다양한 학습 도구 제공
<br/><br/><br/>

## 📝 프로젝트 설명

### 💼 LLM 기반 학습 지원 시스템의 기능
1. 사용자 등록 및 로그인
2. 이미지 생성 기능
3. AI 채팅 기능
4. 맞춤형 단어 생성 및 관리
5. 학습 통계 제공
<br/><br/>

### 🗺 기술 설계도
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/b46445cc-97ab-4af1-a1a9-07443e14f6c6"><br/><br/>


### 💻 기술 스택
- **OS:** &nbsp;&nbsp;![Windows 11](https://img.shields.io/badge/Windows%2011-%230079d5.svg?style=for-the-badge&logo=Windows%2011&logoColor=white) ![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
- **Container 배포:** &nbsp;&nbsp;![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- **프레임워크:** &nbsp;&nbsp;![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
- **스타일:** &nbsp;&nbsp;![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- **언어:** &nbsp;&nbsp;![Python](https://img.shields.io/badge/python-%23323330.svg?style=for-the-badge&logo=python&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- **툴:** &nbsp;&nbsp;![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
<br/><br/>

### ✨ 주요 기능 및 이미지
📌 Home<br/>
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/4899a646-3abc-4837-927d-1002c53329a8"><br/><br/>
- **메뉴바:** 로고와 각종 기능들을 이용할 수 있는 메뉴 바 구현<br/>
- **광고:** 사용자에게 어떻게 사용하는지와 사용하고 싶도록 디자인 구현<br/><br/><br/>

📌 Account<br/>
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/2da2bd54-a770-4bd0-a697-6817690276a2"><br/><br/>
- **회원가입:** ID를 입력하여 회원가입을 진행<br/>
- **로그인:** 사용자 로그인 기능 구현<br/><br/><br/>

📌 Chat<br/>
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/244033d6-f968-43ae-af4b-cff67ab39ffd"><br/><br/>
- **채팅:** 오디오 파일을 통한 AI 채팅 기능<br/>
- **채팅 기록:** 사용자의 채팅 기록을 저장 및 관리<br/><br/><br/>

📌 Word Management<br/>
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/fe2fd520-fee9-4f44-8473-cdeac31fc851"><br/><br/>
- **단어 생성:** 사용자 맞춤형 단어 생성 기능<br/>
- **단어 관리:** 사용자 맞춤형 단어 관리 기능<br/><br/><br/>

📌 Statistics<br/>
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/a1237384-a054-4589-a2ba-5a715ca32427"><br/><br/>
- **학습 통계:** 사용자의 학습 통계 제공<br/>
- **사용자 로그:** 사용자의 검색 로그 및 학습 활동 로그 제공<br/><br/><br/>

## ⚙️ 프로젝트 설치 및 실행 방법

### 📝 Prerequisites
- Python 3.8 이상
- Node.js 및 npm
- pip (Python 패키지 관리자)
- MySQL 서버

### 📦 설치 방법
1. 저장소를 클론합니다:
    ```sh
    git clone https://github.com/yourusername/intelligent-web.git
    cd intelligent-web
    ```

2. 가상 환경을 만들고 활성화합니다:
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # 윈도우에서는 `venv\Scripts\activate` 사용
    ```

3. 필요한 Python 패키지를 설치합니다:
    ```sh
    pip install -r requirements.txt
    ```

4. MySQL 데이터베이스를 설정합니다:
    - `Intelligent-web-db`라는 데이터베이스를 생성합니다.
    - `Database_Server.py` 파일의 MySQL 자격 증명 정보를 업데이트합니다.

5. `frontend` 디렉토리로 이동하여 필요한 Node.js 패키지를 설치합니다:
    ```sh
    cd frontend
    npm install
    ```

### 실행

1. 백엔드를 실행합니다:
    ```sh
    flask run
    ```

2. 프론트엔드를 실행합니다:
    ```sh
    npm start
    ```

## API 엔드포인트

### 사용자 인증

- **등록**: `POST /register`
    - 요청: `{ "id": "user_id", "name": "name", "email": "email", "password": "password" }`
    - 응답: `{ "message": "User registered successfully" }`

- **로그인**: `POST /login`
    - 요청: `{ "id": "user_id", "password": "password" }`
    - 응답: `{ "message": "Login successful" }`

### 이미지 생성

- **이미지 생성**: `POST /generate-image`
    - 요청: `{ "example_sentence": "sentence describing the image" }`
    - 응답: `{ "image_url": "generated image URL" }`

### 채팅

- **채팅**: `POST /chat`
    - 요청: `multipart/form-data`로 오디오 파일을 포함
    - 응답: `{ "text": "recognized text", "response": "chat response" }`

### 단어 관리

- **단어 생성**: `POST /create-word`
    - 요청: `{ "userId": "user_id", "answers": { "age": "user age", "other_answers": "..." } }`
    - 응답: `{ "message": "Words created successfully!", "words": [ ... ] }`

- **맞춤형 단어 가져오기**: `GET /custom`
    - 요청: `{ "userId": "user_id" }`
    - 응답: `[ { "word": "...", "meaning": "...", ... } ]`

- **카테고리 및 날짜별 단어 가져오기**: `GET /words/<category>/<day>`
    - 요청: `query param userId`
    - 응답: `[ { "word": "...", "meaning": "...", ... } ]`

### 통계 및 로그

- **카테고리 통계**: `GET /category-stats/<user_id>`
    - 응답: `[ { "category": "...", "count": ... } ]`

- **월별 통계**: `GET /monthly-stats/<user_id>`
    - 응답: `[ { "month": "...", "count": ... } ]`

- **일별 통계**: `GET /daily-stats/<user_id>`
    - 응답: `[ { "date": "...", "count": ... } ]`

- **검색 로그**: `GET /search-log/<user_id>/<date>`
    - 응답: `[ { "korean": "...", "english": "...", ... } ]`

## 파일 설명

### 백엔드 파일

- **app.py**: 애플리케이션의 메인 엔트리 포인트로, 라우트와 구성을 설정합니다.
- **login.py**: 사용자 로그인 기능을 포함합니다.
- **register.py**: 사용자 등록 기능을 포함합니다.
- **generate_image.py**: OpenAI를 사용하여 이미지 생성 요청을 처리합니다.
- **Chat.py**: Google Cloud Speech-to-Text 및 OpenAI를 사용하여 채팅 기능을 제공합니다.
- **CreateWordToUSer.py**: 사용자 맞춤 단어 생성을 관리합니다.
- **search_log.py**: 검색 로그와 통계를 가져오는 엔드포인트를 포함합니다.
- **Database_Server.py**: 데이터베이스를 구성하고 데이터베이스 모델을 정의합니다.
- **translate.py**: OpenAI를 사용하여 텍스트 번역 요청을 처리합니다.
- **requirements.txt**: 프로젝트에 필요한 Python 종속성을 나열합니다.

### 프론트엔드 파일

- **index.js**: React 애플리케이션의 엔트리 포인트로, 라우트를 설정하고 메인 앱을 렌더링합니다.
- **Login.js**: 로그인 및 등록 컴포넌트입니다.
- **Home.js**: 텍스트 번역을 위한 검색 바가 포함된 홈 컴포넌트입니다.
- **WordDetail.js**: 번역 및 예문을 포함한 단어의 자세한 정보를 표시합니다.
- **Game.js**: 사용자가 어휘를 연습할 수 있는 미니 게임 컴포넌트입니다.
- **MyPage.js**: 사용자 정보 및 즐겨찾기 단어를 보여주는 사용자 프로필 페이지입니다.
- **MyStudy.js**: 사용자 학습 통계 및 검색 로그를 보여주는 페이지입니다.
- **Chat.js**: AI 챗봇과 상호작용하기 위한 채팅 컴포넌트입니다.
- **DarkModeContext.js**: 다크 모드 상태를 관리하는 컨텍스트 제공자입니다.
- **setupTests.js**: Jest로 테스트를 설정하기 위한 구성 파일입니다.
- **reportWebVitals.js**: 애플리케이션의 성능 메트릭을 측정합니다.
