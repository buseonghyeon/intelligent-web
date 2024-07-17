# Intelligent Web Application

This repository contains the code for the Intelligent Web application. The application is built using Flask for the backend and React for the frontend. It integrates various functionalities including user registration, login, image generation, chat, word creation, and word management.

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Descriptions](#file-descriptions)
- [Frontend Components](#frontend-components)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed:
- Python 3.8 or higher
- Node.js and npm
- pip (Python package installer)
- MySQL server

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/intelligent-web.git
    cd intelligent-web
    ```

2. Create and activate a virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Set up the MySQL database:
    - Create a database named `Intelligent-web-db`
    - Update the database configuration in `Database_Server.py` with your MySQL credentials.

5. Navigate to the `frontend` directory and install the required Node.js packages:
    ```sh
    cd frontend
    npm install
    ```

6. Run the backend:
    ```sh
    flask run
    ```

7. Run the frontend:
    ```sh
    npm start
    ```

## Usage

The application provides a web interface and various API endpoints for interacting with its features. The main functionalities include user authentication, image generation using OpenAI, chat functionality, word creation, and more.

## API Endpoints

### User Authentication

- **Register**: `POST /register`
    - Request: `{ "id": "user_id", "name": "name", "email": "email", "password": "password" }`
    - Response: `{ "message": "User registered successfully" }`

- **Login**: `POST /login`
    - Request: `{ "id": "user_id", "password": "password" }`
    - Response: `{ "message": "Login successful" }`

### Image Generation

- **Generate Image**: `POST /generate-image`
    - Request: `{ "example_sentence": "sentence describing the image" }`
    - Response: `{ "image_url": "generated image URL" }`

### Chat

- **Chat**: `POST /chat`
    - Request: `multipart/form-data` with an audio file
    - Response: `{ "text": "recognized text", "response": "chat response" }`

### Word Management

- **Create Word**: `POST /create-word`
    - Request: `{ "userId": "user_id", "answers": { "age": "user age", "other_answers": "..." } }`
    - Response: `{ "message": "Words created successfully!", "words": [ ... ] }`

- **Get Custom Words**: `GET /custom`
    - Request: `{ "userId": "user_id" }`
    - Response: `[ { "word": "...", "meaning": "...", ... } ]`

- **Get Words by Category and Day**: `GET /words/<category>/<day>`
    - Request: `query param userId`
    - Response: `[ { "word": "...", "meaning": "...", ... } ]`

### Statistics and Logs

- **Category Stats**: `GET /category-stats/<user_id>`
    - Response: `[ { "category": "...", "count": ... } ]`

- **Monthly Stats**: `GET /monthly-stats/<user_id>`
    - Response: `[ { "month": "...", "count": ... } ]`

- **Daily Stats**: `GET /daily-stats/<user_id>`
    - Response: `[ { "date": "...", "count": ... } ]`

- **Search Log**: `GET /search-log/<user_id>/<date>`
    - Response: `[ { "korean": "...", "english": "...", ... } ]`

## File Descriptions

### Backend Files

- **app.py**: Main entry point of the application, setting up routes and configurations.
- **login.py**: Contains the user login functionality.
- **register.py**: Contains the user registration functionality.
- **generate_image.py**: Handles image generation requests using OpenAI.
- **Chat.py**: Provides chat functionality using Google Cloud Speech-to-Text and OpenAI.
- **CreateWordToUSer.py**: Manages the creation of custom words for users.
- **search_log.py**: Contains endpoints for retrieving search logs and statistics.
- **Database_Server.py**: Configures the database and defines the database models.
- **translate.py**: Handles text translation requests using OpenAI.
- **requirements.txt**: Lists the Python dependencies required for the project.

### Frontend Files

- **index.js**: Entry point for the React application, setting up routes and rendering the main app.
- **Login.js**: Login and registration component.
- **Home.js**: Home component with a search bar for translating text.
- **WordDetail.js**: Displays detailed information about a word, including translations and example sentences.
- **Game.js**: Mini game component where users can practice their vocabulary.
- **MyPage.js**: User profile page showing user information and favorite words.
- **MyStudy.js**: Page showing user study statistics and search logs.
- **Chat.js**: Chat component for interacting with an AI chatbot.
- **DarkModeContext.js**: Context provider for managing dark mode state.
- **setupTests.js**: Configuration for setting up testing with Jest.
- **reportWebVitals.js**: Measures performance metrics for the application.

## Frontend Components

### Footer

A simple footer component.

**File**: `Footer.js`
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

# 지능형 웹 애플리케이션

이 저장소는 지능형 웹 애플리케이션의 코드를 포함하고 있습니다. 이 애플리케이션은 백엔드로 Flask를 사용하고 프론트엔드로 React를 사용하여 구축되었습니다. 사용자 등록, 로그인, 이미지 생성, 채팅, 단어 생성 및 단어 관리와 같은 다양한 기능을 통합하고 있습니다.

## 목차
- [시작하기](#시작하기)
- [필수 조건](#필수-조건)
- [설치](#설치)
- [사용법](#사용법)
- [API 엔드포인트](#api-엔드포인트)
- [파일 설명](#파일-설명)
- [프론트엔드 컴포넌트](#프론트엔드-컴포넌트)
- [기여](#기여)
- [라이선스](#라이선스)

## 시작하기

로컬에서 실행하려면 다음 간단한 단계를 따르세요.

### 필수 조건

다음이 설치되어 있는지 확인하세요:
- Python 3.8 이상
- Node.js 및 npm
- pip (Python 패키지 관리자)
- MySQL 서버

### 설치

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

6. 백엔드를 실행합니다:
    ```sh
    flask run
    ```

7. 프론트엔드를 실행합니다:
    ```sh
    npm start
    ```

## 사용법

이 애플리케이션은 웹 인터페이스와 다양한 API 엔드포인트를 제공하여 기능을 상호작용할 수 있습니다. 주요 기능으로는 사용자 인증, OpenAI를 사용한 이미지 생성, 채팅 기능, 단어 생성 등이 있습니다.

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
