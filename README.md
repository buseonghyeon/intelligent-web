# LLM을 활용한 맞춤형 외국어 학습 지원 시스템

이 저장소는 LLM(대형 언어 모델)을 활용한 맞춤형 외국어 학습 지원 시스템의 코드를 포함하고 있습니다. 이 시스템은 사용자 등록, 로그인, 이미지 생성, 채팅, 단어 생성 및 단어 관리와 같은 다양한 기능을 통합하여 사용자에게 맞춤형 학습 경험을 제공합니다.

## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [개발 기간](#개발-기간)
3. [개발 환경](#개발-환경)
4. [설치 및 실행 방법](#설치-및-실행-방법)
5. [API 엔드포인트](#api-엔드포인트)
6. [파일 설명](#파일-설명)
7. [프론트엔드 컴포넌트](#프론트엔드-컴포넌트)
8. [기여](#기여)
9. [라이선스](#라이선스)

## 프로젝트 개요

LLM을 활용한 맞춤형 외국어 학습 지원 시스템은 Flask와 React를 사용하여 구축된 웹 애플리케이션입니다. 이 애플리케이션은 사용자에게 맞춤형 학습 자료를 제공하고, 학습 성과를 추적하며, 다양한 학습 도구를 통해 외국어 학습을 지원합니다.

## 개발 기간

2024.07.01 ~ 2024.07.17

## 개발 환경

- **프로그래밍 언어**: Python, JavaScript
- **프레임워크**: Flask, React
- **데이터베이스**: MySQL
- **기타 툴**: Node.js, npm, pip

## 설치 및 실행 방법

### 전제 조건

다음이 설치되어 있는지 확인하세요:
- Python 3.8 이상
- Node.js 및 npm
- pip (Python 패키지 관리자)
- MySQL 서버

#### `requirements.txt` 참고
```txt
aiohttp==3.9.5
aiosignal==1.3.1
alembic==1.13.2
annotated-types==0.7.0
anyio==4.4.0
attrs==23.2.0
bcrypt==4.1.3
blinker==1.8.2
cachetools==5.3.3
certifi==2024.7.4
charset-normalizer==3.3.2
click==8.1.7
colorama==0.4.6
comtypes==1.4.5
distro==1.9.0
Flask==3.0.3
Flask-Bcrypt==1.0.1
Flask-Cors==4.0.1
Flask-Migrate==4.0.7
Flask-SQLAlchemy==3.1.1
frozenlist==1.4.1
google-api-core==2.19.1
google-auth==2.32.0
google-cloud-speech==2.26.1
google-cloud-texttospeech==2.16.4
googleapis-common-protos==1.63.2
greenlet==3.0.3
grpcio==1.64.1
grpcio-status==1.64.1
h11==0.14.0
httpcore==1.0.5
httpx==0.27.0
idna==3.7
install==1.3.5
itsdangerous==2.2.0
Jinja2==3.1.4
Mako==1.3.5
MarkupSafe==2.1.5
multidict==6.0.5
openai==0.28.0
pip==24.0
proto-plus==1.24.0
protobuf==5.27.2
pyasn1==0.6.0
pyasn1_modules==0.4.0
pydantic==2.8.2
pydantic_core==2.20.1
PyMySQL==1.1.1
pypiwin32==223
pyttsx3==2.90
pywin32==306
requests==2.32.3
rsa==4.9
sniffio==1.3.1
SQLAlchemy==2.0.31
tqdm==4.66.4
typing_extensions==4.12.2
urllib3==2.2.2
Werkzeug==3.0.3
yarl==1.9.4
```

### 클론 받기

1. 저장소를 클론합니다:
    ```sh
    git clone https://github.com/yourusername/intelligent-web.git
    cd intelligent-web
    ```

### 설치

1. 가상 환경을 만들고 활성화합니다:
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # 윈도우에서는 `venv\Scripts\activate` 사용
    ```

2. 필요한 Python 패키지를 설치합니다:
    ```sh
    pip install -r requirements.txt
    ```

3. MySQL 데이터베이스를 설정합니다:
    - `Intelligent-web-db`라는 데이터베이스를 생성합니다.
    - `Database_Server.py` 파일의 MySQL 자격 증명 정보를 업데이트합니다.

4. `frontend` 디렉토리로 이동하여 필요한 Node.js 패키지를 설치합니다:
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

## 프론트엔드 컴포넌트

### 푸터

간단한 푸터 컴포넌트입니다.

**파일**: `Footer.js`
```jsx
import React from 'react';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            Footer Content
        </footer>
    );
};

export default Footer;
```
