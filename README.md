# Intelligent Learning Platform

Welcome to the Intelligent Learning Platform repository. This project is a web-based application designed to enhance English learning through various interactive features. Below, you will find an overview of the project structure, key functionalities, and instructions for setting up and running the application.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Contributing](#contributing)
7. [License](#license)

## Project Structure

The project consists of the following files and directories:

### Backend

- `app.py`: Main application file that sets up the Flask server and integrates various modules.
- `Chat.py`: Handles chat interactions, including speech-to-text and OpenAI GPT-3.5 based responses.
- `CreateWordToUSer.py`: Manages the creation of custom word lists based on user input and OpenAI responses.
- `Database_Server.py`: Contains database models and configurations.
- `generate_image.py`: Endpoint for generating images using OpenAI.
- `login.py`: Handles user login functionality.
- `register.py`: Handles user registration functionality.
- `search_log.py`: Provides endpoints for retrieving search logs and statistics.
- `translate.py`: Manages translation services and related functionalities.
- `game.py`: Contains logic for generating words for educational games.

### Frontend

- `WordDetail.js`: Component for displaying detailed information about words, including definitions and related images.
- `Footer.js`: Footer component.
- `Home.js`: Home component with search functionality.
- `HomeMain.js`: Main content for the homepage, including category selection and daily learning progress.
- `MainContent.js`: Contains slides for games and quizzes.
- `Modal.js`: Modal component for displaying daily word lists.
- `Navbar.js`: Navigation bar component with links to different sections of the app.
- `QuestionModal.js`: Modal component for displaying and submitting custom learning questions.
- `DarkModeContext.js`: Context for managing dark mode state.
- `Login.js`: Login component with sign-in and sign-up forms.
- `MyPage.js`: Component for displaying user information and favorites.
- `MyStudy.js`: Component for displaying user's study statistics and logs.
- `Game.js`: Mini-game component for interactive word learning.
- `Chat.js`: Chat component for voice-based interaction with AI.
- `setupTests.js`: Setup file for testing configuration.
- `reportWebVitals.js`: File for reporting web vitals.

## Features

- **User Authentication**: Users can register and log in to their accounts.
- **Chat Interaction**: Converts speech to text and provides intelligent responses using GPT-3.5.
- **Word Creation**: Generates customized word lists for users based on their learning level.
- **Image Generation**: Creates images from text descriptions using OpenAI.
- **Translation**: Translates words between English and Korean with additional contextual information.
- **Educational Games**: Provides interactive word games for enhancing learning.
- **Search Logs and Statistics**: Tracks user search activities and provides statistical data.

## Installation

### Prerequisites

- Python 3.8 or higher
- Flask
- OpenAI API key
- Google Cloud credentials for speech-to-text functionality
- MySQL database

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/IntelligentLearningPlatform.git
    cd IntelligentLearningPlatform
    ```

2. Set up a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Configure environment variables:
    - Set `OPENAI_API_KEY` to your OpenAI API key.
    - Set `GOOGLE_APPLICATION_CREDENTIALS` to the path of your Google Cloud service account key file.

5. Set up the database:
    ```bash
    flask db upgrade
    ```

6. Run the application:
    ```bash
    flask run
    ```

## Usage

### User Registration and Login

- **Register**: Send a POST request to `/register` with `id`, `name`, `email`, and `password`.
- **Login**: Send a POST request to `/login` with `id` and `password`.

### Chat Interaction

- Send a POST request to `/chat` with an audio file to get a text response using GPT-3.5.

### Word Creation

- Send a POST request to `/create-word` with `userId` and `answers` to generate a customized word list.

### Image Generation

- Send a POST request to `/generate-image` with `example_sentence` to generate an image from the text.

### Translation

- Send a POST request to `/translate` with `userId` and `text` to translate between English and Korean.

### Educational Games

- Send a GET request to `/game-words` with `user_id` to retrieve words for games.

### Search Logs and Statistics

- Various endpoints are available to retrieve category stats, monthly stats, daily stats, and search logs.

## API Endpoints

| Endpoint                  | Method | Description                                           |
|---------------------------|--------|-------------------------------------------------------|
| `/register`               | POST   | Register a new user                                   |
| `/login`                  | POST   | User login                                            |
| `/chat`                   | POST   | Chat interaction                                      |
| `/create-word`            | POST   | Create custom words                                   |
| `/generate-image`         | POST   | Generate image from text                              |
| `/translate`              | POST   | Translate text                                        |
| `/game-words`             | GET    | Get words for games                                   |
| `/category-stats/<user_id>`| GET    | Get category statistics                               |
| `/monthly-stats/<user_id>` | GET    | Get monthly statistics                                |
| `/daily-stats/<user_id>`   | GET    | Get daily statistics                                  |
| `/search-log/<user_id>/<date>` | GET | Get search log for a specific date                    |

## Contributing

We welcome contributions from the community. Please read our contributing guidelines before making any changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Thank you for using the Intelligent Learning Platform. If you have any questions or need further assistance, please feel free to contact us.

---

# 지능형 학습 플랫폼

지능형 학습 플랫폼 저장소에 오신 것을 환영합니다. 이 프로젝트는 다양한 인터랙티브 기능을 통해 영어 학습을 향상시키기 위해 설계된 웹 기반 응용 프로그램입니다. 아래에서 프로젝트 구조, 주요 기능 및 애플리케이션을 설정하고 실행하는 방법에 대한 개요를 확인할 수 있습니다.

## 목차

1. [프로젝트 구조](#프로젝트-구조)
2. [기능](#기능)
3. [설치](#설치)
4. [사용법](#사용법)
5. [API 엔드포인트](#api-엔드포인트)
6. [기여](#기여)
7. [라이선스](#라이선스)

## 프로젝트 구조

이 프로젝트는 다음 파일 및 디렉토리로 구성되어 있습니다:

### 백엔드

- `app.py`: Flask 서버를 설정하고 다양한 모듈을 통합하는 메인 애플리케이션 파일.
- `Chat.py`: 음성-텍스트 변환 및 OpenAI GPT-3.5 기반 응답을 포함한 채팅 상호작용을 처리합니다.
- `CreateWordToUSer.py`: 사용자 입력 및 OpenAI 응답을 기반으로 사용자 정의 단어 목록을 관리합니다.
- `Database_Server.py`: 데이터베이스 모델 및 구성을 포함합니다.
- `generate_image.py`: OpenAI를 사용하여 이미지를 생성하는 엔드포인트.
- `login.py`: 사용자 로그인 기능을 처리합니다.
- `register.py`: 사용자 등록 기능을 처리합니다.
- `search_log.py`: 검색 로그 및 통계를 검색하는 엔드포인트를 제공합니다.
- `translate.py`: 번역 서비스 및 관련 기능을 관리합니다.
- `game.py`: 교육용 게임을 위해 단어를 생성하는 로직을 포함합니다.

### 프론트엔드

- `WordDetail.js`: 단어에 대한 정의 및 관련 이미지를 포함한 세부 정보를 표시하는 구성 요소.
- `Footer.js`: 푸터 구성 요소.
- `Home.js`: 검색 기능이 포함된 홈 구성 요소.
- `HomeMain.js`: 카테고리 선택 및 일일 학습 진행을 포함한 홈페이지의 메인 콘텐츠.
- `MainContent.js`: 게임 및 퀴즈 슬라이드를 포함합니다.
- `Modal.js`: 일일 단어 목록을 표시하는 모달 구성 요소.
- `Navbar.js`: 앱의 다른 섹션에 대한 링크가 있는 탐색 바 구성 요소.
- `QuestionModal.js`: 사용자 정의 학습 질문을 표시하고 제출하는 모달 구성 요소.
- `DarkModeContext.js`: 다크 모드 상태를 관리하기 위한 컨텍스트.
- `Login.js`: 로그인 구성 요소로, 로그인 및 회원가입 양식 포함.
- `MyPage.js`: 사용자 정보 및 즐겨찾기를 표시하는 구성 요소.
- `MyStudy.js`: 사용자의 학습 통계 및 로그를 표시하는 구성 요소.
- `Game.js`: 인터랙티브 단어 학습을 위한 미니게임 구성 요소.
- `Chat.js`: AI와의 음성 기반 상호작용을 위한 채팅 구성 요소.
- `setupTests.js`: 테스트 구성 설정 파일.
- `reportWebVitals.js`: 웹 바이탈을 보고하는 파일.

## 기능

- **사용자 인증**: 사용자는 계정을 등록하고 로그인할 수 있습니다.
- **채팅 상호작용**: 음성을 텍스트로 변환하고 GPT-3.5를 사용한 지능형 응답을 제공합니다.
- **단어 생성**: 사용자의 학습 수준에 따라 맞춤형 단어 목록을 생성합니다.
- **이미지 생성**: 텍스트 설명을 사용하여 이미지를 생성합니다(OpenAI 사용).
- **번역**: 영어와 한국어 간의 단어를 추가적인 맥락 정보와 함께 번역합니다.
- **교육용 게임**: 학습을 향상시키기 위한 인터랙티브 단어 게임을 제공합니다.
- **검색 로그 및 통계**: 사용자 검색 활동을 추적하고 통계 데이터를 제공합니다.

## 설치

### 전제 조건

- Python 3.8 이상
- Flask
- OpenAI API 키
- 음성-텍스트 기능을 위한 Google Cloud 자격 증명
- MySQL 데이터베이스

### 단계

1. 저장소를 클론합니다:
    ```bash
    git clone https://github.com/yourusername/IntelligentLearningPlatform.git
    cd IntelligentLearningPlatform
    ```

2. 가상 환경을 설정합니다:
    ```bash
    python -m venv venv
    source venv/bin/activate  # Windows에서는 `venv\Scripts\activate` 사용
    ```

3. 종속성을 설치합니다:
    ```bash
    pip install -r requirements.txt
    ```

4. 환경 변수를 구성합니다:
    - `OPENAI_API_KEY`를 OpenAI API 키로 설정합니다.
    - `GOOGLE_APPLICATION_CREDENTIALS`를 Google Cloud 서비스 계정 키 파일의 경로로 설정합니다.

5. 데이터베이스를 설정합니다:
    ```bash
    flask db upgrade
    ```

6. 애플리케이션을 실행합니다:
    ```bash
    flask run
    ```

## 사용법

### 사용자 등록 및 로그인

- **등록**: `id`, `name`, `email`, 및 `password`를 포함한 POST 요청을 `/register`로 보냅니다.
- **로그인**: `id` 및 `password`를 포함한 POST 요청을 `/login`로 보냅니다.

### 채팅 상호작용

- 오디오 파일을 포함한 POST 요청을 `/chat`으로 보내 GPT-3.5를 사용한 텍스트 응답을 받습니다.

### 단어 생성

- `userId` 및 `answers`를 포함한 POST 요청을 `/create-word`로 보내 맞춤형 단어 목록을 생성합니다.

### 이미지 생성

- `example_sentence`를 포함한 POST 요청을 `/generate-image`로 보내 텍스트로부터 이미지를 생성합니다.

### 번역

- `userId` 및 `text`를 포함한 POST 요청을 `/translate`로 보내 영어와 한국어 간의 번역을 수행합니다.

### 교육용 게임

- 단어를 검색하기 위해 `user_id`를 포함한 GET 요청을 `/game-words`로 보냅니다.

### 검색 로그 및 통계

- 다양한 엔드포인트를 통해 카테고리 통계, 월별 통계, 일별 통계, 및 검색 로그를 검색할 수 있습니다.

## API 엔드포인트

| 엔드포인트                    | 메서드 | 설명                                                 |
|-------------------------------|--------|------------------------------------------------------|
| `/register`                   | POST   | 새로운 사용자 등록                                   |
| `/login`                      | POST   | 사용자 로그인                                        |
| `/chat`                       | POST   | 채팅 상호작용                                        |
| `/create-word`                | POST   | 맞춤형 단어 생성                                     |
| `/generate-image`             | POST   | 텍스트로부터 이미지 생성                             |
| `/translate`                  | POST   | 텍스트 번역                                          |
| `/game-words`                 | GET    | 게임을 위한 단어 가져오기                            |
| `/category-stats/<user_id>`   | GET    | 카테고리 통계 가져오기                               |
| `/monthly-stats/<user_id>`    | GET    | 월별 통계 가져오기                                   |
| `/daily-stats/<user_id>`      | GET    | 일별 통계 가져오기                                   |
| `/search-log/<user_id>/<date>`| GET    | 특정 날짜의 검색 로그 가져오기                       |

## 기여

커뮤니티의 기여를 환영합니다. 변경 사항을 만들기 전에 기여 지침을 읽어보시기 바랍니다.

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

---

지능형 학습 플랫폼을 사용해주셔서 감사합니다. 질문이나 추가 도움이 필요하시면 언제든지 연락 주시기 바랍니다.
